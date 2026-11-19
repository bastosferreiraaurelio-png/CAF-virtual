'use client';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function FacadePicker({ b }) {
  const updateFacade = useAppStore((s) => s.updateFacade);
  const [draft, setDraft] = useState({ facade_color: b.facade_color, neon_color: b.neon_color });
  const [status, setStatus] = useState('');

  const publish = () => setStatus(updateFacade(b.id, draft) ? 'Fachada publicada.' : 'Sem permissão para publicar.');

  return (
    <div>
      <h3>Fachada</h3>
      {/* PRÉVIA: só o rascunho local muda; o prédio 3D só muda ao publicar */}
      <div className="preview" style={{ background: draft.facade_color, boxShadow: `0 0 28px ${draft.neon_color}`, borderColor: draft.neon_color }} />
      <label>Cor da fachada <input type="color" value={draft.facade_color} onChange={(e) => setDraft({ ...draft, facade_color: e.target.value })} /></label>
      <label>Neon <input type="color" value={draft.neon_color} onChange={(e) => setDraft({ ...draft, neon_color: e.target.value })} /></label>
      <button className="btn primary" onClick={publish}>Publicar fachada</button>
      {status && <p role="status">{status}</p>}
    </div>
  );
}