'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      router.push('/admin/dashboard');
    } else {
      setErrorMsg('Credenciales inválidas o acceso no autorizado.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-sm w-full shadow-2xl">
        <h2 className="text-xl font-extrabold text-white mb-2">Panel Privado Atlant</h2>
        <p className="text-xs text-slate-400 mb-6">Acceso exclusivo para administración.</p>
        
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg mb-4">
            {errorMsg}
          </div>
        )}

        <input 
          type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg mb-4 text-white text-sm focus:outline-none focus:border-amber-500" 
        />
        <input 
          type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 p-3 rounded-lg mb-6 text-white text-sm focus:outline-none focus:border-amber-500" 
        />
        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-3 rounded-lg text-sm transition-colors">
          Ingresar al Sistema
        </button>
      </form>
    </div>
  );
}