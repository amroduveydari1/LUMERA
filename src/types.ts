import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import productsData from './data/products.json';

/**
 * DEVELOPER NOTE:
 * All image paths must reference /public assets using root-relative paths.
 * Pattern: /images/products/<slug>/thumb.jpg or /images/products/<slug>/01.jpg
 * Models: /models/<slug>.glb
 * Do not use absolute filesystem paths or external URLs for product assets.
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  dimensions: string;
  materials: string[];
  image: string;
  gallery: string[];
  modelUrl?: string;
  arEnabled?: boolean;
  collection: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  usage: string;
  notes: string;
  image: string;
}

export const PRODUCTS: Product[] = productsData as Product[];

export const MATERIALS: Material[] = [
  {
    id: 'travertine',
    name: 'Silver Travertine',
    description: 'Sourced from the heart of Tuscany, our Silver Travertine is characterized by its unique horizontal veining and cool, architectural grey tones.',
    usage: 'Tables, Accents, Monolithic Structures',
    notes: 'Natural porous surface, hand-filled with transparent resin to preserve texture while ensuring durability.',
    image: '/images/materials/travertine.jpg'
  },
  {
    id: 'nubuck',
    name: 'Italian Nubuck',
    description: 'The finest top-grain hides, sanded to a velvet-like finish. It offers a depth of color and a tactile warmth that is unmatched.',
    usage: 'Upholstery, Wall Panels, Headboards',
    notes: 'Develops a unique patina over time, reflecting the life of the piece. Requires specialized care.',
    image: '/images/materials/nubuck.jpg'
  },
  {
    id: 'brass',
    name: 'Brushed Brass',
    description: 'A warm, muted gold finish achieved through meticulous hand-brushing. It provides a sophisticated contrast to stone and wood.',
    usage: 'Frames, Hardware, Decorative Inlays',
    notes: 'Protected with a matte lacquer to prevent oxidation while maintaining a natural, soft glow.',
    image: '/images/materials/brass.jpg'
  },
  {
    id: 'oak',
    name: 'Smoked Oak',
    description: 'Solid European Oak treated with a smoking process that darkens the wood to its core, revealing deep, rich chocolate tones.',
    usage: 'Cabinetry, Table Bases, Structural Elements',
    notes: 'Finished with natural oils to preserve the open-pore texture and organic feel of the grain.',
    image: '/images/materials/oak.jpg'
  },
  {
    id: 'boucle',
    name: 'Alpine Bouclé',
    description: 'A heavy-weight textile woven with irregular loops of wool and cotton, creating a rich, pebbled surface that invites touch.',
    usage: 'Sofas, Lounge Chairs, Pillows',
    notes: 'High Martindale rating for durability without compromising the soft, cloud-like aesthetic.',
    image: '/images/materials/boucle.jpg'
  }
];

export interface Collection {
  id: string;
  slug: string;
  title: string;
  shortLabel: string;
  description: string;
  heroImage: string;
  featuredProducts: string[];
  status: 'active' | 'coming_soon';
}
