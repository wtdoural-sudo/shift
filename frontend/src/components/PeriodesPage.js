import React, { useState } from 'react';
import { ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PERIODES } from '../data/encyclopediaData';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

const PeriodesPage = () => {
  const { openDrawer, activePeriode, setActivePeriode } = useApp();
  const [selectedPeriode, setSelectedPeriode] = useState(
    activePeriode ? PERIODES.find(p => p.id === activePeriode) : null
  );

  const handlePeriodeClick = (periode) => {
    setSelectedPeriode(periode);
    setActivePeriode(periode.id);
  };

  return (
    <div className="min-h-screen" data-testid="periodes-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Périodes Historiques</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Périodes Historiques
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            De la préhistoire à l'Algérie contemporaine, explorez les grandes époques 
            qui ont façonné l'histoire du territoire.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Periods List */}
          <div className="lg:col-span-1">
            <h2 className="font-ui text-xs uppercase tracking-wider text-legend mb-4">
              Sélectionnez une période
            </h2>
            <div className="space-y-2">
              {PERIODES.map((periode) => (
                <button
                  key={periode.id}
                  onClick={() => handlePeriodeClick(periode)}
                  className={`w-full text-left p-4 border transition-all ${
                    selectedPeriode?.id === periode.id
                      ? 'border-gold bg-gold/5'
                      : 'border-border hover:border-sand hover:bg-parchment-dark'
                  }`}
                  data-testid={`periode-btn-${periode.id}`}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: periode.couleur }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-subheading text-ink font-medium truncate">
                        {periode.nom}
                      </p>
                      <p className="font-number text-xs text-gold mt-1">
                        {periode.dates}
                      </p>
                    </div>
                    <ChevronRight 
                      size={16} 
                      className={`flex-shrink-0 transition-colors ${
                        selectedPeriode?.id === periode.id ? 'text-gold' : 'text-border'
                      }`} 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Period Detail */}
          <div className="lg:col-span-2">
            {selectedPeriode ? (
              <div data-testid="periode-detail">
                {/* Banner */}
                <div 
                  className="period-banner mb-6"
                  style={{ backgroundColor: selectedPeriode.couleur }}
                >
                  <p className="font-number text-lg opacity-90 relative z-10">
                    {selectedPeriode.dates}
                  </p>
                  <h2 className="font-subheading text-3xl font-semibold mt-2 relative z-10">
                    {selectedPeriode.nom}
                  </h2>
                  <p className="font-body text-lg opacity-90 mt-3 relative z-10 max-w-2xl">
                    {selectedPeriode.resume}
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                  {/* Description */}
                  <div className="prose prose-lg max-w-none">
                    <div className="font-body text-ink/90 leading-relaxed whitespace-pre-line">
                      {selectedPeriode.description}
                    </div>
                  </div>

                  {/* Key Events */}
                  {selectedPeriode.evenementsCles && (
                    <div className="pt-8 border-t border-border">
                      <h3 className="font-ui text-xs uppercase tracking-wider text-legend mb-6 flex items-center gap-2">
                        <Calendar size={14} className="text-gold" />
                        Événements clés
                      </h3>
                      <div className="space-y-3">
                        {selectedPeriode.evenementsCles.map((evt, i) => (
                          <div 
                            key={i}
                            className={`flex items-start gap-4 p-4 border-l-4 bg-parchment-dark ${
                              evt.lien ? 'cursor-pointer hover:bg-gold/5' : ''
                            }`}
                            style={{ borderLeftColor: selectedPeriode.couleur }}
                            onClick={() => evt.lien && openDrawer('personnage', evt.lien)}
                          >
                            <span className="font-number text-gold whitespace-nowrap min-w-[100px]">
                              {evt.date > 0 ? evt.date : `${Math.abs(evt.date)} av. J.-C.`}
                            </span>
                            <span className="font-body text-ink flex-1">{evt.label}</span>
                            {evt.lien && (
                              <ChevronRight size={16} className="text-gold flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-8 border-t border-border">
                    {(() => {
                      const currentIndex = PERIODES.findIndex(p => p.id === selectedPeriode.id);
                      const prevPeriode = currentIndex > 0 ? PERIODES[currentIndex - 1] : null;
                      const nextPeriode = currentIndex < PERIODES.length - 1 ? PERIODES[currentIndex + 1] : null;

                      return (
                        <>
                          {prevPeriode ? (
                            <button
                              onClick={() => handlePeriodeClick(prevPeriode)}
                              className="text-left group"
                            >
                              <span className="font-ui text-xs uppercase tracking-wider text-legend">
                                ← Période précédente
                              </span>
                              <p className="font-subheading text-earth group-hover:text-gold transition-colors">
                                {prevPeriode.nom}
                              </p>
                            </button>
                          ) : <div />}
                          {nextPeriode ? (
                            <button
                              onClick={() => handlePeriodeClick(nextPeriode)}
                              className="text-right group"
                            >
                              <span className="font-ui text-xs uppercase tracking-wider text-legend">
                                Période suivante →
                              </span>
                              <p className="font-subheading text-earth group-hover:text-gold transition-colors">
                                {nextPeriode.nom}
                              </p>
                            </button>
                          ) : <div />}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-parchment-dark border border-dashed border-border">
                <p className="font-caption italic text-earth/60">
                  Sélectionnez une période pour afficher les détails
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodesPage;
