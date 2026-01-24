"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Plus, CheckCircle, XCircle, AlertCircle, Minus, Trash2, Edit } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface TabConformiteProps {
  dossier: any
  members: { id: string; firstName: string; lastName: string }[]
}

const checklistStatusLabels = {
  A_VERIFIER: "À vérifier",
  CONFORME: "Conforme",
  NON_CONFORME: "Non conforme",
  NON_APPLICABLE: "N/A",
}

const checklistStatusIcons = {
  A_VERIFIER: AlertCircle,
  CONFORME: CheckCircle,
  NON_CONFORME: XCircle,
  NON_APPLICABLE: Minus,
}

const checklistStatusColors = {
  A_VERIFIER: "text-orange-500",
  CONFORME: "text-green-500",
  NON_CONFORME: "text-red-500",
  NON_APPLICABLE: "text-gray-400",
}

const tacheStatusLabels = {
  A_FAIRE: "À faire",
  EN_COURS: "En cours",
  TERMINE: "Terminé",
  BLOQUE: "Bloqué",
}

const tacheStatusColors = {
  A_FAIRE: "secondary",
  EN_COURS: "info",
  TERMINE: "success",
  BLOQUE: "destructive",
} as const

const tachePriorityLabels = {
  HAUTE: "Haute",
  MOYENNE: "Moyenne",
  BASSE: "Basse",
}

export function TabConformite({ dossier, members }: TabConformiteProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [showAddChecklist, setShowAddChecklist] = useState(false)
  const [showAddTache, setShowAddTache] = useState(false)
  const [editingTache, setEditingTache] = useState<any>(null)

  // Calculs de progression
  const totalChecklist = dossier.checklistItems.length
  const conformeChecklist = dossier.checklistItems.filter(
    (i: any) => i.status === "CONFORME" || i.status === "NON_APPLICABLE"
  ).length
  const checklistProgress = totalChecklist > 0 ? (conformeChecklist / totalChecklist) * 100 : 0

  const totalTaches = dossier.taches.length
  const tachesTerminees = dossier.taches.filter((t: any) => t.status === "TERMINE").length
  const tachesProgress = totalTaches > 0 ? (tachesTerminees / totalTaches) * 100 : 0

  // Items bloquants
  const nonConformes = dossier.checklistItems.filter((i: any) => i.status === "NON_CONFORME")
  const tachesBloquees = dossier.taches.filter((t: any) => t.status === "BLOQUE")

  const handleUpdateChecklistStatus = async (itemId: string, status: string) => {
    try {
      await fetch(`/api/dossiers/${dossier.id}/checklist?itemId=${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      router.refresh()
    } catch {
      toast({ title: "Erreur", variant: "destructive" })
    }
  }

  const handleAddChecklistItem = async (data: any) => {
    try {
      const response = await fetch(`/api/dossiers/${dossier.id}/checklist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error()

      toast({ title: "Item ajouté" })
      setShowAddChecklist(false)
      router.refresh()
    } catch {
      toast({ title: "Erreur", variant: "destructive" })
    }
  }

  const handleDeleteChecklistItem = async (itemId: string) => {
    try {
      await fetch(`/api/dossiers/${dossier.id}/checklist?itemId=${itemId}`, {
        method: "DELETE",
      })
      router.refresh()
    } catch {
      toast({ title: "Erreur", variant: "destructive" })
    }
  }

  const handleAddTache = async (data: any) => {
    try {
      const response = await fetch(`/api/dossiers/${dossier.id}/taches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error()

      toast({ title: "Tâche ajoutée" })
      setShowAddTache(false)
      router.refresh()
    } catch {
      toast({ title: "Erreur", variant: "destructive" })
    }
  }

  const handleUpdateTache = async (tacheId: string, data: any) => {
    try {
      await fetch(`/api/dossiers/${dossier.id}/taches?tacheId=${tacheId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setEditingTache(null)
      router.refresh()
    } catch {
      toast({ title: "Erreur", variant: "destructive" })
    }
  }

  const handleDeleteTache = async (tacheId: string) => {
    try {
      await fetch(`/api/dossiers/${dossier.id}/taches?tacheId=${tacheId}`, {
        method: "DELETE",
      })
      router.refresh()
    } catch {
      toast({ title: "Erreur", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      {/* Alertes pré-dépôt */}
      {(nonConformes.length > 0 || tachesBloquees.length > 0) && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Points bloquants avant dépôt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-red-700">
              {nonConformes.map((item: any) => (
                <li key={item.id}>• Checklist : {item.label}</li>
              ))}
              {tachesBloquees.map((tache: any) => (
                <li key={tache.id}>• Tâche bloquée : {tache.titre}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Checklist conformité */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Checklist de conformité</CardTitle>
              <CardDescription>
                {conformeChecklist}/{totalChecklist} éléments validés
              </CardDescription>
            </div>
            <Button size="sm" onClick={() => setShowAddChecklist(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </CardHeader>
          <CardContent>
            <Progress value={checklistProgress} className="mb-4" />

            <div className="space-y-2">
              {dossier.checklistItems.map((item: any) => {
                const Icon = checklistStatusIcons[item.status as keyof typeof checklistStatusIcons]
                const colorClass = checklistStatusColors[item.status as keyof typeof checklistStatusColors]

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${colorClass}`} />
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        {item.owner && (
                          <p className="text-xs text-gray-500">
                            {item.owner.firstName} {item.owner.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={item.status}
                        onValueChange={(v) => handleUpdateChecklistStatus(item.id, v)}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(checklistStatusLabels).map(([k, v]) => (
                            <SelectItem key={k} value={k}>
                              {v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDeleteChecklistItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tâches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Tâches</CardTitle>
              <CardDescription>
                {tachesTerminees}/{totalTaches} tâches terminées
              </CardDescription>
            </div>
            <Button size="sm" onClick={() => setShowAddTache(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </CardHeader>
          <CardContent>
            <Progress value={tachesProgress} className="mb-4" />

            {dossier.taches.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Aucune tâche</p>
            ) : (
              <div className="space-y-2">
                {dossier.taches.map((tache: any) => (
                  <div
                    key={tache.id}
                    className="p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={tacheStatusColors[tache.status as keyof typeof tacheStatusColors]}>
                            {tacheStatusLabels[tache.status as keyof typeof tacheStatusLabels]}
                          </Badge>
                          <Badge variant="outline">
                            {tachePriorityLabels[tache.priority as keyof typeof tachePriorityLabels]}
                          </Badge>
                        </div>
                        <p className="font-medium text-sm">{tache.titre}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          {tache.assignee && (
                            <span>
                              {tache.assignee.firstName} {tache.assignee.lastName}
                            </span>
                          )}
                          {tache.echeance && (
                            <span>Échéance : {formatDate(tache.echeance)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingTache(tache)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleDeleteTache(tache.id)}
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
      </div>

      {/* Dialog ajout checklist */}
      <ChecklistDialog
        open={showAddChecklist}
        onOpenChange={setShowAddChecklist}
        members={members}
        onSubmit={handleAddChecklistItem}
      />

      {/* Dialog ajout tâche */}
      <TacheDialog
        open={showAddTache}
        onOpenChange={setShowAddTache}
        members={members}
        onSubmit={handleAddTache}
      />

      {/* Dialog édition tâche */}
      <TacheDialog
        open={!!editingTache}
        onOpenChange={(v) => !v && setEditingTache(null)}
        members={members}
        tache={editingTache}
        onSubmit={(data) => handleUpdateTache(editingTache.id, data)}
      />
    </div>
  )
}

function ChecklistDialog({
  open,
  onOpenChange,
  members,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  members: { id: string; firstName: string; lastName: string }[]
  onSubmit: (data: any) => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    ownerId: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(formData)
    setFormData({ label: "", description: "", ownerId: "" })
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un élément de checklist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Libellé *</Label>
            <Input
              value={formData.label}
              onChange={(e) => setFormData((p) => ({ ...p, label: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Responsable</Label>
            <Select
              value={formData.ownerId}
              onValueChange={(v) => setFormData((p) => ({ ...p, ownerId: v }))}
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
              {loading ? "Ajout..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function TacheDialog({
  open,
  onOpenChange,
  members,
  tache,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  members: { id: string; firstName: string; lastName: string }[]
  tache?: any
  onSubmit: (data: any) => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titre: tache?.titre || "",
    description: tache?.description || "",
    priority: tache?.priority || "MOYENNE",
    status: tache?.status || "A_FAIRE",
    echeance: tache?.echeance ? new Date(tache.echeance).toISOString().split("T")[0] : "",
    assigneeId: tache?.assigneeId || "",
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
          <DialogTitle>{tache ? "Modifier la tâche" : "Ajouter une tâche"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Titre *</Label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData((p) => ({ ...p, titre: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priorité</Label>
              <Select
                value={formData.priority}
                onValueChange={(v) => setFormData((p) => ({ ...p, priority: v }))}
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
            {tache && (
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData((p) => ({ ...p, status: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A_FAIRE">À faire</SelectItem>
                    <SelectItem value="EN_COURS">En cours</SelectItem>
                    <SelectItem value="TERMINE">Terminé</SelectItem>
                    <SelectItem value="BLOQUE">Bloqué</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Échéance</Label>
              <Input
                type="date"
                value={formData.echeance}
                onChange={(e) => setFormData((p) => ({ ...p, echeance: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Assigné à</Label>
              <Select
                value={formData.assigneeId}
                onValueChange={(v) => setFormData((p) => ({ ...p, assigneeId: v }))}
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
