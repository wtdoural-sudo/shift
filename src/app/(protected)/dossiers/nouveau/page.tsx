"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, FolderPlus, Building2, Calendar, Euro, FileText } from "lucide-react"
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
        throw new Error(data.error || "Erreur lors de la creation")
      }

      toast({
        title: "Dossier cree",
        description: `Le dossier ${data.reference} a ete cree avec succes.`,
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
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/tableau-de-bord">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FolderPlus className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Nouveau dossier</h1>
            <p className="text-gray-500">Creez un nouveau dossier d'appel d'offres</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identification */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-400" />
              <CardTitle className="text-lg">Identification</CardTitle>
            </div>
            <CardDescription>
              Reference et titre de l'appel d'offres
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reference">Reference interne *</Label>
                <Input
                  id="reference"
                  name="reference"
                  placeholder="AO-2024-001"
                  value={formData.reference}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-gray-500">Votre reference interne pour ce dossier</p>
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
                placeholder="Marche de conception graphique et communication..."
                value={formData.titre}
                onChange={handleChange}
                className="text-base"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-400" />
              <CardTitle className="text-lg">Description</CardTitle>
            </div>
            <CardDescription>
              Contexte et informations complementaires (optionnel)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="description"
              name="description"
              placeholder="Decrivez le contexte de l'appel d'offres, les enjeux, vos notes..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Dates et budget */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <CardTitle className="text-lg">Planning et budget</CardTitle>
            </div>
            <CardDescription>
              Dates importantes et montant estime
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
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
                <Label htmlFor="dateLimite">Date limite de reponse</Label>
                <Input
                  id="dateLimite"
                  name="dateLimite"
                  type="date"
                  value={formData.dateLimite}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="montantEstime">Montant estime</Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="montantEstime"
                    name="montantEstime"
                    type="number"
                    placeholder="50000"
                    value={formData.montantEstime}
                    onChange={handleChange}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4">
          <Link href="/tableau-de-bord">
            <Button type="button" variant="ghost">
              Annuler
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 px-8">
            {loading ? "Creation en cours..." : "Creer le dossier"}
          </Button>
        </div>
      </form>
    </div>
  )
}
