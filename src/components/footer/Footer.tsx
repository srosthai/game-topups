import React from 'react';
import { Gamepad2, Heart, Shield, Zap, RefreshCw, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  onTabChange?: (tab: 'home' | 'topup' | 'store' | 'news') => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full mt-16 pb-8 px-3 sm:px-6">
      {/* Value Proposition Highlights Banner */}
      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#A8C88A] border border-[#1D1D1D]">
            <Zap className="w-5 h-5 text-[#1D1D1D]" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#1D1D1D] dark:text-white">Instant Delivery</h4>
            <p className="text-xs text-gray-600 dark:text-zinc-400">Gems delivered in seconds</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#E2EFE0] border border-[#1D1D1D]">
            <Shield className="w-5 h-5 text-[#1D1D1D]" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#1D1D1D] dark:text-white">Safe & Official</h4>
            <p className="text-xs text-gray-600 dark:text-zinc-400">Authorized topup partner</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#A8C88A] border border-[#1D1D1D]">
            <RefreshCw className="w-5 h-5 text-[#1D1D1D]" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#1D1D1D] dark:text-white">24/7 Support</h4>
            <p className="text-xs text-gray-600 dark:text-zinc-400">Always ready to assist</p>
          </div>
        </div>
      </div>

      {/* Main Footer Box */}
      <div className="max-w-7xl mx-auto bg-[#1D1D1D] dark:bg-[#121318] text-white border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-3xl p-6 sm:p-10 shadow-[5px_5px_0px_#A8C88A]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-gray-800 dark:border-zinc-800">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#A8C88A] border border-white text-[#1D1D1D] flex items-center justify-center font-bold text-xl shadow-[2px_2px_0px_#FFFFFF]">
              <Gamepad2 className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-mono">
                <span className="font-black text-xl text-white tracking-tight">TOPUP</span>
                <span className="font-black text-sm text-[#1D1D1D] bg-[#A8C88A] px-2 py-0.5 rounded">GEMS</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Your trusted soft-gaming digital topup store.
              </p>
            </div>
          </div>

          {/* Social Links (Logos Only) */}
          <div className="flex items-center gap-3">
            {/* TikTok Logo Icon */}
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              title="TikTok"
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#A8C88A] text-white hover:text-[#1D1D1D] border-1.5 border-white/20 hover:border-[#1D1D1D] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.33-6.33V9.05a8.21 8.21 0 0 0 4.92 1.6V7.2a4.9 4.9 0 0 1-1-.51z" />
              </svg>
            </a>

            {/* Facebook Logo Icon */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#A8C88A] text-white hover:text-[#1D1D1D] border-1.5 border-white/20 hover:border-[#1D1D1D] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <Facebook className="w-5 h-5 stroke-[2.2]" />
            </a>

            {/* Instagram Logo Icon */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#A8C88A] text-white hover:text-[#1D1D1D] border-1.5 border-white/20 hover:border-[#1D1D1D] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <Instagram className="w-5 h-5 stroke-[2.2]" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-mono">
          <p>© {new Date().getFullYear()} Topup Gems Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 text-gray-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#A8C88A] fill-[#A8C88A]" /> for gamers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

