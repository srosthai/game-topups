import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  onFinished?: () => void;
  durationMs?: number; // default 3000ms (3s)
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  onFinished,
  durationMs = 3000,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    setProgress(0);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / durationMs) * 100), 100);
      setProgress(pct);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        if (onFinished) onFinished();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isLoading, durationMs, onFinished]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F7F3] dark:bg-[#121318] bg-grid-notebook text-[#1D1D1D] dark:text-white select-none overflow-hidden transition-colors"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,200,138,0.25)_0%,transparent_70%)] pointer-events-none" />

          {/* Central Logo & Circular Progress Ring Frame */}
          <div className="relative flex flex-col items-center justify-center">
            
            {/* Outer Spinning Dashed Orbit Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-dashed border-[#1D1D1D]/30 dark:border-zinc-700 pointer-events-none"
            />

            {/* Pulsing Glowing Circle */}
            <motion.div
              animate={{ scale: [0.96, 1.04, 0.96] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#E2EFE0] dark:bg-[#1C221F] border-2 border-[#1D1D1D] dark:border-zinc-700 shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000]"
            />

            {/* SVG Circular Progress Ring */}
            <svg className="w-36 h-36 sm:w-44 sm:h-44 -rotate-90 transform z-10" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-[#1D1D1D]/15 dark:stroke-zinc-800"
                strokeWidth="6"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-[#A8C88A]"
                strokeWidth="6"
                strokeDasharray="263.89"
                strokeDashoffset={263.89 - (263.89 * progress) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Center Badge Logo */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-2">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-[#A8C88A] border-2 border-[#1D1D1D] flex items-center justify-center text-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D] mb-1">
                <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
              </div>

              {/* Title wording inside badge */}
              <div className="font-mono leading-tight flex flex-col items-center">
                <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-[#1D1D1D] dark:text-white">
                  TOPUP
                </span>
                <span className="text-[9px] font-black text-[#A8C88A] bg-[#1D1D1D] px-1.5 py-0.2 rounded mt-0.5 border border-[#1D1D1D]">
                  GEMS STORE
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Progress Text */}
          <div className="mt-8 flex flex-col items-center gap-2.5 z-20">
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold font-mono tracking-widest text-[#1D1D1D] dark:text-white">
              <Sparkles className="w-4 h-4 text-[#A8C88A] animate-spin" />
              <span>LOADING...</span>
            </div>

            {/* Linear Progress Indicator */}
            <div className="w-48 sm:w-64 h-3 bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-full overflow-hidden p-0.5 shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000]">
              <motion.div
                className="h-full bg-[#A8C88A] rounded-full border border-[#1D1D1D]/40"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
