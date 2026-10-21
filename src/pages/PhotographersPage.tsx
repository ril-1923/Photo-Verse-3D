import { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import PhotographerCard from '../components/photography/PhotographerCard';
import EmptyState from '../components/common/EmptyState';
import SmartImage from '../components/common/SmartImage';
import { photographers } from '../data/photographers';
import { photographs, categories } from '../data/photographs';
import { usePhotoStore } from '../store/usePhotoStore';
import { avatarFor } from '../utils/imageUtils';
import type { Category, Photographer } from '../types/photography';

function ProfileModal({ p, onClose }: { p: Photographer; onClose: () => void }) {
  const openPhoto = usePhotoStore((s) => s.openPhoto);
  const closeRef = useRef<HTMLButtonElement>(null);
  const works = photographs.filter((x) => x.photographerId === p.id);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !usePhotoStore.getState().selectedPhotoId) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="pf-name" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close profile"><X size={20} /></button>
        <div className="d-flex gap-3 align-items-center mb-3">
          <img src={avatarFor(p.name, p.hue)} width={84} height={84} alt={`Illustrated avatar for ${p.name}`} className="avatar" />
          <div>
            <h2 id="pf-name" className="mb-0">{p.name}</h2>
            <p className="text-accent mb-0">{p.specialty}</p>
            <p className="text-faint small mb-0">{p.location}</p>
          </div>
        </div>
        <p>{p.bio}</p>
        <div className="stat-row">
          <div><strong>{p.years}</strong><span>years of experience</span></div>
          <div><strong>{works.length}</strong><span>photographs</span></div>
          <div><strong>{p.collections}</strong><span>collections</span></div>
        </div>
        <h3 className="h6 mt-4">Selected works</h3>
        <div className="works">
          {works.map((w) => (
            <button key={w.id} onClick={() => openPhoto(w.id, works.map((x) => x.id))} aria-label={`Open ${w.title}`}>
              <SmartImage src={w.thumbUrl} alt={w.title} category={w.category} title={w.title} width={300} height={300} />
              <span>{w.title}</span>
            </button>
          ))}
        </div>
        <p className="tiny text-faint mt-3 mb-0">Demo content: {p.name} is a fictional persona created for this project.</p>
      </div>
    </div>
  );
}

export default function PhotographersPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [selected, setSelected] = useState<Photographer | null>(null);
  const list = useMemo(() => photographers.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase()) && (cat === 'all' || p.categories.includes(cat))), [search, cat]);
  const count = (id: string): number => photographs.filter((p) => p.photographerId === id).length;

  return (
    <PageContainer title="Photographers" subtitle="Meet the eight fictional photographers behind the demo collection. Every profile is invented for this project.">
      <div className="row g-2 mb-4">
        <div className="col-12 col-md-5">
          <label htmlFor="ph-search" className="form-label">Search by name</label>
          <input id="ph-search" type="search" className="form-control" placeholder="Search photographers" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="ph-cat" className="form-label">Category</label>
          <select id="ph-cat" className="form-select" value={cat} onChange={(e) => setCat(e.target.value as Category | 'all')}>
            <option value="all">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      {list.length === 0 ? (
        <EmptyState title="No photographers found" text="Try another name or category." action={<button className="btn btn-ghost" onClick={() => { setSearch(''); setCat('all'); }}>Clear filters</button>} />
      ) : (
        <div className="row g-4">
          {list.map((p) => <div key={p.id} className="col-12 col-lg-6"><PhotographerCard photographer={p} photoCount={count(p.id)} onOpen={setSelected} /></div>)}
        </div>
      )}
      {selected && <ProfileModal p={selected} onClose={() => setSelected(null)} />}
    </PageContainer>
  );
}
