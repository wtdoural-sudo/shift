"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Plus, FileText, Trash2, Edit } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface TabDceExigencesProps {
  dossier: any
  members: { id: string; firstName: string; lastName: string }[]
}

const priorityLabels = {
  HAUTE: "Haute",
  MOYENNE: "Moyenne",
  BASSE: "Basse",
}

const statusLabels = {
  A_TRAITER: "À traiter",
  EN_COURS: "En cours",
  TRAITE: "Traité",
  NON_APPLICABLE: "N/A",
}

const priorityColors = {
  HAUTE: "destructive",
  MOYENNE: "warning",
  BASSE: "secondary",
} as const

const statusColors = {
  A_TRAITER: "secondary",
  EN_COURS: "info",
  TRAITE: "success",
  NON_APPLICABLE: "outline",
} as const

export function TabDceExigences({ dossier, members }: TabDceExigencesProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [autoExtract, setAutoExtract] = useState(true)
  const [showAddExigence, setShowAddExigence] = useState(false)
  const [editingExigence, setEditingExigence] = useState<any>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("autoExtract", autoExtract.toString())

    try {
      const response = await fetch(`/api/dossiers/${dossier.id}/dce`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur lors de l'upload")
      }

      toast({
        title: "DCE uploadé",
        description: autoExtract
          ? "Le document a été analysé et des exigences ont été extraites."
          : "Le document a été ajouté au dossier.",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  const handleAddExigence = async (data: any) => {
    try {
      const response = await fetch(`/api/dossiers/${dossier.id}/exigences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || "Erreur")
      }

      toast({ title: "Exigence ajoutée" })
      setShowAddExigence(false)
      router.refresh()
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
    }
  }

  const handleUpdateExigence = async (id: string, data: any) => {
    try {
      const response = await fetch(
        `/api/dossiers/${dossier.id}/exigences?exigenceId=${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || "Erreur")
      }

      toast({ title: "Exigence mise à jour" })
      setEditingExigence(null)
      router.refresh()
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
    }
  }

  const handleDeleteExigence = async (id: string) => {
    try {
      await fetch(`/api/dossiers/${dossier.id}/exigences?exigenceId=${id}`, {
        method: "DELETE",
      })
      toast({ title: "Exigence supprimée" })
      router.refresh()
    } catch {
      toast({ title: "Erreur", variant: "destructive" })
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* DCE */}
      <Card>
        <CardHeader>
          <CardTitle>Documents de consultation (DCE)</CardTitle>
          <CardDescription>
            Uploadez les documents du dossier de consultation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="autoExtract"
              checked={autoExtract}
              onCheckedChange={(v) => setAutoExtract(v as boolean)}
            />
            <Label htmlFor="autoExtract" className="text-sm text-gray-600">
              Extraire automatiquement les exigences
            </Label>
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">
              Glissez un fichier PDF ou cliquez pour sélectionner
            </p>
            <Input
              type="file"
              accept=".pdf"
              className="hidden"
              id="dce-upload"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <Label htmlFor="dce-upload" asChild>
              <Button variant="outline" disabled={uploading}>
                {uploading ? "Upload en cours..." : "Sélectionner un fichier"}
              </Button>
            </Label>
          </div>

          {dossier.dces.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Documents uploadés</h4>
              {dossier.dces.map((dce: any) => (
                <div
                  key={dce.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{dce.originalName}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(dce.createdAt)} •{" "}
                        {(dce.size / 1024).toFixed(0)} Ko
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exigences */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Exigences</CardTitle>
            <CardDescription>
              Liste des exigences identifiées ({dossier.exigences.length})
            </CardDescription>
          </div>
          <Button size="sm" onClick={() => setShowAddExigence(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </CardHeader>
        <CardContent>
          {dossier.exigences.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucune exigence. Uploadez un DCE pour en extraire automatiquement.
            </p>
          ) : (
            <div className="space-y-3">
              {dossier.exigences.map((exigence: any) => (
                <div
                  key={exigence.id}
                  className="p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={priorityColors[exigence.priority as keyof typeof priorityColors]}>
                          {priorityLabels[exigence.priority as keyof typeof priorityLabels]}
                        </Badge>
                        <Badge variant={statusColors[exigence.status as keyof typeof statusColors]}>
                          {statusLabels[exigence.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>
                      <p className="font-medium text-sm">{exigence.titre}</p>
                      {exigence.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {exigence.description}
                        </p>
                      )}
                      {exigence.owner && (
                        <p className="text-xs text-gray-400 mt-1">
                          Responsable : {exigence.owner.firstName}{" "}
                          {exigence.owner.lastName}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingExigence(exigence)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDeleteExigence(exigence.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog Ajout */}
      <ExigenceDialog
        open={showAddExigence}
        onOpenChange={setShowAddExigence}
        members={members}
        onSubmit={handleAddExigence}
      />

      {/* Dialog Edition */}
      <ExigenceDialog
        open={!!editingExigence}
        onOpenChange={(v) => !v && setEditingExigence(null)}
        members={members}
        exigence={editingExigence}
        onSubmit={(data) => handleUpdateExigence(editingExigence.id, data)}
      />
    </div>
  )
}

function ExigenceDialog({
  open,
  onOpenChange,
  members,
  exigence,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  members: { id: string; firstName: string; lastName: string }[]
  exigence?: any
  onSubmit: (data: any) => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titre: exigence?.titre || "",
    description: exigence?.description || "",
    priority: exigence?.priority || "MOYENNE",
    status: exigence?.status || "A_TRAITER",
    ownerId: exigence?.ownerId || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(formData)
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {exigence ? "Modifier l'exigence" : "Ajouter une exigence"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Titre *</Label>
            <Input
              value={formData.titre}
              onChange={(e) =>
                setFormData((p) => ({ ...p, titre: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priorité</Label>
              <Select
                value={formData.priority}
                onValueChange={(v) =>
                  setFormData((p) => ({ ...p, priority: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HAUTE">Haute</SelectItem>
                  <SelectItem value="MOYENNE">Moyenne</SelectItem>
                  <SelectItem value="BASSE">Basse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {exigence && (
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, status: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A_TRAITER">À traiter</SelectItem>
                    <SelectItem value="EN_COURS">En cours</SelectItem>
                    <SelectItem value="TRAITE">Traité</SelectItem>
                    <SelectItem value="NON_APPLICABLE">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Responsable</Label>
            <Select
              value={formData.ownerId}
              onValueChange={(v) =>
                setFormData((p) => ({ ...p, ownerId: v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                {members.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.firstName} {m.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
