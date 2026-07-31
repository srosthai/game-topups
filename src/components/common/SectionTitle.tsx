import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SectionTitleProps {
  title: string;
  icon?: React.ReactNode;
  count?: number;
  action?: React.ReactNode;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  icon,
  count,
  action,
  className,
}) => {
  return (
    <div className={cn('w-full mb-5', className)}>
      <div className="flex items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#A8C88A] border border-[#1D1D1D] shadow-[1.5px_1.5px_0px_#1D1D1D]">
            {icon || <Gamepad2 className="w-5 h-5 text-[#1D1D1D] stroke-[2.2]" />}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1D1D1D] dark:text-white tracking-tight">
            {title}
          </h2>
          {typeof count === 'number' && (
            <span className="hidden sm:inline-block ml-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E2EFE0] dark:bg-[#1E2B22] text-[#1D1D1D] dark:text-zinc-200 border border-[#1D1D1D] dark:border-zinc-700">
              {count} games
            </span>
          )}
        </div>
        
        {action && <div>{action}</div>}
      </div>
      <div className="w-full h-[1.5px] bg-[#1D1D1D] dark:bg-zinc-700 opacity-80" />
    </div>
  );
};
