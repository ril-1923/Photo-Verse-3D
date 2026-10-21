import type { Photographer } from '../types/photography';

/** All photographers are FICTIONAL demo personas. */
export const photographers: Photographer[] = [
  { id: 'p1', name: 'Aarav Menon', specialty: 'Landscape photography', categories: ['Landscape', 'Nature'], country: 'India', location: 'Munnar, India', years: 14, collections: 4, hue: 32, bio: 'Chases first light across the Western Ghats and the high Himalaya, favouring patient long exposures and quiet horizons.' },
  { id: 'p2', name: 'Elena Marchetti', specialty: 'Architecture photography', categories: ['Architecture', 'Travel'], country: 'Italy', location: 'Milan, Italy', years: 11, collections: 3, hue: 210, bio: 'Finds rhythm in glass, concrete and staircases. Her frames treat buildings as slow, geometric music.' },
  { id: 'p3', name: 'Tomás Rivera', specialty: 'Wildlife photography', categories: ['Wildlife'], country: 'Tanzania', location: 'Arusha, Tanzania', years: 17, collections: 3, hue: 24, bio: 'Spends months each year in the Serengeti, waiting for the one frame that shows an animal being entirely itself.' },
  { id: 'p4', name: 'Mei Lin Zhao', specialty: 'Portrait photography', categories: ['Portrait'], country: 'Singapore', location: 'Singapore', years: 9, collections: 2, hue: 340, bio: 'Photographs people in the ten minutes after they stop posing, when expressions turn honest.' },
  { id: 'p5', name: 'Kai Ostrander', specialty: 'Automotive photography', categories: ['Automotive'], country: 'Germany', location: 'Stuttgart, Germany', years: 12, collections: 2, hue: 8, bio: 'Rolling shots, wet asphalt and reflections. Treats every car as a character with a mood.' },
  { id: 'p6', name: 'Sofia Lindqvist', specialty: 'Astrophotography', categories: ['Night Sky'], country: 'Iceland', location: 'Reykjavik, Iceland', years: 10, collections: 2, hue: 265, bio: 'Tracks auroras and the Milky Way from remote Icelandic valleys with modified cameras and cold hands.' },
  { id: 'p7', name: 'Rohan Iyer', specialty: 'Travel photography', categories: ['Travel', 'Architecture'], country: 'India', location: 'Chennai, India', years: 8, collections: 3, hue: 48, bio: 'Documents street life and temple towns of South India, from Marina Beach dawns to Jaipur bazaars.' },
  { id: 'p8', name: 'Hana Takeda', specialty: 'Ocean photography', categories: ['Ocean', 'Nature'], country: 'Japan', location: 'Kyoto, Japan', years: 13, collections: 3, hue: 190, bio: 'Works above and below the surface, from Okinawan reefs to Pacific storm swells.' },
];
