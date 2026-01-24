import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { logAuditEvent } from "@/lib/audit"
import { z } from "zod"

const goNoGoSchema = z.object({
  critereFitStrategique: z.number().min(0).max(5),
  critereCapacite: z.number().min(0).max(5),
  critereRentabilite: z.number().min(0).max(5),
  critereDelai: z.number().min(0).max(5),
  critereRisque: z.number().min(0).max(5),
  commentaire: z.string().optional(),
  motifNoGo: z.string().optional(),
})

export const GET = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const decisions = await prisma.goNoGoDecision.findMany({
    where: { dossierId: params.id },
    orderBy: { createdAt: "desc" },
  })

  // Récupérer le seuil du workspace
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: { goNoGoThreshold: true },
  })

  return apiSuccess({
    decisions,
    threshold: workspace?.goNoGoThreshold ?? 15,
  })
})

export const POST = withAuth(async (req, { workspaceId, session, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
    include: { workspace: true },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const body = await req.json()
  const validation = goNoGoSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  const data = validation.data

  // Calculer le score total
  const scoreTotal =
    data.critereFitStrategique +
    data.critereCapacite +
    data.critereRentabilite +
    data.critereDelai +
    data.critereRisque

  // Déterminer la décision
  const threshold = dossier.workspace.goNoGoThreshold
  const decision = scoreTotal >= threshold

  // Si NO-GO, le motif est obligatoire
  if (!decision && !data.motifNoGo) {
    return apiError("Le motif de No-Go est obligatoire")
  }

  const goNoGoDecision = await prisma.goNoGoDecision.create({
    data: {
      dossierId: params.id,
      critereFitStrategique: data.critereFitStrategique,
      critereCapacite: data.critereCapacite,
      critereRentabilite: data.critereRentabilite,
      critereDelai: data.critereDelai,
      critereRisque: data.critereRisque,
      scoreTotal,
      decision,
      motifNoGo: decision ? null : data.motifNoGo,
      commentaire: data.commentaire,
    },
  })

  // Mettre à jour le statut du dossier
  const newStatus = decision ? "GO" : "NO_GO"
  await prisma.dossier.update({
    where: { id: params.id },
    data: { status: newStatus },
  })

  await logAuditEvent({
    action: decision ? "GO_DECISION" : "NOGO_DECISION",
    entityType: "GoNoGoDecision",
    entityId: goNoGoDecision.id,
    description: `Décision ${decision ? "GO" : "NO-GO"} pour le dossier ${dossier.reference} (score: ${scoreTotal}/${threshold})`,
    userId: session.user.id,
    workspaceId,
    metadata: {
      scoreTotal,
      threshold,
      decision,
    },
  })

  return apiSuccess(goNoGoDecision, 201)
}, ["ADMIN", "EDITOR"])
