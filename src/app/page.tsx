import { Button } from "@/components/ui/button"
import {
  FileSearch,
  Target,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Upload,
  FileText,
  Users,
  Shield,
  ChevronRight,
  Play
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Softboard</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#fonctionnalites" className="text-gray-600 hover:text-gray-900 text-sm">Fonctionnalités</a>
              <a href="#comment-ca-marche" className="text-gray-600 hover:text-gray-900 text-sm">Comment ça marche</a>
              <a href="#tarifs" className="text-gray-600 hover:text-gray-900 text-sm">Tarifs</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/connexion">
                <Button variant="ghost" size="sm">Connexion</Button>
              </Link>
              <Link href="/inscription">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Optimisez vos Réponses aux{" "}
                <span className="text-blue-600">Appels d'Offres</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Gérez, analysez et collaborez sur vos dossiers de candidature
                avec une seule plateforme. Gagnez du temps et augmentez votre taux de réussite.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm">
                  <FileSearch className="h-4 w-4 text-blue-600" />
                  <span>Extraction automatique des Exigences</span>
                </div>
                <div className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm">
                  <Target className="h-4 w-4 text-green-600" />
                  <span>Go/No-Go objectif</span>
                </div>
                <div className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Collaboration facilitée</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/inscription">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                    Essayez Gratuitement
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#demo">
                  <Button size="lg" variant="outline" className="px-8">
                    <Play className="mr-2 h-4 w-4" />
                    Voir la démo
                  </Button>
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                14 jours d'essai gratuit • Sans carte bancaire
              </p>
            </div>

            {/* Dashboard Preview - Static Screenshot */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-500">app.softboard.fr</span>
                  </div>
                </div>
                <div className="p-6">
                  {/* Mock Dashboard - Static */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Dashboard Dossier: Projet XYZ</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">En cours</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <StatBox value="75%" label="Progression" color="blue" />
                      <StatBox value="68" label="Exigences" color="gray" />
                      <StatBox value="12" label="Tâches" color="orange" />
                      <StatBox value="24" label="Documents" color="green" />
                    </div>
                    <div className="h-24 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-12 w-12 text-blue-300" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simplifiez et Accélérez vos Propositions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une suite d'outils puissants pour transformer votre façon de répondre aux appels d'offres
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileSearch className="h-8 w-8 text-blue-600" />}
              title="Analyse IA des DCE"
              description="Extraction automatique des exigences depuis vos documents. Notre IA identifie les points clés et structure vos réponses."
            />
            <FeatureCard
              icon={<Target className="h-8 w-8 text-green-600" />}
              title="Go/No-Go Instantané"
              description="Scoring automatique pour évaluer vos chances. Priorisez les opportunités avec le meilleur potentiel de réussite."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-purple-600" />}
              title="Suivi et Reporting"
              description="Tableaux de bord en temps réel. Visualisez l'avancement de chaque dossier et identifiez les points de blocage."
            />
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="fonctionnalites" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">Fonctionnalités</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Découvrez la plateforme
            </h2>
          </div>

          {/* Feature 1: Gestion des dossiers */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <FileText className="h-4 w-4" />
                Gestion centralisée
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tous vos dossiers en un seul endroit
              </h3>
              <p className="text-gray-600 mb-6">
                Centralisez vos appels d'offres, suivez leur avancement et ne manquez
                plus aucune échéance. Une vue claire sur tous vos projets en cours.
              </p>
              <ul className="space-y-3">
                <CheckItem text="Vue d'ensemble de tous les dossiers" />
                <CheckItem text="Suivi des échéances et alertes" />
                <CheckItem text="Historique complet des actions" />
              </ul>
            </div>
            {/* Static Screenshot Mock */}
            <ScreenshotMock title="Mes Dossiers">
              <div className="space-y-3">
                <DossierRow reference="AO-2024-042" titre="Marché de maintenance" client="Ville de Lyon" status="EN_COURS" date="15/02/2024" />
                <DossierRow reference="AO-2024-038" titre="Fourniture équipements IT" client="Région IDF" status="GO" date="22/02/2024" />
                <DossierRow reference="AO-2024-035" titre="Prestations conseil" client="Ministère" status="ANALYSE" date="01/03/2024" />
                <DossierRow reference="AO-2024-031" titre="Développement logiciel" client="SNCF" status="DEPOSE" date="10/01/2024" />
              </div>
            </ScreenshotMock>
          </div>

          {/* Feature 2: Extraction Exigences */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1">
              <ScreenshotMock title="Extraction des Exigences">
                <div className="space-y-2">
                  <div className="flex gap-2 mb-4">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">À valider</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Conforme</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">À Compléter</span>
                  </div>
                  <ExigenceRow id="E.101" title="Présentation de l'entreprise" status="conforme" />
                  <ExigenceRow id="E.102" title="Documentation technique" status="conforme" />
                  <ExigenceRow id="E.104" title="Certificat ISO 9001 requis" status="warning" />
                  <ExigenceRow id="E.105" title="Références clients similaires" status="pending" />
                </div>
              </ScreenshotMock>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <FileText className="h-4 w-4" />
                Analyse intelligente
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Extraction automatique des exigences
              </h3>
              <p className="text-gray-600 mb-6">
                Notre IA analyse vos documents et extrait automatiquement toutes les exigences.
                Validez, complétez et suivez chaque point en temps réel.
              </p>
              <ul className="space-y-3">
                <CheckItem text="Identification automatique des exigences" />
                <CheckItem text="Suivi du statut de conformité" />
                <CheckItem text="Alertes sur les points manquants" />
              </ul>
            </div>
          </div>

          {/* Feature 3: Bibliothèque */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Shield className="h-4 w-4" />
                Capitalisation
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Bibliothèque de preuves réutilisables
              </h3>
              <p className="text-gray-600 mb-6">
                Stockez vos certifications, références clients, CV et documents types.
                Réutilisez-les d'un dossier à l'autre en quelques clics.
              </p>
              <ul className="space-y-3">
                <CheckItem text="Certifications et attestations" />
                <CheckItem text="Références clients documentées" />
                <CheckItem text="CV et profils d'équipe" />
              </ul>
            </div>
            <ScreenshotMock title="Bibliothèque de Preuves">
              <div className="grid grid-cols-2 gap-3">
                <ProofCard type="certification" title="ISO 9001" />
                <ProofCard type="reference" title="Référence Client ABC" />
                <ProofCard type="cv" title="CV - Jean Dupont" />
                <ProofCard type="attestation" title="Attestation Capacité" />
              </div>
            </ScreenshotMock>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="comment-ca-marche" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">Processus</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard number="1" title="Importez le DCE" description="Uploadez vos documents d'appel d'offres" icon={<Upload className="h-6 w-6" />} />
            <StepCard number="2" title="Analysez" description="L'IA extrait les exigences et évalue vos chances" icon={<FileSearch className="h-6 w-6" />} />
            <StepCard number="3" title="Produisez" description="Rédigez avec votre bibliothèque de preuves" icon={<FileText className="h-6 w-6" />} />
            <StepCard number="4" title="Soumettez" description="Vérifiez la conformité et exportez" icon={<CheckCircle2 className="h-6 w-6" />} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50%</div>
              <div className="text-blue-100">Temps gagné</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-blue-100">Rejet non-conformité</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">42%</div>
              <div className="text-blue-100">Taux de réussite</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">72h</div>
              <div className="text-blue-100">Temps moyen réponse</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Prêt à optimiser vos réponses ?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Rejoignez les équipes qui gagnent du temps et des marchés avec Softboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inscription">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                Créer un compte gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/connexion">
              <Button size="lg" variant="outline" className="px-8">
                Se connecter
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            14 jours d'essai gratuit • Sans engagement
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Softboard</span>
              </div>
              <p className="text-sm">
                La plateforme de gestion des réponses aux appels d'offres.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#fonctionnalites" className="hover:text-white">Fonctionnalités</a></li>
                <li><a href="#tarifs" className="hover:text-white">Tarifs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>contact@softboard.fr</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2024 Softboard. Tous droits réservés.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white">Mentions légales</a>
              <a href="#" className="text-sm hover:text-white">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Components
function StatBox({ value, label, color }: { value: string; label: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    gray: "bg-gray-50 text-gray-900",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
  }
  return (
    <div className={`rounded-lg p-3 text-center ${colors[color]}`}>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function ScreenshotMock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function ExigenceRow({ id, title, status }: { id: string; title: string; status: string }) {
  const statusStyles: Record<string, string> = {
    conforme: "bg-green-100 text-green-700",
    warning: "bg-orange-100 text-orange-700",
    pending: "bg-blue-100 text-blue-700",
  }
  const statusLabels: Record<string, string> = {
    conforme: "Conforme",
    warning: "À valider",
    pending: "En cours",
  }
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400">{id}</span>
        <span className="text-sm text-gray-700">{title}</span>
      </div>
      <span className={`text-xs px-2 py-0.5 rounded ${statusStyles[status]}`}>{statusLabels[status]}</span>
    </div>
  )
}

function ProofCard({ type, title }: { type: string; title: string }) {
  const colors: Record<string, string> = {
    certification: "bg-blue-100 text-blue-700",
    reference: "bg-green-100 text-green-700",
    cv: "bg-purple-100 text-purple-700",
    attestation: "bg-orange-100 text-orange-700",
  }
  return (
    <div className="border rounded-lg p-3 bg-gray-50">
      <span className={`text-xs px-2 py-0.5 rounded ${colors[type]}`}>{type}</span>
      <p className="text-sm font-medium text-gray-900 mt-2">{title}</p>
      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
        <div className="bg-green-500 h-1 rounded-full w-full"></div>
      </div>
    </div>
  )
}

function StepCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">{icon}</div>
      <div className="text-xs text-blue-600 font-medium mb-2">ÉTAPE {number}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
      <span className="text-gray-700">{text}</span>
    </li>
  )
}

function DossierRow({ reference, titre, client, status, date }: { reference: string; titre: string; client: string; status: string; date: string }) {
  const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
    EN_COURS: { bg: "bg-blue-100", text: "text-blue-700", label: "En cours" },
    GO: { bg: "bg-green-100", text: "text-green-700", label: "Go" },
    ANALYSE: { bg: "bg-orange-100", text: "text-orange-700", label: "Analyse" },
    DEPOSE: { bg: "bg-gray-100", text: "text-gray-700", label: "Déposé" },
  }
  const s = statusStyles[status] || statusStyles.EN_COURS
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-xs text-gray-400">{reference}</span>
          <p className="text-sm font-medium text-gray-900">{titre}</p>
          <span className="text-xs text-gray-500">{client}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-400">{date}</span>
        <span className={`text-xs px-2 py-1 rounded ${s.bg} ${s.text}`}>{s.label}</span>
      </div>
    </div>
  )
}
