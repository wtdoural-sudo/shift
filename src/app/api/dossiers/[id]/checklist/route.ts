import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { z } from "zod"

const createChecklistSchema = z.object({
  label: z.string().min(1, "Libellé requis"),
  description: z.string().optional(),
  ownerId: z.string().optional(),
})

const updateChecklistSchema = z.object({
  label: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["A_VERIFIER", "CONFORME", "NON_CONFORME", "NON_APPLICABLE"]).optional(),
  commentaire: z.string().optional(),
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

  const items = await prisma.checklistItem.findMany({
    where: { dossierId: params.id },
    orderBy: { ordre: "asc" },
    include: {
      owner: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  return apiSuccess(items)
})

export const POST = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const body = await req.json()
  const validation = createChecklistSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  const lastItem = await prisma.checklistItem.findFirst({
    where: { dossierId: params.id },
    orderBy: { ordre: "desc" },
  })

  const item = await prisma.checklistItem.create({
    data: {
      ...validation.data,
      dossierId: params.id,
      ordre: (lastItem?.ordre ?? -1) + 1,
    },
    include: {
      owner: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  return apiSuccess(item, 201)
}, ["ADMIN", "EDITOR"])

export const PATCH = withAuth(async (req, { workspaceId, params }) => {
  const url = new URL(req.url)
  const itemId = url.searchParams.get("itemId")

  if (!itemId) {
    return apiError("ID item requis")
  }

  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const body = await req.json()
  const validation = updateChecklistSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  const item = await prisma.checklistItem.update({
    where: { id: itemId },
    data: validation.data,
    include: {
      owner: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  return apiSuccess(item)
}, ["ADMIN", "EDITOR"])

export const DELETE = withAuth(async (req, { workspaceId, params }) => {
  const url = new URL(req.url)
  const itemId = url.searchParams.get("itemId")

  if (!itemId) {
    return apiError("ID item requis")
  }

  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  await prisma.checklistItem.delete({
    where: { id: itemId },
  })

  return apiSuccess({ success: true })
}, ["ADMIN", "EDITOR"])
