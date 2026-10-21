export type Category =
  | 'Nature' | 'Landscape' | 'Architecture' | 'Wildlife' | 'Automotive'
  | 'Portrait' | 'Travel' | 'Ocean' | 'Night Sky';

export type GalleryId = 'nature' | 'urban' | 'wildlife';

export interface Photograph {
  id: string;
  title: string;
  photographer: string;
  photographerId: string;
  category: Category;
  imageUrl: string;
  thumbUrl: string;
  location: string;
  destinationId: string;
  description: string;
  camera: string;
  aperture: string;
  shutterSpeed: string;
  iso: number;
  featured: boolean;
  year: number;
  addedAt: string;
  orientation: 'landscape' | 'portrait' | 'square';
  gallery: GalleryId;
}

export interface Photographer {
  id: string;
  name: string;
  specialty: string;
  categories: Category[];
  country: string;
  location: string;
  bio: string;
  years: number;
  collections: number;
  hue: number;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  lon: number;
  lat: number;
}
