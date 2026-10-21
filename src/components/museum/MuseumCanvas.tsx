import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePhotoStore } from '../../store/usePhotoStore';
import MuseumEnvironment from './MuseumEnvironment';
import CameraRig from './CameraRig';

interface Props { mobile: boolean; reducedMotion: boolean; autoRotate: boolean; onContextLost: () => void }

export default function MuseumCanvas({ mobile, reducedMotion, autoRotate, onContextLost }: Props) {
  const setHighlight = usePhotoStore((s) => s.setHighlight);
  const dpr = useMemo<[number, number]>(() => [1, mobile ? 1.25 : 1.75], [mobile]);
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: !mobile, powerPreference: 'high-performance', alpha: false }}
      camera={{ position: [0, 3.4, 13.5], fov: mobile ? 62 : 50, near: 0.1, far: 120 }}
      onPointerMissed={() => { if (!usePhotoStore.getState().tourActive) setHighlight(null); }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onContextLost(); });
      }}
      aria-label="Interactive 3D photography museum. Drag to look around, scroll to zoom, click a frame to inspect it."
    >
      <Suspense fallback={null}>
        <MuseumEnvironment mobile={mobile} reducedMotion={reducedMotion} />
      </Suspense>
      <CameraRig reducedMotion={reducedMotion} autoRotate={autoRotate} mobile={mobile} />
    </Canvas>
  );
}

