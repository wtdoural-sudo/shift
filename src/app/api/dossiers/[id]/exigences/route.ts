import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { z } from "zod"

const createExigenceSchema = z.object({
  titre: z.string().min(1, "Titre requis"),
  description: z.string().optional(),
  priority: z.enum(["HAUTE", "MOYENNE", "BASSE"]).default("MOYENNE"),
  source: z.string().optional(),
  ownerId: z.string().optional(),
})

const updateExigenceSchema = z.object({
  titre: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.enum(["HAUTE", "MOYENNE", "BASSE"]).optional(),
  status: z.enum(["A_TRAITER", "EN_COURS", "TRAITE", "NON_APPLICABLE"]).optional(),
  source: z.string().optional(),
  ownerId: z.string().optional().nullable(),
  ordre: z.number().optional(),
})

export const GET = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const exigences = await prisma.exigence.findMany({
    where: { dossierId: params.id },
    orderBy: { ordre: "asc" },
    include: {
      owner: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  return apiSuccess(exigences)
})

export const POST = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const body = await req.json()
  const validation = createExigenceSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  // Obtenir le prochain ordre
  const lastExigence = await prisma.exigence.findFirst({
    where: { dossierId: params.id },
    orderBy: { ordre: "desc" },
  })

  const exigence = await prisma.exigence.create({
    data: {
      ...validation.data,
      dossierId: params.id,
      ordre: (lastExigence?.ordre ?? -1) + 1,
    },
    include: {
      owner: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  return apiSuccess(exigence, 201)
}, ["ADMIN", "EDITOR"])

export const PATCH = withAuth(async (req, { workspaceId, params }) => {
  const url = new URL(req.url)
  const exigenceId = url.searchParams.get("exigenceId")

  if (!exigenceId) {
    return apiError("ID exigence requis")
  }

  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const body = await req.json()
  const validation = updateExigenceSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  const exigence = await prisma.exigence.update({
    where: { id: exigenceId },
    data: validation.data,
    include: {
      owner: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  return apiSuccess(exigence)
}, ["ADMIN", "EDITOR"])

export const DELETE = withAuth(async (req, { workspaceId, params }) => {
  const url = new URL(req.url)
  const exigenceId = url.searchParams.get("exigenceId")

  if (!exigenceId) {
    return apiError("ID exigence requis")
  }

  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  await prisma.exigence.delete({
    where: { id: exigenceId },
  })

  return apiSuccess({ success: true })
}, ["ADMIN", "EDITOR"])
