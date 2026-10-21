import { Play, Square } from 'lucide-react';
import { usePhotoStore } from '../../store/usePhotoStore';
import { tourSteps } from './museumLayout';

export function TourButton() {
  const active = usePhotoStore((s) => s.tourActive);
  const requestCamera = usePhotoStore((s) => s.requestCamera);
  const setTour = usePhotoStore((s) => s.setTour);
  const closePhoto = usePhotoStore((s) => s.closePhoto);
  const start = (): void => {
    closePhoto();
    setTour(true, 'Starting the museum tour…', null);
    requestCamera(tourSteps(), 'tour');
  };
  return active ? (
    <button className="btn btn-accent" onClick={() => setTour(false, null, null)}><Square size={14} aria-hidden="true" /> Stop tour</button>
  ) : (
    <button className="btn btn-accent" onClick={start}><Play size={14} aria-hidden="true" /> Start Museum Tour</button>
  );
}

export function TourCaption() {
  const caption = usePhotoStore((s) => s.tourCaption);
  const active = usePhotoStore((s) => s.tourActive);
  if (!active || !caption) return null;
  return <div className="tour-caption" role="status" aria-live="polite">{caption}</div>;
}
