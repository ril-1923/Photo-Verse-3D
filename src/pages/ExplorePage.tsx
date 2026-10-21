import { useMemo, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import PhotoGrid from '../components/photography/PhotoGrid';
import EmptyState from '../components/common/EmptyState';
import { destinations } from '../data/destinations';
import { photographs, categories } from '../data/photographs';
import type { Category } from '../types/photography';

const W = 1000;
const H = 500;
const project = (lon: number, lat: number): [number, number] => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H];

export default function ExplorePage() {
  const [selectedId, setSelectedId] = useState('himalayas');
  const [country, setCountry] = useState('all');
  const [cat, setCat] = useState<Category | 'all'>('all');

  const countries = useMemo(() => [...new Set(destinations.map((d) => d.country))].sort(), []);
  const countFor = (id: string): number => photographs.filter((p) => p.destinationId === id && (cat === 'all' || p.category === cat)).length;
  const visible = destinations.filter((d) => (country === 'all' || d.country === country) && (cat === 'all' || countFor(d.id) > 0));
  const selected = destinations.find((d) => d.id === selectedId);
  const selectedVisible = selected && visible.some((d) => d.id === selected.id);
  const photos = selectedVisible ? photographs.filter((p) => p.destinationId === selected.id && (cat === 'all' || p.category === cat)) : [];

  return (
    <PageContainer title="Explore" subtitle="Pick a destination to see the photographs made there. The map is a stylised illustration, not a precise GIS map.">
      <div className="row g-2 mb-3">
        <div className="col-6 col-md-3">
          <label htmlFor="ex-country" className="form-label">Country</label>
          <select id="ex-country" className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="all">All countries</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <label htmlFor="ex-cat" className="form-label">Category</label>
          <select id="ex-cat" className="form-select" value={cat} onChange={(e) => setCat(e.target.value as Category | 'all')}>
            <option value="all">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="world-map">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Stylised world map with photography destinations">
              {Array.from({ length: 11 }, (_, i) => <line key={`v${i}`} x1={(i * W) / 10} x2={(i * W) / 10} y1={0} y2={H} className="grat" />)}
              {Array.from({ length: 6 }, (_, i) => <line key={`h${i}`} y1={(i * H) / 5} y2={(i * H) / 5} x1={0} x2={W} className="grat" />)}
              {visible.map((d) => {
                const [x, y] = project(d.lon, d.lat);
                const on = d.id === selectedId;
                return (
                  <g key={d.id} className={`pin ${on ? 'on' : ''}`} transform={`translate(${x} ${y})`} tabIndex={0} role="button" aria-pressed={on} aria-label={`${d.name}, ${d.country}, ${countFor(d.id)} photographs`}
                    onClick={() => setSelectedId(d.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(d.id); } }}>
                    <circle r={on ? 16 : 11} className="halo" />
                    <circle r={on ? 7 : 5} className="core" />
                    <text y={-20} textAnchor="middle">{d.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="dest-list" role="list">
            {visible.map((d) => (
              <button key={d.id} role="listitem" className={`dest-card ${d.id === selectedId ? 'active' : ''}`} onClick={() => setSelectedId(d.id)} aria-pressed={d.id === selectedId}>
                <span><strong>{d.name}</strong><small>{d.country}</small></span>
                <span className="count">{countFor(d.id)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedVisible && selected ? (
        <section className="mt-5" aria-live="polite">
          <h2 className="h3 mb-1">{selected.name}, {selected.country}</h2>
          <p className="lead-text mb-1">{selected.description}</p>
          <p className="text-faint">{photos.length} {photos.length === 1 ? 'photograph' : 'photographs'} from this destination</p>
          {photos.length === 0 ? <EmptyState title="No photographs here yet" text="This destination has no photographs in the selected category." /> : <PhotoGrid photos={photos} layout="grid" />}
        </section>
      ) : (
        <EmptyState title="Select a destination" text="No destination matches the current filters. Adjust the country or category to continue." />
      )}
    </PageContainer>
  );
}
