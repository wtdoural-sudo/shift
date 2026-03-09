import React from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VILLES, SITES } from '../data/encyclopediaData';
import AlgeriaMapSVG from './AlgeriaMapSVG';
import { Badge } from './ui/badge';

const VillesPage = () => {
  const { openDrawer } = useApp();

  return (
    <div className="min-h-screen" data-testid="villes-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Villes & Sites</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Villes & Sites
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            Cités antiques, médinas ottomanes et sites archéologiques classés au patrimoine mondial.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-24">
              <h2 className="font-ui text-xs uppercase tracking-wider text-legend mb-4 flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                Carte interactive
              </h2>
              <div className="map-container">
                <AlgeriaMapSVG />
              </div>
              <p className="font-caption italic text-sm text-earth/60 mt-4 text-center">
                Cliquez sur une ville pour voir sa fiche détaillée
              </p>
            </div>
          </div>

          {/* Cities & Sites Lists */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Cities */}
            <div>
              <h2 className="font-subheading text-2xl text-sand font-semibold mb-6">
                Villes historiques
              </h2>
              <div className="space-y-4">
                {VILLES.map((ville) => (
                  <article
                    key={ville.id}
                    onClick={() => openDrawer('ville', ville.id)}
                    className="section-card cursor-pointer"
                    data-testid={`ville-card-${ville.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 flex items-center justify-center border border-gold/30 flex-shrink-0"
                        style={{ backgroundColor: '#B8860B10' }}
                      >
                        <MapPin size={20} className="text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-subheading text-lg text-ink font-semibold">
                          {ville.nom}
                        </h3>
                        {ville.nomsAnciens && (
                          <p className="font-caption italic text-sm text-earth/70">
                            {ville.nomsAnciens.slice(0, 2).join(' • ')}
                          </p>
                        )}
                        <p className="font-body text-sm text-earth/80 mt-2 line-clamp-2">
                          {ville.resume}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {ville.periodes?.slice(0, 3).map(p => (
                            <Badge key={p} variant="secondary" className="text-[10px]">
                              {p}
                            </Badge>
                          ))}
                        </div>
                        {ville.statut_patrimoine && (
                          <div className="mt-2">
                            <Badge className="bg-cedar/10 text-cedar border-cedar text-[10px]">
                              {ville.statut_patrimoine}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sites */}
            <div>
              <h2 className="font-subheading text-2xl text-sand font-semibold mb-6">
                Sites patrimoniaux
              </h2>
              <div className="space-y-4">
                {SITES.map((site) => (
                  <article
                    key={site.id}
                    onClick={() => openDrawer('site', site.id)}
                    className="section-card cursor-pointer"
                    data-testid={`site-card-${site.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 flex items-center justify-center border border-roman-red/30 flex-shrink-0"
                        style={{ backgroundColor: '#8B1A1A10' }}
                      >
                        <span className="text-roman-red text-lg">✦</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-subheading text-lg text-ink font-semibold">
                            {site.nom}
                          </h3>
                          {site.statut && (
                            <Badge className="bg-cedar/10 text-cedar border-cedar text-[10px] flex-shrink-0">
                              {site.statut}
                            </Badge>
                          )}
                        </div>
                        <p className="font-caption italic text-sm text-earth/70">
                          {site.type} — {site.region}
                        </p>
                        <p className="font-body text-sm text-earth/80 mt-2 line-clamp-2">
                          {site.resume}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillesPage;
