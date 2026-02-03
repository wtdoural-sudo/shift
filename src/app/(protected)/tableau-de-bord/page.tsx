import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Plus, Calendar, Building2 } from "lucide-react"

async function getDossiers(workspaceId: string) {
  try {
    const dossiers = await prisma.dossier.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            exigences: true,
            checklistItems: true,
          },
        },
        exigences: {
          select: { status: true },
        },
        checklistItems: {
          select: { status: true },
        },
      },
    })
    return { dossiers, error: null }
  } catch (error) {
    console.error("Dashboard error:", error)
    return { dossiers: [], error: String(error) }
  }
}

function getStatusBadge(status: string) {
  const config: Record<string, { label: string; className: string }> = {
    BROUILLON: { label: "Brouillon", className: "bg-gray-100 text-gray-700" },
    EN_ANALYSE: { label: "En analyse", className: "bg-blue-100 text-blue-700" },
    GO: { label: "Go", className: "bg-green-100 text-green-700" },
    NO_GO: { label: "No-Go", className: "bg-red-100 text-red-700" },
    EN_PRODUCTION: { label: "En cours", className: "bg-orange-100 text-orange-700" },
    DEPOSE: { label: "Déposé", className: "bg-purple-100 text-purple-700" },
    ARCHIVE: { label: "Archivé", className: "bg-gray-100 text-gray-500" },
  }
  return config[status] || { label: status, className: "bg-gray-100 text-gray-700" }
}

function calculateProgress(items: { status: string }[], doneStatuses: string[]) {
  if (items.length === 0) return 0
  const done = items.filter((i) => doneStatuses.includes(i.status)).length
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

  const { dossiers, error } = await getDossiers(workspaceId)

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mes Dossiers</h1>
          <Link href="/dossiers/nouveau">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau dossier
            </Button>
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mes Dossiers</h1>
        <Link href="/dossiers/nouveau">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau dossier
          </Button>
        </Link>
      </div>

      {/* Liste des dossiers */}
      {dossiers.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <div className="max-w-sm mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun dossier
            </h3>
            <p className="text-gray-500 mb-6">
              Créez votre premier dossier pour commencer à gérer vos appels d'offres.
            </p>
            <Link href="/dossiers/nouveau">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Créer un dossier
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {dossiers.map((dossier) => {
            const statusBadge = getStatusBadge(dossier.status)
            const conformiteProgress = calculateProgress(
              dossier.checklistItems,
              ["CONFORME"]
            )
            const exigencesProgress = calculateProgress(
              dossier.exigences,
              ["TRAITE"]
            )

            return (
              <Link
                key={dossier.id}
                href={`/dossiers/${dossier.id}`}
                className="block bg-white rounded-lg border hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-medium text-blue-600">
                          {dossier.reference}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge.className}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {dossier.titre}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {dossier.client}
                        </span>
                        {dossier.dateLimite && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(dossier.dateLimite)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Conformité</span>
                        <span className="font-medium">{conformiteProgress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{ width: `${conformiteProgress}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Exigences</span>
                        <span className="font-medium">{exigencesProgress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${exigencesProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
