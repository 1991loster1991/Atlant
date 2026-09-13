import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guía Turística Interactiva - La Costa',
  description: 'Descubrí los mejores atractivos de la Costa Atlántica mediante nuestra guía digital interactiva.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className="bg-slate-900 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}