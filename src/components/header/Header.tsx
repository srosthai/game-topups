import React from 'react';
import { Gamepad2, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'topup' | 'store' | 'news';
  onTabChange: (tab: 'home' | 'topup' | 'store' | 'news') => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  language?: 'EN' | 'KM';
  onToggleLanguage?: (lang: 'EN' | 'KM') => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onTabChange,
  language = 'EN',
  onToggleLanguage,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  return (
    <header className="relative lg:fixed lg:inset-x-0 lg:top-0 lg:z-40 w-full px-2.5 sm:px-6 pt-2.5 pb-2 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto border-2 border-[#1D1D1D] dark:border-[#3F3F46] rounded-2xl px-3 sm:px-6 py-2 shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000] flex items-center justify-between gap-2 overflow-hidden bg-transparent">
        
        {/* Left: Clickable Logo -> Redirect to Home */}
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0 group select-none"
          onClick={() => onTabChange('home')}
          title="Redirect to Home Page"
        >
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#A8C88A] border-1.5 border-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D] transform transition-transform group-hover:scale-105">
            <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D1D1D] stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1 leading-none">
              <span className="font-extrabold text-base sm:text-xl text-[#1D1D1D] dark:text-white tracking-tight font-mono">
                TOPUP
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-[#A8C88A] bg-[#1D1D1D] px-1 py-0.5 rounded tracking-wider">
                GEMS
              </span>
            </div>
            <p className="text-[10px] font-semibold text-[#1D1D1D]/70 dark:text-zinc-300 hidden sm:block">
              Soft Gaming Store
            </p>
          </div>
        </div>

        {/* Right: Language Switcher + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle EN <-> KM */}
          <button
            onClick={() => onToggleLanguage?.(language === 'EN' ? 'KM' : 'EN')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-black rounded-xl bg-white dark:bg-[#121318] border-1.5 border-[#1D1D1D] dark:border-zinc-700 text-[#1D1D1D] dark:text-white shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000] hover:bg-[#E2EFE0] dark:hover:bg-[#1E2B22] active:translate-y-0.5 transition-all cursor-pointer"
            title={language === 'EN' ? 'ប្តូរទៅភាសាខ្មែរ' : 'Switch to English'}
          >
            <span>{language === 'EN' ? '🇬🇧' : '🇰🇭'}</span>
            <span>{language}</span>
          </button>

          {/* Theme Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#121318] border-1.5 border-[#1D1D1D] dark:border-zinc-700 text-[#1D1D1D] dark:text-yellow-400 shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000] hover:scale-105 active:translate-y-0.5 transition-all cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />}
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
