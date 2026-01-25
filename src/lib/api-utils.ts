import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { prisma } from "./prisma"

// Role type (SQLite uses strings instead of enums)
type Role = "ADMIN" | "EDITOR" | "VIEWER"

// Session type with user
interface AppSession {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    workspaces: {
      id: string
      name: string
      slug: string
      role: Role
    }[]
  }
}

export type ApiHandler = (
  req: NextRequest,
  context: {
    params: Record<string, string>
    session: AppSession
    workspaceId: string
    userRole: Role
  }
) => Promise<NextResponse>

export function withAuth(handler: ApiHandler, requiredRoles?: Role[]) {
  return async (req: NextRequest, context: { params: Record<string, string> }) => {
    try {
      const session = await getServerSession(authOptions)

      if (!session?.user) {
        return NextResponse.json(
          { error: "Non authentifié" },
          { status: 401 }
        )
      }

      // Récupérer le workspace depuis l'URL ou le premier workspace de l'utilisateur
      const url = new URL(req.url)
      let workspaceId = url.searchParams.get("workspaceId")

      if (!workspaceId && session.user.workspaces?.length > 0) {
        workspaceId = session.user.workspaces[0].id
      }

      if (!workspaceId) {
        return NextResponse.json(
          { error: "Aucun espace de travail" },
          { status: 400 }
        )
      }

      // Vérifier l'appartenance au workspace
      const membership = await prisma.workspaceMember.findUnique({
        where: {
          userId_workspaceId: {
            userId: session.user.id,
            workspaceId,
          },
        },
      })

      if (!membership) {
        return NextResponse.json(
          { error: "Accès refusé à cet espace de travail" },
          { status: 403 }
        )
      }

      // Vérifier le rôle si requis
      const userRole = membership.role as Role
      if (requiredRoles && !requiredRoles.includes(userRole)) {
        return NextResponse.json(
          { error: "Permissions insuffisantes" },
          { status: 403 }
        )
      }

      return handler(req, {
        params: context.params,
        session: session as AppSession,
        workspaceId,
        userRole,
      })
    } catch (error) {
      console.error("API Error:", error)
      return NextResponse.json(
        { error: "Erreur serveur" },
        { status: 500 }
      )
    }
  }
}

export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status })
}
