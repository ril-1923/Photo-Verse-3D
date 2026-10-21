import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { accentChoices, useSettingsStore } from '../store/useSettingsStore';
import { usePhotoStore } from '../store/usePhotoStore';
import type { GalleryId } from '../types/photography';
import type { LightingMode } from '../types/museum';
import type { Layout, SortKey } from '../types/settings';

type Pending = 'favorites' | 'settings' | 'demo' | null;

export default function SettingsPage() {
  const s = useSettingsStore();
  const clearFavorites = usePhotoStore((st) => st.clearFavorites);
  const resetDemo = usePhotoStore((st) => st.resetDemoData);
  const push = usePhotoStore((st) => st.pushToast);
  const [pending, setPending] = useState<Pending>(null);

  const confirmCopy: Record<Exclude<Pending, null>, { title: string; msg: string; label: string }> = {
    favorites: { title: 'Clear favorites?', msg: 'All saved photographs will be removed from this device.', label: 'Clear favorites' },
    settings: { title: 'Reset settings?', msg: 'Appearance, museum and gallery preferences return to their defaults.', label: 'Reset settings' },
    demo: { title: 'Reset demo data?', msg: 'Favorites, recently viewed photographs and view counts will be erased.', label: 'Reset demo data' },
  };

  const run = (): void => {
    if (pending === 'favorites') clearFavorites();
    if (pending === 'settings') { s.reset(); push('Settings reset', 'info'); }
    if (pending === 'demo') resetDemo();
    setPending(null);
  };

  return (
    <PageContainer title="Settings" subtitle="Preferences are saved in this browser and applied across the whole app.">
      <div className="settings-grid">
        <section className="panel" aria-labelledby="s-app">
          <h2 id="s-app">Appearance</h2>
          <div className="seg mb-3" role="group" aria-label="Theme">
            <button className={s.theme === 'dark' ? 'active' : ''} aria-pressed={s.theme === 'dark'} onClick={() => s.set('theme', 'dark')}>Dark mode</button>
            <button className={s.theme === 'light' ? 'active' : ''} aria-pressed={s.theme === 'light'} onClick={() => s.set('theme', 'light')}>Light mode</button>
          </div>
          <span className="form-label d-block" id="acc-l">Accent colour</span>
          <div className="swatches mb-3" role="radiogroup" aria-labelledby="acc-l">
            {accentChoices.map((a) => (
              <button key={a.value} role="radio" aria-checked={s.accent === a.value} aria-label={a.name} className={s.accent === a.value ? 'active' : ''} style={{ background: a.value }} onClick={() => s.set('accent', a.value)} />
            ))}
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="rm" checked={s.reducedMotion} onChange={(e) => s.set('reducedMotion', e.target.checked)} />
            <label className="form-check-label" htmlFor="rm">Reduce motion (stops particles, transitions and camera glides)</label>
          </div>
        </section>

        <section className="panel" aria-labelledby="s-mus">
          <h2 id="s-mus">Museum</h2>
          <label htmlFor="dg" className="form-label">Default gallery</label>
          <select id="dg" className="form-select mb-3" value={s.defaultGallery} onChange={(e) => s.set('defaultGallery', e.target.value as GalleryId)}>
            <option value="nature">Nature Gallery</option><option value="urban">Urban Gallery</option><option value="wildlife">Wildlife Gallery</option>
          </select>
          <label htmlFor="dl" className="form-label">Default lighting</label>
          <select id="dl" className="form-select mb-3" value={s.defaultLighting} onChange={(e) => s.set('defaultLighting', e.target.value as LightingMode)}>
            <option value="daylight">Daylight</option><option value="golden">Golden Hour</option><option value="night">Night Mode</option>
          </select>
          <label htmlFor="li" className="form-label">Lighting intensity: {Math.round(s.lightingIntensity * 100)}%</label>
          <input id="li" type="range" className="form-range mb-3" min={0.3} max={2} step={0.05} value={s.lightingIntensity} onChange={(e) => s.set('lightingIntensity', Number(e.target.value))} />
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="ar" checked={s.autoRotate} onChange={(e) => s.set('autoRotate', e.target.checked)} />
            <label className="form-check-label" htmlFor="ar">Slowly rotate the camera while idle</label>
          </div>
        </section>

        <section className="panel" aria-labelledby="s-gal">
          <h2 id="s-gal">Gallery</h2>
          <label htmlFor="gl" className="form-label">Default layout</label>
          <select id="gl" className="form-select mb-3" value={s.layout} onChange={(e) => s.set('layout', e.target.value as Layout)}>
            <option value="masonry">Masonry</option><option value="grid">Grid</option>
          </select>
          <label htmlFor="gs" className="form-label">Default sorting</label>
          <select id="gs" className="form-select mb-3" value={s.sort} onChange={(e) => s.set('sort', e.target.value as SortKey)}>
            <option value="featured">Featured first</option><option value="title">Title A to Z</option>
            <option value="year-desc">Newest year</option><option value="year-asc">Oldest year</option>
          </select>
          <label htmlFor="gp" className="form-label">Photographs per page</label>
          <select id="gp" className="form-select" value={s.perPage} onChange={(e) => s.set('perPage', Number(e.target.value))}>
            {[6, 12, 24, 48].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </section>

        <section className="panel" aria-labelledby="s-data">
          <h2 id="s-data">Data</h2>
          <p className="text-faint small">Everything is stored in this browser only. These actions ask before they run.</p>
          <div className="d-grid gap-2">
            <button className="btn btn-ghost" onClick={() => setPending('favorites')}>Clear favorites</button>
            <button className="btn btn-ghost" onClick={() => setPending('settings')}>Reset settings</button>
            <button className="btn btn-danger-soft" onClick={() => setPending('demo')}>Reset application demo data</button>
          </div>
        </section>
      </div>
      {pending && <ConfirmDialog open title={confirmCopy[pending].title} message={confirmCopy[pending].msg} confirmLabel={confirmCopy[pending].label} onCancel={() => setPending(null)} onConfirm={run} />}
    </PageContainer>
  );
}
