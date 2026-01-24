import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { DossierHeader } from "./_components/dossier-header"
import { DossierTabs } from "./_components/dossier-tabs"

async function getDossier(id: string, workspaceId: string) {
  return prisma.dossier.findFirst({
    where: { id, workspaceId },
    include: {
      workspace: { select: { goNoGoThreshold: true } },
      dces: true,
      exigences: {
        orderBy: { ordre: "asc" },
        include: { owner: { select: { id: true, firstName: true, lastName: true } } },
      },
      goNoGoDecisions: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      checklistItems: {
        orderBy: { ordre: "asc" },
        include: { owner: { select: { id: true, firstName: true, lastName: true } } },
      },
      taches: {
        orderBy: [{ priority: "asc" }, { echeance: "asc" }],
        include: { assignee: { select: { id: true, firstName: true, lastName: true } } },
      },
      memoireTechnique: true,
      exports: {
        orderBy: { createdAt: "desc" },
      },
      dossierPreuves: {
        include: { preuve: true },
      },
    },
  })
}

async function getWorkspaceMembers(workspaceId: string) {
  return prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: {
      user: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
  })
}

async function getWorkspacePreuves(workspaceId: string) {
  return prisma.preuve.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
  })
}

export default async function DossierPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  const workspaceId = session?.user?.workspaces?.[0]?.id

  if (!workspaceId) {
    notFound()
  }

  const [dossier, members, preuves] = await Promise.all([
    getDossier(params.id, workspaceId),
    getWorkspaceMembers(workspaceId),
    getWorkspacePreuves(workspaceId),
  ])

  if (!dossier) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <DossierHeader dossier={dossier} />
      <DossierTabs
        dossier={dossier}
        members={members.map((m) => m.user)}
        preuves={preuves}
        threshold={dossier.workspace.goNoGoThreshold}
      />
    </div>
  )
}
