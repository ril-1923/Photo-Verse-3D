import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, MapPin, Camera } from 'lucide-react';
import { usePhotoStore } from '../../store/usePhotoStore';
import { photoById } from '../../data/photographs';
import SmartImage from '../common/SmartImage';
import FavoriteButton from './FavoriteButton';

export default function PhotoDetailsModal() {
  const id = usePhotoStore((s) => s.selectedPhotoId);
  const list = usePhotoStore((s) => s.modalList);
  const close = usePhotoStore((s) => s.closePhoto);
  const step = usePhotoStore((s) => s.stepPhoto);
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = id ? photoById(id) : undefined;
  const open = !!photo;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
      previous?.focus?.();
    };
  }, [open, close, step]);

  if (!photo) return null;
  const idx = list.indexOf(photo.id);
  const [w, h] = photo.orientation === 'portrait' ? [600, 900] : photo.orientation === 'square' ? [800, 800] : [900, 600];

  return (
    <div className="overlay" onClick={close} onPointerDown={(e) => e.stopPropagation()}>
      <div className="photo-modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="modal-close" onClick={close} aria-label="Close photo details"><X size={20} /></button>
        <div className="pm-image">
          <SmartImage key={photo.id} src={photo.imageUrl} alt={`${photo.title}, ${photo.category.toLowerCase()} photograph taken in ${photo.location}`} category={photo.category} title={photo.title} eager width={w} height={h} />
          {list.length > 1 && (
            <>
              <button className="pm-nav prev" onClick={() => step(-1)} aria-label="Previous photograph"><ChevronLeft size={22} /></button>
              <button className="pm-nav next" onClick={() => step(1)} aria-label="Next photograph"><ChevronRight size={22} /></button>
            </>
          )}
        </div>
        <div className="pm-info">
          <p className="text-accent small mb-1">{photo.category}{list.length > 1 && <span className="text-faint"> &nbsp;{idx + 1} of {list.length}</span>}</p>
          <h2 id="pm-title">{photo.title}</h2>
          <p className="mb-1">by {photo.photographer}</p>
          <p className="text-faint small d-flex align-items-center gap-1"><MapPin size={14} aria-hidden="true" /> {photo.location}</p>
          <p className="pm-story">{photo.description}</p>
          <dl className="exif">
            <div><dt><Camera size={13} aria-hidden="true" /> Camera</dt><dd>{photo.camera}</dd></div>
            <div><dt>Aperture</dt><dd>{photo.aperture}</dd></div>
            <div><dt>Shutter</dt><dd>{photo.shutterSpeed}</dd></div>
            <div><dt>ISO</dt><dd>{photo.iso}</dd></div>
            <div><dt>Year</dt><dd>{photo.year}</dd></div>
          </dl>
          <p className="text-faint tiny">Camera details are illustrative sample data, not verified EXIF.</p>
          <FavoriteButton id={photo.id} title={photo.title} withLabel />
        </div>
      </div>
    </div>
  );
}
