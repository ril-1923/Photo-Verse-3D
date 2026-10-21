import { usePhotoStore } from '../store/usePhotoStore';

export function useFavorites(): { favorites: string[]; isFavorite: (id: string) => boolean; toggle: (id: string) => void } {
  const favorites = usePhotoStore((s) => s.favorites);
  const toggle = usePhotoStore((s) => s.toggleFavorite);
  return { favorites, isFavorite: (id) => favorites.includes(id), toggle };
}
