import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { logAuditEvent } from "@/lib/audit"
import { deleteFile } from "@/lib/storage"
import { z } from "zod"

const updatePreuveSchema = z.object({
  titre: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  type: z.enum(["REFERENCE", "CV", "CERTIFICATION", "DOCUMENT", "AUTRE"]).optional(),
  tags: z.array(z.string()).optional(),
  contenu: z.string().optional().nullable(),
})

export const GET = withAuth(async (req, { workspaceId, params }) => {
  const preuve = await prisma.preuve.findFirst({
    where: {
      id: params.id,
      workspaceId,
    },
    include: {
      dossierPreuves: {
        include: {
          dossier: {
            select: { id: true, reference: true, titre: true },
          },
        },
      },
    },
  })

  if (!preuve) {
    return apiError("Preuve non trouvée", 404)
  }

  return apiSuccess(preuve)
})

export const PATCH = withAuth(async (req, { workspaceId, session, params }) => {
  const existing = await prisma.preuve.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!existing) {
    return apiError("Preuve non trouvée", 404)
  }

  const body = await req.json()
  const validation = updatePreuveSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  const preuve = await prisma.preuve.update({
    where: { id: params.id },
    data: validation.data,
  })

  await logAuditEvent({
    action: "UPDATE",
    entityType: "Preuve",
    entityId: preuve.id,
    description: `Mise à jour de la preuve "${preuve.titre}"`,
    userId: session.user.id,
    workspaceId,
  })

  return apiSuccess(preuve)
}, ["ADMIN", "EDITOR"])

export const DELETE = withAuth(async (req, { workspaceId, session, params }) => {
  const existing = await prisma.preuve.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!existing) {
    return apiError("Preuve non trouvée", 404)
  }

  // Supprimer le fichier associé
  if (existing.storagePath) {
    await deleteFile(existing.storagePath)
  }

  await prisma.preuve.delete({
    where: { id: params.id },
  })

  await logAuditEvent({
    action: "DELETE",
    entityType: "Preuve",
    entityId: params.id,
    description: `Suppression de la preuve "${existing.titre}"`,
    userId: session.user.id,
    workspaceId,
  })

  return apiSuccess({ success: true })
}, ["ADMIN"])
