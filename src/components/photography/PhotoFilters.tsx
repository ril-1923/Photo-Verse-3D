import { Search, X } from 'lucide-react';
import type { Category } from '../../types/photography';
import type { Layout, SortKey } from '../../types/settings';
import { categories } from '../../data/photographs';
import { photographers } from '../../data/photographers';

export interface FilterState {
  search: string;
  category: Category | 'all';
  photographer: string;
  sort: SortKey;
  layout: Layout;
}

interface Props {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
  showPhotographer?: boolean;
  showLayout?: boolean;
  count: number;
  total: number;
}

export default function PhotoFilters({ value, onChange, onClear, showPhotographer = true, showLayout = true, count, total }: Props) {
  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) => onChange({ ...value, [k]: v });
  const dirty = value.search !== '' || value.category !== 'all' || value.photographer !== 'all';
  return (
    <section className="filters" aria-label="Photograph filters">
      <div className="row g-2 align-items-end">
        <div className="col-12 col-lg-4">
          <label htmlFor="f-search" className="form-label">Search titles</label>
          <div className="input-icon">
            <Search size={16} aria-hidden="true" />
            <input id="f-search" type="search" className="form-control" placeholder="Try “aurora” or “forest”" value={value.search} onChange={(e) => set('search', e.target.value)} />
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <label htmlFor="f-cat" className="form-label">Category</label>
          <select id="f-cat" className="form-select" value={value.category} onChange={(e) => set('category', e.target.value as Category | 'all')}>
            <option value="all">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {showPhotographer && (
          <div className="col-6 col-md-4 col-lg-2">
            <label htmlFor="f-ph" className="form-label">Photographer</label>
            <select id="f-ph" className="form-select" value={value.photographer} onChange={(e) => set('photographer', e.target.value)}>
              <option value="all">Everyone</option>
              {photographers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        )}
        <div className="col-6 col-md-4 col-lg-2">
          <label htmlFor="f-sort" className="form-label">Sort by</label>
          <select id="f-sort" className="form-select" value={value.sort} onChange={(e) => set('sort', e.target.value as SortKey)}>
            <option value="featured">Featured first</option>
            <option value="title">Title A to Z</option>
            <option value="year-desc">Newest year</option>
            <option value="year-asc">Oldest year</option>
          </select>
        </div>
        {showLayout && (
          <div className="col-6 col-md-4 col-lg-2">
            <span className="form-label d-block" id="f-layout-l">Layout</span>
            <div className="btn-group w-100" role="group" aria-labelledby="f-layout-l">
              <button type="button" className={`btn btn-seg ${value.layout === 'masonry' ? 'active' : ''}`} aria-pressed={value.layout === 'masonry'} onClick={() => set('layout', 'masonry')}>Masonry</button>
              <button type="button" className={`btn btn-seg ${value.layout === 'grid' ? 'active' : ''}`} aria-pressed={value.layout === 'grid'} onClick={() => set('layout', 'grid')}>Grid</button>
            </div>
          </div>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-between mt-3">
        <p className="mb-0 text-faint" aria-live="polite">Showing {count} of {total} photographs</p>
        {dirty && <button className="btn btn-ghost btn-sm" onClick={onClear}><X size={14} aria-hidden="true" /> Clear filters</button>}
      </div>
    </section>
  );
}
