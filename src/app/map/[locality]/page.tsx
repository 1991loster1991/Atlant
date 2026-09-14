import MapCanvas from '@/components/MapCanvas';
import MapHeader from '@/components/MapHeader';

interface PageProps {
  params: Promise<{
    locality: string;
  }>;
}

export default async function LocalityMapPage({ params }: PageProps) {
  const { locality } = await params;

  // =========================================================================
  // 🟢 DATOS DE PRUEBA (MOCK)
  // =========================================================================
  const localityData = {
    id: 1,
    name: locality.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug: locality,
  };

  const places: any[] = [];
  const categories: any[] = [];

  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col bg-slate-950">
      
      {/* 🧭 HEADER PRINCIPAL */}
      <MapHeader 
        localityName={localityData.name} 
        localitySlug={localityData.slug} 
      />

      {/* Contenedor del Mapa Estilo Videojuego (Optimizado con scroll horizontal táctil para móviles) */}
      <div className="flex-1 w-full relative overflow-x-auto overflow-y-hidden bg-slate-950 scrollbar-thin scrollbar-thumb-amber-500/40 scrollbar-track-slate-900">
        <MapCanvas 
          locality={localityData as any} 
          initialPlaces={places} 
          categories={categories} 
        />
      </div>

    </main>
  );
}