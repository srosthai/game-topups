import React, { useState, useEffect } from 'react';
import { Header } from './components/header/Header';
import { HeroSlider } from './components/slider/HeroSlider';
import { SidebarFilter } from './components/filters/SidebarFilter';
import { MobileFilter } from './components/filters/MobileFilter';
import { GameSection } from './components/sections/GameSection';
import { TopupGamePage } from './components/sections/TopupGamePage';
import { AuthModal } from './components/sections/AuthModal';
import { Footer } from './components/footer/Footer';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Meteors } from './components/ui/meteors';
import { useGameFilter } from './hooks/useGameFilter';
import { Game } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'EN' | 'KM'>('EN');
  
  // Dark mode theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const {
    filters,
    filteredGames,
    activeTab,
    setActiveTab,
    toggleCategory,
    setSelectedTag,
    setSearchQuery,
    setCategorySingle,
    clearFilters,
  } = useGameFilter();

  const [selectedGameForTopup, setSelectedGameForTopup] = useState<Game | null>(null);
  
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup';
  }>({
    isOpen: false,
    mode: 'login',
  });

  const handleTabChange = (tab: 'home' | 'topup' | 'store' | 'news') => {
    setActiveTab(tab);
    setSelectedGameForTopup(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTopupModal = (game: Game) => {
    setSelectedGameForTopup(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLogin = () => {
    setAuthModalState({ isOpen: true, mode: 'login' });
  };

  const handleOpenSignup = () => {
    setAuthModalState({ isOpen: true, mode: 'signup' });
  };

  // Derive title for section header
  const currentSectionTitle = React.useMemo(() => {
    if (filters.searchQuery) return `Search Results for "${filters.searchQuery}"`;
    if (filters.selectedTag && filters.selectedTag !== 'all') {
      const tagLabels: Record<string, string> = {
        hot: '🔥 Hot Games',
        popular: '⭐ Popular Games',
        top_rated: '🏆 Top Rated Games',
        trending: '📈 Trending Games',
        best_seller: '💎 Best Seller Games',
      };
      return tagLabels[filters.selectedTag] || 'Filtered Games';
    }
    if (filters.selectedCategories.length === 1) return `${filters.selectedCategories[0]} Games`;
    if (filters.selectedCategories.length > 1) return `Filtered Games (${filters.selectedCategories.join(', ')})`;
    return 'All Topup Games';
  }, [filters]);

  const singleSelectedCategory = filters.selectedCategories.length === 1 ? filters.selectedCategories[0] : 'all';

  return (
    <div className={`relative min-h-screen overflow-x-hidden bg-grid-notebook flex flex-col justify-between selection:bg-[#A8C88A] selection:text-[#1D1D1D] ${isDarkMode ? 'dark' : ''} z-0`}>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="relative h-full w-full overflow-hidden">
          <Meteors number={24} />
        </div>
      </div>
      <div className="relative z-10">

      {/* Initial 3s Loading Screen */}
      <LoadingScreen isLoading={isLoading} onFinished={() => setIsLoading(false)} durationMs={3000} />

      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={filters.searchQuery}
        onSearchChange={setSearchQuery}
        language={language}
        onToggleLanguage={setLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6 lg:pt-28 flex-1">
        {selectedGameForTopup ? (
          /* Dedicated Game Topup Screen */
          <TopupGamePage
            game={selectedGameForTopup}
            onBack={() => setSelectedGameForTopup(null)}
          />
        ) : (
          /* Main Games Catalog & Slider Layout */
          <>
            {/* Full-width Hero Slider */}
            <div className="w-full mb-6 sm:mb-8">
              <HeroSlider
                onBannerClick={(id) => {
                  if (filteredGames.length > 0) {
                    handleOpenTopupModal(filteredGames[0]);
                  }
                }}
              />
            </div>

            {/* Section: Filter + Game Grid Side-By-Side */}
            <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8">
              {/* Left Column: Desktop Sticky Sidebar Filter */}
              <div className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-28 z-20 self-start max-h-[calc(100vh-122px)] overflow-y-auto no-scrollbar">
                <SidebarFilter
                  selectedCategories={filters.selectedCategories}
                  onToggleCategory={toggleCategory}
                  onResetFilters={clearFilters}
                />
              </div>

              {/* Mobile Sticky Filter Controls (Horizontal Filter Pills on Mobile/Tablet) */}
              <div className="lg:hidden w-full sticky top-0 z-30 bg-[#F8F7F3]/95 dark:bg-[#121318]/95 backdrop-blur-md py-2">
                <MobileFilter
                  selectedCategory={singleSelectedCategory}
                  onCategoryChange={(val) => setCategorySingle(val)}
                  onResetFilters={clearFilters}
                />
              </div>

              {/* Right Column: Game Cards Grid Section */}
              <div className="flex-1 min-w-0 w-full">
                <GameSection
                  title={currentSectionTitle}
                  games={filteredGames}
                  selectedTag={filters.selectedTag}
                  onSelectTag={setSelectedTag}
                  onTopupClick={handleOpenTopupModal}
                  onResetFilters={clearFilters}
                />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onTabChange={setActiveTab} />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState((prev) => ({ ...prev, isOpen: false }))}
      />
      </div>
    </div>
  );
}
