import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CARTES_DATA } from '../data/encyclopediaData';
import AlgeriaMapSVG from './AlgeriaMapSVG';
import { Badge } from './ui/badge';

const AtlasPage = () => {
  const { openDrawer } = useApp();

  return (
    <div className="min-h-screen" data-testid="atlas-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Atlas & Cartes</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Atlas & Cartes
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            Cartes interactives des territoires et des civilisations qui ont façonné l'Algérie.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main interactive map */}
        <div className="mb-12">
          <h2 className="font-subheading text-2xl text-sand font-semibold mb-6">
            Carte interactive de l'Algérie
          </h2>
          <div className="map-container">
            <AlgeriaMapSVG />
          </div>
          <div className="mt-4 p-4 bg-parchment-dark border border-border">
            <p className="font-caption italic text-sm text-earth/70 text-center">
              Carte de synthèse — Cliquez sur les villes pour afficher leur fiche détaillée.
              <br />
              Frontières et localisations approximatives.
            </p>
          </div>
        </div>

        {/* Map catalog */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-subheading text-2xl text-sand font-semibold">
              Catalogue des cartes
            </h2>
            <span className="font-caption text-sm text-earth/60">
              {CARTES_DATA.length} cartes disponibles
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARTES_DATA.map((carte, index) => (
              <article
                key={carte.id}
                className="section-card cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
                data-testid={`carte-card-${carte.id}`}
              >
                {/* Map preview placeholder */}
                <div 
                  className="w-full h-40 mb-4 flex items-center justify-center border border-sand/20"
                  style={{
                    backgroundColor: '#1A3A5C10',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20 Q30 15 50 20 Q70 25 90 20 L95 30 L93 70 L85 85 L50 90 L15 85 L7 70 Z' fill='none' stroke='%231A3A5C' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
                    backgroundSize: '80%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <span className="font-heading text-lg text-mediterranean/30">
                    CARTE
                  </span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant="outline" 
                      className="text-[10px] uppercase"
                    >
                      {carte.type}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className="text-[10px]"
                    >
                      {carte.periode}
                    </Badge>
                  </div>

                  <h3 className="font-subheading text-lg text-ink font-semibold">
                    {carte.titre}
                  </h3>

                  <p className="font-body text-sm text-earth/70 mt-2 line-clamp-2">
                    {carte.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Methodology note */}
        <div className="mt-12 p-6 bg-uncertain/10 border-l-4 border-uncertain">
          <h3 className="font-ui text-xs uppercase tracking-wider text-uncertain mb-3">
            Note cartographique
          </h3>
          <p className="font-body text-sm text-earth">
            Les cartes de cette encyclopédie sont des restitutions de synthèse basées sur les sources 
            bibliographiques citées. Elles ne constituent pas des documents cartographiques officiels. 
            Les frontières historiques sont approximatives et leur tracé fait l'objet de débats 
            historiographiques. Toute carte est une interprétation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AtlasPage;
