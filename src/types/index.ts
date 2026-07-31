export type CategoryType = 
  | 'Adventure' 
  | 'MOBA' 
  | 'RPG' 
  | 'Casual' 
  | 'Strategy' 
  | 'Simulation' 
  | 'Sports';

export type PlatformType = 
  | 'Smartphone' 
  | 'PC' 
  | 'Nintendo' 
  | 'PlayStation 4' 
  | 'PlayStation 5' 
  | 'Xbox';

export interface TopupPackage {
  id: string;
  amount: string;
  price: string;
  image?: string;
  bonus?: string;
}

export interface Game {
  id: number;
  name: string;
  category: CategoryType;
  platform: PlatformType | PlatformType[];
  rating: number; // 1 to 5
  image: string;
  publisher?: string;
  popular?: boolean;
  featured?: boolean;
  badge?: string;
  topupPackages?: TopupPackage[];
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  discountBadge?: string;
  image: string;
  gameId?: number;
  buttonText: string;
  bgColor?: string;
}

export interface Category {
  id: string;
  name: CategoryType;
  iconName: string;
  count: number;
}

export interface Platform {
  id: string;
  name: PlatformType;
  iconName: string;
  count: number;
}

export type GameTagType = 
  | 'all' 
  | 'popular' 
  | 'hot' 
  | 'top_rated' 
  | 'trending' 
  | 'best_seller';

export interface FilterState {
  searchQuery: string;
  selectedCategories: CategoryType[];
  selectedPlatforms: PlatformType[];
  selectedTag: GameTagType;
  sortBy: 'popular' | 'rating' | 'name';
}
