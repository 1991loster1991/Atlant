'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MapHeaderProps {
  localityName: string;
  localitySlug: string;
}

export default function MapHeader({ localityName, localitySlug }: MapHeaderProps) {
  const [showMapOptionsModal, setShowMapOptionsModal] = useState(false);
  const [showFullMapModal, setShowFullMapModal] = useState(false);

  const handleOpenGoogleMaps = () => {
    setShowMapOptionsModal(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
        },
        () => {
          window.open(`https://www.google.com/maps`, '_blank');
        }
      );
    } else {
      window.open(`https://www.google.com/maps`, '_blank');
    }
  };

  const handleViewLocalMap = () => {
    setShowMapOptionsModal(false);
    setShowFullMapModal(true);
  };

  return (
    <>
      {/* 🧭 HEADER PRINCIPAL (Diseño de 3 columnas exacto) */}
      <header className="relative z-30 px-4 sm:px-6 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between shadow-xl">
        
        {/* 1. Izquierda: Logo / Isotipo Oficial de Atlant */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-3 py-1 bg-slate-900/90 hover:bg-slate-900 rounded-full border border-amber-500/50 shadow-inner transition-all group"
            title="Ir al inicio / Cambiar zona"
          >
            <div className="w-7 h-7 relative flex items-center justify-center">
              <Image
                src="/logo-altlant.png"
                alt="Atlant Logo"
                width={28}
                height={28}
                className="object-contain drop-shadow group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-xs font-black text-amber-400 tracking-wider uppercase hidden sm:inline">
              ATLANT
            </span>
          </Link>
        </div>

        {/* 2. Centro: Localidad Actual con Pin */}
        <div className="flex items-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-2xl border border-slate-800 shadow-lg">
          <span className="text-base">📍</span>
          <div className="leading-tight text-left">
            <p className="text-[9px] font-extrabold text-amber-400 tracking-wider uppercase">LOCALIDAD</p>
            <p className="text-xs font-bold text-white uppercase truncate max-w-[120px] sm:max-w-none">{localityName}</p>
          </div>
        </div>

        {/* 3. Derecha: Botón Mapas y GPS + Botón Cambiar zona */}
        <div className="flex items-center gap-2">
          
          {/* Botón Mapas y GPS */}
          <div className="relative">
            <button
              onClick={() => setShowMapOptionsModal(!showMapOptionsModal)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center gap-1 shadow-md active:scale-95"
            >
              <span>🧭</span> <span className="hidden sm:inline">Mapas y GPS</span> ▾
            </button>

            {showMapOptionsModal && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">Elegí una acción:</p>
                </div>
                
                <button
                  onClick={handleOpenGoogleMaps}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-500/10 text-slate-200 hover:text-amber-300 text-xs font-semibold flex items-center gap-2.5 transition-colors"
                >
                  <span className="text-base">🗺️</span>
                  <div>
                    <p className="font-bold">Google Maps (Mi Ubicación)</p>
                    <p className="text-[10px] text-slate-400">Ver tu posición GPS en tiempo real</p>
                  </div>
                </button>

                <button
                  onClick={handleViewLocalMap}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-500/10 text-slate-200 hover:text-amber-300 text-xs font-semibold flex items-center gap-2.5 transition-colors mt-1"
                >
                  <span className="text-base">🖼️</span>
                  <div>
                    <p className="font-bold">Ver Mapa de la Localidad</p>
                    <p className="text-[10px] text-slate-400">Abrir imagen táctica de {localityName}</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Botón Cambiar Zona */}
          <Link
            href="/?selector=true"
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>🗺️</span> <span className="hidden md:inline">Cambiar zona</span>
          </Link>
        </div>
      </header>

      {/* MODAL PARA VER EL MAPA TÁCTICO EN GRANDE */}
      {showFullMapModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl h-[80vh] bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
            <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest">Mapa Táctico de Localidad</h3>
                <p className="text-lg font-bold text-white">{localityName}</p>
              </div>
              <button
                onClick={() => setShowFullMapModal(false)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-sm font-bold border border-slate-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 relative overflow-auto p-4 flex items-center justify-center bg-slate-950">
              <img 
                src={`/images/${localitySlug}.png`} 
                alt={`Mapa de ${localityName}`} 
                className="max-h-full max-w-full object-contain filter contrast-125 brightness-105 rounded-xl shadow-2xl border border-amber-500/20"
              />
            </div>

            <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 text-center text-xs text-slate-400">
              Imagen de fondo oficial de la localidad • Atlant
            </div>
          </div>
        </div>
      )}
    </>
  );
}