import React from 'react';
import { ChevronRight } from 'lucide-react';
import Timeline from './Timeline';

const FrisesPage = () => {
  return (
    <div className="min-h-screen" data-testid="frises-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Frises Chronologiques</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Frises Chronologiques
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            Visualisez l'enchaînement des époques et des événements majeurs de l'histoire algérienne.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Timeline */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-subheading text-2xl text-sand font-semibold">
              Frise générale de l'Algérie
            </h2>
            <p className="font-caption italic text-earth/70 mt-2">
              De la préhistoire à nos jours — Deux millions d'années d'histoire
            </p>
          </div>

          <div className="bg-parchment-dark border border-border p-6">
            <Timeline variant="full" />
          </div>
        </div>

        {/* Legend */}
        <div className="mb-12">
          <h3 className="font-ui text-xs uppercase tracking-wider text-legend mb-4">
            Légende des périodes
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: 'Préhistoire', color: '#8B7355' },
              { label: 'Royaumes numides', color: '#B8860B' },
              { label: 'Afrique romaine', color: '#8B1A1A' },
              { label: 'Antiquité tardive', color: '#6B3E26' },
              { label: 'Conquête arabe', color: '#2D5A27' },
              { label: 'Dynasties médiévales', color: '#2E1A6B' },
              { label: 'Régence ottomane', color: '#1A3A5C' },
              { label: 'Colonisation', color: '#4A4A4A' },
              { label: 'Guerre d\'indépendance', color: '#6B3E26' },
              { label: 'Algérie indépendante', color: '#1A5C1A' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-caption text-sm text-earth">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center py-8 border-t border-border">
          <p className="font-body text-earth/70">
            Faites défiler la frise horizontalement pour explorer les différentes périodes.
            <br />
            Cliquez sur une période pour afficher sa fiche détaillée.
          </p>
        </div>

        {/* Methodology note */}
        <div className="mt-8 p-6 bg-uncertain/10 border-l-4 border-uncertain">
          <h3 className="font-ui text-xs uppercase tracking-wider text-uncertain mb-3">
            Note méthodologique
          </h3>
          <p className="font-body text-sm text-earth">
            Les périodisations historiques sont des constructions intellectuelles qui ne correspondent 
            pas toujours à des ruptures nettes dans la réalité. Les transitions entre périodes sont 
            souvent graduelles et les dates de début et de fin sont conventionnelles. Cette frise 
            présente une vision synthétique qui ne rend pas compte de la complexité des chevauchements 
            et des continuités.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrisesPage;
