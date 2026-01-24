"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { formatDateTime } from "@/lib/utils"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface TabGoNoGoProps {
  dossier: any
  threshold: number
}

const criteres = [
  {
    key: "critereFitStrategique",
    label: "Adéquation stratégique",
    description: "Ce marché correspond-il à notre positionnement et à notre stratégie ?",
  },
  {
    key: "critereCapacite",
    label: "Capacité à répondre",
    description: "Avons-nous les compétences, ressources et disponibilités nécessaires ?",
  },
  {
    key: "critereRentabilite",
    label: "Rentabilité potentielle",
    description: "Le marché est-il économiquement intéressant ?",
  },
  {
    key: "critereDelai",
    label: "Délai réaliste",
    description: "Pouvons-nous répondre dans les temps impartis ?",
  },
  {
    key: "critereRisque",
    label: "Niveau de risque acceptable",
    description: "Les risques sont-ils maîtrisables ? (5 = faible risque)",
  },
]

export function TabGoNoGo({ dossier, threshold }: TabGoNoGoProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [scores, setScores] = useState({
    critereFitStrategique: 3,
    critereCapacite: 3,
    critereRentabilite: 3,
    critereDelai: 3,
    critereRisque: 3,
  })
  const [commentaire, setCommentaire] = useState("")
  const [motifNoGo, setMotifNoGo] = useState("")

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const isGo = totalScore >= threshold

  const lastDecision = dossier.goNoGoDecisions[0]

  const handleSubmit = async () => {
    if (!isGo && !motifNoGo.trim()) {
      toast({
        title: "Motif requis",
        description: "Veuillez indiquer le motif de la décision No-Go",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/dossiers/${dossier.id}/go-no-go`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...scores,
          commentaire,
          motifNoGo: isGo ? undefined : motifNoGo,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur")
      }

      toast({
        title: isGo ? "Décision GO enregistrée" : "Décision NO-GO enregistrée",
        description: `Score : ${totalScore}/${threshold * 5 / 3} (seuil: ${threshold})`,
      })

      router.refresh()
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

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Formulaire de scoring */}
      <Card>
        <CardHeader>
          <CardTitle>Évaluation Go / No-Go</CardTitle>
          <CardDescription>
            Évaluez chaque critère de 0 à 5 pour déterminer si vous devez répondre
            à cet appel d'offres. Seuil actuel : {threshold} points.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {criteres.map((critere) => (
            <div key={critere.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-medium">{critere.label}</Label>
                <span className="text-lg font-bold">
                  {scores[critere.key as keyof typeof scores]}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{critere.description}</p>
              <Slider
                value={[scores[critere.key as keyof typeof scores]]}
                onValueChange={([v]) =>
                  setScores((p) => ({ ...p, [critere.key]: v }))
                }
                max={5}
                step={1}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>0</span>
                <span>5</span>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">Score total</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{totalScore}</span>
                <span className="text-gray-500">/ 25</span>
                {isGo ? (
                  <Badge variant="success" className="ml-2">GO</Badge>
                ) : (
                  <Badge variant="destructive" className="ml-2">NO-GO</Badge>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Commentaire (optionnel)</Label>
                <Textarea
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  placeholder="Notes et observations..."
                  rows={3}
                />
              </div>

              {!isGo && (
                <div className="space-y-2">
                  <Label className="text-red-600">Motif du No-Go *</Label>
                  <Textarea
                    value={motifNoGo}
                    onChange={(e) => setMotifNoGo(e.target.value)}
                    placeholder="Expliquez la raison de cette décision..."
                    rows={3}
                  />
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full"
                variant={isGo ? "default" : "destructive"}
              >
                {loading
                  ? "Enregistrement..."
                  : isGo
                  ? "Valider la décision GO"
                  : "Valider la décision NO-GO"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historique et statut */}
      <div className="space-y-6">
        {/* Statut actuel */}
        <Card>
          <CardHeader>
            <CardTitle>Statut actuel</CardTitle>
          </CardHeader>
          <CardContent>
            {lastDecision ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {lastDecision.decision ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-8 w-8" />
                      <div>
                        <p className="text-xl font-bold">GO</p>
                        <p className="text-sm text-gray-500">
                          Décision prise le {formatDateTime(lastDecision.createdAt)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="h-8 w-8" />
                      <div>
                        <p className="text-xl font-bold">NO-GO</p>
                        <p className="text-sm text-gray-500">
                          Décision prise le {formatDateTime(lastDecision.createdAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-2 text-center">
                  {criteres.map((c) => (
                    <div key={c.key} className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500 truncate" title={c.label}>
                        {c.label.split(" ")[0]}
                      </p>
                      <p className="text-lg font-bold">
                        {lastDecision[c.key as keyof typeof lastDecision]}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <span>Score total</span>
                  <span className="font-bold">
                    {lastDecision.scoreTotal} / 25
                  </span>
                </div>

                {lastDecision.motifNoGo && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800 mb-1">
                      Motif du No-Go
                    </p>
                    <p className="text-sm text-red-700">{lastDecision.motifNoGo}</p>
                  </div>
                )}

                {lastDecision.commentaire && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Commentaire
                    </p>
                    <p className="text-sm text-gray-600">{lastDecision.commentaire}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-8">
                <AlertTriangle className="h-12 w-12 text-orange-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucune décision prise</h3>
                <p className="text-gray-500">
                  Évaluez les critères ci-contre pour prendre une décision Go / No-Go.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Indicateurs */}
        <Card>
          <CardHeader>
            <CardTitle>Rappel des critères</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-700">0-1 :</span>
                <span className="text-gray-600">Très défavorable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-700">2 :</span>
                <span className="text-gray-600">Défavorable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-700">3 :</span>
                <span className="text-gray-600">Neutre</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-700">4 :</span>
                <span className="text-gray-600">Favorable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-700">5 :</span>
                <span className="text-gray-600">Très favorable</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Seuil paramétrable dans les paramètres du workspace (actuellement {threshold}/25).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
