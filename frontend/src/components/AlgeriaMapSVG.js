import React from 'react';
import { useApp } from '../context/AppContext';
import { VILLES } from '../data/encyclopediaData';

// Simplified Algeria map SVG with major cities
const AlgeriaMapSVG = () => {
  const { openDrawer } = useApp();

  // City coordinates (approximate, scaled to viewbox)
  const cities = [
    { id: 'alger', x: 180, y: 120, label: 'Alger' },
    { id: 'oran', x: 95, y: 135, label: 'Oran' },
    { id: 'constantine', x: 295, y: 130, label: 'Constantine' },
    { id: 'tlemcen', x: 60, y: 155, label: 'Tlemcen' },
    { id: 'annaba', x: 350, y: 115, label: 'Annaba' },
    { id: 'bejaia', x: 240, y: 115, label: 'Béjaïa' },
    { id: 'ghardaia', x: 195, y: 280, label: 'Ghardaïa' },
    { id: 'timgad', x: 285, y: 175, label: 'Timgad' },
  ];

  return (
    <svg
      viewBox="0 0 500 450"
      className="w-full h-auto max-h-[500px]"
      data-testid="algeria-map-svg"
    >
      {/* Background */}
      <rect width="500" height="450" fill="#F5F0E8" />

      {/* Water (Mediterranean) */}
      <path
        d="M0 0 L500 0 L500 90 Q400 100 300 95 Q200 90 100 100 Q50 105 0 100 Z"
        fill="#1A3A5C"
        opacity="0.3"
      />
      <text x="250" y="50" textAnchor="middle" className="font-caption" fill="#1A3A5C" fontSize="14" fontStyle="italic">
        Mer Méditerranée
      </text>

      {/* Algeria outline (simplified) */}
      <path
        d="M50 105 
           Q100 100 150 105 
           Q200 100 250 105 
           Q300 100 350 110 
           Q400 115 450 105
           L480 120 
           L490 200 
           Q485 280 480 350 
           L450 420 
           L350 440 
           L250 445 
           L150 440 
           L50 430 
           L20 350 
           Q15 250 20 180 
           Z"
        fill="#EDE6D4"
        stroke="#6B3E26"
        strokeWidth="2"
      />

      {/* Tell region (north) */}
      <path
        d="M50 105 
           Q100 100 150 105 
           Q200 100 250 105 
           Q300 100 350 110 
           Q400 115 450 105
           L480 120 
           L470 180 
           L400 190 
           L300 195 
           L200 195 
           L100 190 
           L30 180 
           Z"
        fill="#2D5A27"
        opacity="0.2"
        className="map-region"
      />
      <text x="250" y="155" textAnchor="middle" className="font-ui" fill="#2D5A27" fontSize="12">
        TELL
      </text>

      {/* Hauts Plateaux (middle) */}
      <path
        d="M30 180 
           L100 190 
           L200 195 
           L300 195 
           L400 190 
           L470 180 
           L480 250 
           L450 280 
           L350 290 
           L250 295 
           L150 290 
           L50 280 
           L25 250 
           Z"
        fill="#C4A35A"
        opacity="0.2"
        className="map-region"
      />
      <text x="250" y="240" textAnchor="middle" className="font-ui" fill="#C4A35A" fontSize="12">
        HAUTS PLATEAUX
      </text>

      {/* Sahara (south) */}
      <path
        d="M25 250 
           L50 280 
           L150 290 
           L250 295 
           L350 290 
           L450 280 
           L480 250 
           L490 300 
           Q485 350 480 400 
           L450 420 
           L350 440 
           L250 445 
           L150 440 
           L50 430 
           L20 350 
           Z"
        fill="#B8860B"
        opacity="0.15"
        className="map-region"
      />
      <text x="250" y="370" textAnchor="middle" className="font-ui" fill="#B8860B" fontSize="14">
        SAHARA
      </text>

      {/* Atlas Mountains (stylized) */}
      <path
        d="M80 175 L100 160 L120 175 L140 155 L160 175 L180 150 L200 175 L220 155 L240 175 L260 150 L280 175 L300 155 L320 175 L340 160 L360 175 L380 155 L400 175"
        fill="none"
        stroke="#6B3E26"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <text x="420" y="168" className="font-caption" fill="#6B3E26" fontSize="9" fontStyle="italic">
        Atlas Tellien
      </text>

      {/* Saharan Atlas */}
      <path
        d="M100 265 L130 250 L160 265 L190 245 L220 265 L250 245 L280 265 L310 250 L340 265 L370 250 L400 265"
        fill="none"
        stroke="#6B3E26"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <text x="420" y="260" className="font-caption" fill="#6B3E26" fontSize="9" fontStyle="italic">
        Atlas Saharien
      </text>

      {/* Hoggar */}
      <path
        d="M220 380 L240 350 L260 380 L280 345 L300 380"
        fill="none"
        stroke="#6B3E26"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <text x="260" y="400" textAnchor="middle" className="font-caption" fill="#6B3E26" fontSize="9" fontStyle="italic">
        Hoggar
      </text>

      {/* Cities */}
      {cities.map((city) => {
        const villeData = VILLES.find(v => v.id === city.id);
        return (
          <g
            key={city.id}
            className="map-city cursor-pointer"
            onClick={() => openDrawer('ville', city.id)}
            data-testid={`map-city-${city.id}`}
          >
            <circle
              cx={city.x}
              cy={city.y}
              r="8"
              fill="#B8860B"
              stroke="#F5F0E8"
              strokeWidth="2"
            />
            <circle
              cx={city.x}
              cy={city.y}
              r="3"
              fill="#F5F0E8"
            />
            <text
              x={city.x}
              y={city.y - 14}
              textAnchor="middle"
              className="font-subheading"
              fill="#1C1209"
              fontSize="11"
              fontWeight="600"
            >
              {city.label}
            </text>
            {villeData?.nomsAnciens?.[0] && (
              <text
                x={city.x}
                y={city.y + 20}
                textAnchor="middle"
                className="font-caption"
                fill="#6B3E26"
                fontSize="8"
                fontStyle="italic"
              >
                {villeData.nomsAnciens[0]}
              </text>
            )}
          </g>
        );
      })}

      {/* Neighboring countries labels */}
      <text x="20" y="200" className="font-caption" fill="#8B7355" fontSize="10" fontStyle="italic" transform="rotate(-90 20 200)">
        MAROC
      </text>
      <text x="470" y="200" className="font-caption" fill="#8B7355" fontSize="10" fontStyle="italic" transform="rotate(90 470 200)">
        TUNISIE
      </text>
      <text x="470" y="350" className="font-caption" fill="#8B7355" fontSize="10" fontStyle="italic" transform="rotate(90 470 350)">
        LIBYE
      </text>
      <text x="150" y="440" className="font-caption" fill="#8B7355" fontSize="10" fontStyle="italic">
        MALI
      </text>
      <text x="300" y="440" className="font-caption" fill="#8B7355" fontSize="10" fontStyle="italic">
        NIGER
      </text>

      {/* Scale */}
      <g transform="translate(380, 420)">
        <line x1="0" y1="0" x2="80" y2="0" stroke="#6B3E26" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#6B3E26" strokeWidth="1" />
        <line x1="80" y1="-3" x2="80" y2="3" stroke="#6B3E26" strokeWidth="1" />
        <text x="40" y="15" textAnchor="middle" className="font-caption" fill="#6B3E26" fontSize="8">
          ≈ 500 km
        </text>
      </g>

      {/* North arrow */}
      <g transform="translate(30, 420)">
        <polygon points="0,15 5,0 10,15 5,12" fill="#6B3E26" />
        <text x="5" y="25" textAnchor="middle" className="font-ui" fill="#6B3E26" fontSize="10">
          N
        </text>
      </g>
    </svg>
  );
};

export default AlgeriaMapSVG;
