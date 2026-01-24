import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { logAuditEvent } from "@/lib/audit"
import { saveFile } from "@/lib/storage"
import { extractTextFromPDF, extractPotentialRequirements } from "@/lib/pdf"

export const POST = withAuth(async (req, { workspaceId, session, params }) => {
  // Vérifier que le dossier existe
  const dossier = await prisma.dossier.findFirst({
    where: {
      id: params.id,
      workspaceId,
    },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return apiError("Fichier requis")
  }

  if (file.type !== "application/pdf") {
    return apiError("Seuls les fichiers PDF sont acceptés")
  }

  // Limiter la taille à 50MB
  if (file.size > 50 * 1024 * 1024) {
    return apiError("Le fichier ne doit pas dépasser 50 Mo")
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  // Sauvegarder le fichier
  const { filename, storagePath } = await saveFile("dce", buffer, file.name)

  // Extraire le texte du PDF
  const extractedText = await extractTextFromPDF(buffer)

  // Créer l'entrée DCE
  const dce = await prisma.dCE.create({
    data: {
      dossierId: params.id,
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      storagePath,
      extractedText,
    },
  })

  // Extraire automatiquement des exigences potentielles
  const autoExtract = formData.get("autoExtract") === "true"

  if (autoExtract && extractedText) {
    const requirements = extractPotentialRequirements(extractedText)

    if (requirements.length > 0) {
      const existingCount = await prisma.exigence.count({
        where: { dossierId: params.id },
      })

      await prisma.exigence.createMany({
        data: requirements.map((req, index) => ({
          dossierId: params.id,
          titre: req.length > 100 ? req.substring(0, 100) + "..." : req,
          description: req,
          ordre: existingCount + index,
          source: file.name,
        })),
      })
    }
  }

  // Mettre à jour le statut du dossier si en brouillon
  if (dossier.status === "BROUILLON") {
    await prisma.dossier.update({
      where: { id: params.id },
      data: { status: "EN_ANALYSE" },
    })
  }

  await logAuditEvent({
    action: "CREATE",
    entityType: "DCE",
    entityId: dce.id,
    description: `Upload du DCE ${file.name} dans le dossier ${dossier.reference}`,
    userId: session.user.id,
    workspaceId,
  })

  return apiSuccess(dce, 201)
}, ["ADMIN", "EDITOR"])
