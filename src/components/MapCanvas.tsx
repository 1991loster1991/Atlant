'use client';
import React, { useState, useEffect } from 'react';
import { Locality, Place, Category } from '@/lib/types';
import CategoryFilters from '@/components/CategoryFilters';
import PlaceCard from '@/components/PlaceCard';
interface Props {
  locality: Locality;
  initialPlaces: Place[];
  categories: Category[];
}

const FALLBACK_PLACES: any[] = [
  { id: 1, name: 'Parador Principal & Playas', description: 'Centro de la movida veraniega y paradores.', category_id: 1 },
  { id: 2, name: 'Alfajores & Delicias del Tuyú', description: 'Comercio adherido: 10% de descuento con QR.', category_id: 2 },
  { id: 3, name: 'Muelle de Pesca Histórico', description: 'Punto panorámico clásico de la localidad.', category_id: 1 },
  { id: 4, name: 'Hotel & SPA Costa Azul', description: 'Alojamiento patrocinador exclusivo.', category_id: 3 },
  { id: 5, name: 'Reserva Natural & Senderos', description: 'Circuito ecológico para toda la familia.', category_id: 4 },
  { id: 6, name: 'Polo Gastronómico Norte', description: 'Restaurantes y cervecerías artesanales.', category_id: 2 },
];

export default function MapCanvas({ locality, initialPlaces, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [activePlace, setActivePlace] = useState<Place | null>(null);
  const [visitedIds, setVisitedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`atlant_visited_${locality.slug}`);
    if (saved) {
      try { setVisitedIds(JSON.parse(saved)); } catch (e) {}
    }
  }, [locality.slug]);

  const toggleVisited = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = visitedIds.includes(id)
      ? visitedIds.filter(item => item !== id)
      : [...visitedIds, id];
    
    setVisitedIds(updated);
    localStorage.setItem(`atlant_visited_${locality.slug}`, JSON.stringify(updated));
  };

  const placesToDisplay = initialPlaces.length > 0 ? initialPlaces : FALLBACK_PLACES;

  const filteredPlaces = selectedCategory 
    ? placesToDisplay.filter((p: any) => p.category_id === selectedCategory)
    : placesToDisplay;

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex flex-col">
      
      {/* 🗺️ FONDO HOLOGRÁFICO TÁCTICO */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-60 filter contrast-150 brightness-110 sepia-[0.7] hue-rotate-[10deg] saturate-200 transition-all duration-700"
          style={{ backgroundImage: `url('/maps/${locality.slug}.png')` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(2,6,23,0.1)_0%,_rgba(2,6,23,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d9770618_1px,transparent_1px),linear-gradient(to_bottom,#d9770618_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      {/* Filtros de Categoría */}
      <div className="relative z-20 pt-3 px-4 flex justify-center w-full">
        <CategoryFilters 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </div>

      {/* Contenedor Horizontal Desplazable (Estilo Ruta Costera) */}
      <div className="relative z-10 flex-1 w-full overflow-x-auto overflow-y-hidden flex items-center px-16 scrollbar-thin scrollbar-thumb-slate-800">
        <div 
          className="relative flex items-center min-w-max h-[420px] mx-auto"
          style={{ width: `${Math.max(filteredPlaces.length * 280, 1400)}px` }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_10px_rgba(217,119,6,0.5)]" preserveAspectRatio="none" viewBox="0 100 1400 300">
            <path 
              d="M 100 250 Q 280 100, 460 250 T 820 250 T 1180 250 T 1540 250" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="5" 
              strokeOpacity="0.8"
              strokeDasharray="10, 14" 
              strokeLinecap="round" 
            />
          </svg>

          {filteredPlaces.map((place: any, index: number) => {
            const isVisited = visitedIds.includes(place.id);
            const isUp = index % 2 === 0;
            const verticalOffset = isUp ? '-translate-y-16' : 'translate-y-16';
            const placeName = place.name || place.title || place.nombre || `Nivel ${index + 1}`;

            return (
              <div 
                key={place.id || index} 
                className={`absolute flex flex-col items-center transition-all duration-300 transform -translate-x-1/2 ${verticalOffset}`}
                style={{ left: `${(index * 260) + 160}px` }}
              >
                <div className="relative">
                  <button
                    onClick={() => setActivePlace(place)}
                    className={`group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 transition-all duration-300 focus:outline-none shadow-2xl ${
                      isVisited 
                        ? 'bg-gradient-to-tr from-emerald-600 via-emerald-400 to-teal-200 shadow-emerald-500/30 scale-95' 
                        : 'bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 hover:scale-110 shadow-amber-500/50'
                    }`}
                  >
                    <div className="w-full h-full rounded-full bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-white/30 group-hover:border-white transition-colors">
                      <span className="text-2xl sm:text-3xl drop-shadow-md">
                        {isVisited ? '🏆' : index % 4 === 0 ? '🏖️' : index % 4 === 1 ? '🛍️' : index % 4 === 2 ? '⭐' : '🍔'}
                      </span>
                      <span className={`text-[10px] font-black mt-0.5 tracking-wider ${isVisited ? 'text-emerald-400' : 'text-amber-400'}`}>
                        NIVEL {index + 1}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={(e) => toggleVisited(place.id, e)}
                    title={isVisited ? 'Marcar como pendiente' : '¡Marcar como visitado!'}
                    className={`absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-transform hover:scale-125 border ${
                      isVisited 
                        ? 'bg-emerald-400 text-slate-950 border-white shadow-emerald-500/50' 
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white hover:border-amber-400'
                    }`}
                  >
                    {isVisited ? '✓' : '○'}
                  </button>
                </div>

                <div 
                  onClick={() => setActivePlace(place)}
                  className="mt-3 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 px-3.5 py-1.5 rounded-2xl shadow-xl text-center max-w-[150px] cursor-pointer hover:border-amber-500/60 transition-all hover:scale-105 z-30"
                >
                  <h4 className={`text-xs font-bold truncate ${isVisited ? 'text-emerald-300 line-through opacity-80' : 'text-white'}`}>
                    {placeName}
                  </h4>
                  <p className="text-[9px] text-amber-400/90 font-semibold tracking-wide">
                    {isVisited ? '¡Completado! 🎉' : 'Ver promos y QR'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicador visual de desplazamiento horizontal */}
      <div className="py-2 text-center bg-slate-950/90 border-t border-slate-900/80 text-slate-400 text-[11px] tracking-widest uppercase flex items-center justify-center gap-2">
        <span className="text-amber-500">◀</span> Desliza horizontalmente para explorar el mapa táctico de la ruta <span className="text-amber-500">▶</span>
      </div>

      {/* Tarjeta de Detalles Emergente */}
      <PlaceCard 
        place={activePlace} 
        onClose={() => setActivePlace(null)} 
      />

    </div>
  );
}