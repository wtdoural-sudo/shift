import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { z } from "zod"

const createTacheSchema = z.object({
  titre: z.string().min(1, "Titre requis"),
  description: z.string().optional(),
  priority: z.enum(["HAUTE", "MOYENNE", "BASSE"]).default("MOYENNE"),
  echeance: z.string().optional().transform((v) => v ? new Date(v) : undefined),
  assigneeId: z.string().optional(),
})

const updateTacheSchema = z.object({
  titre: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["A_FAIRE", "EN_COURS", "TERMINE", "BLOQUE"]).optional(),
  priority: z.enum(["HAUTE", "MOYENNE", "BASSE"]).optional(),
  echeance: z.string().optional().nullable().transform((v) => v ? new Date(v) : null),
  assigneeId: z.string().optional().nullable(),
})

export const GET = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const taches = await prisma.tache.findMany({
    where: { dossierId: params.id },
    orderBy: [{ priority: "asc" }, { echeance: "asc" }],
    include: {
      assignee: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  return apiSuccess(taches)
})

export const POST = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const body = await req.json()
  const validation = createTacheSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  const tache = await prisma.tache.create({
    data: {
      ...validation.data,
      dossierId: params.id,
    },
    include: {
      assignee: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  return apiSuccess(tache, 201)
}, ["ADMIN", "EDITOR"])

export const PATCH = withAuth(async (req, { workspaceId, params }) => {
  const url = new URL(req.url)
  const tacheId = url.searchParams.get("tacheId")

  if (!tacheId) {
    return apiError("ID tâche requis")
  }

  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const body = await req.json()
  const validation = updateTacheSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  const tache = await prisma.tache.update({
    where: { id: tacheId },
    data: validation.data,
    include: {
      assignee: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  return apiSuccess(tache)
}, ["ADMIN", "EDITOR"])

export const DELETE = withAuth(async (req, { workspaceId, params }) => {
  const url = new URL(req.url)
  const tacheId = url.searchParams.get("tacheId")

  if (!tacheId) {
    return apiError("ID tâche requis")
  }

  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  await prisma.tache.delete({
    where: { id: tacheId },
  })

  return apiSuccess({ success: true })
}, ["ADMIN", "EDITOR"])
