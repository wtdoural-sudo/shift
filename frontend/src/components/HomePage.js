import React from 'react';
import { Clock, Map, Users, Building2, User, Palette, Scroll, BookOpen, Library } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Timeline from './Timeline';
import { PERSONNAGES, PERIODES } from '../data/encyclopediaData';

const sectionCards = [
  { 
    id: 'periodes', 
    label: 'Périodes Historiques', 
    icon: Clock, 
    description: 'De la préhistoire à l\'indépendance, traversez deux millions d\'années d\'histoire.',
    color: '#B8860B'
  },
  { 
    id: 'atlas', 
    label: 'Atlas & Cartes', 
    icon: Map, 
    description: 'Cartes interactives des territoires et des civilisations successives.',
    color: '#1A3A5C'
  },
  { 
    id: 'peuples', 
    label: 'Peuples & Régions', 
    icon: Users, 
    description: 'Les populations et cultures qui ont façonné le territoire.',
    color: '#2D5A27'
  },
  { 
    id: 'villes', 
    label: 'Villes & Sites', 
    icon: Building2, 
    description: 'Cités antiques, médinas, sites archéologiques classés UNESCO.',
    color: '#8B1A1A'
  },
  { 
    id: 'personnages', 
    label: 'Personnages', 
    icon: User, 
    description: 'Rois, savants, résistants, artistes : les figures de l\'histoire.',
    color: '#6B3E26'
  },
  { 
    id: 'arts', 
    label: 'Arts & Culture', 
    icon: Palette, 
    description: 'Architecture, musique, littérature, arts visuels.',
    color: '#2E1A6B'
  },
  { 
    id: 'frises', 
    label: 'Frises Chronologiques', 
    icon: Scroll, 
    description: 'Visualisez l\'enchaînement des époques et des événements.',
    color: '#C4A35A'
  },
  { 
    id: 'glossaire', 
    label: 'Glossaire', 
    icon: BookOpen, 
    description: 'Termes, concepts et définitions pour comprendre l\'histoire.',
    color: '#8B7355'
  },
  { 
    id: 'bibliographie', 
    label: 'Bibliographie', 
    icon: Library, 
    description: 'Sources, références et lectures recommandées.',
    color: '#4A4A4A'
  },
];

const HomePage = () => {
  const { setActiveSection, openDrawer } = useApp();

  // Featured articles (personnages)
  const featuredPersonnages = [PERSONNAGES[0], PERSONNAGES[4], PERSONNAGES[5]];

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="hero-content">
          {/* Decorative top element */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gold" />
            <span className="text-gold text-2xl">✦</span>
            <div className="w-16 h-px bg-gold" />
          </div>

          {/* Main title */}
          <h1 
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold tracking-[0.2em] uppercase"
            style={{ textShadow: '2px 2px 4px rgba(28,18,9,0.2)' }}
          >
            Deux millions d'années d'histoire
          </h1>

          {/* Subtitle */}
          <p className="font-subheading text-lg sm:text-xl md:text-2xl text-earth mt-6 max-w-2xl mx-auto">
            L'Algérie de la préhistoire à nos jours — Encyclopédie de référence
          </p>

          {/* Epigraph */}
          <blockquote className="mt-8 font-caption italic text-earth/70 text-base">
            "L'histoire est l'art de faire parler les silences."
          </blockquote>

          {/* CTA Button */}
          <button
            onClick={() => setActiveSection('periodes')}
            className="mt-10 group relative px-8 py-4 font-ui text-sm uppercase tracking-widest text-earth border-2 border-gold bg-transparent overflow-hidden transition-all duration-300 hover:text-parchment"
            data-testid="explore-btn"
          >
            <span className="relative z-10">Explorer l'encyclopédie</span>
            <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Decorative background map pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 450' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 105 Q100 100 150 105 Q200 100 250 105 Q300 100 350 110 Q400 115 450 105 L480 120 L490 200 Q485 280 480 350 L450 420 L350 440 L250 445 L150 440 L50 430 L20 350 Q15 250 20 180 Z' fill='none' stroke='%23B8860B' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </section>

      {/* Timeline Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-parchment-dark" data-testid="timeline-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-subheading text-2xl sm:text-3xl text-sand font-semibold">
              Frise chronologique
            </h2>
            <p className="font-body text-earth/70 mt-2">
              Naviguez à travers les grandes périodes de l'histoire algérienne
            </p>
          </div>
          <Timeline variant="compact" />
        </div>
      </section>

      {/* Section Cards Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-testid="sections-grid">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="ornament mb-6">❧</div>
            <h2 className="font-subheading text-2xl sm:text-3xl text-sand font-semibold">
              Explorer l'encyclopédie
            </h2>
          </div>

          <div className="grid-sections">
            {sectionCards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => setActiveSection(card.id)}
                className="section-card text-left animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
                data-testid={`section-card-${card.id}`}
              >
                <div 
                  className="section-card-icon p-3 inline-block mb-4"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon size={28} style={{ color: card.color }} />
                </div>
                <h3 className="font-subheading text-xl text-ink font-semibold mb-2">
                  {card.label}
                </h3>
                <p className="font-body text-sm text-earth/70 leading-relaxed">
                  {card.description}
                </p>
                <div 
                  className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: card.color }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-parchment-dark" data-testid="featured-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="ornament mb-6">✦</div>
            <h2 className="font-subheading text-2xl sm:text-3xl text-sand font-semibold">
              En ce moment dans l'encyclopédie
            </h2>
            <p className="font-body text-earth/70 mt-2">
              Découvrez quelques figures majeures de l'histoire algérienne
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredPersonnages.map((personnage, index) => (
              <article
                key={personnage.id}
                onClick={() => openDrawer('personnage', personnage.id)}
                className="featured-article cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`featured-${personnage.id}`}
              >
                {/* Image placeholder */}
                <div 
                  className="w-full h-32 bg-parchment flex items-center justify-center border border-sand/30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a35a' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                >
                  <span className="font-heading text-4xl text-gold/30">
                    {personnage.nom.charAt(0)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div 
                    className="inline-block px-2 py-1 text-xs font-ui uppercase tracking-wider mb-2 self-start"
                    style={{ 
                      backgroundColor: `${personnage.couleurPeriode}20`,
                      color: personnage.couleurPeriode 
                    }}
                  >
                    {personnage.periode}
                  </div>
                  <h3 className="font-subheading text-lg text-ink font-semibold">
                    {personnage.nom}
                  </h3>
                  <p className="font-number text-xs text-gold mt-1">
                    {personnage.dates}
                  </p>
                  <p className="font-body text-sm text-earth/70 mt-2 line-clamp-3">
                    {personnage.biographie.substring(0, 150)}...
                  </p>
                  <span className="mt-auto pt-3 font-ui text-xs uppercase tracking-wider text-gold animated-underline inline-block">
                    Lire la notice →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Text */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-testid="intro-section">
        <div className="max-w-3xl mx-auto">
          <div className="double-border p-8 sm:p-12 bg-parchment">
            <div className="space-y-6">
              <p className="font-body text-lg text-ink leading-relaxed">
                L'histoire de l'Algérie est l'une des plus longues et des plus denses du bassin méditerranéen.
              </p>
              <p className="font-body text-ink/85 leading-relaxed">
                Elle commence avec des traces humaines parmi les plus anciennes d'Afrique — les sites d'Aïn Hanech 
                et de Ternifine témoignent d'une présence humaine vieille de plus d'un million d'années — et se 
                déploie à travers les royaumes numides, l'Empire romain, les dynasties amazighes médiévales, 
                la régence ottomane, la colonisation française, la guerre d'indépendance et soixante ans 
                d'État-nation souverain.
              </p>
              <div className="pt-6 border-t border-border">
                <p className="font-body text-ink font-medium">
                  Cette encyclopédie ne prétend pas être exhaustive. Elle prétend être <span className="text-gold">fiable</span>.
                </p>
                <p className="font-caption italic text-earth/70 mt-4">
                  Pour chaque affirmation, une source. Pour chaque image, un crédit. 
                  Pour chaque incertitude, une mention explicite. Parce que l'histoire mérite mieux que l'approximation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
