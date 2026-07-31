import React from 'react';
import { cn } from '../../lib/utils';

interface MarqueeTickerProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  'Welcome to TopUp Gems',
  'Instant Automatic Delivery',
  'Secure ABA · KHQR · Wing',
  '100% Verified Accounts',
  '0% Extra Fee',
  '24/7 Fast Support',
];

export function MarqueeTicker({ items = DEFAULT_ITEMS, className }: MarqueeTickerProps) {
  // Repeat items so each half of the track is wider than any viewport —
  // required for a seamless -50% translateX loop with no blank gap.
  const repeatedItems = [...items, ...items, ...items];
  return (
    <div
      className={cn(
        'w-screen relative left-1/2 -translate-x-1/2 overflow-hidden border-y-2 border-[#1D1D1D] dark:border-zinc-700 bg-[#1D1D1D] dark:bg-[#1A1B22] py-2.5',
        className,
      )}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {repeatedItems.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 mx-5 sm:mx-7 text-[11px] sm:text-xs font-black uppercase tracking-widest text-white whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8C88A] shrink-0" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
