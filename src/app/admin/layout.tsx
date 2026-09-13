import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* 🛡️ Barra Superior Indicadora del Sector Admin */}
      <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-xl z-50">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-black tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-inner flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Panel de Administración
          </span>
          <h1 className="text-sm font-bold text-slate-300 hidden sm:inline">
            Aventura Atlant — Gestión Hiperlocal
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="/" 
            className="text-xs font-bold px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all shadow-md hover:border-slate-500 flex items-center gap-1.5"
          >
            <span>Ver Mapa Público</span> 🗺️
          </a>
        </div>
      </header>

      {/* Contenido dinámico de las páginas de admin */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        {children}
      </main>

    </div>
  );
}