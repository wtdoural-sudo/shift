import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { FolderOpen, AlertTriangle, Clock, CheckCircle } from "lucide-react"

async function getDashboardData(workspaceId: string) {
  const [dossiers, stats] = await Promise.all([
    prisma.dossier.findMany({
      where: { workspaceId },
      orderBy: { dateLimite: "asc" },
      take: 10,
      include: {
        _count: {
          select: {
            exigences: true,
            taches: true,
            checklistItems: true,
          },
        },
        exigences: {
          select: { status: true },
        },
        taches: {
          select: { status: true },
        },
        checklistItems: {
          select: { status: true },
        },
      },
    }),
    prisma.dossier.groupBy({
      by: ["status"],
      where: { workspaceId },
      _count: true,
    }),
  ])

  return { dossiers, stats }
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

function calculateProgress(items: { status: string }[], doneStatus: string) {
  if (items.length === 0) return 0
  const done = items.filter((i) => i.status === doneStatus).length
  return Math.round((done / items.length) * 100)
}

export default async function TableauDeBordPage() {
  const session = await getSession()
  const workspaceId = session?.user?.workspaces?.[0]?.id

  if (!workspaceId) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun espace de travail configuré.</p>
      </div>
    )
  }

  const { dossiers, stats } = await getDashboardData(workspaceId)

  const totalDossiers = stats.reduce((acc, s) => acc + s._count, 0)
  const dossiersActifs = stats
    .filter((s) => ["EN_ANALYSE", "GO", "EN_PRODUCTION"].includes(s.status))
    .reduce((acc, s) => acc + s._count, 0)

  // Dossiers avec deadline proche (7 jours)
  const now = new Date()
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const dossiersUrgents = dossiers.filter(
    (d) => d.dateLimite && new Date(d.dateLimite) <= weekFromNow && new Date(d.dateLimite) >= now
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-gray-500">Vue d'ensemble de vos dossiers d'appels d'offres</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total dossiers
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDossiers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Dossiers actifs
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dossiersActifs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Deadlines proches
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {dossiersUrgents.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Déposés ce mois
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.find((s) => s.status === "DEPOSE")?._count || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes */}
      {dossiersUrgents.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Dossiers avec deadline imminente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {dossiersUrgents.map((d) => (
                <li key={d.id} className="flex items-center justify-between">
                  <Link
                    href={`/dossiers/${d.id}`}
                    className="text-orange-900 hover:underline font-medium"
                  >
                    {d.reference} - {d.titre}
                  </Link>
                  <span className="text-orange-700 text-sm">
                    {formatDate(d.dateLimite)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Liste des dossiers */}
      <Card>
        <CardHeader>
          <CardTitle>Dossiers récents</CardTitle>
          <CardDescription>
            Vos derniers dossiers d'appels d'offres
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dossiers.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucun dossier pour le moment.{" "}
              <Link href="/dossiers/nouveau" className="text-primary hover:underline">
                Créer un dossier
              </Link>
            </p>
          ) : (
            <div className="space-y-4">
              {dossiers.map((dossier) => {
                const exigenceProgress = calculateProgress(
                  dossier.exigences,
                  "TRAITE"
                )
                const tacheProgress = calculateProgress(
                  dossier.taches,
                  "TERMINE"
                )

                return (
                  <Link
                    key={dossier.id}
                    href={`/dossiers/${dossier.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{dossier.reference}</span>
                          <Badge variant={getStatusColor(dossier.status)}>
                            {getStatusLabel(dossier.status)}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold mt-1">
                          {dossier.titre}
                        </h3>
                        <p className="text-sm text-gray-500">{dossier.client}</p>
                      </div>
                      {dossier.dateLimite && (
                        <div className="text-right text-sm">
                          <span className="text-gray-500">Date limite</span>
                          <div className="font-medium">
                            {formatDate(dossier.dateLimite)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Exigences</span>
                          <span>{exigenceProgress}%</span>
                        </div>
                        <Progress value={exigenceProgress} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Tâches</span>
                          <span>{tacheProgress}%</span>
                        </div>
                        <Progress value={tacheProgress} className="h-2" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
