import { Category, Platform } from '../types';

export const categories: Category[] = [
  { id: 'cat-moba', name: 'MOBA', iconName: 'Swords', count: 5 },
  { id: 'cat-adventure', name: 'Adventure', iconName: 'Compass', count: 4 },
  { id: 'cat-rpg', name: 'RPG', iconName: 'Shield', count: 4 },
  { id: 'cat-casual', name: 'Casual', iconName: 'Gamepad2', count: 3 },
  { id: 'cat-strategy', name: 'Strategy', iconName: 'BrainCircuit', count: 3 },
  { id: 'cat-sports', name: 'Sports', iconName: 'Trophy', count: 2 },
  { id: 'cat-simulation', name: 'Simulation', iconName: 'Sparkles', count: 1 },
];

export const platforms: Platform[] = [
  { id: 'plat-phone', name: 'Smartphone', iconName: 'Smartphone', count: 22 },
];
