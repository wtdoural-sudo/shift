"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/utils"
import {
  ArrowLeft,
  MoreVertical,
  Trash2,
  Calendar,
  Euro,
  Clock,
  FileText,
  ListChecks,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

interface DossierHeaderProps {
  dossier: {
    id: string
    reference: string
    titre: string
    client: string
    status: string
    dateLimite: Date | null
    montantEstime: number | null
    exigences?: { status: string }[]
    checklistItems?: { status: string }[]
    taches?: { status: string }[]
  }
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  BROUILLON: { label: "Brouillon", color: "text-gray-600", bg: "bg-gray-100" },
  EN_ANALYSE: { label: "En analyse", color: "text-blue-600", bg: "bg-blue-100" },
  GO: { label: "Go", color: "text-green-600", bg: "bg-green-100" },
  NO_GO: { label: "No-Go", color: "text-red-600", bg: "bg-red-100" },
  EN_PRODUCTION: { label: "En production", color: "text-orange-600", bg: "bg-orange-100" },
  DEPOSE: { label: "Depose", color: "text-emerald-600", bg: "bg-emerald-100" },
  ARCHIVE: { label: "Archive", color: "text-gray-500", bg: "bg-gray-100" },
}

export function DossierHeader({ dossier }: DossierHeaderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const status = statusConfig[dossier.status] || statusConfig.BROUILLON

  // Calcul des statistiques
  const exigencesTotal = dossier.exigences?.length || 0
  const exigencesTraites = dossier.exigences?.filter(e => e.status === "TRAITE").length || 0
  const exigencesProgress = exigencesTotal > 0 ? Math.round((exigencesTraites / exigencesTotal) * 100) : 0

  const checklistTotal = dossier.checklistItems?.length || 0
  const checklistConformes = dossier.checklistItems?.filter(
    c => c.status === "CONFORME" || c.status === "NON_APPLICABLE"
  ).length || 0
  const checklistProgress = checklistTotal > 0 ? Math.round((checklistConformes / checklistTotal) * 100) : 0

  const tachesTotal = dossier.taches?.length || 0
  const tachesTerminees = dossier.taches?.filter(t => t.status === "TERMINE").length || 0
  const tachesProgress = tachesTotal > 0 ? Math.round((tachesTerminees / tachesTotal) * 100) : 0

  // Jours restants
  const joursRestants = dossier.dateLimite
    ? Math.ceil((new Date(dossier.dateLimite).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const response = await fetch(`/api/dossiers/${dossier.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression")
      }

      toast({
        title: "Dossier supprime",
        description: "Le dossier a ete supprime avec succes.",
      })

      router.push("/tableau-de-bord")
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le dossier",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      {/* Header principal */}
      <div className="bg-white border-b -mx-6 -mt-6 px-6 py-4 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Link href="/tableau-de-bord">
              <Button variant="ghost" size="icon" className="mt-1">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {dossier.reference}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}>
                  {status.label}
                </span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">{dossier.titre}</h1>
              <p className="text-gray-500">{dossier.client}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Infos rapides */}
            {dossier.dateLimite && (
              <div className="text-right mr-2">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Limite: {formatDate(dossier.dateLimite)}</span>
                </div>
                {joursRestants !== null && (
                  <span className={`text-xs font-medium ${
                    joursRestants < 0 ? "text-red-600" :
                    joursRestants <= 7 ? "text-orange-600" :
                    "text-green-600"
                  }`}>
                    {joursRestants < 0
                      ? `${Math.abs(joursRestants)}j de retard`
                      : joursRestants === 0
                      ? "Aujourd'hui!"
                      : `${joursRestants}j restants`}
                  </span>
                )}
              </div>
            )}

            {dossier.montantEstime && (
              <div className="flex items-center gap-1 text-sm bg-gray-50 px-3 py-1.5 rounded-lg">
                <Euro className="h-4 w-4 text-gray-400" />
                <span className="font-medium">
                  {new Intl.NumberFormat("fr-FR").format(dossier.montantEstime)}
                </span>
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push(`/dossiers/${dossier.id}/modifier`)}
                >
                  Modifier les informations
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer le dossier
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Exigences</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{exigencesTraites}/{exigencesTotal}</span>
                <Progress value={exigencesProgress} className="flex-1 h-2" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ListChecks className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Conformite</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{checklistConformes}/{checklistTotal}</span>
                <Progress value={checklistProgress} className="flex-1 h-2" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Taches</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{tachesTerminees}/{tachesTotal}</span>
                <Progress value={tachesProgress} className="flex-1 h-2" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le dossier ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irreversible. Toutes les donnees associees a ce
              dossier seront definitivement supprimees.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleting}
            >
              {deleting ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
