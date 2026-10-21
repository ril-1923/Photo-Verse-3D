import type { Photograph } from '../../types/photography';
import PhotoCard from './PhotoCard';
import { usePhotoStore } from '../../store/usePhotoStore';

interface Props { photos: Photograph[]; layout: 'masonry' | 'grid'; list?: string[] }

export default function PhotoGrid({ photos, layout, list }: Props) {
  const openPhoto = usePhotoStore((s) => s.openPhoto);
  const ids = list ?? photos.map((p) => p.id);
  const open = (id: string) => openPhoto(id, ids);
  return (
    <div className={layout === 'masonry' ? 'masonry' : 'photo-grid'}>
      {photos.map((p) => <PhotoCard key={p.id} photo={p} onOpen={open} grid={layout === 'grid'} />)}
    </div>
  );
}
