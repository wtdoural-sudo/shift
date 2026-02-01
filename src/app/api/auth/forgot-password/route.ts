import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = forgotPasswordSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Check if user exists (but don't reveal this information)
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Always return success to prevent email enumeration
    // In production, this would send an email with a reset link
    if (user) {
      // TODO: In production, integrate with email service (SendGrid, Resend, etc.)
      // - Generate a secure reset token
      // - Store token with expiration in database
      // - Send email with reset link containing the token
      console.log(`Password reset requested for: ${email}`)
    }

    // Always return success message regardless of whether user exists
    return NextResponse.json({
      success: true,
      message: "Si un compte existe avec cette adresse email, un email de réinitialisation a été envoyé.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
