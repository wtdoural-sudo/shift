import React from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, BookOpen, MapPin, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

const CertitudeBadge = ({ niveau }) => {
  const config = {
    'bien_documente': { label: 'Sources solides', className: 'badge-bien-documente', icon: '✓' },
    'probable': { label: 'Probable', className: 'badge-probable', icon: '~' },
    'hypothese': { label: 'Hypothèse', className: 'badge-hypothese', icon: '?' },
    'tres_incertain': { label: 'Sources tardives', className: 'badge-tres-incertain', icon: '⚠' },
    'tradition': { label: 'Tradition narrative', className: 'badge-tradition', icon: '✗' }
  };

  const conf = config[niveau] || config['bien_documente'];

  return (
    <span className={`certitude-badge ${conf.className}`} data-testid="certitude-badge">
      <span>{conf.icon}</span>
      <span>{conf.label}</span>
    </span>
  );
};

const DrawerPersonnage = ({ data }) => {
  const { openDrawer } = useApp();

  return (
    <div className="p-6 space-y-6" data-testid="drawer-personnage">
      {/* Image placeholder */}
      <div 
        className="w-full h-48 bg-parchment-dark flex items-center justify-center border border-sand/30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a35a' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <span className="font-heading text-4xl text-gold/30">{data.nom.charAt(0)}</span>
      </div>
      <p className="font-caption italic text-earth/70 text-sm text-center">
        {data.iconographie || "Aucun portrait contemporain"}
      </p>

      {/* Title */}
      <div>
        <h2 className="font-subheading text-2xl text-ink font-semibold">{data.nom}</h2>
        {data.variantes && (
          <p className="font-caption italic text-earth/80 mt-1">
            {data.variantes.join(' • ')}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <span className="font-number text-gold text-sm">{data.dates}</span>
          <span className="text-earth/50">|</span>
          <span className="font-ui text-xs uppercase tracking-wider text-earth">{data.statut}</span>
        </div>
      </div>

      {/* Certitude */}
      <div className="py-3 border-y border-border">
        <p className="font-ui text-xs uppercase tracking-wider text-legend mb-2">Niveau de certitude</p>
        <CertitudeBadge niveau={data.niveauCertitude} />
        {data.niveauLabel && (
          <p className="text-sm text-roman-red mt-2 font-caption italic">{data.niveauLabel}</p>
        )}
      </div>

      {/* Biography */}
      <div>
        <p className="font-body text-ink/90 leading-relaxed whitespace-pre-line">
          {data.biographie}
        </p>
      </div>

      {/* Methodological note */}
      {data.noteMethodologique && (
        <div className="p-4 bg-uncertain/10 border-l-4 border-uncertain">
          <p className="font-ui text-xs uppercase tracking-wider text-uncertain mb-2">Note méthodologique</p>
          <p className="font-caption italic text-sm text-earth">{data.noteMethodologique}</p>
        </div>
      )}

      {/* Context */}
      {data.contexteMondial && (
        <div>
          <p className="font-ui text-xs uppercase tracking-wider text-legend mb-2">Contexte mondial</p>
          <p className="font-body text-sm text-earth">{data.contexteMondial}</p>
        </div>
      )}

      {/* Sources */}
      <div className="space-y-4 pt-4 border-t border-border">
        {data.sourcePrimaire && (
          <div>
            <p className="font-ui text-xs uppercase tracking-wider text-legend mb-2 flex items-center gap-2">
              <BookOpen size={14} /> Sources primaires
            </p>
            <p className="font-caption italic text-sm text-earth">{data.sourcePrimaire}</p>
          </div>
        )}
        {data.sourceSecondaire && (
          <div>
            <p className="font-ui text-xs uppercase tracking-wider text-legend mb-2">Sources secondaires</p>
            <p className="font-caption italic text-sm text-earth">{data.sourceSecondaire}</p>
          </div>
        )}
      </div>

      {/* Related */}
      {(data.sitesLies || data.periodesLiees) && (
        <div className="pt-4 border-t border-border">
          <p className="font-ui text-xs uppercase tracking-wider text-legend mb-3">Voir aussi</p>
          <div className="flex flex-wrap gap-2">
            {data.sitesLies?.map(siteId => (
              <Badge 
                key={siteId}
                variant="outline"
                className="cursor-pointer hover:bg-gold/10 hover:border-gold"
                onClick={() => openDrawer('site', siteId)}
              >
                <MapPin size={12} className="mr-1" />
                {siteId}
              </Badge>
            ))}
            {data.periodesLiees?.map(periodeId => (
              <Badge 
                key={periodeId}
                variant="outline"
                className="cursor-pointer hover:bg-gold/10 hover:border-gold"
                onClick={() => openDrawer('periode', periodeId)}
              >
                <Calendar size={12} className="mr-1" />
                {periodeId}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DrawerVille = ({ data }) => {
  const { openDrawer } = useApp();

  return (
    <div className="p-6 space-y-6" data-testid="drawer-ville">
      {/* Image */}
      <div 
        className="w-full h-48 bg-parchment-dark flex items-center justify-center border border-sand/30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a35a' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <MapPin size={48} className="text-gold/30" />
      </div>

      {/* Title */}
      <div>
        <h2 className="font-subheading text-2xl text-ink font-semibold">{data.nom}</h2>
        {data.nomsAnciens && (
          <p className="font-caption italic text-earth/80 mt-1">
            {data.nomsAnciens.join(' • ')}
          </p>
        )}
        {data.coordonnees && (
          <p className="font-number text-xs text-legend mt-2">
            {data.coordonnees.lat.toFixed(2)}°N, {data.coordonnees.lon.toFixed(2)}°E
          </p>
        )}
      </div>

      {/* Periods */}
      {data.periodes && (
        <div className="flex flex-wrap gap-2">
          {data.periodes.map(periode => (
            <Badge key={periode} variant="secondary" className="text-xs">
              {periode}
            </Badge>
          ))}
        </div>
      )}

      {/* Certitude */}
      <div className="py-3 border-y border-border">
        <CertitudeBadge niveau={data.niveauCertitude || 'bien_documente'} />
      </div>

      {/* Resume */}
      <p className="font-body text-ink/90 leading-relaxed">{data.resume}</p>

      {/* Monuments */}
      {data.monuments && (
        <div>
          <p className="font-ui text-xs uppercase tracking-wider text-legend mb-3">Monuments & sites</p>
          <ul className="space-y-2">
            {data.monuments.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-earth">
                <span className="text-gold mt-1">✦</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* UNESCO */}
      {data.statut_patrimoine && (
        <div className="p-4 bg-cedar/10 border-l-4 border-cedar">
          <p className="font-ui text-xs uppercase tracking-wider text-cedar">
            Patrimoine mondial {data.statut_patrimoine}
          </p>
        </div>
      )}

      {/* Iconography */}
      {data.iconographie && (
        <div className="pt-4 border-t border-border">
          <p className="font-ui text-xs uppercase tracking-wider text-legend mb-2">Iconographie</p>
          <p className="font-caption italic text-sm text-earth">{data.iconographie}</p>
        </div>
      )}
    </div>
  );
};

const DrawerPeriode = ({ data }) => {
  const { openDrawer } = useApp();

  return (
    <div data-testid="drawer-periode">
      {/* Banner */}
      <div 
        className="period-banner"
        style={{ backgroundColor: data.couleur }}
      >
        <p className="font-number text-sm opacity-80 relative z-10">{data.dates}</p>
        <h2 className="font-subheading text-2xl font-semibold mt-2 relative z-10">{data.nom}</h2>
        <p className="font-body mt-2 opacity-90 relative z-10">{data.resume}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Description */}
        <div className="font-body text-ink/90 leading-relaxed whitespace-pre-line">
          {data.description}
        </div>

        {/* Key events */}
        {data.evenementsCles && (
          <div>
            <p className="font-ui text-xs uppercase tracking-wider text-legend mb-4">Événements clés</p>
            <div className="space-y-3">
              {data.evenementsCles.map((evt, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-4 p-3 border-l-4 ${evt.lien ? 'cursor-pointer hover:bg-gold/5' : ''}`}
                  style={{ borderLeftColor: data.couleur }}
                  onClick={() => evt.lien && openDrawer('personnage', evt.lien)}
                >
                  <span className="font-number text-sm text-gold whitespace-nowrap">
                    {evt.date > 0 ? evt.date : `${Math.abs(evt.date)} av. J.-C.`}
                  </span>
                  <span className="font-body text-sm text-ink">{evt.label}</span>
                  {evt.lien && <ExternalLink size={14} className="text-gold ml-auto flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DrawerGlossaire = ({ data }) => {
  return (
    <div className="p-6 space-y-6" data-testid="drawer-glossaire">
      <div>
        <Badge variant="outline" className="mb-3 text-xs uppercase">
          {data.categorie?.replace('_', ' ')}
        </Badge>
        <h2 className="font-subheading text-2xl text-ink font-semibold">{data.terme}</h2>
      </div>

      <p className="font-body text-ink/90 leading-relaxed">{data.definition}</p>

      {data.sources && (
        <div className="pt-4 border-t border-border">
          <p className="font-ui text-xs uppercase tracking-wider text-legend mb-2">Sources</p>
          <p className="font-caption italic text-sm text-earth">{data.sources}</p>
        </div>
      )}
    </div>
  );
};

const DrawerSite = ({ data }) => {
  return (
    <div className="p-6 space-y-6" data-testid="drawer-site">
      {/* Image placeholder */}
      <div 
        className="w-full h-48 bg-parchment-dark flex items-center justify-center border border-sand/30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a35a' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <MapPin size={48} className="text-gold/30" />
      </div>

      <div>
        <Badge variant="outline" className="mb-3 text-xs uppercase">
          {data.type}
        </Badge>
        <h2 className="font-subheading text-2xl text-ink font-semibold">{data.nom}</h2>
        <p className="font-caption italic text-earth/80 mt-1">{data.region}</p>
      </div>

      {data.statut && (
        <div className="p-3 bg-cedar/10 border-l-4 border-cedar">
          <p className="font-ui text-xs uppercase tracking-wider text-cedar">
            Patrimoine mondial {data.statut}
          </p>
        </div>
      )}

      <p className="font-body text-ink/90 leading-relaxed">{data.resume}</p>

      {data.noteMethodologique && (
        <div className="p-4 bg-uncertain/10 border-l-4 border-uncertain">
          <p className="font-ui text-xs uppercase tracking-wider text-uncertain mb-2">Note méthodologique</p>
          <p className="font-caption italic text-sm text-earth">{data.noteMethodologique}</p>
        </div>
      )}

      {data.coordonnees && (
        <p className="font-number text-xs text-legend">
          Coordonnées : {data.coordonnees.lat.toFixed(2)}°N, {data.coordonnees.lon.toFixed(2)}°E
        </p>
      )}
    </div>
  );
};

const Drawer = () => {
  const { 
    drawerOpen, 
    drawerContent, 
    drawerHistory, 
    closeDrawer, 
    goBackInDrawer 
  } = useApp();

  const renderContent = () => {
    if (!drawerContent) return null;

    switch (drawerContent.type) {
      case 'personnage':
        return <DrawerPersonnage data={drawerContent.data} />;
      case 'ville':
        return <DrawerVille data={drawerContent.data} />;
      case 'periode':
        return <DrawerPeriode data={drawerContent.data} />;
      case 'glossaire':
        return <DrawerGlossaire data={drawerContent.data} />;
      case 'site':
        return <DrawerSite data={drawerContent.data} />;
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    if (!drawerContent) return '';
    const labels = {
      personnage: 'Personnage',
      ville: 'Ville',
      periode: 'Période',
      glossaire: 'Glossaire',
      site: 'Site'
    };
    return labels[drawerContent.type] || '';
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`drawer-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
        data-testid="drawer-overlay"
      />

      {/* Panel */}
      <div 
        className={`drawer-panel ${drawerOpen ? 'open' : ''}`}
        data-testid="drawer-panel"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-parchment border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {drawerHistory.length > 0 && (
                <button 
                  onClick={goBackInDrawer}
                  className="p-2 hover:bg-gold/10 transition-colors"
                  aria-label="Retour"
                  data-testid="drawer-back-btn"
                >
                  <ChevronLeft size={20} className="text-earth" />
                </button>
              )}
              <span className="font-ui text-xs uppercase tracking-wider text-legend">
                {getTypeLabel()}
              </span>
            </div>
            <button 
              onClick={closeDrawer}
              className="p-2 hover:bg-gold/10 transition-colors flex-shrink-0"
              aria-label="Fermer"
              data-testid="drawer-close-btn"
            >
              <X size={24} className="text-earth" />
            </button>
          </div>

          {/* Breadcrumb */}
          {drawerHistory.length > 0 && (
            <div className="drawer-breadcrumb">
              {drawerHistory.map((item, i) => (
                <React.Fragment key={i}>
                  <span className="drawer-breadcrumb-item">
                    {item?.data?.nom || item?.data?.terme || '...'}
                  </span>
                  <ChevronRight size={12} className="drawer-breadcrumb-separator" />
                </React.Fragment>
              ))}
              <span className="text-gold">
                {drawerContent?.data?.nom || drawerContent?.data?.terme}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          {renderContent()}
        </ScrollArea>
      </div>
    </>
  );
};

export default Drawer;
