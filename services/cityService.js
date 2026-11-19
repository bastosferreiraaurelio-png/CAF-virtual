// Camada de dados isolada. HOJE devolve os dados de demonstração.
// Com o Supabase, troque por: supabase.from('buildings').select('*') — e proteja com RLS.
import * as db from '@/data/mockData';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchCity() {
  await wait(400); // simula latência de rede
  return { companies: db.companies, buildings: db.buildings, floors: db.floors, rooms: db.rooms, publications: db.publications };
}