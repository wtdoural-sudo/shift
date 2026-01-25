import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { logAuditEvent } from "@/lib/audit"
import { saveFile } from "@/lib/storage"
import { z } from "zod"

const createPreuveSchema = z.object({
  titre: z.string().min(1, "Titre requis"),
  description: z.string().optional(),
  type: z.enum(["REFERENCE", "CV", "CERTIFICATION", "DOCUMENT", "AUTRE"]).default("DOCUMENT"),
  tags: z.array(z.string()).default([]),
  contenu: z.string().optional(),
})

export const GET = withAuth(async (req, { workspaceId }) => {
  const url = new URL(req.url)
  const search = url.searchParams.get("search")
  const type = url.searchParams.get("type")
  const tag = url.searchParams.get("tag")

  const preuves = await prisma.preuve.findMany({
    where: {
      workspaceId,
      ...(type ? { type: type as any } : {}),
      ...(tag ? { tags: { contains: tag } } : {}),
      ...(search
        ? {
            OR: [
              { titre: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { dossierPreuves: true },
      },
    },
  })

  return apiSuccess(preuves)
})

export const POST = withAuth(async (req, { workspaceId, session }) => {
  const formData = await req.formData()

  const titre = formData.get("titre") as string
  const description = formData.get("description") as string | null
  const type = formData.get("type") as string
  const tagsRaw = formData.get("tags") as string | null
  const contenu = formData.get("contenu") as string | null
  const file = formData.get("file") as File | null

  if (!titre) {
    return apiError("Titre requis")
  }

  const tags = tagsRaw ? JSON.parse(tagsRaw).join(",") : ""

  let fileData = {}

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const { filename, storagePath } = await saveFile("preuves", buffer, file.name)
    fileData = {
      filename,
      storagePath,
      mimeType: file.type,
    }
  }

  const preuve = await prisma.preuve.create({
    data: {
      titre,
      description,
      type: type as any || "DOCUMENT",
      tags,
      contenu,
      workspaceId,
      ...fileData,
    },
  })

  await logAuditEvent({
    action: "CREATE",
    entityType: "Preuve",
    entityId: preuve.id,
    description: `Création de la preuve "${titre}"`,
    userId: session.user.id,
    workspaceId,
  })

  return apiSuccess(preuve, 201)
}, ["ADMIN", "EDITOR"])
