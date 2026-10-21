import { galleries } from './museumLayout';
import { photographs } from '../../data/photographs';
import PhotoGrid from '../photography/PhotoGrid';
import { usePhotoStore } from '../../store/usePhotoStore';

interface Props { reason: string }

/** 2D museum used when WebGL is unavailable, fails, or the visitor prefers a simple view. */
export default function MuseumFallback({ reason }: Props) {
  const gallery = usePhotoStore((s) => s.gallery);
  const setGallery = usePhotoStore((s) => s.setGallery);
  const active = galleries.find((g) => g.id === gallery) ?? galleries[0];
  const photos = photographs.filter((p) => p.gallery === active.id).slice(0, 12);
  return (
    <div className="museum-fallback">
      <p className="fallback-note">{reason}</p>
      <div className="gallery-tabs" role="tablist" aria-label="Galleries">
        {galleries.map((g) => (
          <button key={g.id} role="tab" aria-selected={g.id === gallery} className={g.id === gallery ? 'active' : ''} onClick={() => setGallery(g.id)}>{g.name}</button>
        ))}
      </div>
      <p className="lead-text">{active.description}</p>
      <PhotoGrid photos={photos} layout="masonry" />
    </div>
  );
}
