import React, { useState } from 'react';
import { ChevronRight, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GLOSSAIRE } from '../data/encyclopediaData';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

const categories = [
  { value: 'tous', label: 'Tous les termes' },
  { value: 'ethnonyme', label: 'Ethnonymes' },
  { value: 'concept', label: 'Concepts' },
  { value: 'institution', label: 'Institutions' },
  { value: 'terme_architectural', label: 'Architecture' },
  { value: 'terme_religieux', label: 'Religion' },
  { value: 'terme_historique', label: 'Histoire' },
  { value: 'terme_linguistique', label: 'Linguistique' },
  { value: 'terme_géographique', label: 'Géographie' },
];

const GlossairePage = () => {
  const { openDrawer } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategorie, setFilterCategorie] = useState('tous');

  const filteredTermes = GLOSSAIRE.filter(g => {
    const matchesSearch = g.terme.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         g.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategorie = filterCategorie === 'tous' || g.categorie === filterCategorie;
    return matchesSearch && matchesCategorie;
  }).sort((a, b) => a.terme.localeCompare(b.terme, 'fr'));

  // Group by first letter
  const groupedTermes = filteredTermes.reduce((acc, terme) => {
    const letter = terme.terme.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(terme);
    return acc;
  }, {});

  const letters = Object.keys(groupedTermes).sort();

  return (
    <div className="min-h-screen" data-testid="glossaire-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Glossaire</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Glossaire
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            Termes, concepts et définitions pour comprendre l'histoire de l'Algérie.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth/50" />
            <Input
              type="text"
              placeholder="Rechercher un terme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-parchment border-border font-body"
              data-testid="glossaire-search"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-earth/50" />
            <select
              value={filterCategorie}
              onChange={(e) => setFilterCategorie(e.target.value)}
              className="px-4 py-2 bg-parchment border border-border font-ui text-sm text-earth"
              data-testid="glossaire-filter"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Letter navigation */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border">
          {letters.map(letter => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-8 h-8 flex items-center justify-center font-number text-sm text-earth hover:text-gold hover:bg-gold/10 transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Results count */}
        <p className="font-caption text-sm text-earth/60 mb-6">
          {filteredTermes.length} terme{filteredTermes.length > 1 ? 's' : ''} trouvé{filteredTermes.length > 1 ? 's' : ''}
        </p>

        {/* Terms list */}
        <div className="space-y-8">
          {letters.map(letter => (
            <div key={letter} id={`letter-${letter}`}>
              <div className="sticky top-20 bg-parchment py-2 z-10 border-b border-gold mb-4">
                <span className="font-heading text-2xl text-gold">{letter}</span>
              </div>
              <div className="space-y-1">
                {groupedTermes[letter].map((terme) => (
                  <div
                    key={terme.terme}
                    onClick={() => openDrawer('glossaire', terme.terme)}
                    className="glossary-term cursor-pointer"
                    data-testid={`glossaire-terme-${terme.terme.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-subheading text-lg text-ink font-semibold">
                            {terme.terme}
                          </h3>
                          <Badge variant="outline" className="text-[10px] uppercase">
                            {terme.categorie?.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="font-body text-sm text-earth/80 line-clamp-2">
                          {terme.definition}
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-border flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredTermes.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-earth/60">
              Aucun terme ne correspond à votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlossairePage;
