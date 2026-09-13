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
  // 🟢 OPCIÓN 1: DATOS DE PRUEBA (MOCK) - ACTIVO ACTUALMENTE
  // =========================================================================
  const localityData = {
    id: 1,
    name: locality.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug: locality,
  };

  const places: any[] = [];
  const categories: any[] = [];

  /* =========================================================================
   * 🔵 OPCIÓN 2: CÓDIGO REAL DE SUPABASE (COMENTADO PARA EL FUTURO)
   * ========================================================================= */

  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col bg-slate-950">
      
      {/* 🧭 HEADER PRINCIPAL (Con Mapas y GPS + Cambiar zona alineados) */}
      <MapHeader 
        localityName={localityData.name} 
        localitySlug={localityData.slug} 
      />

      {/* Contenedor del Mapa Estilo Videojuego */}
      <div className="flex-1 w-full relative overflow-hidden">
        <MapCanvas 
          locality={localityData as any} 
          initialPlaces={places} 
          categories={categories} 
        />
      </div>

    </main>
  );
}