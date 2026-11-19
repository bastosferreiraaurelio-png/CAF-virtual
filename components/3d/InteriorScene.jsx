'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

// Sala 3D: piso, três paredes (frente aberta), mesa e luz neon
function Room({ r, neon, locked, onPick }) {
  const h = 2.5, t = 0.12, wall = locked ? '#3a1d24' : '#1b2733';
  return (
    <group position={[r.x, 0, r.z]} onClick={(e) => { e.stopPropagation(); onPick(r); }}>
      <mesh><boxGeometry args={[r.w, 0.1, r.d]} /><meshStandardMaterial color="#0e1620" /></mesh>
      <mesh position={[0, h / 2, -r.d / 2]}><boxGeometry args={[r.w, h, t]} /><meshStandardMaterial color={wall} /></mesh>
      <mesh position={[-r.w / 2, h / 2, 0]}><boxGeometry args={[t, h, r.d]} /><meshStandardMaterial color={wall} /></mesh>
      <mesh position={[r.w / 2, h / 2, 0]}><boxGeometry args={[t, h, r.d]} /><meshStandardMaterial color={wall} /></mesh>
      {!locked && <mesh position={[0, 0.45, 0]}><boxGeometry args={[r.w * 0.55, 0.1, r.d * 0.3]} /><meshStandardMaterial color="#2a3a4a" emissive={neon} emissiveIntensity={0.15} /></mesh>}
      <pointLight position={[0, h - 0.3, 0]} color={locked ? '#ff4d6d' : neon} intensity={6} distance={8} />
      <Text position={[0, h + 0.4, -r.d / 2 + 0.1]} fontSize={0.35} color={locked ? '#ff4d6d' : neon}>{locked ? `🔒 ${r.name}` : r.name}</Text>
    </group>
  );
}

export default function InteriorScene() {
  const { buildings, floors, rooms, selectedBuildingId, activeFloorId, canManage } = useAppStore();
  const [picked, setPicked] = useState(null);
  const b = buildings.find((x) => x.id === selectedBuildingId);
  const floor = floors.find((f) => f.id === activeFloorId);
  const list = rooms.filter((r) => r.floor_id === activeFloorId);
  // Salas privadas ficam bloqueadas para quem não gerencia a empresa
  const isLocked = (r) => !r.is_public && !canManage(b.company_id);

  return (
    <div className="stage">
      <Canvas camera={{ position: [0, 6, 10], fov: 50 }} onPointerMissed={() => setPicked(null)}>
        <color attach="background" args={['#05080d']} />
        <ambientLight intensity={0.35} />
        {list.map((r) => <Room key={r.id} r={r} neon={b.neon_color} locked={isLocked(r)} onPick={setPicked} />)}
        <OrbitControls target={[0, 1, 0]} enableDamping maxPolarAngle={Math.PI / 2.05} />
      </Canvas>
      <div className="panel toast">
        {!floor ? 'Este prédio ainda não tem andares cadastrados.'
          : picked ? (isLocked(picked) ? `${picked.name}: acesso restrito a membros.` : `${picked.name} · Andar ${floor.level} (${floor.name})`)
          : `Andar ${floor.level} — ${floor.name}. Clique em uma sala.`}
      </div>
    </div>
  );
}