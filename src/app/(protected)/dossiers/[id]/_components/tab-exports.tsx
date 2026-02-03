"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "@/lib/utils"
import { FileDown, FileText, CheckSquare, BarChart, Loader2 } from "lucide-react"

// Import dynamique pour eviter les erreurs SSR
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <span>Chargement...</span> }
)

const MemoirePDF = dynamic(
  () => import("@/components/pdf/memoire-pdf").then((mod) => mod.MemoirePDF),
  { ssr: false }
)

interface TabExportsProps {
  dossier: any
}

export function TabExports({ dossier }: TabExportsProps) {
  const [loadingType, setLoadingType] = useState<string | null>(null)

  const handleOtherExport = (type: string) => {
    setLoadingType(type)
    // Simulation pour les autres types
    setTimeout(() => {
      alert("Cette fonctionnalite sera disponible prochainement.")
      setLoadingType(null)
    }, 500)
  }

  const exportTypes = [
    {
      id: "CHECKLIST_PDF",
      label: "Checklist conformite",
      description: "Export PDF de la checklist avec statuts",
      icon: CheckSquare,
    },
    {
      id: "SYNTHESE_PDF",
      label: "Synthese dossier",
      description: "Resume complet du dossier avec indicateurs",
      icon: BarChart,
    },
  ]

  const filename = `memoire-technique-${dossier.reference.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`

  return (
    <div className="space-y-6">
      {/* Export Memoire Technique */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-1">Memoire technique</h3>
            <p className="text-sm text-gray-500 mb-4">
              Export PDF du memoire technique complet
            </p>
            <PDFDownloadLink
              document={<MemoirePDF dossier={dossier} />}
              fileName={filename}
              className="w-full max-w-xs"
            >
              {/* @ts-ignore */}
              {({ loading }: { loading: boolean }) => (
                <Button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generation...
                    </>
                  ) : (
                    <>
                      <FileDown className="h-4 w-4 mr-2" />
                      Telecharger PDF
                    </>
                  )}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </CardContent>
      </Card>

      {/* Autres exports (bientot) */}
      <div className="grid gap-4 md:grid-cols-2">
        {exportTypes.map((type) => (
          <Card key={type.id} className="opacity-70">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <type.icon className="h-10 w-10 text-gray-400 mb-4" />
                <h3 className="font-semibold mb-1">{type.label}</h3>
                <p className="text-sm text-gray-500 mb-4">{type.description}</p>
                <Button
                  variant="outline"
                  onClick={() => handleOtherExport(type.id)}
                  disabled={loadingType === type.id}
                  className="w-full"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  {loadingType === type.id ? "Export..." : "Bientot disponible"}
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
            Retrouvez vos precedents exports (versioning)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dossier.exports.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucun export realise pour ce dossier.
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
                    Telecharger
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
          <CardTitle className="text-sm">A propos des exports</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <p>
            Les exports PDF sont generes a partir des donnees actuelles du dossier.
            Le memoire technique est disponible en telechargement direct.
          </p>
          <p>
            Les exports checklist et synthese seront disponibles dans une prochaine version.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
