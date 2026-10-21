import { usePhotoStore } from '../../store/usePhotoStore';
import { galleries, galleryStep } from './museumLayout';
import type { GalleryId } from '../../types/photography';

export default function GalleryNavigation() {
  const gallery = usePhotoStore((s) => s.gallery);
  const setGallery = usePhotoStore((s) => s.setGallery);
  const requestCamera = usePhotoStore((s) => s.requestCamera);
  const tourActive = usePhotoStore((s) => s.tourActive);
  const active = galleries.find((g) => g.id === gallery) ?? galleries[0];

  const go = (id: GalleryId): void => {
    setGallery(id);
    if (!tourActive) requestCamera([galleryStep(id)], 'move');
  };

  return (
    <section className="m-panel" aria-label="Gallery navigation">
      <h2 className="m-title">Galleries</h2>
      <div className="gallery-list" role="group" aria-label="Choose a gallery">
        {galleries.map((g) => (
          <button key={g.id} className={`gallery-btn ${g.id === gallery ? 'active' : ''}`} onClick={() => go(g.id)} aria-pressed={g.id === gallery} disabled={tourActive}>
            <span className="dot" aria-hidden="true" /> {g.name}
          </button>
        ))}
      </div>
      <p className="m-desc" aria-live="polite"><strong>{active.name}.</strong> {active.description}</p>
    </section>
  );
}
