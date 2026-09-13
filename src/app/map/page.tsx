import { redirect } from 'next/navigation';

export default function MapIndexPage() {
  // Redirige por defecto a San Clemente del Tuyú (o a la página principal '/')
  redirect('/map/san-clemente');
}