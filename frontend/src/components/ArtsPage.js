import React, { useState } from 'react';
import { ChevronRight, Building2, Music, BookOpen, Film, Paintbrush } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ARTS_CULTURE } from '../data/encyclopediaData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

const ArtsPage = () => {
  const { openDrawer } = useApp();
  const [activeTab, setActiveTab] = useState('architecture');

  const tabs = [
    { id: 'architecture', label: 'Architecture', icon: Building2 },
    { id: 'musique', label: 'Musique', icon: Music },
    { id: 'litterature', label: 'Littérature', icon: BookOpen },
    { id: 'cinema', label: 'Cinéma', icon: Film },
  ];

  return (
    <div className="min-h-screen" data-testid="arts-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Arts & Culture</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Arts & Culture
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            Architecture, musique, littérature, cinéma : le patrimoine culturel algérien.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab Navigation */}
          <TabsList className="bg-parchment-dark border border-border p-1 mb-8 flex flex-wrap gap-1">
            {tabs.map(tab => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 px-4 py-2 font-ui text-sm uppercase tracking-wider data-[state=active]:bg-gold/10 data-[state=active]:text-gold"
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon size={16} />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Architecture */}
          <TabsContent value="architecture" data-testid="content-architecture">
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="font-subheading text-2xl text-sand font-semibold">
                  {ARTS_CULTURE.architecture.titre}
                </h2>
                <p className="font-body text-earth/70 mt-2">
                  Des mausolées numides aux édifices coloniaux, l'architecture algérienne reflète les strates de son histoire.
                </p>
              </div>
              <div className="grid gap-4">
                {ARTS_CULTURE.architecture.elements.map((elem, i) => (
                  <article
                    key={i}
                    className="section-card"
                    data-testid={`architecture-${i}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-indigo/10 border border-indigo/20 flex-shrink-0">
                        <Building2 size={20} className="text-indigo" />
                      </div>
                      <div>
                        <h3 className="font-subheading text-lg text-ink font-semibold">
                          {elem.nom}
                        </h3>
                        <Badge variant="secondary" className="text-[10px] mt-1">
                          {elem.periode}
                        </Badge>
                        <p className="font-body text-sm text-earth/80 mt-2">
                          {elem.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Musique */}
          <TabsContent value="musique" data-testid="content-musique">
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="font-subheading text-2xl text-sand font-semibold">
                  {ARTS_CULTURE.musique.titre}
                </h2>
                <p className="font-body text-earth/70 mt-2">
                  Du chaâbi au raï, de la musique kabyle à l'arabo-andalouse, les traditions musicales algériennes sont d'une richesse exceptionnelle.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {ARTS_CULTURE.musique.elements.map((elem, i) => (
                  <article
                    key={i}
                    className="section-card"
                    data-testid={`musique-${i}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-mediterranean/10 border border-mediterranean/20 flex-shrink-0">
                        <Music size={20} className="text-mediterranean" />
                      </div>
                      <div>
                        <h3 className="font-subheading text-lg text-ink font-semibold">
                          {elem.nom}
                        </h3>
                        <p className="font-caption italic text-sm text-gold">
                          {elem.region}
                        </p>
                        <p className="font-body text-sm text-earth/80 mt-2">
                          {elem.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Littérature */}
          <TabsContent value="litterature" data-testid="content-litterature">
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="font-subheading text-2xl text-sand font-semibold">
                  {ARTS_CULTURE.litterature.titre}
                </h2>
                <p className="font-body text-earth/70 mt-2">
                  Les grands auteurs algériens, de langue française, arabe et amazighe.
                </p>
              </div>
              <div className="grid gap-4">
                {ARTS_CULTURE.litterature.auteurs.map((auteur, i) => (
                  <article
                    key={i}
                    onClick={() => auteur.lien && openDrawer('personnage', auteur.lien)}
                    className={`section-card ${auteur.lien ? 'cursor-pointer' : ''}`}
                    data-testid={`litterature-${i}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-cedar/10 border border-cedar/20 flex-shrink-0">
                        <BookOpen size={20} className="text-cedar" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-subheading text-lg text-ink font-semibold">
                              {auteur.nom}
                            </h3>
                            <p className="font-number text-xs text-gold">
                              {auteur.dates}
                            </p>
                          </div>
                          {auteur.lien && (
                            <ChevronRight size={18} className="text-gold" />
                          )}
                        </div>
                        <p className="font-body text-sm text-earth/80 mt-2">
                          {auteur.oeuvres}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Cinéma */}
          <TabsContent value="cinema" data-testid="content-cinema">
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="font-subheading text-2xl text-sand font-semibold">
                  {ARTS_CULTURE.cinema.titre}
                </h2>
                <p className="font-body text-earth/70 mt-2">
                  Le cinéma algérien, de la guerre d'indépendance à aujourd'hui.
                </p>
              </div>
              <div className="grid gap-4">
                {ARTS_CULTURE.cinema.elements.map((film, i) => (
                  <article
                    key={i}
                    className="section-card"
                    data-testid={`cinema-${i}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-20 flex items-center justify-center bg-roman-red/10 border border-roman-red/20 flex-shrink-0">
                        <Film size={24} className="text-roman-red" />
                      </div>
                      <div>
                        <h3 className="font-subheading text-lg text-ink font-semibold">
                          {film.nom}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-number text-sm text-gold">
                            {film.annee}
                          </span>
                          <span className="text-earth/30">|</span>
                          <span className="font-caption italic text-sm text-earth/70">
                            {film.realisateur}
                          </span>
                        </div>
                        <p className="font-body text-sm text-earth/80 mt-2">
                          {film.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtsPage;
