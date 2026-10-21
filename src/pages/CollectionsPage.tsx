import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import PhotoFilters, { type FilterState } from '../components/photography/PhotoFilters';
import PhotoGrid from '../components/photography/PhotoGrid';
import EmptyState from '../components/common/EmptyState';
import LoadingScreen from '../components/common/LoadingScreen';
import { photographs, categories } from '../data/photographs';
import { filterPhotos, defaultFilters } from '../utils/filterPhotos';
import { useSettingsStore } from '../store/useSettingsStore';
import type { Category } from '../types/photography';

export default function CollectionsPage() {
  const [params] = useSearchParams();
  const sort = useSettingsStore((s) => s.sort);
  const layout = useSettingsStore((s) => s.layout);
  const perPage = useSettingsStore((s) => s.perPage);
  const initialCat = categories.find((c) => c === params.get('category')) as Category | undefined;
  const [filters, setFilters] = useState<FilterState>(() => ({ ...defaultFilters(sort, layout), category: initialCat ?? 'all' }));
  const [visible, setVisible] = useState(perPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = window.setTimeout(() => setLoading(false), 350); return () => window.clearTimeout(t); }, []);
  // Keep the category in sync when arriving from a home-page card.
  useEffect(() => { if (initialCat) setFilters((f) => ({ ...f, category: initialCat })); }, [initialCat]);
  useEffect(() => { setVisible(perPage); }, [perPage, filters.search, filters.category, filters.photographer, filters.sort]);

  const results = useMemo(() => filterPhotos(photographs, filters), [filters]);
  const shown = results.slice(0, visible);

  return (
    <PageContainer title="Collections" subtitle="Forty-five photographs across nine categories. Search, filter and sort the whole archive.">
      <div className="chip-row" role="group" aria-label="Quick category filter">
        <button className={`chip ${filters.category === 'all' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, category: 'all' })}>All</button>
        {categories.map((c) => (
          <button key={c} className={`chip ${filters.category === c ? 'active' : ''}`} aria-pressed={filters.category === c} onClick={() => setFilters({ ...filters, category: c })}>{c}</button>
        ))}
      </div>
      <PhotoFilters
        value={filters}
        onChange={setFilters}
        onClear={() => setFilters(defaultFilters(filters.sort, filters.layout))}
        count={results.length}
        total={photographs.length}
      />
      {loading ? (
        <LoadingScreen label="Loading collection" />
      ) : results.length === 0 ? (
        <EmptyState title="No photographs match" text="Try a different search term or clear the filters to see the full collection." action={<button className="btn btn-accent" onClick={() => setFilters(defaultFilters(filters.sort, filters.layout))}>Clear filters</button>} />
      ) : (
        <>
          <PhotoGrid photos={shown} layout={filters.layout} list={results.map((p) => p.id)} />
          {visible < results.length && (
            <div className="text-center mt-4">
              <button className="btn btn-ghost" onClick={() => setVisible(visible + perPage)}>Load more ({results.length - visible} left)</button>
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
