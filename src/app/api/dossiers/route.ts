import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { logAuditEvent } from "@/lib/audit"
import { z } from "zod"

const createDossierSchema = z.object({
  reference: z.string().min(1, "Référence requise"),
  titre: z.string().min(1, "Titre requis"),
  client: z.string().min(1, "Client requis"),
  description: z.string().optional(),
  datePublication: z.string().optional().transform((v) => v ? new Date(v) : undefined),
  dateLimite: z.string().optional().transform((v) => v ? new Date(v) : undefined),
  montantEstime: z.number().optional(),
})

export const GET = withAuth(async (req, { workspaceId }) => {
  const url = new URL(req.url)
  const status = url.searchParams.get("status")

  const dossiers = await prisma.dossier.findMany({
    where: {
      workspaceId,
      ...(status ? { status: status as any } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          exigences: true,
          taches: true,
          checklistItems: true,
          dces: true,
        },
      },
    },
  })

  return apiSuccess(dossiers)
})

export const POST = withAuth(async (req, { workspaceId, session }) => {
  const body = await req.json()
  const validation = createDossierSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  const data = validation.data

  // Vérifier l'unicité de la référence dans le workspace
  const existing = await prisma.dossier.findFirst({
    where: {
      workspaceId,
      reference: data.reference,
    },
  })

  if (existing) {
    return apiError("Cette référence existe déjà")
  }

  const dossier = await prisma.dossier.create({
    data: {
      ...data,
      workspaceId,
    },
  })

  // Créer automatiquement un mémoire technique vide
  await prisma.memoireTechnique.create({
    data: {
      dossierId: dossier.id,
    },
  })

  // Créer une checklist de conformité par défaut
  const defaultChecklist = [
    "Documents administratifs complets",
    "Attestations fiscales et sociales à jour",
    "Assurance responsabilité civile professionnelle",
    "Extrait Kbis de moins de 3 mois",
    "Références similaires documentées",
    "CV des intervenants proposés",
    "Mémoire technique finalisé",
    "Bordereau des prix complété",
    "Acte d'engagement signé",
    "Respect du format de réponse demandé",
  ]

  await prisma.checklistItem.createMany({
    data: defaultChecklist.map((label, index) => ({
      dossierId: dossier.id,
      label,
      ordre: index,
    })),
  })

  await logAuditEvent({
    action: "CREATE",
    entityType: "Dossier",
    entityId: dossier.id,
    description: `Création du dossier ${dossier.reference}`,
    userId: session.user.id,
    workspaceId,
  })

  return apiSuccess(dossier, 201)
}, ["ADMIN", "EDITOR"])
