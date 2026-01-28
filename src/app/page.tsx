import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  FileCheck,
  Clock,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  FolderOpen
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-900">Softboard</div>
            <div className="flex items-center gap-4">
              <Link href="/connexion">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link href="/connexion">
                <Button>Essayer gratuitement</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Gagnez vos appels d'offres,<br />
            <span className="text-blue-600">pas du temps.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Softboard structure vos réponses aux appels d'offres, réduit le temps perdu
            et vous aide à capitaliser sur votre travail. Fini les non-conformités.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/connexion">
              <Button size="lg" className="text-lg px-8">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Voir la démo
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Compte démo : admin@softboard.fr / admin123
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour répondre efficacement
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète pour gérer vos dossiers de A à Z
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FolderOpen className="h-8 w-8 text-blue-600" />}
              title="Gestion des dossiers"
              description="Centralisez tous vos appels d'offres. Suivez leur avancement et ne manquez plus aucune deadline."
            />
            <FeatureCard
              icon={<FileCheck className="h-8 w-8 text-green-600" />}
              title="Checklist conformité"
              description="Vérifiez automatiquement la conformité de vos réponses. Zéro oubli, zéro rejet."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-purple-600" />}
              title="Décision Go/No-Go"
              description="Évaluez chaque opportunité avec un scoring objectif. Concentrez-vous sur les marchés gagnables."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-orange-600" />}
              title="Gain de temps"
              description="Réutilisez vos preuves, CV et références. Ne réécrivez plus jamais les mêmes contenus."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-indigo-600" />}
              title="Travail collaboratif"
              description="Assignez des tâches, suivez l'avancement. Toute l'équipe sur la même longueur d'onde."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-red-600" />}
              title="Bibliothèque de preuves"
              description="Stockez et organisez vos certifications, références et CV. Toujours à jour, toujours prêts."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Créez un dossier"
              description="Importez le DCE et les informations clés de l'appel d'offres"
            />
            <StepCard
              number="2"
              title="Analysez"
              description="Extraction des exigences, décision Go/No-Go basée sur le scoring"
            />
            <StepCard
              number="3"
              title="Produisez"
              description="Rédigez le mémoire technique, assignez les tâches à l'équipe"
            />
            <StepCard
              number="4"
              title="Vérifiez"
              description="Checklist de conformité avant envoi. Zéro risque de rejet."
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Pourquoi choisir Softboard ?
              </h2>
              <ul className="space-y-4">
                <BenefitItem text="Réduisez de 50% le temps de réponse aux appels d'offres" />
                <BenefitItem text="Éliminez les rejets pour non-conformité" />
                <BenefitItem text="Capitalisez sur chaque réponse pour les suivantes" />
                <BenefitItem text="Donnez de la visibilité au pilotage (bid coach)" />
                <BenefitItem text="Interface simple et intuitive, prise en main immédiate" />
              </ul>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  <span className="font-semibold text-gray-900">Résultats constatés</span>
                </div>
                <div className="space-y-4">
                  <StatItem value="50%" label="de temps gagné en moyenne" />
                  <StatItem value="0" label="rejet pour non-conformité" />
                  <StatItem value="100%" label="des deadlines respectées" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à transformer votre gestion des appels d'offres ?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Rejoignez les équipes qui gagnent du temps et des marchés.
          </p>
          <Link href="/connexion">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Essayer Softboard gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-white">Softboard</div>
            <p className="text-sm">
              © 2024 Softboard. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
      <span className="text-gray-700">{text}</span>
    </li>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-blue-600">{value}</span>
      <span className="text-gray-600">{label}</span>
    </div>
  )
}
