import React from 'react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { setActiveSection } = useApp();

  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gold text-xl">✦</span>
              <div>
                <h3 className="font-heading text-xl text-gold tracking-wider">EHIA</h3>
                <p className="font-ui text-xs text-parchment/60 tracking-widest uppercase">
                  Encyclopédie Historique Illustrée de l'Algérie
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-parchment/70 leading-relaxed max-w-md">
              Une encyclopédie numérique de référence couvrant l'histoire de l'Algérie 
              de la préhistoire à nos jours. Pour chaque affirmation, une source. 
              Pour chaque incertitude, une mention explicite.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-ui text-xs uppercase tracking-wider text-gold mb-4">
              Navigation
            </h4>
            <nav className="space-y-2">
              {['periodes', 'atlas', 'personnages', 'villes', 'glossaire'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className="block font-ui text-sm text-parchment/70 hover:text-gold transition-colors capitalize"
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-ui text-xs uppercase tracking-wider text-gold mb-4">
              Ressources
            </h4>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection('bibliographie')}
                className="block font-ui text-sm text-parchment/70 hover:text-gold transition-colors"
              >
                Bibliographie
              </button>
              <button
                onClick={() => setActiveSection('bibliographie')}
                className="block font-ui text-sm text-parchment/70 hover:text-gold transition-colors"
              >
                Crédits
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-parchment/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-caption text-xs text-parchment/50">
              © 2024 EHIA — Prototype éditorial
            </p>
            <p className="font-caption italic text-xs text-parchment/50">
              "L'histoire est l'art de faire parler les silences."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
