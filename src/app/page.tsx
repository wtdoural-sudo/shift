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
  FolderOpen,
  Mail,
  Phone,
  MapPin
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-900">Softboard</div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#fonctionnalites" className="text-gray-600 hover:text-gray-900">Fonctionnalités</a>
              <a href="#comment-ca-marche" className="text-gray-600 hover:text-gray-900">Comment ça marche</a>
              <a href="#avantages" className="text-gray-600 hover:text-gray-900">Avantages</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
            <a href="#contact">
              <Button>Demander une démo</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            Nouveau : Simplifiez vos réponses aux appels d'offres
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Gagnez vos appels d'offres,<br />
            <span className="text-blue-600">pas du temps.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Softboard est la plateforme qui structure vos réponses aux appels d'offres,
            réduit le temps perdu et vous aide à capitaliser sur votre travail.
            Fini les non-conformités et les deadlines manquées.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact">
              <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                Demander une démo gratuite
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="#fonctionnalites">
              <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                Découvrir les fonctionnalités
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Logos / Trust */}
      <section className="py-12 border-y bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">Ils nous font confiance</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Agence A</div>
            <div className="text-2xl font-bold text-gray-400">Cabinet B</div>
            <div className="text-2xl font-bold text-gray-400">Groupe C</div>
            <div className="text-2xl font-bold text-gray-400">Studio D</div>
            <div className="text-2xl font-bold text-gray-400">Conseil E</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="fonctionnalites" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour répondre efficacement
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète pour gérer vos dossiers d'appels d'offres de A à Z
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section id="comment-ca-marche" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-gray-600">
              Un processus simple en 4 étapes pour des réponses gagnantes
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Créez un dossier"
              description="Importez le DCE et les informations clés de l'appel d'offres en quelques clics"
            />
            <StepCard
              number="2"
              title="Analysez"
              description="Extraction automatique des exigences et décision Go/No-Go basée sur le scoring"
            />
            <StepCard
              number="3"
              title="Produisez"
              description="Rédigez le mémoire technique collaborativement, assignez les tâches à l'équipe"
            />
            <StepCard
              number="4"
              title="Vérifiez"
              description="Checklist de conformité avant envoi. Zéro risque de rejet pour non-conformité"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="avantages" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pourquoi choisir Softboard ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Softboard a été conçu par des professionnels des appels d'offres
                pour répondre aux vrais besoins du terrain.
              </p>
              <ul className="space-y-4">
                <BenefitItem text="Réduisez de 50% le temps de réponse aux appels d'offres" />
                <BenefitItem text="Éliminez les rejets pour non-conformité" />
                <BenefitItem text="Capitalisez sur chaque réponse pour les suivantes" />
                <BenefitItem text="Donnez de la visibilité au pilotage (bid coach)" />
                <BenefitItem text="Interface simple et intuitive, prise en main immédiate" />
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="h-8 w-8 text-yellow-500" />
                  <span className="text-xl font-semibold text-gray-900">Résultats constatés</span>
                </div>
                <div className="space-y-6">
                  <StatItem value="50%" label="de temps gagné en moyenne" />
                  <StatItem value="0" label="rejet pour non-conformité" />
                  <StatItem value="100%" label="des deadlines respectées" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8">
            "Softboard a transformé notre façon de répondre aux appels d'offres.
            On a divisé par deux le temps de préparation et on n'a plus jamais
            été rejetés pour non-conformité."
          </blockquote>
          <div className="text-blue-100">
            <p className="font-semibold">Marie Dupont</p>
            <p>Directrice de projet, Agence Conseil</p>
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Prêt à transformer votre gestion des appels d'offres ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Demandez une démonstration gratuite et découvrez comment Softboard
                peut vous faire gagner du temps et des marchés.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">contact@softboard.fr</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <p className="text-gray-600">01 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Demander une démonstration
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="jean@entreprise.fr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez brièvement vos besoins..."
                  />
                </div>
                <Button className="w-full" size="lg">
                  Envoyer ma demande
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-white mb-4">Softboard</div>
              <p className="text-sm">
                La plateforme de gestion des réponses aux appels d'offres.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#fonctionnalites" className="hover:text-white">Fonctionnalités</a></li>
                <li><a href="#comment-ca-marche" className="hover:text-white">Comment ça marche</a></li>
                <li><a href="#avantages" className="hover:text-white">Avantages</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">À propos</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Mentions légales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>contact@softboard.fr</li>
                <li>01 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © 2024 Softboard. Tous droits réservés.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white">Politique de confidentialité</a>
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
      <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
      <span className="text-4xl font-bold text-blue-600">{value}</span>
      <span className="text-gray-600">{label}</span>
    </div>
  )
}
