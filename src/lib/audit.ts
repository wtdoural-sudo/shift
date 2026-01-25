import { prisma } from "./prisma"
import { AuditAction } from "@prisma/client"

interface AuditLogParams {
  action: AuditAction
  entityType: string
  entityId?: string
  description: string
  userId?: string
  workspaceId: string
  metadata?: Record<string, unknown>
}

export async function logAuditEvent({
  action,
  entityType,
  entityId,
  description,
  userId,
  workspaceId,
  metadata,
}: AuditLogParams) {
  try {
    await prisma.auditEvent.create({
      data: {
        action,
        entityType,
        entityId,
        description,
        userId,
        workspaceId,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
      },
    })
  } catch (error) {
    // On ne fait pas échouer l'opération principale si l'audit échoue
    console.error("Erreur lors de la création de l'événement d'audit:", error)
  }
}
