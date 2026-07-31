import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  count,
  className,
}) => {
  return (
    <div
      onClick={onChange}
      className={cn(
        'group flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D1D] dark:border-zinc-700 cursor-pointer transition-all duration-150 select-none',
        checked
          ? 'bg-[#A8C88A] text-[#1D1D1D] font-semibold shadow-[2px_2px_0px_#1D1D1D]'
          : 'bg-white dark:bg-[#20222A] text-[#1D1D1D] dark:text-zinc-200 hover:bg-[#F8F7F3] dark:hover:bg-[#272932]',
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            'w-5 h-5 rounded flex items-center justify-center border border-[#1D1D1D] transition-colors',
            checked ? 'bg-[#1D1D1D] text-white' : 'bg-white dark:bg-[#121318] text-transparent group-hover:border-[#1D1D1D]'
          )}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
        <label htmlFor={id} className="text-sm cursor-pointer font-medium leading-none">
          {label}
        </label>
      </div>

      {typeof count === 'number' && (
        <span
          className={cn(
            'text-xs px-2 py-0.5 rounded-full border border-[#1D1D1D]',
            checked ? 'bg-white text-[#1D1D1D]' : 'bg-[#F8F7F3] dark:bg-[#121318] text-gray-600 dark:text-zinc-400'
          )}
        >
          {count}
        </span>
      )}
    </div>
  );
};
