"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NouveauDossierPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    reference: "",
    titre: "",
    client: "",
    description: "",
    datePublication: "",
    dateLimite: "",
    montantEstime: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/dossiers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          montantEstime: formData.montantEstime
            ? parseFloat(formData.montantEstime)
            : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création")
      }

      toast({
        title: "Dossier créé",
        description: `Le dossier ${data.reference} a été créé avec succès.`,
      })

      router.push(`/dossiers/${data.id}`)
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dossiers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Nouveau dossier</h1>
          <p className="text-gray-500">Créez un nouveau dossier d'appel d'offres</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du dossier</CardTitle>
          <CardDescription>
            Renseignez les informations de base de l'appel d'offres
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reference">Référence interne *</Label>
                <Input
                  id="reference"
                  name="reference"
                  placeholder="AO-2024-001"
                  value={formData.reference}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Donneur d'ordre *</Label>
                <Input
                  id="client"
                  name="client"
                  placeholder="Nom du client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titre">Titre de l'appel d'offres *</Label>
              <Input
                id="titre"
                name="titre"
                placeholder="Marché de conception graphique..."
                value={formData.titre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Contexte et informations complémentaires..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="datePublication">Date de publication</Label>
                <Input
                  id="datePublication"
                  name="datePublication"
                  type="date"
                  value={formData.datePublication}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateLimite">Date limite de réponse</Label>
                <Input
                  id="dateLimite"
                  name="dateLimite"
                  type="date"
                  value={formData.dateLimite}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="montantEstime">Montant estimé (€)</Label>
              <Input
                id="montantEstime"
                name="montantEstime"
                type="number"
                placeholder="50000"
                value={formData.montantEstime}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/dossiers">
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer le dossier"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
