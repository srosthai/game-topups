import React from 'react';
import { categories } from '../../data/categories';
import { CategoryType } from '../../types';
import { RotateCcw } from 'lucide-react';

interface MobileFilterProps {
  selectedCategory: CategoryType | 'all';
  onCategoryChange: (value: CategoryType | 'all') => void;
  onResetFilters: () => void;
  className?: string;
}

export const MobileFilter: React.FC<MobileFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  onResetFilters,
  className = '',
}) => {
  const isFiltered = selectedCategory !== 'all';

  return (
    <div className={`w-full space-y-2 lg:hidden ${className}`}>
      {/* Category Horizontal Scrolling Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth">
        <button
          onClick={() => onCategoryChange('all')}
          className={`shrink-0 px-3 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
            selectedCategory === 'all'
              ? 'bg-[#A8C88A] text-[#1D1D1D] border-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D]'
              : 'bg-white dark:bg-[#1A1B22] text-[#1D1D1D] dark:text-zinc-300 border-[#1D1D1D]/30 dark:border-zinc-700 hover:border-[#1D1D1D]'
          }`}
        >
          <span>All Games</span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.name as CategoryType)}
              className={`shrink-0 px-3 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#A8C88A] text-[#1D1D1D] border-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D]'
                  : 'bg-white dark:bg-[#1A1B22] text-[#1D1D1D] dark:text-zinc-300 border-[#1D1D1D]/30 dark:border-zinc-700 hover:border-[#1D1D1D]'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#E2EFE0] dark:bg-[#1E2B22] border border-[#1D1D1D] dark:border-zinc-700 text-xs font-black text-[#1D1D1D] dark:text-zinc-200 shadow-[1.5px_1.5px_0px_#1D1D1D]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};

