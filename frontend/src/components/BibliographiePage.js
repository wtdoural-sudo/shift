import React from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { BIBLIOGRAPHIE } from '../data/encyclopediaData';

const BibliographiePage = () => {
  return (
    <div className="min-h-screen" data-testid="bibliographie-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Bibliographie</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Bibliographie
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            Sources, références et lectures recommandées pour approfondir l'histoire de l'Algérie.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bibliography sections */}
        <div className="space-y-10">
          {BIBLIOGRAPHIE.map((section, index) => (
            <section 
              key={index} 
              className="bibliography-section"
              data-testid={`biblio-section-${index}`}
            >
              <h2 className="font-subheading text-xl text-sand font-semibold mb-4 pb-2 border-b border-border">
                {section.categorie}
              </h2>
              <div className="space-y-1">
                {section.references.map((ref, i) => (
                  <p key={i} className="bibliography-reference">
                    {ref}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Credits section */}
        <div className="mt-16 pt-8 border-t-2 border-gold">
          <h2 className="font-subheading text-2xl text-sand font-semibold mb-6">
            Crédits
          </h2>

          <div className="space-y-8">
            {/* Iconographic credits */}
            <div>
              <h3 className="font-ui text-xs uppercase tracking-wider text-legend mb-3">
                Crédits iconographiques
              </h3>
              <div className="p-4 bg-parchment-dark border border-border">
                <p className="font-body text-sm text-earth leading-relaxed">
                  Cette encyclopédie est un prototype éditorial. Les illustrations utilisées sont :
                </p>
                <ul className="mt-3 space-y-2 font-body text-sm text-earth/80">
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Générées à des fins de démonstration (restitutions visuelles — signalées comme telles)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Issues du domaine public (Gallica-BnF, Wikimedia Commons)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Tous les droits des images originales appartiennent à leurs détenteurs respectifs.
                  </li>
                </ul>
              </div>
            </div>

            {/* Cartographic credits */}
            <div>
              <h3 className="font-ui text-xs uppercase tracking-wider text-legend mb-3">
                Crédits cartographiques
              </h3>
              <div className="p-4 bg-parchment-dark border border-border">
                <p className="font-body text-sm text-earth leading-relaxed">
                  Les cartes SVG de cette application sont des restitutions de synthèse
                  basées sur les sources bibliographiques citées. Elles ne constituent pas
                  des documents cartographiques officiels. <strong>Frontières approximatives.</strong>
                </p>
              </div>
            </div>

            {/* Historiographic note */}
            <div>
              <h3 className="font-ui text-xs uppercase tracking-wider text-legend mb-3">
                Précaution historiographique générale
              </h3>
              <div className="p-4 bg-uncertain/10 border-l-4 border-uncertain">
                <p className="font-body text-sm text-earth leading-relaxed">
                  Cette encyclopédie distingue systématiquement faits établis, hypothèses
                  et traditions narratives. Toute information est accompagnée d'un indicateur
                  de niveau de certitude et de références bibliographiques.
                </p>
              </div>
            </div>

            {/* Technical credits */}
            <div>
              <h3 className="font-ui text-xs uppercase tracking-wider text-legend mb-3">
                Réalisation technique
              </h3>
              <div className="p-4 bg-parchment-dark border border-border">
                <p className="font-body text-sm text-earth leading-relaxed">
                  EHIA — Encyclopédie Historique Illustrée de l'Algérie
                  <br />
                  Application développée avec React, FastAPI et MongoDB.
                  <br />
                  Design inspiré des atlas historiques du XVIIIe siècle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Version info */}
        <div className="mt-12 text-center">
          <p className="font-caption italic text-sm text-earth/50">
            EHIA v1.0 — Prototype éditorial
          </p>
        </div>
      </div>
    </div>
  );
};

export default BibliographiePage;
