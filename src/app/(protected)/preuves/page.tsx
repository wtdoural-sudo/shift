"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import { useToast } from "@/components/ui/use-toast"
import { Plus, Search, FileCheck, Trash2, Edit, Upload, FileText } from "lucide-react"
import { formatDate } from "@/lib/utils"

const typeLabels = {
  REFERENCE: "Référence",
  CV: "CV",
  CERTIFICATION: "Certification",
  DOCUMENT: "Document",
  AUTRE: "Autre",
}

const typeColors = {
  REFERENCE: "info",
  CV: "success",
  CERTIFICATION: "warning",
  DOCUMENT: "secondary",
  AUTRE: "outline",
} as const

export default function PreuvesPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [preuves, setPreuves] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [editingPreuve, setEditingPreuve] = useState<any>(null)

  const fetchPreuves = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (typeFilter) params.set("type", typeFilter)

      const response = await fetch(`/api/preuves?${params}`)
      const data = await response.json()
      setPreuves(data)
    } catch {
      toast({ title: "Erreur de chargement", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPreuves()
  }, [search, typeFilter])

  const handleAddPreuve = async (formData: FormData) => {
    try {
      const response = await fetch("/api/preuves", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur")
      }

      toast({ title: "Preuve ajoutée" })
      setShowAdd(false)
      fetchPreuves()
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePreuve = async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/preuves/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error()

      toast({ title: "Preuve mise à jour" })
      setEditingPreuve(null)
      fetchPreuves()
    } catch {
      toast({ title: "Erreur", variant: "destructive" })
    }
  }

  const handleDeletePreuve = async (id: string) => {
    if (!confirm("Supprimer cette preuve ?")) return

    try {
      await fetch(`/api/preuves/${id}`, { method: "DELETE" })
      toast({ title: "Preuve supprimée" })
      fetchPreuves()
    } catch {
      toast({ title: "Erreur", variant: "destructive" })
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
        <Button onClick={() => setShowAdd(true)}>
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
                <SelectItem value="">Tous les types</SelectItem>
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
              {search || typeFilter
                ? "Aucun résultat pour cette recherche"
                : "Commencez par ajouter vos premières preuves"}
            </p>
            {!search && !typeFilter && (
              <Button onClick={() => setShowAdd(true)}>
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
                  <Badge variant={typeColors[preuve.type as keyof typeof typeColors]}>
                    {typeLabels[preuve.type as keyof typeof typeLabels]}
                  </Badge>
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
                    {String(preuve.tags).split(",").filter(Boolean).map((tag: string) => (
                      <Badge key={tag.trim()} variant="outline" className="text-xs">
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

                {preuve._count?.dossierPreuves > 0 && (
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
        onSubmit={handleAddPreuve}
      />

      {/* Dialog Edition */}
      {editingPreuve && (
        <PreuveEditDialog
          open={!!editingPreuve}
          onOpenChange={(v) => !v && setEditingPreuve(null)}
          preuve={editingPreuve}
          onSubmit={(data) => handleUpdatePreuve(editingPreuve.id, data)}
        />
      )}
    </div>
  )
}

function PreuveDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSubmit: (formData: FormData) => void
}) {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    if (file) {
      formData.set("file", file)
    }

    // Traiter les tags
    const tagsInput = formData.get("tags") as string
    const tags = tagsInput
      ? tagsInput.split(",").map((t: string) => t.trim()).filter(Boolean)
      : []
    formData.set("tags", JSON.stringify(tags))

    await onSubmit(formData)
    setFile(null)
    form.reset()
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajouter une preuve</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Texte de la preuve (si pas de fichier joint)"
            />
          </div>

          <div className="space-y-2">
            <Label>Tags (séparés par des virgules)</Label>
            <Input name="tags" placeholder="qualité, iso9001, référence" />
          </div>

          <div className="space-y-2">
            <Label>Fichier joint (optionnel)</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              {file ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    Retirer
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                  <Input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sm text-primary hover:underline">
                      Sélectionner un fichier
                    </span>
                  </Label>
                </>
              )}
            </div>
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
  onSubmit,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  preuve: any
  onSubmit: (data: any) => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titre: preuve.titre,
    type: preuve.type,
    description: preuve.description || "",
    contenu: preuve.contenu || "",
    tags: preuve.tags || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const tags = formData.tags
      ? formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : []

    await onSubmit({
      ...formData,
      tags,
    })

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier la preuve</DialogTitle>
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
            <Label>Contenu texte</Label>
            <Textarea
              value={formData.contenu}
              onChange={(e) => setFormData((p) => ({ ...p, contenu: e.target.value }))}
              rows={4}
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
