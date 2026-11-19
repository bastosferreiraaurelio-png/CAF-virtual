'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store/useAppStore';
import Hud from '@/components/ui/Hud';
import CompanyProfile from '@/components/ui/CompanyProfile';
import Dashboard from '@/components/ui/Dashboard';

// Separação de cenas: cada cena 3D é um chunk separado, baixado só quando necessário.
// O interior só é carregado quando o usuário entra em um prédio.
const CityScene = dynamic(() => import('@/components/3d/CityScene'), { ssr: false, loading: () => <p className="center">Carregando a cidade…</p> });
const InteriorScene = dynamic(() => import('@/components/3d/InteriorScene'), { ssr: false, loading: () => <p className="center">Entrando no prédio…</p> });

export default function Page() {
  const { view, loading, error, init, go } = useAppStore();
  useEffect(() => { init(); }, [init]);

  return (
    <main>
      {view === 'home' && (
        <section className="home">
          <h1>CAFÉvirtual</h1>
          <p>O futuro dos negócios acontece aqui.</p>
          <button className="btn primary" disabled={loading || !!error} onClick={() => go('city')}>
            {loading ? 'Carregando…' : 'Entrar na cidade'}
          </button>
          {error && <p role="alert" className="warn">{error}</p>}
        </section>
      )}
      {view === 'city' && <CityScene />}
      {view === 'interior' && <InteriorScene />}
      {view === 'profile' && <CompanyProfile />}
      {view === 'dashboard' && <Dashboard />}
      {view !== 'home' && <Hud />}
    </main>
  );
}