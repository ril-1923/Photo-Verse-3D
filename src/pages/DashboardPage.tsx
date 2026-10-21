import { useMemo, useState } from 'react';
import { Image, Layers, Heart, Users, Eye } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import StatCard from '../components/dashboard/StatCard';
import { CategoryBar, CategoryDonut } from '../components/dashboard/CategoryChart';
import VisitsChart from '../components/dashboard/VisitsChart';
import SmartImage from '../components/common/SmartImage';
import { photographs, categories } from '../data/photographs';
import { photographers } from '../data/photographers';
import { baselineViews, rangeOptions, visitsForRange, type RangeKey } from '../data/analytics';
import { usePhotoStore } from '../store/usePhotoStore';
import { formatDate, formatNumber } from '../utils/formatters';
import type { Photograph } from '../types/photography';

function MiniList({ title, items, right }: { title: string; items: Photograph[]; right: (p: Photograph) => string }) {
  const open = usePhotoStore((s) => s.openPhoto);
  return (
    <section className="panel h-100" aria-label={title}>
      <h2 className="h6">{title}</h2>
      {items.length === 0 ? <p className="text-faint small mb-0">Nothing here yet. Open a photograph to start building this list.</p> : (
        <ul className="mini-list">
          {items.map((p) => (
            <li key={p.id}>
              <button onClick={() => open(p.id, items.map((x) => x.id))}>
                <SmartImage src={p.thumbUrl} alt="" category={p.category} title={p.title} width={96} height={96} />
                <span><strong>{p.title}</strong><small>{p.category}</small></span>
                <em>{right(p)}</em>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function DashboardPage() {
  const favorites = usePhotoStore((s) => s.favorites);
  const recent = usePhotoStore((s) => s.recent);
  const views = usePhotoStore((s) => s.views);
  const [range, setRange] = useState<RangeKey>('6m');

  const visits = useMemo(() => visitsForRange(range), [range]);
  const totalVisits = visits.reduce((a, b) => a + b.visits, 0);
  const perCat = useMemo(() => categories.map((c) => ({ name: c, value: photographs.filter((p) => p.category === c).length })), []);
  const favCat = useMemo(() => categories.map((c) => ({ name: c, value: photographs.filter((p) => p.category === c && favorites.includes(p.id)).length })), [favorites]);
  const recentPhotos = recent.map((id) => photographs.find((p) => p.id === id)).filter((p): p is Photograph => !!p).slice(0, 5);
  const viewCount = (p: Photograph): number => baselineViews(photographs.indexOf(p)) + (views[p.id] ?? 0);
  const most = useMemo(() => [...photographs].sort((a, b) => viewCount(b) - viewCount(a)).slice(0, 5), [views]); // eslint-disable-line react-hooks/exhaustive-deps
  const added = useMemo(() => [...photographs].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 5), []);

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Collection figures come from the real dataset. Gallery visits and baseline view counts are simulated demo data, not production traffic."
      actions={
        <div>
          <label htmlFor="range" className="form-label">Date range (demo data)</label>
          <select id="range" className="form-select" value={range} onChange={(e) => setRange(e.target.value as RangeKey)}>
            {rangeOptions.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
          </select>
        </div>
      }
    >
      <div className="stat-grid">
        <StatCard label="Total photographs" value={photographs.length} icon={<Image size={18} />} />
        <StatCard label="Collections" value={categories.length} icon={<Layers size={18} />} />
        <StatCard label="Favorites" value={favorites.length} icon={<Heart size={18} />} note="Saved on this device" />
        <StatCard label="Photographers" value={photographers.length} icon={<Users size={18} />} note="Fictional profiles" />
        <StatCard label="Gallery visits" value={formatNumber(totalVisits)} icon={<Eye size={18} />} note="Simulated" />
      </div>

      <div className="row g-4 mt-1">
        <div className="col-lg-6"><section className="panel"><h2 className="h6">Photographs by category</h2><CategoryBar data={perCat} label="Bar chart of photographs per category" /></section></div>
        <div className="col-lg-6"><section className="panel"><h2 className="h6">Collection distribution</h2><CategoryDonut data={perCat} label="Donut chart of collection distribution" /></section></div>
        <div className="col-lg-6"><section className="panel"><h2 className="h6">Monthly gallery visits (simulated)</h2><VisitsChart data={visits} /></section></div>
        <div className="col-lg-6"><section className="panel"><h2 className="h6">Favorite photographs by category</h2><CategoryBar data={favCat} label="Bar chart of favorites per category" /></section></div>
      </div>

      <section className="panel mt-4" aria-labelledby="cat-sum">
        <h2 id="cat-sum" className="h6">Category summary</h2>
        <div className="table-responsive">
          <table className="table table-borderless align-middle mb-0 summary-table">
            <thead><tr><th scope="col">Category</th><th scope="col">Photographs</th><th scope="col">Favorites</th><th scope="col">Share</th></tr></thead>
            <tbody>
              {perCat.map((c, i) => (
                <tr key={c.name}><th scope="row">{c.name}</th><td>{c.value}</td><td>{favCat[i].value}</td><td>{Math.round((c.value / photographs.length) * 100)}%</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="row g-4 mt-1">
        <div className="col-lg-4"><MiniList title="Recently viewed" items={recentPhotos} right={(p) => p.year.toString()} /></div>
        <div className="col-lg-4"><MiniList title="Most viewed (simulated + yours)" items={most} right={(p) => `${viewCount(p)} views`} /></div>
        <div className="col-lg-4"><MiniList title="Recently added" items={added} right={(p) => formatDate(p.addedAt)} /></div>
      </div>
    </PageContainer>
  );
}
