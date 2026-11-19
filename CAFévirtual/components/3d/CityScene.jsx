'use client';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Edges, Text } from '@react-three/drei';
import { useAppStore } from '@/store/useAppStore';

function Building({ b, name, selected, onSelect }) {
  const [hover, setHover] = useState(false);
  return (
    <group position={[b.x, 0, b.z]}>
      {/* RAYCASTING: o R3F lança um raio da câmera até o ponteiro e dispara onClick no primeiro mesh atingido */}
      <mesh
        position={[0, b.height / 2, 0]}
        onClick={(e) => { e.stopPropagation(); onSelect(b.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[b.width, b.height, b.depth]} />
        <meshStandardMaterial color={b.facade_color} emissive={b.neon_color} emissiveIntensity={hover || selected ? 0.8 : 0.2} />
        <Edges color={b.neon_color} />
      </mesh>
      <Text position={[0, b.height + 0.9, 0]} fontSize={0.6} color={b.neon_color}>{name}</Text>
    </group>
  );
}

export default function CityScene() {
  const { buildings, companies, selectedBuildingId, selectBuilding } = useAppStore();
  return (
    <div className="stage">
      <Canvas camera={{ position: [16, 12, 18], fov: 50 }} onPointerMissed={() => selectBuilding(null)}>
        <color attach="background" args={['#070b12']} />
        <fog attach="fog" args={['#070b12', 25, 70]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 5]} intensity={0.8} />
        <gridHelper args={[60, 60, '#00ff88', '#12202e']} />
        {buildings.map((b) => (
          <Building key={b.id} b={b} name={companies.find((c) => c.id === b.company_id)?.name} selected={b.id === selectedBuildingId} onSelect={selectBuilding} />
        ))}
        {/* Órbita 360°, zoom (scroll) e deslocamento (botão direito); o limite polar impede ir abaixo do chão */}
        <OrbitControls enableDamping maxPolarAngle={Math.PI / 2.1} minDistance={6} maxDistance={45} />
      </Canvas>
    </div>
  );
}