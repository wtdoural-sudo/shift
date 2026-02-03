"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Search, FileCheck, Trash2, Edit, FileText } from "lucide-react"
import { formatDate } from "@/lib/utils"

const typeLabels: Record<string, string> = {
  REFERENCE: "Référence",
  CV: "CV",
  CERTIFICATION: "Certification",
  DOCUMENT: "Document",
  AUTRE: "Autre",
}

const typeColors: Record<string, string> = {
  REFERENCE: "bg-blue-100 text-blue-700",
  CV: "bg-green-100 text-green-700",
  CERTIFICATION: "bg-yellow-100 text-yellow-700",
  DOCUMENT: "bg-gray-100 text-gray-700",
  AUTRE: "bg-purple-100 text-purple-700",
}

interface Preuve {
  id: string
  titre: string
  description?: string
  type: string
  tags?: string
  filename?: string
  createdAt: string
  _count?: {
    dossierPreuves: number
  }
}

export default function PreuvesPage() {
  const [preuves, setPreuves] = useState<Preuve[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showAdd, setShowAdd] = useState(false)
  const [editingPreuve, setEditingPreuve] = useState<Preuve | null>(null)

  const fetchPreuves = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (typeFilter && typeFilter !== "all") params.set("type", typeFilter)

      const response = await fetch(`/api/preuves?${params}`)
      if (!response.ok) throw new Error("Erreur de chargement")
      const data = await response.json()
      setPreuves(Array.isArray(data) ? data : [])
    } catch (err) {
      setError("Erreur lors du chargement des preuves")
      setPreuves([])
    } finally {
      setLoading(false)
    }
  }, [search, typeFilter])

  useEffect(() => {
    fetchPreuves()
  }, [fetchPreuves])

  const handleDeletePreuve = async (id: string) => {
    if (!confirm("Supprimer cette preuve ?")) return
    try {
      await fetch(`/api/preuves/${id}`, { method: "DELETE" })
      fetchPreuves()
    } catch {
      alert("Erreur lors de la suppression")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bibliothèque de preuves</h1>
          <p className="text-gray-500">
            Centralisez vos références, CV et documents réutilisables
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une preuve
        </Button>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {Object.entries(typeLabels).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Liste */}
      {loading ? (
        <p className="text-center text-gray-500 py-12">Chargement...</p>
      ) : preuves.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileCheck className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune preuve
            </h3>
            <p className="text-gray-500 mb-4">
              {search || typeFilter !== "all"
                ? "Aucun résultat pour cette recherche"
                : "Commencez par ajouter vos premières preuves"}
            </p>
            {!search && typeFilter === "all" && (
              <Button onClick={() => setShowAdd(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une preuve
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {preuves.map((preuve) => (
            <Card key={preuve.id} className="hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${typeColors[preuve.type] || typeColors.AUTRE}`}>
                    {typeLabels[preuve.type] || preuve.type}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setEditingPreuve(preuve)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600"
                      onClick={() => handleDeletePreuve(preuve.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="font-semibold mb-1">{preuve.titre}</h3>
                {preuve.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                    {preuve.description}
                  </p>
                )}

                {preuve.tags && preuve.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {String(preuve.tags).split(",").filter(Boolean).map((tag: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{formatDate(preuve.createdAt)}</span>
                  {preuve.filename && (
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Fichier joint
                    </span>
                  )}
                </div>

                {preuve._count && preuve._count.dossierPreuves > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Utilisée dans {preuve._count.dossierPreuves} dossier(s)
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog Ajout */}
      <PreuveDialog
        open={showAdd}
        onOpenChange={setShowAdd}
        onSuccess={() => {
          setShowAdd(false)
          fetchPreuves()
        }}
      />

      {/* Dialog Edition */}
      {editingPreuve && (
        <PreuveEditDialog
          open={!!editingPreuve}
          onOpenChange={(v) => !v && setEditingPreuve(null)}
          preuve={editingPreuve}
          onSuccess={() => {
            setEditingPreuve(null)
            fetchPreuves()
          }}
        />
      )}
    </div>
  )
}

function PreuveDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/api/preuves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre: formData.get("titre"),
          type: formData.get("type"),
          description: formData.get("description"),
          contenu: formData.get("contenu"),
          tags: formData.get("tags"),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur")
      }

      form.reset()
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajouter une preuve</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>
          )}

          <div className="space-y-2">
            <Label>Titre *</Label>
            <Input name="titre" required />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select name="type" defaultValue="DOCUMENT">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(typeLabels).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea name="description" rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Contenu texte</Label>
            <Textarea
              name="contenu"
              rows={4}
              placeholder="Texte de la preuve"
            />
          </div>

          <div className="space-y-2">
            <Label>Tags (séparés par des virgules)</Label>
            <Input name="tags" placeholder="qualité, iso9001, référence" />
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

function PreuveEditDialog({
  open,
  onOpenChange,
  preuve,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  preuve: Preuve
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    titre: preuve.titre,
    type: preuve.type,
    description: preuve.description || "",
    contenu: "",
    tags: preuve.tags || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/preuves/${preuve.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Erreur")
      onSuccess()
    } catch {
      setError("Erreur lors de la mise à jour")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier la preuve</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>
          )}

          <div className="space-y-2">
            <Label>Titre *</Label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData((p) => ({ ...p, titre: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={formData.type}
              onValueChange={(v) => setFormData((p) => ({ ...p, type: v }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(typeLabels).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags (séparés par des virgules)</Label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
            />
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
