import type { Photograph } from '../types/photography';
import type { FilterState } from '../components/photography/PhotoFilters';

export const defaultFilters = (sort: FilterState['sort'], layout: FilterState['layout']): FilterState => ({
  search: '', category: 'all', photographer: 'all', sort, layout,
});

export function filterPhotos(list: Photograph[], f: FilterState): Photograph[] {
  const q = f.search.trim().toLowerCase();
  const out = list.filter((p) =>
    (f.category === 'all' || p.category === f.category) &&
    (f.photographer === 'all' || p.photographerId === f.photographer) &&
    (q === '' || p.title.toLowerCase().includes(q)));
  const byTitle = (a: Photograph, b: Photograph) => a.title.localeCompare(b.title);
  switch (f.sort) {
    case 'title': return out.sort(byTitle);
    case 'year-desc': return out.sort((a, b) => b.year - a.year || byTitle(a, b));
    case 'year-asc': return out.sort((a, b) => a.year - b.year || byTitle(a, b));
    default: return out.sort((a, b) => Number(b.featured) - Number(a.featured) || byTitle(a, b));
  }
}
