"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Save, Eye, FileText, Plus } from "lucide-react"
import ReactMarkdown from "react-markdown"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TabMemoireProps {
  dossier: any
  preuves: any[]
}

const sections = [
  {
    key: "sectionPresentation",
    label: "Présentation de l'entreprise",
    placeholder: "Présentez votre entreprise, son histoire, ses valeurs...",
  },
  {
    key: "sectionComprehension",
    label: "Compréhension du besoin",
    placeholder: "Démontrez votre compréhension des enjeux et attentes du client...",
  },
  {
    key: "sectionMethodologie",
    label: "Méthodologie proposée",
    placeholder: "Décrivez votre approche, vos méthodes de travail...",
  },
  {
    key: "sectionEquipe",
    label: "Équipe dédiée",
    placeholder: "Présentez l'équipe qui interviendra sur ce projet...",
  },
  {
    key: "sectionReferences",
    label: "Références similaires",
    placeholder: "Listez vos références pertinentes pour ce marché...",
  },
  {
    key: "sectionPlanning",
    label: "Planning prévisionnel",
    placeholder: "Détaillez le planning d'exécution proposé...",
  },
  {
    key: "sectionEngagements",
    label: "Engagements qualité",
    placeholder: "Décrivez vos engagements en termes de qualité, délais, suivi...",
  },
]

export function TabMemoire({ dossier, preuves }: TabMemoireProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState(sections[0].key)
  const [previewMode, setPreviewMode] = useState(false)
  const [showPreuves, setShowPreuves] = useState(false)

  const [content, setContent] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    sections.forEach((s) => {
      initial[s.key] = dossier.memoireTechnique?.[s.key] || ""
    })
    return initial
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/dossiers/${dossier.id}/memoire`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })

      if (!response.ok) throw new Error()

      toast({ title: "Mémoire technique enregistré" })
      router.refresh()
    } catch {
      toast({ title: "Erreur lors de l'enregistrement", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const insertPreuve = (preuve: any) => {
    const text = `\n\n**${preuve.titre}**\n${preuve.description || preuve.contenu || ""}\n`
    setContent((prev) => ({
      ...prev,
      [activeSection]: prev[activeSection] + text,
    }))
    setShowPreuves(false)
    toast({ title: "Preuve insérée" })
  }

  // Statistiques
  const filledSections = sections.filter((s) => content[s.key]?.trim()).length
  const totalWords = Object.values(content).reduce(
    (acc, text) => acc + (text?.split(/\s+/).filter(Boolean).length || 0),
    0
  )

  return (
    <div className="space-y-6">
      {/* Barre d'outils */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            {filledSections}/{sections.length} sections remplies
          </Badge>
          <Badge variant="outline">{totalWords} mots</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Édition" : "Aperçu"}
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Navigation des sections */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Sections</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1 p-2">
              {sections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === section.key
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{section.label}</span>
                    {content[section.key]?.trim() && (
                      <span className="h-2 w-2 bg-green-500 rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Éditeur */}
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>
                {sections.find((s) => s.key === activeSection)?.label}
              </CardTitle>
              <CardDescription>
                Rédigez en Markdown pour la mise en forme
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowPreuves(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Insérer une preuve
            </Button>
          </CardHeader>
          <CardContent>
            {previewMode ? (
              <div className="prose prose-sm max-w-none min-h-[400px] p-4 border rounded-md bg-gray-50">
                <ReactMarkdown>
                  {content[activeSection] || "*Aucun contenu*"}
                </ReactMarkdown>
              </div>
            ) : (
              <Textarea
                value={content[activeSection]}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    [activeSection]: e.target.value,
                  }))
                }
                placeholder={
                  sections.find((s) => s.key === activeSection)?.placeholder
                }
                className="min-h-[400px] font-mono text-sm"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preuves liées */}
      {dossier.dossierPreuves.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Preuves liées au dossier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {dossier.dossierPreuves.map((dp: any) => (
                <Badge key={dp.preuve.id} variant="secondary">
                  <FileText className="h-3 w-3 mr-1" />
                  {dp.preuve.titre}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog sélection preuves */}
      <Dialog open={showPreuves} onOpenChange={setShowPreuves}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Insérer une preuve</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            {preuves.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Aucune preuve disponible. Ajoutez des preuves dans la bibliothèque.
              </p>
            ) : (
              <div className="space-y-2 pr-4">
                {preuves.map((preuve) => (
                  <div
                    key={preuve.id}
                    onClick={() => insertPreuve(preuve)}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{preuve.type}</Badge>
                      <span className="font-medium">{preuve.titre}</span>
                    </div>
                    {preuve.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {preuve.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
