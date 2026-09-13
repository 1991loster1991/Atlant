export default function Loading() {
  return (
    <div className="relative w-screen h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      {/* Círculo animado de carga */}
      <div className="w-16 h-16 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mb-6"></div>

      {/* Título y subtítulo estilizados */}
      <h2 className="text-xl font-extrabold text-white tracking-wide mb-2">
        Cargando Guía Interactiva
      </h2>
      <p className="text-slate-400 text-sm max-w-xs animate-pulse">
        Preparando el mapa, los puntos de interés y las experiencias del lugar...
      </p>

      {/* Barra decorativa inferior */}
      <div className="absolute bottom-10 text-xs text-slate-500 font-medium">
        Atlant • Hiperlocalización Turística
      </div>
    </div>
  );
}