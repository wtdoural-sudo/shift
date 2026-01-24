"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, MoreVertical, Trash2 } from "lucide-react"
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
  }
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

export function DossierHeader({ dossier }: DossierHeaderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
        title: "Dossier supprimé",
        description: "Le dossier a été supprimé avec succès.",
      })

      router.push("/dossiers")
    } catch (error) {
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
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link href="/dossiers">
            <Button variant="ghost" size="icon" className="mt-1">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-500">{dossier.reference}</span>
              <Badge variant={getStatusColor(dossier.status)}>
                {getStatusLabel(dossier.status)}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{dossier.titre}</h1>
            <p className="text-gray-600">{dossier.client}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            {dossier.dateLimite && (
              <div>
                <span className="text-gray-500">Date limite</span>
                <div className="font-medium">{formatDate(dossier.dateLimite)}</div>
              </div>
            )}
            {dossier.montantEstime && (
              <div className="mt-1">
                <span className="text-gray-500">Montant estimé</span>
                <div className="font-medium">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(dossier.montantEstime)}
                </div>
              </div>
            )}
          </div>

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
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le dossier ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les données associées à ce
              dossier seront définitivement supprimées.
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
