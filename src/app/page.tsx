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
  Clock,
  Shield,
  Zap,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
              <a href="#contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/connexion">
                <Button variant="ghost" size="sm">Connexion</Button>
              </Link>
              <a href="#contact">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Démarrer
                </Button>
              </a>
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
                  <span>Go objectif de priorisation</span>
                </div>
                <div className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Collaboration facilitée</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                    Essayez Gratuitement
                  </Button>
                </a>
                <a href="#demo">
                  <Button size="lg" variant="outline" className="px-8">
                    Voir la démo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Créez un compte en 30 secondes • Sans carte bancaire
              </p>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-500">softboard.fr/dashboard</span>
                  </div>
                </div>
                <div className="p-6">
                  {/* Mock Dashboard */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Dashboard Dossier: Projet XYZ</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">En cours</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-600">75%</div>
                        <div className="text-xs text-gray-500">Progression</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-gray-900">68</div>
                        <div className="text-xs text-gray-500">Exigences</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-orange-600">12</div>
                        <div className="text-xs text-gray-500">Tâches</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-600">24</div>
                        <div className="text-xs text-gray-500">Documents</div>
                      </div>
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

      {/* Subtitle Section */}
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

      {/* Features Detail Section */}
      <section id="fonctionnalites" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">Fonctionnalités</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Tout ce dont vous avez besoin
            </h2>
          </div>

          {/* Feature 1: Import DCE */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Upload className="h-4 w-4" />
                Import simplifié
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Importez vos dossiers en quelques secondes
              </h3>
              <p className="text-gray-600 mb-6">
                Glissez-déposez vos fichiers DCE (PDF, DOCX, ZIP) et laissez Softboard
                extraire automatiquement les informations clés et les exigences.
              </p>
              <ul className="space-y-3">
                <CheckItem text="Support PDF, DOCX, ZIP et images" />
                <CheckItem text="Extraction automatique des métadonnées" />
                <CheckItem text="Organisation intelligente des documents" />
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-900 font-medium mb-2">Glissez-déposez vos fichiers DCE</p>
                <p className="text-sm text-gray-500 mb-4">Déposez vos fichiers ici ou <span className="text-blue-600">Parcourir</span></p>
                <p className="text-xs text-gray-400">Format supportés : PDF, DOCX, ZIP</p>
              </div>
              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                Importer
              </Button>
            </div>
          </div>

          {/* Feature 2: Extraction Exigences */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 bg-white rounded-2xl shadow-xl border overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Extraction des Exigences</h4>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">À valider</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Conforme</span>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">À Compléter</span>
                </div>
              </div>
              <div className="p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-2">ID</th>
                      <th className="pb-2">Exigence</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 text-gray-500">E.101</td>
                      <td className="py-3">Présentation de l'entreprise</td>
                      <td className="py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">Conforme</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 text-gray-500">E.102</td>
                      <td className="py-3">Documentation de l'entreprise</td>
                      <td className="py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">Conforme</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 text-gray-500">E.104</td>
                      <td className="py-3">Certificat ISO 9001 requis</td>
                      <td className="py-3"><span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">À valider</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 text-gray-500">E.105</td>
                      <td className="py-3">Références clients similaires</td>
                      <td className="py-3"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">En cours</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

          {/* Feature 3: Bibliothèque de Preuves */}
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
                <CheckItem text="Documents types personnalisables" />
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold text-gray-900">Bibliothèque de Preuves</h4>
                <Button size="sm" variant="outline">+ Nouveau</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ProofCard type="certification" title="Certification ISO 9001" status="Valide" />
                <ProofCard type="reference" title="Référence Client ABC" status="Complète" />
                <ProofCard type="presentation" title="Présentation Entreprise" status="À jour" />
                <ProofCard type="attestation" title="Attestation de Capacité" status="Valide" />
              </div>
            </div>
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
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un processus simple et efficace pour des réponses gagnantes
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Importez le DCE"
              description="Uploadez vos documents d'appel d'offres en quelques secondes"
              icon={<Upload className="h-6 w-6" />}
            />
            <StepCard
              number="2"
              title="Analysez"
              description="L'IA extrait les exigences et évalue vos chances (Go/No-Go)"
              icon={<FileSearch className="h-6 w-6" />}
            />
            <StepCard
              number="3"
              title="Produisez"
              description="Rédigez collaborativement avec votre bibliothèque de preuves"
              icon={<FileText className="h-6 w-6" />}
            />
            <StepCard
              number="4"
              title="Soumettez"
              description="Vérifiez la conformité et exportez votre dossier complet"
              icon={<CheckCircle2 className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50%</div>
              <div className="text-blue-100">Temps gagné en moyenne</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-blue-100">Rejet pour non-conformité</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">42%</div>
              <div className="text-blue-100">Taux de réussite moyen</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">72h</div>
              <div className="text-blue-100">Temps moyen de réponse</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Prêt à optimiser vos réponses ?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Rejoignez les équipes qui gagnent du temps et des marchés avec Softboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
              Essayez Gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Demander une démo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            14 jours d'essai gratuit • Sans engagement • Support inclus
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
                <li><a href="#" className="hover:text-white">Intégrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
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
              <a href="#" className="text-sm hover:text-white">CGU</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
        {icon}
      </div>
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

function ProofCard({ type, title, status }: { type: string; title: string; status: string }) {
  const colors: Record<string, string> = {
    certification: "bg-blue-100 text-blue-700",
    reference: "bg-green-100 text-green-700",
    presentation: "bg-purple-100 text-purple-700",
    attestation: "bg-orange-100 text-orange-700",
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <span className={`text-xs px-2 py-1 rounded ${colors[type]}`}>{type}</span>
      <h5 className="font-medium text-gray-900 mt-2 text-sm">{title}</h5>
      <div className="flex items-center gap-1 mt-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
        </div>
        <span className="text-xs text-gray-500 ml-2">{status}</span>
      </div>
    </div>
  )
}
