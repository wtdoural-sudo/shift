import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Plus, FolderOpen } from "lucide-react"

async function getDossiers(workspaceId: string) {
  return prisma.dossier.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          exigences: true,
          taches: true,
          dces: true,
        },
      },
    },
  })
}

function getStatusColor(status: string) {
  const colors: Record<string, "default" | "secondary" | "success" | "warning" | "destructive" | "info"> = {
    BROUILLON: "secondary",
    EN_ANALYSE: "info",
    GO: "success",
    NO_GO: "destructive",
    EN_PRODUCTION: "warning",
    DEPOSE: "success",
    ARCHIVE: "secondary",
  }
  return colors[status] || "default"
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    BROUILLON: "Brouillon",
    EN_ANALYSE: "En analyse",
    GO: "Go",
    NO_GO: "No-Go",
    EN_PRODUCTION: "En production",
    DEPOSE: "Déposé",
    ARCHIVE: "Archivé",
  }
  return labels[status] || status
}

export default async function DossiersPage() {
  const session = await getSession()
  const workspaceId = session?.user?.workspaces?.[0]?.id

  if (!workspaceId) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun espace de travail configuré.</p>
      </div>
    )
  }

  const dossiers = await getDossiers(workspaceId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dossiers</h1>
          <p className="text-gray-500">Gérez vos appels d'offres</p>
        </div>
        <Link href="/dossiers/nouveau">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau dossier
          </Button>
        </Link>
      </div>

      {dossiers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun dossier
            </h3>
            <p className="text-gray-500 mb-4">
              Commencez par créer votre premier dossier d'appel d'offres.
            </p>
            <Link href="/dossiers/nouveau">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Créer un dossier
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {dossiers.map((dossier) => (
            <Link key={dossier.id} href={`/dossiers/${dossier.id}`}>
              <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {dossier.reference}
                        </span>
                        <Badge variant={getStatusColor(dossier.status)}>
                          {getStatusLabel(dossier.status)}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold">{dossier.titre}</h3>
                      <p className="text-gray-600">{dossier.client}</p>
                    </div>
                    <div className="text-right text-sm">
                      {dossier.dateLimite && (
                        <div>
                          <span className="text-gray-500">Date limite</span>
                          <div className="font-medium">
                            {formatDate(dossier.dateLimite)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-6 mt-4 text-sm text-gray-500">
                    <span>{dossier._count.dces} DCE</span>
                    <span>{dossier._count.exigences} exigences</span>
                    <span>{dossier._count.taches} tâches</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
