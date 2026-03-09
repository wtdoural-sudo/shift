import React, { useState } from 'react';
import { ChevronRight, Filter, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PERSONNAGES } from '../data/encyclopediaData';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

const periodeOptions = [
  'Tous',
  'Royaumes numides',
  'Afrique romaine — Antiquité tardive',
  'Conquête arabe',
  'Dynasties médiévales — XIVe siècle',
  'XIXe siècle — Résistance à la colonisation',
  'Mouvement national algérien',
  'Littérature algérienne'
];

const PersonnagesPage = () => {
  const { openDrawer } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriode, setFilterPeriode] = useState('Tous');

  const filteredPersonnages = PERSONNAGES.filter(p => {
    const matchesSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.biographie.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriode = filterPeriode === 'Tous' || p.periode === filterPeriode;
    return matchesSearch && matchesPeriode;
  });

  const getCertitudeBadge = (niveau) => {
    const config = {
      'bien_documente': { label: 'Sources solides', className: 'badge-bien-documente' },
      'probable': { label: 'Probable', className: 'badge-probable' },
      'hypothese': { label: 'Hypothèse', className: 'badge-hypothese' },
      'tres_incertain': { label: 'Sources tardives', className: 'badge-tres-incertain' },
      'tradition': { label: 'Tradition', className: 'badge-tradition' }
    };
    return config[niveau] || config['bien_documente'];
  };

  return (
    <div className="min-h-screen" data-testid="personnages-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Personnages</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Personnages
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            Rois, savants, résistants, artistes : les figures majeures de l'histoire algérienne.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth/50" />
            <Input
              type="text"
              placeholder="Rechercher un personnage..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-parchment border-border font-body"
              data-testid="personnages-search"
            />
          </div>

          {/* Period Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-earth/50" />
            <select
              value={filterPeriode}
              onChange={(e) => setFilterPeriode(e.target.value)}
              className="px-4 py-2 bg-parchment border border-border font-ui text-sm text-earth"
              data-testid="personnages-filter"
            >
              {periodeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="font-caption text-sm text-earth/60 mb-6">
          {filteredPersonnages.length} personnage{filteredPersonnages.length > 1 ? 's' : ''} trouvé{filteredPersonnages.length > 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPersonnages.map((personnage, index) => {
            const badge = getCertitudeBadge(personnage.niveauCertitude);
            return (
              <article
                key={personnage.id}
                onClick={() => openDrawer('personnage', personnage.id)}
                className="section-card cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
                data-testid={`personnage-card-${personnage.id}`}
              >
                {/* Portrait placeholder */}
                <div 
                  className="w-full h-40 mb-4 flex items-center justify-center border border-sand/20"
                  style={{
                    backgroundColor: `${personnage.couleurPeriode}10`,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c4a35a' fill-opacity='0.08'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                >
                  <span 
                    className="font-heading text-5xl"
                    style={{ color: `${personnage.couleurPeriode}40` }}
                  >
                    {personnage.nom.charAt(0)}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <Badge 
                    variant="outline" 
                    className="mb-2 text-[10px] uppercase"
                    style={{ 
                      borderColor: personnage.couleurPeriode,
                      color: personnage.couleurPeriode 
                    }}
                  >
                    {personnage.periode}
                  </Badge>

                  <h3 className="font-subheading text-lg text-ink font-semibold">
                    {personnage.nom}
                  </h3>

                  <p className="font-number text-xs text-gold mt-1">
                    {personnage.dates}
                  </p>

                  <p className="font-ui text-xs text-earth/70 mt-1">
                    {personnage.statut}
                  </p>

                  {/* Certitude badge */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className={`certitude-badge text-[10px] ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* No results */}
        {filteredPersonnages.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-earth/60">
              Aucun personnage ne correspond à votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonnagesPage;
