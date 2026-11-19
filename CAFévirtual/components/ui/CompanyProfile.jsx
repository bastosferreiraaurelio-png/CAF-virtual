'use client';
import { useAppStore } from '@/store/useAppStore';

export default function CompanyProfile() {
  const { buildings, companies, publications, selectedBuildingId, canManage, go } = useAppStore();
  const b = buildings.find((x) => x.id === selectedBuildingId);
  const c = companies.find((x) => x.id === b.company_id);
  // Perfil PÚBLICO: só publicações 'public' (o dono vê todas — conferir também no backend)
  const posts = publications.filter((p) => p.company_id === c.id && (p.visibility === 'public' || canManage(c.id)));

  return (
    <section className="page">
      <div className="panel card" style={{ borderColor: b.neon_color }}>
        <h1>{c.logo} {c.name}</h1>
        <p>{c.segment} — {c.description}</p>
        <p><a href={c.contacts.site}>Site</a> · <a href={`mailto:${c.contacts.email}`}>{c.contacts.email}</a></p>
        <button className="btn primary" onClick={() => go('interior')}>Entrar no prédio</button>
        <button className="btn" onClick={() => go('city')}>Voltar à cidade</button>
        <h3>Mural</h3>
        {posts.length === 0 && <p>Nenhuma publicação pública ainda.</p>}
        {posts.map((p) => <p key={p.id}>{p.title} <span className="tag">{p.visibility}</span></p>)}
        <p className="demo">Dados de demonstração.</p>
      </div>
    </section>
  );
}