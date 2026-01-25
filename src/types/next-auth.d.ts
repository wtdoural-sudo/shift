import "next-auth"

// Role type (SQLite uses strings instead of enums)
type Role = "ADMIN" | "EDITOR" | "VIEWER"

declare module "next-auth" {
  interface User {
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

  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
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
