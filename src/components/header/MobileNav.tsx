import React from 'react';
import { X, Gamepad2, Compass, Newspaper, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchBar } from './SearchBar';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'home' | 'topup' | 'store' | 'news';
  onTabChange: (tab: 'home' | 'topup' | 'store' | 'news') => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  language?: 'EN' | 'KM';
  onToggleLanguage?: (lang: 'EN' | 'KM') => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  language = 'EN',
  onToggleLanguage,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'topup', label: 'Topup Game', icon: Gamepad2 },
    { id: 'store', label: 'Game Store', icon: Gamepad2 },
    { id: 'news', label: 'News', icon: Newspaper },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-[#F8F7F3] dark:bg-[#181920] border-l-2 border-[#1D1D1D] dark:border-zinc-700 p-5 shadow-[-8px_0px_0px_rgba(0,0,0,0.1)] flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1D1D1D] dark:border-zinc-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#A8C88A] border border-[#1D1D1D] flex items-center justify-center font-bold text-xs shadow-[1.5px_1.5px_0px_#1D1D1D]">
                    🎮
                  </div>
                  <span className="font-extrabold text-lg text-[#1D1D1D] dark:text-white tracking-tight">
                    TOPUP GEMS
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-[#1D1D1D] bg-[#E2EFE0] text-[#1D1D1D] hover:bg-[#A8C88A] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Theme Toggle Button Mobile Drawer */}
              {onToggleDarkMode && (
                <div className="mb-4">
                  <button
                    onClick={onToggleDarkMode}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#1D1D1D] dark:border-zinc-700 bg-white dark:bg-[#20222A] text-[#1D1D1D] dark:text-white font-bold text-sm shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000]"
                  >
                    <span className="flex items-center gap-2">
                      {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#A8C88A] text-[#1D1D1D] font-extrabold">
                      {isDarkMode ? 'DARK' : 'LIGHT'}
                    </span>
                  </button>
                </div>
              )}

              {/* Search Bar Mobile */}
              <div className="mb-6">
                <p className="text-xs font-bold text-[#1D1D1D] dark:text-zinc-300 uppercase tracking-wider mb-2">Search Games</p>
                <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search games..." className="max-w-none" />
              </div>

              {/* Navigation Links */}
              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-[#1D1D1D] dark:text-zinc-300 uppercase tracking-wider mb-2">Navigation</p>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#1D1D1D] dark:border-zinc-700 font-bold text-sm transition-all text-left ${
                        isActive
                          ? 'bg-[#A8C88A] text-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D]'
                          : 'bg-white dark:bg-[#20222A] text-[#1D1D1D] dark:text-white hover:bg-[#E2EFE0]/60'
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language Switcher Section */}
            <div className="pt-4 border-t border-[#1D1D1D] dark:border-zinc-700 space-y-2">
              <p className="text-xs font-bold text-[#1D1D1D] dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Select Language</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onToggleLanguage?.('EN')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#1D1D1D] dark:border-zinc-700 font-bold text-sm transition-all ${
                    language === 'EN'
                      ? 'bg-[#A8C88A] text-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D]'
                      : 'bg-white dark:bg-[#20222A] text-[#1D1D1D] dark:text-white'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>

                <button
                  onClick={() => onToggleLanguage?.('KM')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#1D1D1D] dark:border-zinc-700 font-bold text-sm transition-all ${
                    language === 'KM'
                      ? 'bg-[#A8C88A] text-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D]'
                      : 'bg-white dark:bg-[#20222A] text-[#1D1D1D] dark:text-white'
                  }`}
                >
                  <span>🇰🇭</span>
                  <span>ភាសាខ្មែរ</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

