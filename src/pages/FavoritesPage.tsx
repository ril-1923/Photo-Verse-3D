import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import PhotoGrid from '../components/photography/PhotoGrid';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { photographs, categories } from '../data/photographs';
import { usePhotoStore } from '../store/usePhotoStore';
import { useSettingsStore } from '../store/useSettingsStore';
import type { Category } from '../types/photography';

export default function FavoritesPage() {
  const favorites = usePhotoStore((s) => s.favorites);
  const clear = usePhotoStore((s) => s.clearFavorites);
  const layout = useSettingsStore((s) => s.layout);
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [sort, setSort] = useState<'title' | 'saved'>('saved');
  const [confirm, setConfirm] = useState(false);

  const saved = useMemo(() => favorites.map((id) => photographs.find((p) => p.id === id)).filter((p): p is (typeof photographs)[number] => !!p), [favorites]);
  const list = useMemo(() => {
    const f = saved.filter((p) => cat === 'all' || p.category === cat);
    return sort === 'title' ? [...f].sort((a, b) => a.title.localeCompare(b.title)) : f;
  }, [saved, cat, sort]);
  const present = categories.filter((c) => saved.some((p) => p.category === c));

  return (
    <PageContainer
      title="Favorites"
      subtitle={saved.length ? `${saved.length} saved ${saved.length === 1 ? 'photograph' : 'photographs'}, stored on this device.` : 'Photographs you save will appear here.'}
      actions={saved.length > 0 ? <button className="btn btn-ghost" onClick={() => setConfirm(true)}>Clear all favorites</button> : undefined}
    >
      {saved.length === 0 ? (
        <EmptyState icon={<Heart size={34} strokeWidth={1.2} />} title="Nothing saved yet" text="Tap the heart on any photograph in the museum or collections to keep it here." action={<Link to="/collections" className="btn btn-accent">Browse collections</Link>} />
      ) : (
        <>
          <div className="row g-2 mb-4">
            <div className="col-6 col-md-3">
              <label htmlFor="fv-cat" className="form-label">Category</label>
              <select id="fv-cat" className="form-select" value={cat} onChange={(e) => setCat(e.target.value as Category | 'all')}>
                <option value="all">All saved</option>
                {present.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-6 col-md-3">
              <label htmlFor="fv-sort" className="form-label">Sort by</label>
              <select id="fv-sort" className="form-select" value={sort} onChange={(e) => setSort(e.target.value as 'title' | 'saved')}>
                <option value="saved">Order saved</option>
                <option value="title">Title A to Z</option>
              </select>
            </div>
          </div>
          {list.length === 0 ? (
            <EmptyState title="No favorites in this category" text="Choose another category to see the rest of your saved photographs." action={<button className="btn btn-ghost" onClick={() => setCat('all')}>Show all</button>} />
          ) : (
            <PhotoGrid photos={list} layout={layout} list={list.map((p) => p.id)} />
          )}
        </>
      )}
      <ConfirmDialog open={confirm} title="Clear all favorites?" message="This removes every saved photograph from this device. It cannot be undone." confirmLabel="Clear favorites" onCancel={() => setConfirm(false)} onConfirm={() => { clear(); setConfirm(false); }} />
    </PageContainer>
  );
}
