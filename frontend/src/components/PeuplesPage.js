import React from 'react';
import { ChevronRight, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Badge } from './ui/badge';

const PeuplesPage = () => {
  const { openDrawer } = useApp();

  const peuples = [
    {
      id: 'amazighs',
      nom: 'Amazighs (Berbères)',
      description: 'Population autochtone d\'Afrique du Nord présente depuis la préhistoire. Le terme "Amazigh" (pl. Imazighen) signifie "homme libre" ou "homme noble". Les Berbères ont développé des royaumes puissants (Numidie, Maurétanie) et ont joué un rôle majeur dans toutes les périodes de l\'histoire algérienne.',
      periodes: ['Préhistoire', 'Antiquité', 'Moyen Âge', 'Contemporain'],
      regions: ['Kabylie', 'Aurès', 'M\'zab', 'Touareg'],
      termeGlossaire: 'Amazigh'
    },
    {
      id: 'pheniciens',
      nom: 'Phéniciens & Carthaginois',
      description: 'Marchands et navigateurs originaires du Levant (actuel Liban), les Phéniciens établirent des comptoirs sur les côtes algériennes dès le IXe siècle av. J.-C. Carthage, colonie phénicienne devenue puissance majeure, exerça une influence considérable jusqu\'à sa destruction par Rome en 146 av. J.-C.',
      periodes: ['Antiquité'],
      regions: ['Littoral méditerranéen'],
      termeGlossaire: null
    },
    {
      id: 'romains',
      nom: 'Romains',
      description: 'L\'Empire romain domina l\'Afrique du Nord pendant près de cinq siècles (146 av. J.-C. - 430 ap. J.-C.). Les Romains développèrent les villes, l\'agriculture et les routes. La romanisation fut profonde mais inégale, les populations berbères conservant leurs langues et traditions.',
      periodes: ['Antiquité'],
      regions: ['Provinces de Numidie et Maurétanie'],
      termeGlossaire: null
    },
    {
      id: 'arabes',
      nom: 'Arabes',
      description: 'La conquête arabe du VIIe siècle apporta l\'islam et la langue arabe. L\'arabisation fut progressive et inégale. Plusieurs vagues migratoires (Hilaliens au XIe siècle) renforcèrent la présence arabe. La population arabophone actuelle résulte largement de l\'arabisation des Berbères.',
      periodes: ['Moyen Âge', 'Régence ottomane', 'Contemporain'],
      regions: ['Plaines, hauts plateaux, Sahara'],
      termeGlossaire: null
    },
    {
      id: 'turcs',
      nom: 'Turcs ottomans',
      description: 'La régence d\'Alger (1516-1830) fut dirigée par une élite turque (janissaires, deys, beys). Minoritaires mais dominants politiquement, les Turcs se mêlèrent peu à la population locale. Leur présence laissa des traces dans l\'architecture et les institutions.',
      periodes: ['Régence ottomane'],
      regions: ['Villes côtières, chefs-lieux de beyliks'],
      termeGlossaire: 'Dey'
    },
    {
      id: 'europeens',
      nom: 'Européens (colons)',
      description: 'La colonisation française (1830-1962) attira des populations d\'Europe : Français, mais aussi Espagnols (Oranie), Italiens, Maltais, Alsaciens. Les "pieds-noirs" formèrent jusqu\'à 10% de la population. La quasi-totalité quitta l\'Algérie en 1962.',
      periodes: ['Colonisation'],
      regions: ['Villes côtières, plaines agricoles'],
      termeGlossaire: null
    },
    {
      id: 'touaregs',
      nom: 'Touaregs',
      description: 'Population amazighe du Sahara central. Les Touaregs ont développé une civilisation nomade adaptée au désert, avec une écriture propre (tifinagh), une organisation sociale matrilinéaire et une économie caravanière. Ils sont présents dans le sud de l\'Algérie (Ahaggar, Tassili).',
      periodes: ['Préhistoire', 'Moyen Âge', 'Contemporain'],
      regions: ['Ahaggar', 'Tassili', 'Sahara'],
      termeGlossaire: 'Tifinagh'
    },
    {
      id: 'mozabites',
      nom: 'Mozabites',
      description: 'Population berbère ibadite du M\'zab (région de Ghardaïa). Descendants de communautés qui fondèrent la Pentapole au XIe siècle pour fuir les persécutions religieuses. Ils ont développé une architecture et une organisation sociale uniques, reconnues par l\'UNESCO.',
      periodes: ['Moyen Âge', 'Contemporain'],
      regions: ['M\'zab (Ghardaïa)'],
      termeGlossaire: 'Ibadisme'
    }
  ];

  return (
    <div className="min-h-screen" data-testid="peuples-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Peuples & Régions</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Peuples & Régions
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            Les populations et cultures qui ont façonné l'histoire de l'Algérie.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="mb-12 p-6 bg-parchment-dark border border-border">
          <p className="font-body text-ink/90 leading-relaxed">
            L'Algérie est le produit d'une histoire plurimillénaire où se sont croisées, mêlées 
            et superposées de nombreuses populations. Des premiers habitants du Néolithique aux 
            vagues migratoires modernes, chaque groupe a contribué à façonner l'identité complexe 
            et plurielle du pays.
          </p>
        </div>

        {/* Peoples grid */}
        <div className="grid gap-6">
          {peuples.map((peuple, index) => (
            <article
              key={peuple.id}
              className="section-card animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
              data-testid={`peuple-card-${peuple.id}`}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-16 h-16 flex items-center justify-center bg-earth/10 border border-earth/20 flex-shrink-0"
                >
                  <Users size={28} className="text-earth" />
                </div>
                <div className="flex-1">
                  <h3 className="font-subheading text-xl text-ink font-semibold">
                    {peuple.nom}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {peuple.periodes.map(p => (
                      <Badge key={p} variant="secondary" className="text-[10px]">
                        {p}
                      </Badge>
                    ))}
                  </div>

                  <p className="font-body text-earth/80 mt-3 leading-relaxed">
                    {peuple.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    {peuple.regions && (
                      <span className="font-caption italic text-earth/60">
                        Régions : {peuple.regions.join(', ')}
                      </span>
                    )}
                    {peuple.termeGlossaire && (
                      <button
                        onClick={() => openDrawer('glossaire', peuple.termeGlossaire)}
                        className="font-ui text-xs uppercase tracking-wider text-gold hover:underline"
                      >
                        Voir glossaire →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Methodology note */}
        <div className="mt-12 p-6 bg-uncertain/10 border-l-4 border-uncertain">
          <h3 className="font-ui text-xs uppercase tracking-wider text-uncertain mb-3">
            Note méthodologique
          </h3>
          <p className="font-body text-sm text-earth">
            Les catégorisations ethniques sont des constructions historiques et sociales. 
            Les frontières entre groupes ont toujours été poreuses, avec des métissages, 
            des conversions linguistiques et des assimilations continues. Cette présentation 
            simplifiée ne rend pas compte de la complexité des identités individuelles et collectives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeuplesPage;
