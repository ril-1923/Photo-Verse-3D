import { Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

interface Props { id: string; title: string; size?: number; withLabel?: boolean }

export default function FavoriteButton({ id, title, size = 18, withLabel = false }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const on = isFavorite(id);
  return (
    <button
      type="button"
      className={`fav-btn ${on ? 'is-on' : ''} ${withLabel ? 'with-label' : ''}`}
      aria-pressed={on}
      aria-label={on ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
      onClick={(e) => { e.stopPropagation(); toggle(id); }}
    >
      <Heart size={size} fill={on ? 'currentColor' : 'none'} aria-hidden="true" />
      {withLabel && <span>{on ? 'Saved' : 'Save'}</span>}
    </button>
  );
}
