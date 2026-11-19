'use client';
import { useAppStore } from '@/store/useAppStore';

export default function Hud() {
  const s = useAppStore();
  const b = s.buildings.find((x) => x.id === s.selectedBuildingId);
  const company = b && s.companies.find((c) => c.id === b.company_id);
  const myBuilding = s.buildings.find((x) => x.company_id === s.ownerCompanyId);
  const myFloors = b ? s.floors.filter((f) => f.building_id === b.id) : [];

  return (
    <>
      <header className="bar panel">
        <strong className="brand" onClick={() => s.go('home')}>CAFÉvirtual</strong>
        <nav>
          <button className="btn" onClick={() => s.go('city')}>Cidade 3D</button>
          <button className="btn" onClick={() => { s.selectBuilding(myBuilding.id); s.go('dashboard'); }}>Meu prédio</button>
          <button className="btn" onClick={() => s.go('profile')}>Perfil público</button>
        </nav>
        <label className="demo">Acesso (demo)
          <select value={s.role} onChange={(e) => s.setRole(e.target.value)}>
            <option value="visitor">Visitante</option>
            <option value="owner">Proprietário — Café Tech</option>
          </select>
        </label>
      </header>

      {s.notice && <div className="panel toast warn" role="alert">{s.notice}</div>}

      {s.view === 'city' && b && (
        <aside className="panel side">
          <h3>{company.name}</h3>
          <p>{company.segment}</p>
          <button className="btn primary" onClick={() => s.go('interior')}>Entrar no prédio</button>
          <button className="btn" onClick={() => s.go('profile')}>Ver perfil público</button>
        </aside>
      )}

      {s.view === 'interior' && (
        <aside className="panel side">
          <h3>Andares</h3>
          {myFloors.map((f) => (
            <button key={f.id} className={`btn ${f.id === s.activeFloorId ? 'primary' : ''}`} onClick={() => s.setFloor(f.id)}>{f.level} · {f.name}</button>
          ))}
          <button className="btn" onClick={() => s.go('city')}>Sair do prédio</button>
        </aside>
      )}
    </>
  );
}