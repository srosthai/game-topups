import React from 'react';
import { categories } from '../../data/categories';
import { Checkbox } from '../ui/Checkbox';
import { CategoryType } from '../../types';
import { Filter, RotateCcw } from 'lucide-react';

interface SidebarFilterProps {
  selectedCategories: CategoryType[];
  onToggleCategory: (category: CategoryType) => void;
  onResetFilters: () => void;
  className?: string;
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({
  selectedCategories,
  onToggleCategory,
  onResetFilters,
  className,
}) => {
  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <aside
      className={`w-full bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl p-4 shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] flex flex-col gap-6 transition-colors ${className || ''}`}
    >
      {/* Sidebar Top Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#1D1D1D] dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#1D1D1D] dark:text-zinc-200 stroke-[2.2]" />
          <h3 className="font-extrabold text-lg text-[#1D1D1D] dark:text-white">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-[#1D1D1D] bg-[#E2EFE0] hover:bg-[#A8C88A] px-2 py-1 rounded-lg border border-[#1D1D1D] transition-colors cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Categories Group */}
      <div className="space-y-3">
        <h4 className="font-extrabold text-base text-[#1D1D1D] dark:text-zinc-200 tracking-tight flex items-center justify-between">
          <span>Categories</span>
          <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400 font-mono">
            ({selectedCategories.length})
          </span>
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.name);
            return (
              <Checkbox
                key={cat.id}
                id={`cat-${cat.id}`}
                label={cat.name}
                checked={isChecked}
                onChange={() => onToggleCategory(cat.name)}
                count={cat.count}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

