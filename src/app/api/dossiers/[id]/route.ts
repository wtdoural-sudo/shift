import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { logAuditEvent } from "@/lib/audit"
import { z } from "zod"

const updateDossierSchema = z.object({
  reference: z.string().min(1).optional(),
  titre: z.string().min(1).optional(),
  client: z.string().min(1).optional(),
  description: z.string().optional(),
  datePublication: z.string().optional().nullable().transform((v) => v ? new Date(v) : null),
  dateLimite: z.string().optional().nullable().transform((v) => v ? new Date(v) : null),
  montantEstime: z.number().optional().nullable(),
  status: z.enum(["BROUILLON", "EN_ANALYSE", "GO", "NO_GO", "EN_PRODUCTION", "DEPOSE", "ARCHIVE"]).optional(),
})

export const GET = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: {
      id: params.id,
      workspaceId,
    },
    include: {
      dces: true,
      exigences: {
        orderBy: { ordre: "asc" },
        include: { owner: { select: { id: true, firstName: true, lastName: true } } },
      },
      goNoGoDecisions: {
        orderBy: { createdAt: "desc" },
      },
      checklistItems: {
        orderBy: { ordre: "asc" },
        include: { owner: { select: { id: true, firstName: true, lastName: true } } },
      },
      taches: {
        orderBy: { createdAt: "desc" },
        include: { assignee: { select: { id: true, firstName: true, lastName: true } } },
      },
      memoireTechnique: true,
      exports: {
        orderBy: { createdAt: "desc" },
      },
      dossierPreuves: {
        include: { preuve: true },
      },
    },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  return apiSuccess(dossier)
})

export const PATCH = withAuth(async (req, { workspaceId, session, params }) => {
  const body = await req.json()
  const validation = updateDossierSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  // Vérifier que le dossier existe et appartient au workspace
  const existing = await prisma.dossier.findFirst({
    where: {
      id: params.id,
      workspaceId,
    },
  })

  if (!existing) {
    return apiError("Dossier non trouvé", 404)
  }

  // Vérifier l'unicité de la référence si modifiée
  if (validation.data.reference && validation.data.reference !== existing.reference) {
    const duplicate = await prisma.dossier.findFirst({
      where: {
        workspaceId,
        reference: validation.data.reference,
        NOT: { id: params.id },
      },
    })

    if (duplicate) {
      return apiError("Cette référence existe déjà")
    }
  }

  const dossier = await prisma.dossier.update({
    where: { id: params.id },
    data: validation.data,
  })

  await logAuditEvent({
    action: "UPDATE",
    entityType: "Dossier",
    entityId: dossier.id,
    description: `Mise à jour du dossier ${dossier.reference}`,
    userId: session.user.id,
    workspaceId,
    metadata: validation.data,
  })

  return apiSuccess(dossier)
}, ["ADMIN", "EDITOR"])

export const DELETE = withAuth(async (req, { workspaceId, session, params }) => {
  const existing = await prisma.dossier.findFirst({
    where: {
      id: params.id,
      workspaceId,
    },
  })

  if (!existing) {
    return apiError("Dossier non trouvé", 404)
  }

  await prisma.dossier.delete({
    where: { id: params.id },
  })

  await logAuditEvent({
    action: "DELETE",
    entityType: "Dossier",
    entityId: params.id,
    description: `Suppression du dossier ${existing.reference}`,
    userId: session.user.id,
    workspaceId,
  })

  return apiSuccess({ success: true })
}, ["ADMIN"])
