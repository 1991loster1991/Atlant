'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';

const LOCALITIES = [
  { slug: 'san-clemente', name: 'San Clemente del Tuyú' },
  { slug: 'las-toninas', name: 'Las Toninas' },
  { slug: 'santa-teresita', name: 'Santa Teresita' },
  { slug: 'mar-del-tuyu', name: 'Mar del Tuyú' },
  { slug: 'costa-del-este', name: 'Costa del Este' },
  { slug: 'aguas-verdes', name: 'Aguas Verdes' },
  { slug: 'la-lucila', name: 'La Lucila del Mar' },
  { slug: 'san-bernardo', name: 'San Bernardo del Tuyú' },
  { slug: 'mar-de-ajo', name: 'Mar de Ajó' },
  { slug: 'nueva-atlantis', name: 'Nueva Atlantis' },
];

export default function AdminDashboard() {
  const [selectedLocality, setSelectedLocality] = useState(LOCALITIES[0].slug);
  const [merchantName, setMerchantName] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  
  const supabase = createClient();
  const router = useRouter();

  // Generar el QR cada vez que cambie la localidad o el comercio
  useEffect(() => {
    // Dominio base de tu app (puedes cambiarlo por tu URL de producción en Vercel cuando la tengas)
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/map/${selectedLocality}${merchantName ? `?ref=${encodeURIComponent(merchantName)}` : ''}`;
    
    setTargetUrl(url);

    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0f172a', // Color oscuro del QR
        light: '#ffffff', // Fondo blanco
      }
    }, (err, dataUrl) => {
      if (!err) {
        setQrImageUrl(dataUrl);
      }
    });
  }, [selectedLocality, merchantName]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabecera del Panel */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Panel B2B Atlant
            </span>
            <h1 className="text-2xl font-black mt-2 text-white">Generador de Códigos QR</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            Cerrar Sesión 🚪
          </button>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Controles de Configuración */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">1. Parámetros del Sticker</h3>
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Seleccionar Localidad:</label>
              <select 
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc.slug} value={loc.slug}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Comercio o Alojamiento Patrocinador (Opcional):</label>
              <input 
                type="text"
                placeholder="Ej. Hotel Costa Azul / Parador Norte"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Sirve para identificar qué comercio utiliza este sticker específico.</p>
            </div>

            <div className="pt-2">
              <span className="block text-xs font-semibold text-slate-400 mb-1">URL de Destino Codificada:</span>
              <code className="block bg-slate-950 p-3 rounded-xl text-xs text-amber-300 break-all border border-slate-800/80 font-mono">
                {targetUrl}
              </code>
            </div>
          </div>

          {/* Vista Previa y Descarga del QR */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-5 self-start">2. Vista Previa para Imprenta</h3>
            
            <div className="bg-white p-4 rounded-2xl shadow-lg mb-6 border-4 border-slate-800">
              {qrImageUrl ? (
                <img src={qrImageUrl} alt="Código QR Atlant" className="w-56 h-56 object-contain" />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-slate-400 text-xs">Generando QR...</div>
              )}
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Este diseño vectorizado incluye el enlace optimizado para la localidad seleccionada.
            </p>

            {qrImageUrl && (
              <a 
                href={qrImageUrl} 
                download={`atlant-qr-${selectedLocality}${merchantName ? `-${merchantName.toLowerCase().replace(/\s+/g, '-')}` : ''}.png`}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-6 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
              >
                📥 Descargar QR en Alta Calidad (PNG)
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}