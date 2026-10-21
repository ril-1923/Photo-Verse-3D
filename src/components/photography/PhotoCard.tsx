import { memo } from 'react';
import { Maximize2 } from 'lucide-react';
import type { Photograph } from '../../types/photography';
import SmartImage from '../common/SmartImage';
import FavoriteButton from './FavoriteButton';

interface Props { photo: Photograph; onOpen: (id: string) => void; grid?: boolean }

const dims = { landscape: [900, 600], portrait: [600, 900], square: [800, 800] } as const;

function PhotoCard({ photo, onOpen, grid = false }: Props) {
  const [w, h] = dims[photo.orientation];
  return (
    <article className={`photo-card ${grid ? 'is-grid' : ''} o-${photo.orientation}`}>
      <button className="photo-open" onClick={() => onOpen(photo.id)} aria-label={`View details: ${photo.title} by ${photo.photographer}`}>
        <SmartImage src={photo.thumbUrl} alt={`${photo.title}, ${photo.category.toLowerCase()} photograph taken in ${photo.location}`} category={photo.category} title={photo.title} width={w} height={h} />
        <span className="photo-scrim" aria-hidden="true" />
      </button>
      <div className="photo-fav"><FavoriteButton id={photo.id} title={photo.title} /></div>
      <div className="photo-meta">
        <h3>{photo.title}</h3>
        <p>{photo.photographer} <span className="text-faint">in {photo.category}</span></p>
        <span className="photo-view" aria-hidden="true"><Maximize2 size={14} /> View details</span>
      </div>
    </article>
  );
}

export default memo(PhotoCard);
