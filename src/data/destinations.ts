import type { Destination } from '../types/photography';

/** Approximate coordinates, used only for an illustrative (non-GIS) map. */
export const destinations: Destination[] = [
  { id: 'himalayas', name: 'Himalayas', country: 'India', lon: 78, lat: 32, description: 'Snow ridges, high passes and prayer-flag valleys that reward early starts.' },
  { id: 'chennai', name: 'Chennai', country: 'India', lon: 80.3, lat: 13.1, description: 'Marina Beach sunrises, temple towers and the lively streets of the Coromandel coast.' },
  { id: 'jaipur', name: 'Jaipur', country: 'India', lon: 75.8, lat: 26.9, description: 'The Pink City: palace facades, bazaars and warm desert light.' },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', lon: 135.8, lat: 35, description: 'Wooden temples, bamboo groves and lantern-lit lanes.' },
  { id: 'alps', name: 'Swiss Alps', country: 'Switzerland', lon: 8.2, lat: 46.6, description: 'Glacial peaks and mirror lakes with dramatic alpine weather.' },
  { id: 'iceland', name: 'Iceland', country: 'Iceland', lon: -19, lat: 64.9, description: 'Waterfalls, black beaches and the northern lights.' },
  { id: 'paris', name: 'Paris', country: 'France', lon: 2.35, lat: 48.85, description: 'Haussmann boulevards, iron lattice and rainy-evening reflections.' },
  { id: 'nyc', name: 'New York City', country: 'USA', lon: -74, lat: 40.7, description: 'Vertical canyons, bridges and the electric glow of Manhattan.' },
  { id: 'gbr', name: 'Great Barrier Reef', country: 'Australia', lon: 146, lat: -18.3, description: 'The largest coral reef system on Earth, full of colour and marine life.' },
  { id: 'serengeti', name: 'Serengeti', country: 'Tanzania', lon: 34.8, lat: -2.3, description: 'Endless plains, migrating herds and golden-hour predators.' },
];
