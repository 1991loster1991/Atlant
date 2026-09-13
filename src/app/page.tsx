'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const LOCALITIES = [
  { name: 'San Clemente del Tuyú', slug: 'san-clemente', icon: '🌊' },
  { name: 'Las Toninas', slug: 'las-toninas', icon: '🏄‍♂️' },
  { name: 'Santa Teresita', slug: 'santa-teresita', icon: '🌴' },
  { name: 'Mar del Tuyú', slug: 'mar-del-tuyu', icon: '🏖️' },
  { name: 'Costa del Este', slug: 'costa-del-este', icon: '🌲' },
  { name: 'San Bernardo', slug: 'san-bernardo', icon: '☀️' },
  { name: 'Mar de Ajó', slug: 'mar-de-ajo', icon: '⚓' },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const directSelector = searchParams.get('selector') === 'true';

  // Si viene desde "Cambiar zona", arranca directamente en el selector de localidades
  const [showSelector, setShowSelector] = useState(directSelector);

  useEffect(() => {
    if (directSelector) {
      setShowSelector(true);
    }
  }, [directSelector]);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {!showSelector ? (
        /* =========================================================================
         * 🌟 VISTA 1: SPLASH / BIENVENIDA (IMAGEN OFICIAL + BOTÓN EXPLORAR)
         * ========================================================================= */
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-between p-6 sm:p-10 bg-slate-950 overflow-hidden animate-in fade-in duration-500">
          
          {/* Fondo con la imagen oficial de presentación */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/logo-altlant.png"
              alt="Atlant Splash"
              fill
              priority
              className="object-cover object-center filter brightness-95"
            />
            {/* Gradiente sutil para legibilidad inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          </div>

          {/* Espaciador superior */}
          <div className="relative z-10 pt-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-950/70 backdrop-blur-md rounded-full border border-amber-500/50 shadow-lg">
              <span className="text-[11px] font-black text-amber-400 tracking-[0.2em] uppercase">AVENTURA ATLANT</span>
            </div>
          </div>

          {/* Centro vacío para dejar lucir la imagen del logo y las olas */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-lg w-full">
            {/* La imagen ya trae el isotipo y el texto "Atlant", la dejamos respirar */}
          </div>

          {/* Botón de acción inferior "Explorá tu localidad" */}
          <div className="relative z-10 w-full max-w-md pb-6 flex flex-col items-center">
            <button
              onClick={() => setShowSelector(true)}
              className="w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all transform active:scale-95 flex items-center justify-center gap-3 border border-amber-200/60 uppercase tracking-wider"
            >
              <span>🧭</span> Explorá tu localidad
            </button>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-3 font-semibold">
              Sistema de Navegación Turística QR
            </p>
          </div>

        </div>
      ) : (
        /* =========================================================================
         * 🗺️ VISTA 2: SELECTOR DE LOCALIDADES (GRILLA TÁCTICA)
         * ========================================================================= */
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(217,119,6,0.1)_0%,_rgba(2,6,23,0.98)_100%)] pointer-events-none" />

          <div className="relative z-10 max-w-xl w-full bg-slate-900/95 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center my-auto">
            
            {/* Cabecera del selector con botón de volver */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowSelector(false)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700 shadow-sm"
              >
                ← Volver al inicio
              </button>
              
              <div className="px-3.5 py-1 bg-amber-500/10 rounded-full border border-amber-500/40">
                <span className="text-[10px] font-black text-amber-400 tracking-wider uppercase">AVENTURA ATLANT</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mb-2 uppercase tracking-wide text-white">
              Seleccioná tu Localidad
            </h2>
            <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">
              Elegí una zona para abrir el mapa táctico hiperlocal y explorar sus comercios y beneficios exclusivos con QR.
            </p>
            
            {/* Cuadrícula de Localidades */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left w-full">
              {LOCALITIES.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/map/${loc.slug}`}
                  className="group p-3.5 bg-slate-950/80 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/60 rounded-2xl transition-all duration-300 flex items-center justify-between shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-2 bg-slate-900 rounded-xl border border-slate-800 group-hover:scale-110 transition-transform flex items-center justify-center shadow-inner">
                      {loc.icon}
                    </span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {loc.name}
                      </h3>
                      <p className="text-[9px] text-amber-400/80 uppercase tracking-wider font-semibold">
                        Mapa Táctico Activo
                      </p>
                    </div>
                  </div>
                  <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold mr-1">
                    ➔
                  </span>
                </Link>
              ))}
            </div>

            {/* Pie de página */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 w-full text-center text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              Sistema de Navegación Turística Hiperlocal • Aventura Atlant
            </div>

          </div>
        </div>
      )}

    </main>
  );
}

import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-400 font-bold">Cargando Atlant...</div>}>
      <HomeContent />
    </Suspense>
  );
}