import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { z } from "zod"

const linkPreuveSchema = z.object({
  preuveId: z.string().min(1, "ID preuve requis"),
})

export const GET = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const links = await prisma.dossierPreuve.findMany({
    where: { dossierId: params.id },
    include: { preuve: true },
  })

  return apiSuccess(links.map((l) => l.preuve))
})

export const POST = withAuth(async (req, { workspaceId, params }) => {
  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  const body = await req.json()
  const validation = linkPreuveSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  // Vérifier que la preuve existe et appartient au workspace
  const preuve = await prisma.preuve.findFirst({
    where: {
      id: validation.data.preuveId,
      workspaceId,
    },
  })

  if (!preuve) {
    return apiError("Preuve non trouvée", 404)
  }

  // Vérifier si le lien existe déjà
  const existing = await prisma.dossierPreuve.findUnique({
    where: {
      dossierId_preuveId: {
        dossierId: params.id,
        preuveId: validation.data.preuveId,
      },
    },
  })

  if (existing) {
    return apiError("Cette preuve est déjà liée au dossier")
  }

  await prisma.dossierPreuve.create({
    data: {
      dossierId: params.id,
      preuveId: validation.data.preuveId,
    },
  })

  return apiSuccess({ success: true }, 201)
}, ["ADMIN", "EDITOR"])

export const DELETE = withAuth(async (req, { workspaceId, params }) => {
  const url = new URL(req.url)
  const preuveId = url.searchParams.get("preuveId")

  if (!preuveId) {
    return apiError("ID preuve requis")
  }

  const dossier = await prisma.dossier.findFirst({
    where: { id: params.id, workspaceId },
  })

  if (!dossier) {
    return apiError("Dossier non trouvé", 404)
  }

  await prisma.dossierPreuve.delete({
    where: {
      dossierId_preuveId: {
        dossierId: params.id,
        preuveId,
      },
    },
  })

  return apiSuccess({ success: true })
}, ["ADMIN", "EDITOR"])
