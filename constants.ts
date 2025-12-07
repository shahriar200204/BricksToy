import { Product } from './types';

// NOTE: Replace the placeholder URLs below with your actual image paths
// Example: '/images/astronaut.jpg' or the URL where you hosted them.

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Jordan 23 Pod Case',
    description: 'Stylish silicone protective case for AirPods featuring the iconic Jordan 23 logo in black and red.',
    price: 550,
    category: 'Accessories',
    imageUrl: 'https://placehold.co/600x600/222/fff?text=Jordan+Case', 
    rating: 4.5,
    pieces: 1,
    age: 'All'
  },
  {
    id: '2',
    name: 'Space Astronaut 3-in-1',
    description: 'LEGO Creator 31152. Explore the galaxy with this detailed golden-visor Astronaut that rebuilds into a space dog or viper jet.',
    price: 6500,
    category: 'Space',
    imageUrl: 'https://placehold.co/600x600/3b82f6/fff?text=Space+Astronaut',
    rating: 4.9,
    pieces: 647,
    age: '9+'
  },
  {
    id: '3',
    name: 'Minecraft The Parrot Houses',
    description: 'LEGO Minecraft 21282. Feature-packed red and blue parrot houses from the Minecraft universe with figures.',
    price: 4800,
    category: 'Minecraft',
    imageUrl: 'https://placehold.co/600x600/22c55e/fff?text=Parrot+Houses',
    rating: 4.7,
    pieces: 535,
    age: '8+'
  },
  {
    id: '4',
    name: 'Creator Main Street',
    description: 'LEGO Creator 31141. Detailed 3-in-1 city building set. Build a hotel, music store, and cafe in a busy street.',
    price: 14500,
    category: 'City',
    imageUrl: 'https://placehold.co/600x600/f59e0b/fff?text=Main+Street',
    rating: 4.9,
    pieces: 1459,
    age: '9+'
  },
  {
    id: '5',
    name: 'Pillager Outpost & Ravager',
    description: 'LEGO Minecraft 21278. Action-packed battle set featuring a Pillager outpost and a giant Ravager beast.',
    price: 7200,
    category: 'Minecraft',
    imageUrl: 'https://placehold.co/600x600/ef4444/fff?text=Pillager+Outpost',
    rating: 4.6,
    pieces: 665,
    age: '9+'
  },
  {
    id: '6',
    name: 'Spidey Tree House HQ',
    description: 'LEGO Marvel 11200. Join Spidey and friends in this fun-filled tree house headquarters battle vs Green Goblin.',
    price: 3200,
    category: 'Marvel',
    imageUrl: 'https://placehold.co/600x600/ef4444/fff?text=Spidey+HQ',
    rating: 4.8,
    pieces: 143,
    age: '4+'
  },
  {
    id: '7',
    name: 'Spidey Dino Crawler Rescue',
    description: 'LEGO Marvel 11199. Team Spidey Dino Crawler Rescue mission with vehicle and dinosaurs.',
    price: 4100,
    category: 'Marvel',
    imageUrl: 'https://placehold.co/600x600/3b82f6/fff?text=Spidey+Dino',
    rating: 4.5,
    pieces: 136,
    age: '4+'
  },
  {
    id: '8',
    name: 'Duplo 3-in-1 Dinosaurs',
    description: 'LEGO Duplo 10451. Gentle giants for toddlers. Build and rebuild dinosaurs on wheels for creative play.',
    price: 2800,
    category: 'Duplo',
    imageUrl: 'https://placehold.co/600x600/84cc16/fff?text=Duplo+Dinos',
    rating: 5.0,
    pieces: 108,
    age: '3+'
  },
  {
    id: '9',
    name: 'Duplo Chinese Culture',
    description: 'LEGO Duplo 10411. Learn about Chinese culture with this beautiful educational set featuring food, music, and games.',
    price: 8500,
    category: 'Duplo',
    imageUrl: 'https://placehold.co/600x600/ec4899/fff?text=Chinese+Culture',
    rating: 4.8,
    pieces: 124,
    age: '2+'
  }
];

export const INITIAL_CATEGORIES = ['All', 'Space', 'Minecraft', 'City', 'Marvel', 'Duplo', 'Accessories'];