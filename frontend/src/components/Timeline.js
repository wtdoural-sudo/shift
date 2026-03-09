import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PERIODES, FRISES_DATA } from '../data/encyclopediaData';

const Timeline = ({ variant = 'compact' }) => {
  const { openDrawer, setActiveSection, setActivePeriode } = useApp();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  const handlePeriodClick = (periode) => {
    if (variant === 'compact') {
      setActiveSection('periodes');
      setActivePeriode(periode.id);
    } else {
      openDrawer('periode', periode.id);
    }
  };

  const formatDate = (date) => {
    if (date < 0) {
      return `${Math.abs(date).toLocaleString()} av. J.-C.`;
    }
    return date.toString();
  };

  // Determine which periods to show based on variant
  const periodsToShow = variant === 'full' 
    ? FRISES_DATA.generale.periodes 
    : PERIODES;

  return (
    <div className="relative" data-testid="timeline">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-parchment/90 border border-border shadow-md hover:bg-gold/10 transition-colors"
          aria-label="Défiler à gauche"
          data-testid="timeline-scroll-left"
        >
          <ChevronLeft size={20} className="text-earth" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-parchment/90 border border-border shadow-md hover:bg-gold/10 transition-colors"
          aria-label="Défiler à droite"
          data-testid="timeline-scroll-right"
        >
          <ChevronRight size={20} className="text-earth" />
        </button>
      )}

      {/* Timeline track */}
      <div
        ref={scrollRef}
        className="timeline-container"
        onScroll={checkScroll}
        data-testid="timeline-scroll-container"
      >
        <div className="timeline-track pb-8">
          {periodsToShow.map((periode, index) => {
            const isPeriodesArray = 'id' in periode;
            const periodData = isPeriodesArray ? periode : {
              id: periode.label.toLowerCase().replace(/\s+/g, '_'),
              nom: periode.label,
              couleur: periode.couleur,
              dates: `${formatDate(periode.debut)} — ${formatDate(periode.fin)}`
            };

            return (
              <div
                key={periodData.id || index}
                className="timeline-period group"
                onClick={() => handlePeriodClick(periodData)}
                data-testid={`timeline-period-${periodData.id || index}`}
              >
                {/* Period block */}
                <div
                  className="relative h-20 min-w-[140px] flex flex-col justify-center px-4 transition-all group-hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: periodData.couleur }}
                >
                  <p className="font-ui text-xs text-white/80 uppercase tracking-wider">
                    {periodData.dates || `${periode.debut}—${periode.fin}`}
                  </p>
                  <p className="font-subheading text-sm text-white font-medium mt-1 line-clamp-2">
                    {periodData.nom || periode.label}
                  </p>
                </div>

                {/* Timeline line and node */}
                <div className="relative h-8">
                  <div className="absolute top-4 left-0 right-0 h-[2px] bg-border" />
                  <div 
                    className="timeline-node absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-parchment"
                    style={{ backgroundColor: periodData.couleur }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 text-center">
        <p className="font-caption italic text-sm text-earth/60">
          Cliquez sur une période pour en savoir plus
        </p>
      </div>
    </div>
  );
};

export default Timeline;
