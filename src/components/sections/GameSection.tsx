import React, { useState, useRef } from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { GameCard } from '../cards/GameCard';
import { Game, GameTagType } from '../../types';
import { Gamepad2, SearchX, RotateCcw, LayoutGrid, ArrowRight, CornerUpLeft, Flame, Star, Award, TrendingUp, Gem, Grid } from 'lucide-react';
import { Button } from '../ui/Button';

interface GameSectionProps {
  title: string;
  games: Game[];
  selectedTag?: GameTagType;
  onSelectTag?: (tag: GameTagType) => void;
  onTopupClick: (game: Game) => void;
  onResetFilters?: () => void;
  className?: string;
}

const TYPE_PILLS: { id: GameTagType; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Games', icon: <Grid className="w-3.5 h-3.5" /> },
  { id: 'hot', label: 'Hot', icon: <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" /> },
  { id: 'popular', label: 'Popular', icon: <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> },
  { id: 'top_rated', label: 'Top Rated', icon: <Award className="w-3.5 h-3.5 text-emerald-500" /> },
  { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-3.5 h-3.5 text-blue-500" /> },
  { id: 'best_seller', label: 'Best Seller', icon: <Gem className="w-3.5 h-3.5 text-purple-500 fill-purple-500" /> },
];

export const GameSection: React.FC<GameSectionProps> = ({
  title,
  games,
  selectedTag = 'all',
  onSelectTag,
  onTopupClick,
  onResetFilters,
  className,
}) => {
  const [isShowingAllMobile, setIsShowingAllMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Top 5 games for mobile carousel
  const topFiveGames = games.slice(0, 5);

  return (
    <section className={`w-full ${className || ''}`}>
      <div className="sticky top-[78px] z-20 bg-transparent px-1 pb-3 border-b border-[#1D1D1D]/10 dark:border-zinc-700/60 mb-4 -mx-1 sm:mx-0">
        <div className="space-y-4">
          {/* Section Header with Controls */}
          <SectionTitle
            title={title}
            count={games.length}
            icon={<Gamepad2 className="w-5 h-5 text-[#1D1D1D] stroke-[2.2]" />}
            action={
              games.length > 0 ? (
                <div className="flex items-center gap-2">
                  {/* Mobile View Toggle Controls */}
                  <div className="lg:hidden flex items-center gap-2">
                    {isShowingAllMobile ? (
                      <button
                        onClick={() => setIsShowingAllMobile(false)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1B22] border border-[#1D1D1D] dark:border-zinc-700 text-[#1D1D1D] dark:text-white font-extrabold text-xs shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000] hover:bg-[#E2EFE0] transition-colors cursor-pointer"
                      >
                        <CornerUpLeft className="w-3.5 h-3.5" />
                        <span>Compact View</span>
                      </button>
                    ) : (
                      /* All Button */
                      <button
                        onClick={() => setIsShowingAllMobile(true)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#A8C88A] border border-[#1D1D1D] text-[#1D1D1D] font-extrabold text-xs shadow-[2px_2px_0px_#1D1D1D] hover:bg-[#97B779] transition-colors cursor-pointer active:translate-y-0.5"
                      >
                        <span>All ({games.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Desktop View Header Tag */}
                  <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1B22] border border-[#1D1D1D] dark:border-zinc-700 text-[#1D1D1D] dark:text-white font-extrabold text-xs shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000]">
                    <span>Showing <strong className="text-[#FF4D4D]">{games.length}</strong> games</span>
                  </div>
                </div>
              ) : null
            }
          />
        </div>

        {/* Type Filter Pills Row (Top Rated, Popular, Hot, Trending, Best Seller) */}
        {onSelectTag && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {TYPE_PILLS.map((pill) => {
              const isSelected = selectedTag === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => onSelectTag(pill.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-1.5 text-xs font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#A8C88A] text-[#1D1D1D] border-[#1D1D1D] shadow-[2.5px_2.5px_0px_#1D1D1D] scale-[1.02]'
                      : 'bg-white dark:bg-[#1A1B22] text-[#1D1D1D] dark:text-zinc-300 border-[#1D1D1D]/25 dark:border-zinc-700 hover:border-[#1D1D1D] hover:bg-[#E2EFE0]/60'
                  }`}
                >
                  {pill.icon}
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {games.length > 0 ? (
        <>
          {/* DESKTOP RESPONSIVE: Always Full Grid of All Games */}
          <div className="hidden lg:block space-y-4">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {games.map((game) => (
                <GameCard key={game.id} game={game} onTopupClick={onTopupClick} />
              ))}
            </div>
          </div>

          {/* MOBILE RESPONSIVE: Horizontal Scroll Carousel OR Expanded Mobile Grid */}
          <div className="block lg:hidden">
            {isShowingAllMobile ? (
              /* Expanded Mobile Grid */
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#1D1D1D]/70 dark:text-zinc-300 px-1">
                  Showing all <span className="text-[#1D1D1D] dark:text-white font-extrabold">{games.length}</span> games
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {games.map((game) => (
                    <GameCard key={game.id} game={game} onTopupClick={onTopupClick} />
                  ))}
                </div>
              </div>
            ) : (
              /* Horizontal Scroll Carousel (Max 5 Cards + See All Card) */
              <div className="relative w-full">
                <div
                  ref={scrollRef}
                  className="flex items-stretch gap-3.5 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth snap-x snap-mandatory"
                >
                  {topFiveGames.map((game) => (
                    <div key={game.id} className="snap-start shrink-0 w-[220px] min-[420px]:w-[240px]">
                      <GameCard game={game} onTopupClick={onTopupClick} />
                    </div>
                  ))}

                  {/* See All Card for Mobile Carousel */}
                  <div
                    onClick={() => setIsShowingAllMobile(true)}
                    className="snap-start shrink-0 w-[180px] flex flex-col items-center justify-center gap-3 p-5 bg-[#A8C88A] dark:bg-[#1E2028] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000] hover:scale-102 transition-transform cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#121318] border border-[#1D1D1D] dark:border-zinc-700 flex items-center justify-center shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000] group-hover:bg-[#E2EFE0] transition-colors">
                      <LayoutGrid className="w-6 h-6 text-[#1D1D1D] dark:text-white" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-[#1D1D1D] dark:text-white leading-tight">
                        All Games
                      </h4>
                      <p className="text-xs font-bold text-[#1D1D1D]/70 dark:text-zinc-300 mt-1">
                        +{games.length > 5 ? games.length - 5 : games.length} more available
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#1D1D1D] text-white font-bold text-xs mt-1 group-hover:bg-black transition-colors">
                      <span>View Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Empty Filter State */
        <div className="w-full py-12 px-6 bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] text-center flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#E2EFE0] dark:bg-[#1E2B22] border-2 border-[#1D1D1D] dark:border-zinc-700 flex items-center justify-center shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000]">
            <SearchX className="w-7 h-7 text-[#1D1D1D] dark:text-white" />
          </div>
          <h3 className="text-xl font-black text-[#1D1D1D] dark:text-white">No Games Found</h3>
          <p className="text-sm text-gray-600 dark:text-zinc-300 max-w-sm">
            We couldn't find any games matching your current category or search criteria.
          </p>
          {onResetFilters && (
            <Button variant="primary" size="md" onClick={onResetFilters} className="mt-2">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Filters
            </Button>
          )}
        </div>
      )}
    </section>
  );
};
