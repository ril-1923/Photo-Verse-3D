import { lazy, Suspense, useEffect, useState } from 'react';
import { SlidersHorizontal, Box, LayoutGrid } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import { usePhotoStore } from '../store/usePhotoStore';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { hasWebGL } from '../utils/imageUtils';
import ErrorBoundary from '../components/common/ErrorBoundary';
import LoadingScreen from '../components/common/LoadingScreen';
import GalleryNavigation from '../components/museum/GalleryNavigation';
import { LightingPanel, ViewButtons } from '../components/museum/MuseumControls';
import { TourButton, TourCaption } from '../components/museum/MuseumTour';
import MuseumFallback from '../components/museum/MuseumFallback';

const MuseumCanvas = lazy(() => import('../components/museum/MuseumCanvas'));

export default function MuseumPage() {
  const reducedMotionSetting = useSettingsStore((s) => s.reducedMotion);
  const autoRotate = useSettingsStore((s) => s.autoRotate);
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const mobile = useMediaQuery('(max-width: 767px)');
  const [webgl] = useState(() => hasWebGL());
  const [simple, setSimple] = useState(false);
  const [lost, setLost] = useState(false);
  const [panels, setPanels] = useState(false);

  // Apply saved museum defaults on entry.
  useEffect(() => {
    const s = useSettingsStore.getState();
    const st = usePhotoStore.getState();
    st.setGallery(s.defaultGallery);
    st.setLighting(s.defaultLighting);
    st.setIntensity(s.lightingIntensity);
    st.setTour(false, null, null);
    return () => { usePhotoStore.getState().setTour(false, null, null); usePhotoStore.setState({ cameraRequest: null }); };
  }, []);

  const reduced = reducedMotionSetting || prefersReduced;
  const reason = !webgl
    ? 'WebGL is not available in this browser, so here is the museum as a 2D gallery.'
    : lost
      ? 'The 3D view stopped responding, so here is the 2D gallery. Reload the page to try 3D again.'
      : 'Simple gallery view. Switch back to the 3D museum any time.';
  const show3D = webgl && !simple && !lost;

  return (
    <main className="museum-page" id="main">
      <h1 className="visually-hidden">Interactive 3D photography museum</h1>
      {show3D ? (
        <div className="museum-stage">
          <ErrorBoundary fallback={<MuseumFallback reason="The 3D museum could not start, so here is the 2D gallery." />}>
            <Suspense fallback={<LoadingScreen label="Building the museum" />}>
              <MuseumCanvas mobile={mobile} reducedMotion={reduced} autoRotate={autoRotate} onContextLost={() => setLost(true)} />
            </Suspense>
          </ErrorBoundary>

          <div className="museum-top">
            <ViewButtons />
            <div className="d-flex gap-2 flex-wrap">
              <TourButton />
              <button className="btn btn-glass" onClick={() => setSimple(true)}><LayoutGrid size={15} aria-hidden="true" /> Simple gallery</button>
              <button className="btn btn-glass d-md-none" aria-expanded={panels} onClick={() => setPanels(!panels)}><SlidersHorizontal size={15} aria-hidden="true" /> Controls</button>
            </div>
          </div>

          <div className={`museum-side ${panels ? 'is-open' : ''}`}>
            <GalleryNavigation />
            <LightingPanel />
          </div>
          <TourCaption />
          <p className="museum-hint">Drag to look around, scroll or pinch to zoom, click a frame to inspect it.</p>
        </div>
      ) : (
        <div className="container-xxl page">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="h3 mb-0">Museum, simple view</h2>
            {webgl && !lost && <button className="btn btn-accent" onClick={() => setSimple(false)}><Box size={15} aria-hidden="true" /> Enter 3D museum</button>}
          </div>
          <MuseumFallback reason={reason} />
        </div>
      )}
    </main>
  );
}
