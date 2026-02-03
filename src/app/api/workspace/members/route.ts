import { prisma } from "@/lib/prisma"
import { withAuth, apiSuccess, apiError } from "@/lib/api-utils"
import { hash } from "bcryptjs"
import { z } from "zod"

const inviteMemberSchema = z.object({
  email: z.string().email("Email invalide"),
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).default("VIEWER"),
  password: z.string().min(6, "Mot de passe minimum 6 caractères"),
})

export const GET = withAuth(async (req, { workspaceId }) => {
  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  })

  return apiSuccess(
    members.map((m) => ({
      id: m.id,
      role: m.role,
      user: m.user,
      createdAt: m.createdAt,
    }))
  )
})

export const POST = withAuth(async (req, { workspaceId }) => {
  const body = await req.json()
  const validation = inviteMemberSchema.safeParse(body)

  if (!validation.success) {
    return apiError(validation.error.errors[0].message)
  }

  const { email, firstName, lastName, role, password } = validation.data

  // Vérifier si l'utilisateur existe déjà
  let user = await prisma.user.findUnique({
    where: { email },
  })

  if (user) {
    // Vérifier s'il est déjà membre du workspace
    const existingMember = await prisma.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,
        },
      },
    })

    if (existingMember) {
      return apiError("Cet utilisateur est déjà membre de l'espace de travail")
    }
  } else {
    // Créer le nouvel utilisateur
    const passwordHash = await hash(password, 12)
    user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        passwordHash,
      },
    })
  }

  // Ajouter au workspace
  const member = await prisma.workspaceMember.create({
    data: {
      userId: user.id,
      workspaceId,
      role,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })

  return apiSuccess(
    {
      id: member.id,
      role: member.role,
      user: member.user,
      createdAt: member.createdAt,
    },
    201
  )
}, ["ADMIN"])

export const DELETE = withAuth(async (req, { workspaceId, session }) => {
  const { searchParams } = new URL(req.url)
  const memberId = searchParams.get("memberId")

  if (!memberId) {
    return apiError("ID du membre requis")
  }

  // Récupérer le membre
  const member = await prisma.workspaceMember.findFirst({
    where: {
      id: memberId,
      workspaceId,
    },
  })

  if (!member) {
    return apiError("Membre non trouvé", 404)
  }

  // Empêcher la suppression de soi-même
  if (member.userId === session.user.id) {
    return apiError("Vous ne pouvez pas vous supprimer vous-même")
  }

  // Empêcher de supprimer le dernier admin
  if (member.role === "ADMIN") {
    const adminCount = await prisma.workspaceMember.count({
      where: {
        workspaceId,
        role: "ADMIN",
      },
    })

    if (adminCount <= 1) {
      return apiError("Impossible de supprimer le dernier administrateur")
    }
  }

  await prisma.workspaceMember.delete({
    where: { id: memberId },
  })

  return apiSuccess({ success: true })
}, ["ADMIN"])
