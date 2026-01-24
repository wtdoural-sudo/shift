"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { formatDateTime } from "@/lib/utils"
import { FileDown, FileText, CheckSquare, BarChart } from "lucide-react"

interface TabExportsProps {
  dossier: any
}

export function TabExports({ dossier }: TabExportsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [exporting, setExporting] = useState<string | null>(null)

  const handleExport = async (type: string) => {
    setExporting(type)

    // Simulation d'export (dans un vrai projet, appel API qui génère le PDF)
    toast({
      title: "Export en cours",
      description: "Cette fonctionnalité sera disponible prochainement.",
    })

    setTimeout(() => {
      setExporting(null)
    }, 1000)
  }

  const exportTypes = [
    {
      id: "MEMOIRE_PDF",
      label: "Mémoire technique",
      description: "Export PDF du mémoire technique complet",
      icon: FileText,
    },
    {
      id: "CHECKLIST_PDF",
      label: "Checklist conformité",
      description: "Export PDF de la checklist avec statuts",
      icon: CheckSquare,
    },
    {
      id: "SYNTHESE_PDF",
      label: "Synthèse dossier",
      description: "Résumé complet du dossier avec indicateurs",
      icon: BarChart,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Actions d'export */}
      <div className="grid gap-4 md:grid-cols-3">
        {exportTypes.map((type) => (
          <Card key={type.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <type.icon className="h-10 w-10 text-gray-400 mb-4" />
                <h3 className="font-semibold mb-1">{type.label}</h3>
                <p className="text-sm text-gray-500 mb-4">{type.description}</p>
                <Button
                  onClick={() => handleExport(type.id)}
                  disabled={exporting === type.id}
                  className="w-full"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  {exporting === type.id ? "Export..." : "Exporter PDF"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Historique des exports */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des exports</CardTitle>
          <CardDescription>
            Retrouvez vos précédents exports (versioning)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dossier.exports.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucun export réalisé pour ce dossier.
            </p>
          ) : (
            <div className="space-y-3">
              {dossier.exports.map((exp: any) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="font-medium">{exp.filename}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge variant="outline">v{exp.version}</Badge>
                        <span>{formatDateTime(exp.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileDown className="h-4 w-4 mr-1" />
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">À propos des exports</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <p>
            Les exports PDF sont générés à partir des données actuelles du dossier.
            Chaque export est versionné pour conserver l'historique.
          </p>
          <p>
            Le mémoire technique est exporté avec la mise en forme Markdown
            appliquée pour un rendu professionnel.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
