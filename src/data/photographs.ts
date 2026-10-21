import type { Category, GalleryId, Photograph } from '../types/photography';
import { photographers } from './photographers';

/**
 * Centralised photograph dataset (45 unique images, 5 per category).
 *
 * Images are remote Unsplash URLs. They could NOT be verified from the build
 * environment (no outbound network), so every <img> and every 3D texture falls
 * back to a generated local placeholder when the remote image fails to load.
 * Check the Unsplash licence terms before production use.
 *
 * Camera / exposure values are ILLUSTRATIVE sample data, not real EXIF.
 */
type Orientation = Photograph['orientation'];
// [unsplashId, title, category, location, destinationId, photographerId, orientation, featured, story]
type Row = [string, string, Category, string, string, string, Orientation, boolean, string];

const rows: Row[] = [
  // Nature
  ['1441974231531-c6227db76b6e', 'Cathedral of Pines', 'Nature', 'Black Forest, Germany', 'alps', 'p1', 'landscape', true, 'Shafts of light cut through a mossy pine forest minutes after sunrise.'],
  ['1470071459604-3b5ec3a7fe05', 'Fog Between Ridges', 'Nature', 'Munnar, India', 'himalayas', 'p1', 'landscape', false, 'Morning fog pooled between forested ridges, giving the hills a layered, painted look.'],
  ['1518495973542-4542c06a5843', 'Sunburst Canopy', 'Nature', 'Kyoto, Japan', 'kyoto', 'p8', 'portrait', true, 'Looking straight up, the sun burst through a canopy of tall, slender trunks.'],
  ['1448375240586-882707db888b', 'Green Hush', 'Nature', 'Swiss Alps, Switzerland', 'alps', 'p1', 'square', false, 'A silent corridor of evergreens after a night of light rain.'],
  ['1425913397330-cf8af2ff40a1', 'The Quiet Path', 'Nature', 'Kyoto, Japan', 'kyoto', 'p8', 'portrait', false, 'A narrow trail disappears into ferns and filtered light.'],
  // Landscape
  ['1506905925346-21bda4d32df4', 'Alpine Ascent', 'Landscape', 'Himalayas, India', 'himalayas', 'p1', 'landscape', true, 'Jagged peaks rise above a sea of cloud at dawn.'],
  ['1464822759023-fed622ff2c3b', 'Granite Giant', 'Landscape', 'Swiss Alps, Switzerland', 'alps', 'p1', 'landscape', true, 'A lone summit catching the last warm light of the day.'],
  ['1469474968028-56623f02e42e', 'Valley of Gold', 'Landscape', 'Iceland', 'iceland', 'p1', 'landscape', false, 'Sunrise lit a mist-filled valley in amber and rose.'],
  ['1501785888041-af3ef285b470', 'Mirror Lake', 'Landscape', 'Swiss Alps, Switzerland', 'alps', 'p1', 'square', false, 'Still water doubled the mountains in a perfect reflection.'],
  ['1519681393784-d120267933ba', 'Peaks Under Stars', 'Landscape', 'Himalayas, India', 'himalayas', 'p6', 'portrait', false, 'Snow ridges glowing faintly under a cold, clear sky.'],
  // Architecture
  ['1486406146926-c627a92ad1ab', 'Glass Towers', 'Architecture', 'New York City, USA', 'nyc', 'p2', 'portrait', true, 'Skyscrapers converge toward a thin strip of morning sky.'],
  ['1477959858617-67f85cf4f1df', 'City in Layers', 'Architecture', 'New York City, USA', 'nyc', 'p2', 'landscape', false, 'Rooftops, bridges and towers stacked in hazy late light.'],
  ['1449824913935-59a10b8d2000', 'Avenue at Dusk', 'Architecture', 'Paris, France', 'paris', 'p7', 'landscape', true, 'Headlights and streetlamps warmed a wide boulevard at dusk.'],
  ['1512453979798-5ea266f8880c', 'Skyline Ascent', 'Architecture', 'New York City, USA', 'nyc', 'p2', 'portrait', false, 'A skyline lit from within as blue hour settled in.'],
  ['1487958449943-2429e8be8625', 'Concrete Poetry', 'Architecture', 'Jaipur, India', 'jaipur', 'p7', 'square', false, 'Repeating lines and shadow turned a facade into a pattern.'],
  // Wildlife
  ['1474511320723-9a56873867b5', 'Fox in Frost', 'Wildlife', 'Iceland', 'iceland', 'p3', 'landscape', true, 'A fox paused mid-stride, breath visible in the cold air.'],
  ['1437622368342-7a3d73a34c8f', 'Ancient Voyager', 'Wildlife', 'Great Barrier Reef, Australia', 'gbr', 'p3', 'landscape', false, 'A sea turtle glided through shafts of sunlight.'],
  ['1456926631375-92c8ce872def', 'Eyes of the Savanna', 'Wildlife', 'Serengeti, Tanzania', 'serengeti', 'p3', 'portrait', true, 'A leopard watched from a branch, perfectly still.'],
  ['1546182990-dffeafbe841d', 'Golden Mane', 'Wildlife', 'Serengeti, Tanzania', 'serengeti', 'p3', 'square', false, 'Afternoon light turned the lion\'s mane to gold.'],
  ['1425082661705-1834bfd09dca', 'Small Wonder', 'Wildlife', 'Kyoto, Japan', 'kyoto', 'p8', 'square', false, 'A tiny creature caught in a moment of curiosity.'],
  // Automotive
  ['1503376780353-7e6692767b70', 'Midnight Coupe', 'Automotive', 'Paris, France', 'paris', 'p5', 'landscape', true, 'A sports car parked under sodium streetlights after rain.'],
  ['1492144534655-ae79c964c9d7', 'Open Road', 'Automotive', 'Iceland', 'iceland', 'p5', 'landscape', false, 'A lone car crossed an empty road in a vast landscape.'],
  ['1494976388531-d1058494cdd8', 'Muscle Memory', 'Automotive', 'New York City, USA', 'nyc', 'p5', 'landscape', false, 'Classic American lines, polished and unhurried.'],
  ['1544636331-e26879cd4d9b', 'Chrome and Dusk', 'Automotive', 'Jaipur, India', 'jaipur', 'p5', 'square', false, 'Warm dusk reflected in curved chrome.'],
  ['1583121274602-3e2820c69888', 'Rosso Corsa', 'Automotive', 'Swiss Alps, Switzerland', 'alps', 'p5', 'portrait', false, 'A red supercar against grey alpine stone.'],
  // Portrait
  ['1500648767791-00dcc994a43e', 'Quiet Confidence', 'Portrait', 'Chennai, India', 'chennai', 'p4', 'portrait', true, 'A calm, direct gaze in soft window light.'],
  ['1494790108377-be9c29b29330', 'Golden Hour Smile', 'Portrait', 'Chennai, India', 'chennai', 'p4', 'portrait', false, 'Low sun wrapped around a spontaneous laugh.'],
  ['1507003211169-0a1dd7228f2d', 'Street Gentleman', 'Portrait', 'Paris, France', 'paris', 'p4', 'portrait', false, 'A café regular, caught between sips and stories.'],
  ['1438761681033-6461ffad8d80', 'Soft Light Study', 'Portrait', 'Kyoto, Japan', 'kyoto', 'p4', 'square', false, 'Diffused daylight, a neutral wall and a thoughtful pause.'],
  ['1534528741775-53994a69daeb', 'Between Frames', 'Portrait', 'Chennai, India', 'chennai', 'p4', 'portrait', false, 'The expression that arrived just after the pose ended.'],
  // Travel
  ['1476514525535-07fb3b4ae5f1', 'Departure Lake', 'Travel', 'Swiss Alps, Switzerland', 'alps', 'p7', 'landscape', true, 'A wooden jetty reaching out into the morning.'],
  ['1488646953014-85cb44e25828', 'Passport Pages', 'Travel', 'Paris, France', 'paris', 'p7', 'landscape', false, 'Maps, tickets and coffee: a traveller\'s table before dawn.'],
  ['1502602898657-3e91760cbb34', 'Iron Lady at Blue Hour', 'Travel', 'Paris, France', 'paris', 'p2', 'portrait', true, 'The tower lit against a deepening blue sky.'],
  ['1493976040374-85c8e12f0c0e', 'Lantern Lane', 'Travel', 'Kyoto, Japan', 'kyoto', 'p7', 'portrait', false, 'Paper lanterns glowed along a narrow stone street.'],
  ['1528181304800-259b08848526', 'Temple Sunrise', 'Travel', 'Chennai, India', 'chennai', 'p7', 'landscape', false, 'The first light touched an ancient temple gateway.'],
  // Ocean
  ['1505118380757-91f5f5632de0', 'Deep Blue Swell', 'Ocean', 'Great Barrier Reef, Australia', 'gbr', 'p8', 'landscape', true, 'A rolling swell turned deep blue just offshore.'],
  ['1507525428034-b723cf961d3e', 'Turquoise Shore', 'Ocean', 'Great Barrier Reef, Australia', 'gbr', 'p8', 'landscape', true, 'Clear shallows shifting from white sand to turquoise.'],
  ['1439405326854-014607f694d7', 'Underwater Cathedral', 'Ocean', 'Great Barrier Reef, Australia', 'gbr', 'p8', 'landscape', false, 'Sunbeams fell through clear water above the reef.'],
  ['1518837695005-2083093ee35b', 'Breaking Wave', 'Ocean', 'Chennai, India', 'chennai', 'p8', 'portrait', false, 'A wave froze at the instant it curled.'],
  ['1468413253725-0d5181091126', 'Tide and Rock', 'Ocean', 'Iceland', 'iceland', 'p8', 'square', false, 'Slow water smoothed around dark volcanic rock.'],
  // Night Sky
  ['1419242902214-272b3f66ee7a', 'Milky Way Over Camp', 'Night Sky', 'Himalayas, India', 'himalayas', 'p6', 'portrait', true, 'The galactic core rose above a tent glowing softly from inside.'],
  ['1462331940025-496dfbfd7bc5', 'Star Trails', 'Night Sky', 'Iceland', 'iceland', 'p6', 'landscape', false, 'Stacked exposures drew the Earth\'s rotation across the sky.'],
  ['1444703686981-a3abbc4d4fe3', 'Cosmic Silence', 'Night Sky', 'Serengeti, Tanzania', 'serengeti', 'p6', 'landscape', false, 'A dark savanna night with the sky ablaze above it.'],
  ['1506703719100-a0f3a48c0f86', 'Aurora Veil', 'Night Sky', 'Iceland', 'iceland', 'p6', 'landscape', true, 'Green aurora curtains rippled above a frozen lake.'],
  ['1532978379173-523e16f371f2', 'Lone Observer', 'Night Sky', 'Swiss Alps, Switzerland', 'alps', 'p6', 'square', false, 'A single figure beneath a sky full of stars.'],
];

const cameras = ['Sony A7 IV', 'Canon EOS R5', 'Nikon Z8', 'Fujifilm X-T5', 'Leica Q3', 'Sony A7R V', 'Canon EOS R6 II', 'Nikon Z6 II'];
const apertures = ['f/1.8', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11'];
const shutters = ['1/2000 s', '1/500 s', '1/250 s', '1/125 s', '1/60 s', '2 s', '15 s', '30 s'];
const isos = [100, 100, 200, 400, 800, 1600, 3200];

const galleryFor = (c: Category): GalleryId =>
  c === 'Nature' || c === 'Landscape' || c === 'Night Sky' ? 'nature'
  : c === 'Wildlife' || c === 'Ocean' ? 'wildlife'
  : 'urban';

const dims: Record<Orientation, [number, number]> = { landscape: [900, 600], portrait: [600, 900], square: [800, 800] };

const url = (id: string, o: Orientation, scale: number): string => {
  const [w, h] = dims[o];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${Math.round(w * scale)}&h=${Math.round(h * scale)}&q=70`;
};

export const photographs: Photograph[] = rows.map((r, i) => {
  const [uid, title, category, location, destinationId, photographerId, orientation, featured, story] = r;
  const night = category === 'Night Sky';
  const month = (i * 7) % 12;
  const photographer = photographers.find((p) => p.id === photographerId)?.name ?? 'Unknown';
  return {
    id: `ph-${String(i + 1).padStart(2, '0')}`,
    title, photographer, photographerId, category, location, destinationId, featured, orientation,
    imageUrl: url(uid, orientation, 1.4),
    thumbUrl: url(uid, orientation, 0.7),
    description: story,
    camera: cameras[i % cameras.length],
    aperture: night ? 'f/2.0' : apertures[(i * 3) % apertures.length],
    shutterSpeed: night ? shutters[6 + (i % 2)] : shutters[(i * 5) % 6],
    iso: night ? 3200 : isos[(i * 2) % isos.length],
    year: 2019 + (i % 7),
    addedAt: new Date(2026, month, 1 + (i % 27)).toISOString(),
    gallery: galleryFor(category),
  };
});

export const categories: Category[] = ['Nature', 'Landscape', 'Architecture', 'Wildlife', 'Automotive', 'Portrait', 'Travel', 'Ocean', 'Night Sky'];

export const categoryBlurb: Record<Category, string> = {
  Nature: 'Forests, light and living green.',
  Landscape: 'Peaks, valleys and wide horizons.',
  Architecture: 'Lines, glass and the shape of cities.',
  Wildlife: 'Animals in their own worlds.',
  Automotive: 'Machines, motion and reflection.',
  Portrait: 'Faces and the stories in them.',
  Travel: 'Journeys, streets and far-off places.',
  Ocean: 'Waves, reefs and endless blue.',
  'Night Sky': 'Stars, aurora and the dark between.',
};

export const photoById = (id: string): Photograph | undefined => photographs.find((p) => p.id === id);
