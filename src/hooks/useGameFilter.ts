import { useState, useMemo, useCallback } from 'react';
import { games } from '../data/games';
import { CategoryType, PlatformType, FilterState, GameTagType, Game } from '../types';

export function useGameFilter() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategories: [],
    selectedPlatforms: [],
    selectedTag: 'all',
    sortBy: 'popular',
  });

  const [activeTab, setActiveTab] = useState<'home' | 'topup' | 'store' | 'news'>('topup');

  const toggleCategory = useCallback((category: CategoryType) => {
    setFilters((prev) => {
      const exists = prev.selectedCategories.includes(category);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter((c) => c !== category)
          : [...prev.selectedCategories, category],
      };
    });
  }, []);

  const togglePlatform = useCallback((platform: PlatformType) => {
    setFilters((prev) => {
      const exists = prev.selectedPlatforms.includes(platform);
      return {
        ...prev,
        selectedPlatforms: exists
          ? prev.selectedPlatforms.filter((p) => p !== platform)
          : [...prev.selectedPlatforms, platform],
      };
    });
  }, []);

  const setSelectedTag = useCallback((tag: GameTagType) => {
    setFilters((prev) => ({ ...prev, selectedTag: tag }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setCategorySingle = useCallback((category: CategoryType | 'all') => {
    if (category === 'all') {
      setFilters((prev) => ({ ...prev, selectedCategories: [] }));
    } else {
      setFilters((prev) => ({ ...prev, selectedCategories: [category] }));
    }
  }, []);

  const setPlatformSingle = useCallback((platform: PlatformType | 'all') => {
    if (platform === 'all') {
      setFilters((prev) => ({ ...prev, selectedPlatforms: [] }));
    } else {
      setFilters((prev) => ({ ...prev, selectedPlatforms: [platform] }));
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      selectedCategories: [],
      selectedPlatforms: [],
      selectedTag: 'all',
      sortBy: 'popular',
    });
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game: Game) => {
      // 1. Tag / Type Filter
      if (filters.selectedTag && filters.selectedTag !== 'all') {
        const badgeLower = (game.badge || '').toLowerCase();
        if (filters.selectedTag === 'popular') {
          if (!game.popular && !badgeLower.includes('popular')) return false;
        } else if (filters.selectedTag === 'hot') {
          if (!badgeLower.includes('hot') && !game.featured) return false;
        } else if (filters.selectedTag === 'top_rated') {
          if (!badgeLower.includes('top rated') && game.rating !== 5) return false;
        } else if (filters.selectedTag === 'trending') {
          if (!badgeLower.includes('trending')) return false;
        } else if (filters.selectedTag === 'best_seller') {
          if (!badgeLower.includes('best seller') && !badgeLower.includes('cashback') && !badgeLower.includes('bonus')) return false;
        }
      }

      // 2. Search Query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = game.name.toLowerCase().includes(query);
        const matchesCategory = game.category.toLowerCase().includes(query);
        const matchesPublisher = game.publisher?.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesPublisher) return false;
      }

      // 3. Category Filter
      if (filters.selectedCategories.length > 0) {
        if (!filters.selectedCategories.includes(game.category)) {
          return false;
        }
      }

      // 4. Platform Filter
      if (filters.selectedPlatforms.length > 0) {
        const gamePlatforms = Array.isArray(game.platform) ? game.platform : [game.platform];
        const hasMatchingPlatform = filters.selectedPlatforms.some((p) =>
          gamePlatforms.includes(p)
        );
        if (!hasMatchingPlatform) return false;
      }

      return true;
    });
  }, [filters]);

  return {
    filters,
    filteredGames,
    activeTab,
    setActiveTab,
    toggleCategory,
    togglePlatform,
    setSelectedTag,
    setSearchQuery,
    setCategorySingle,
    setPlatformSingle,
    clearFilters,
    totalCount: filteredGames.length,
  };
}
