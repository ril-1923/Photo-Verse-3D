import { Home, Eye, Film, RotateCcw, Sun, Sunset, Moon } from 'lucide-react';
import { usePhotoStore } from '../../store/usePhotoStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { LIGHT } from './lighting';
import { cinematicSteps, galleryStep, homeStep } from './museumLayout';
import type { LightingMode } from '../../types/museum';

const modes: { id: LightingMode; icon: typeof Sun }[] = [
  { id: 'daylight', icon: Sun },
  { id: 'golden', icon: Sunset },
  { id: 'night', icon: Moon },
];

export function LightingPanel() {
  const lighting = usePhotoStore((s) => s.lighting);
  const intensity = usePhotoStore((s) => s.intensity);
  const setLighting = usePhotoStore((s) => s.setLighting);
  const setIntensity = usePhotoStore((s) => s.setIntensity);
  return (
    <section className="m-panel" aria-label="Lighting controls">
      <h2 className="m-title">Lighting</h2>
      <div className="seg" role="group" aria-label="Lighting mode">
        {modes.map(({ id, icon: Icon }) => (
          <button key={id} className={lighting === id ? 'active' : ''} onClick={() => setLighting(id)} aria-pressed={lighting === id}>
            <Icon size={15} aria-hidden="true" /> {LIGHT[id].label}
          </button>
        ))}
      </div>
      <p className="m-desc">{LIGHT[lighting].blurb}</p>
      <label htmlFor="intensity" className="form-label small mb-1">Brightness {Math.round(intensity * 100)}%</label>
      <input id="intensity" type="range" className="form-range" min={0.3} max={2} step={0.05} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} />
    </section>
  );
}

export function ViewButtons() {
  const requestCamera = usePhotoStore((s) => s.requestCamera);
  const gallery = usePhotoStore((s) => s.gallery);
  const tourActive = usePhotoStore((s) => s.tourActive);
  const setTour = usePhotoStore((s) => s.setTour);
  const setLighting = usePhotoStore((s) => s.setLighting);
  const setIntensity = usePhotoStore((s) => s.setIntensity);
  const settings = useSettingsStore.getState;

  const home = (): void => { setTour(false, null, null); requestCamera([homeStep], 'move'); };
  const reset = (): void => {
    const s = settings();
    setTour(false, null, null);
    setLighting(s.defaultLighting);
    setIntensity(s.lightingIntensity);
    requestCamera([homeStep], 'move');
  };
  const galleryView = (): void => { setTour(false, null, null); requestCamera([galleryStep(gallery)], 'move'); };
  const cinematic = (): void => {
    setTour(true, 'Cinematic view', null);
    requestCamera(cinematicSteps, 'cinematic');
  };

  return (
    <div className="view-buttons" role="group" aria-label="Camera views">
      <button className="btn btn-glass" onClick={reset}><RotateCcw size={15} aria-hidden="true" /> Reset View</button>
      <button className="btn btn-glass" onClick={home}><Home size={15} aria-hidden="true" /> Home View</button>
      <button className="btn btn-glass" onClick={galleryView}><Eye size={15} aria-hidden="true" /> Gallery View</button>
      <button className="btn btn-glass" onClick={cinematic} disabled={tourActive}><Film size={15} aria-hidden="true" /> Cinematic View</button>
    </div>
  );
}
