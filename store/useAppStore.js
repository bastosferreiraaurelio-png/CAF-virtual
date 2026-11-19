import { create } from 'zustand';
import { fetchCity } from '@/services/cityService';

// Estado global: a UI 2D e a cena 3D leem e escrevem aqui,
// então mudar a cor da fachada no painel atualiza o prédio 3D na hora.
export const useAppStore = create((set, get) => ({
  loading: true, error: null, notice: null,
  companies: [], buildings: [], floors: [], rooms: [], publications: [],
  view: 'home', // home | city | interior | profile | dashboard
  selectedBuildingId: null, activeFloorId: null,
  role: 'visitor', ownerCompanyId: 'c1', // DEMO: simula o perfil de acesso (no backend vem da sessão)

  init: async () => {
    try { set({ ...(await fetchCity()), loading: false }); }
    catch { set({ loading: false, error: 'Não foi possível carregar a cidade. Tente novamente.' }); }
  },

  // REGRA DE PERMISSÃO: só o proprietário gerencia a própria empresa.
  // Atenção: o backend/RLS precisa repetir essa regra; esconder botão não protege dados.
  canManage: (companyId) => get().role === 'owner' && get().ownerCompanyId === companyId,

  setRole: (role) => set({ role, notice: null }),
  selectBuilding: (id) => set({ selectedBuildingId: id, notice: null }),
  setFloor: (id) => set({ activeFloorId: id }),

  // Navegação central entre ambientes, com validações
  go: (view) => {
    const { buildings, floors, selectedBuildingId, canManage } = get();
    const b = buildings.find((x) => x.id === selectedBuildingId);
    if (['profile', 'interior', 'dashboard'].includes(view) && !b) return set({ notice: 'Selecione um prédio na cidade primeiro.' });
    if (view === 'dashboard' && !canManage(b.company_id)) return set({ notice: 'A gestão é exclusiva do proprietário. Altere o perfil de acesso (demo) no topo.' });
    const first = b && floors.find((f) => f.building_id === b.id && f.level === 1);
    set({ view, notice: null, activeFloorId: view === 'interior' ? first?.id ?? null : get().activeFloorId });
  },

  updateFacade: (id, patch) => {
    const b = get().buildings.find((x) => x.id === id);
    if (!b || !get().canManage(b.company_id)) return false;
    set({ buildings: get().buildings.map((x) => (x.id === id ? { ...x, ...patch } : x)) });
    return true;
  },
}));