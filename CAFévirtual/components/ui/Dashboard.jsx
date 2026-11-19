'use client';
import { useAppStore } from '@/store/useAppStore';
import FacadePicker from './facadePicker';

export default function Dashboard() {
  const { buildings, companies, floors, rooms, publications, selectedBuildingId } = useAppStore();
  const b = buildings.find((x) => x.id === selectedBuildingId);
  const c = companies.find((x) => x.id === b.company_id);
  const myFloors = floors.filter((f) => f.building_id === b.id);
  const myRooms = rooms.filter((r) => myFloors.some((f) => f.id === r.floor_id));
  const posts = publications.filter((p) => p.company_id === c.id);

  return (
    <section className="page">
      <div className="panel card">
        <h1>Gestão — {c.name}</h1>
        <p className="demo">Ambiente privado (demo). Funcionários, finanças e reuniões entram nas próximas etapas.</p>
        <div className="grid">
          <div><b>{myFloors.length}</b><span>andares</span></div>
          <div><b>{myRooms.length}</b><span>salas</span></div>
          <div><b>{posts.length}</b><span>publicações</span></div>
        </div>
        <h3>Mural</h3>
        {posts.map((p) => <p key={p.id}>{p.title} <span className="tag">{p.visibility}</span></p>)}
        <FacadePicker b={b} />
      </div>
    </section>
  );
}