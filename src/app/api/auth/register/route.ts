import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  company: z.string().min(1, "Entreprise requise"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password, firstName, lastName, company } = validation.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Un compte existe déjà avec cette adresse email" },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hash(password, 12)

    // Create slug from company name
    const slug = company
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    // Ensure unique slug
    let uniqueSlug = slug
    let counter = 1
    while (await prisma.workspace.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    // Create user, workspace, and membership in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
        },
      })

      // Create workspace
      const workspace = await tx.workspace.create({
        data: {
          name: company,
          slug: uniqueSlug,
          description: `Espace de travail de ${company}`,
        },
      })

      // Link user to workspace as ADMIN
      await tx.workspaceMember.create({
        data: {
          userId: user.id,
          workspaceId: workspace.id,
          role: "ADMIN",
        },
      })

      // Create audit event
      await tx.auditEvent.create({
        data: {
          action: "CREATE",
          entityType: "User",
          entityId: user.id,
          description: `Inscription de ${firstName} ${lastName} (${email})`,
          userId: user.id,
          workspaceId: workspace.id,
        },
      })

      return { user, workspace }
    })

    return NextResponse.json({
      success: true,
      message: "Compte créé avec succès",
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "Un compte existe déjà avec cette adresse email" },
          { status: 400 }
        )
      }
      if (error.message.includes("connect")) {
        return NextResponse.json(
          { error: "Erreur de connexion à la base de données. Veuillez réessayer." },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer." },
      { status: 500 }
    )
  }
}
