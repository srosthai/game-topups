import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  variant = 'primary',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-block w-full', className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full px-4 py-2.5 rounded-xl border-1.5 border-[#1D1D1D] font-semibold text-sm shadow-[2px_2px_0px_#1D1D1D] transition-all cursor-pointer',
          variant === 'primary' ? 'bg-[#A8C88A] text-[#1D1D1D]' : 'bg-[#E2EFE0] text-[#1D1D1D]',
          isOpen && 'shadow-[3px_3px_0px_#1D1D1D]'
        )}
      >
        <span className="truncate">
          {selectedOption ? `${label}: ${selectedOption.label}` : label}
        </span>
        <ChevronDown
          className={cn('w-4 h-4 ml-2 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border-1.5 border-[#1D1D1D] rounded-xl shadow-[4px_4px_0px_#1D1D1D] max-h-60 overflow-y-auto py-1">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-[#F8F7F3] transition-colors',
                  isSelected && 'bg-[#A8C88A]/30 font-semibold'
                )}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#1D1D1D]" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
