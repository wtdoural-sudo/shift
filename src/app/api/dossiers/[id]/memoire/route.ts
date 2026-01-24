import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { logAuditEvent } from "@/lib/audit"
import { z } from "zod"

const updateMemoireSchema = z.object({
  sectionPresentation: z.string().optional().nullable(),
  sectionComprehension: z.string().optional().nullable(),
  sectionMethodologie: z.string().optional().nullable(),
  sectionEquipe: z.string().optional().nullable(),
  sectionReferences: z.string().optional().nullable(),
  sectionPlanning: z.string().optional().nullable(),
  sectionEngagements: z.string().optional().nullable(),
})

export const GET = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
    include: { memoireTechnique: true },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  // Créer le mémoire s'il n'existe pas
  let memoire = dossier.memoireTechnique

  if (!memoire) {
    memoire = await prisma.memoireTechnique.create({
      data: { dossierId: params.id },
    })
  }

  return apiSuccess(memoire)
})

export const PATCH = withAuth(async (req, { workspaceId, session, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
    include: { memoireTechnique: true },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const body = await req.json()
  const validation = updateMemoireSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  let memoire = dossier.memoireTechnique

  if (!memoire) {
    memoire = await prisma.memoireTechnique.create({
      data: {
        dossierId: params.id,
        ...validation.data,
      },
    })
  } else {
    memoire = await prisma.memoireTechnique.update({
      where: { id: memoire.id },
      data: validation.data,
    })
  }

  await logAuditEvent({
    action: "UPDATE",
    entityType: "MemoireTechnique",
    entityId: memoire.id,
    description: `Mise à jour du mémoire technique du dossier ${dossier.reference}`,
    userId: session.user.id,
    workspaceId,
  })

  return apiSuccess(memoire)
}, ["ADMIN", "EDITOR"])
