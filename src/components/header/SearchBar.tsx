import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}) => {
  return (
    <div className={cn('relative flex items-center w-full max-w-xs', className)}>
      <div className="absolute left-3 text-gray-500 pointer-events-none">
        <Search className="w-4 h-4 stroke-[2.2] text-[#1D1D1D]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-1.5 text-sm bg-[#FCE8E3]/80 hover:bg-[#FCE8E3] focus:bg-white text-[#1D1D1D] placeholder-gray-500 border border-[#1D1D1D] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A8C88A] transition-all shadow-[1.5px_1.5px_0px_#1D1D1D]"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 p-0.5 text-gray-500 hover:text-[#1D1D1D] rounded-full"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};
