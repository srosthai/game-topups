import React from 'react';
import { cn } from '../../lib/utils';

interface DesktopNavProps {
  activeTab: 'home' | 'topup' | 'store' | 'news';
  onTabChange: (tab: 'home' | 'topup' | 'store' | 'news') => void;
  className?: string;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  activeTab,
  onTabChange,
  className,
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'topup', label: 'Topup Game' },
    { id: 'store', label: 'Game Store' },
    { id: 'news', label: 'News' },
  ] as const;

  return (
    <nav className={cn('hidden lg:flex items-center gap-6', className)}>
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'text-sm transition-all cursor-pointer relative py-1 px-1 font-semibold',
              isActive
                ? 'text-[#1D1D1D] font-bold'
                : 'text-[#1D1D1D]/70 hover:text-[#1D1D1D]'
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1D1D1D] rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
