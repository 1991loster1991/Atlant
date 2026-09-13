'use client';
import React from 'react';
import { Place } from '@/lib/types';

interface Props {
  place: Place | null;
  onClose: () => void;
}

export default function PlaceCard({ place, onClose }: Props) {
  if (!place) return null;

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;

  return (
    <div className="absolute bottom-20 left-4 right-4 z-30 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl p-5 shadow-2xl max-w-md mx-auto">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${place.is_free ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
            {place.is_free ? 'Gratis' : 'De Pago'}
          </span>
          <h3 className="text-xl font-bold text-white mt-1">{place.title}</h3>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm"
        >
          ✕
        </button>
      </div>

      <p className="text-slate-300 text-sm mb-4 leading-relaxed">{place.description}</p>

      {place.opening_hours && (
        <div className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
          🕒 <span className="font-medium text-slate-200">Horarios:</span> {place.opening_hours}
        </div>
      )}

      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition"
      >
        🗺️ ¿Cómo llegar? (Abrir Ruta)
      </a>
    </div>
  );
}