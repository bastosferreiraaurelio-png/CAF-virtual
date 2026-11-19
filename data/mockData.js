// DADOS DE DEMONSTRAÇÃO (não são empresas reais).
// Estruturados como as tabelas do banco (Companies, Buildings, Floors, Rooms, Publications).
export const companies = [
  { id: 'c1', name: 'Café Tech', segment: 'Tecnologia', logo: '☕', description: 'Software e dados para negócios digitais.', contacts: { site: 'https://exemplo.com.br', email: 'contato@exemplo.com.br' } },
  { id: 'c2', name: 'Café Consultoria', segment: 'Consultoria', logo: '📊', description: 'Estratégia e gestão para pequenas empresas.', contacts: { site: 'https://exemplo.com.br', email: 'oi@exemplo.com.br' } },
  { id: 'c3', name: 'Café Logística', segment: 'Logística', logo: '🚚', description: 'Transporte e distribuição regional.', contacts: { site: 'https://exemplo.com.br', email: 'ola@exemplo.com.br' } },
];

// x, z = posição no mapa da cidade; height/width/depth em unidades 3D
export const buildings = [
  { id: 'b1', company_id: 'c1', x: -8, z: 0, width: 3.2, depth: 3.2, height: 10, facade_color: '#10202b', neon_color: '#00ff88' },
  { id: 'b2', company_id: 'c2', x: 0, z: -6, width: 3, depth: 4, height: 7, facade_color: '#1a1530', neon_color: '#7a5cff' },
  { id: 'b3', company_id: 'c3', x: 8, z: 2, width: 4, depth: 3, height: 5, facade_color: '#0f2236', neon_color: '#3ea0ff' },
];

export const floors = [
  { id: 'f1', building_id: 'b1', level: 1, name: 'Administração' },
  { id: 'f2', building_id: 'b1', level: 2, name: 'Tecnologia' },
  { id: 'f3', building_id: 'b1', level: 3, name: 'Operações' },
];

// is_public = false → sala restrita a membros (regra aplicada na UI aqui; no Supabase use RLS)
const mk = (floor, list) => list.map(([name, is_public], i) => ({ id: `${floor}-r${i}`, floor_id: floor, name, is_public, x: (i - 1) * 4.5, z: 0, w: 4, d: 4 }));
export const rooms = [
  ...mk('f1', [['Recepção', true], ['Diretoria', false], ['Financeiro', false]]),
  ...mk('f2', [['Desenvolvimento', true], ['Inteligência Artificial', true], ['Segurança da Informação', false]]),
  ...mk('f3', [['Gestão de projetos', true], ['Atendimento', true], ['Planejamento', false]]),
];

export const publications = [
  { id: 'p1', company_id: 'c1', title: 'Abertura do nosso prédio na CAFÉvirtual', visibility: 'public' },
  { id: 'p2', company_id: 'c1', title: 'Comunicado interno: metas do trimestre', visibility: 'members' },
  { id: 'p3', company_id: 'c1', title: 'Rascunho de proposta comercial', visibility: 'private' },
];