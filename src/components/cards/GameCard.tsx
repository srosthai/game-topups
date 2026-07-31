import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { Game } from '../../types';
import { Gamepad2, ArrowUpRight, Swords, Crosshair, Sparkles, Trophy, Flame, Zap, Shield } from 'lucide-react';
import { DEFAULT_GAME_IMAGE } from '../../data/games';

interface GameCardProps {
  game: Game;
  onTopupClick: (game: Game) => void;
}

const getCategoryBadgeStyle = (category: string) => {
  switch (category) {
    case 'MOBA':
      return {
        bg: 'bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900',
        textColor: 'text-white',
        icon: <Swords className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300" />,
      };
    case 'Adventure':
      return {
        bg: 'bg-gradient-to-br from-orange-600 via-red-600 to-amber-800',
        textColor: 'text-white',
        icon: <Crosshair className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-300" />,
      };
    case 'RPG':
      return {
        bg: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-900',
        textColor: 'text-white',
        icon: <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-200" />,
      };
    case 'Strategy':
      return {
        bg: 'bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-600',
        textColor: 'text-[#1D1D1D]',
        icon: <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-[#1D1D1D]" />,
      };
    case 'Casual':
      return {
        bg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-purple-700',
        textColor: 'text-white',
        icon: <Gamepad2 className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-200" />,
      };
    case 'Sports':
      return {
        bg: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-800',
        textColor: 'text-white',
        icon: <Flame className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-200" />,
      };
    case 'Simulation':
      return {
        bg: 'bg-gradient-to-br from-lime-500 via-green-600 to-emerald-800',
        textColor: 'text-white',
        icon: <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-lime-200" />,
      };
    default:
      return {
        bg: 'bg-gradient-to-br from-gray-700 via-zinc-800 to-black',
        textColor: 'text-white',
        icon: <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300" />,
      };
  }
};

export const GameCard: React.FC<GameCardProps> = ({ game, onTopupClick }) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const catStyle = getCategoryBadgeStyle(game.category);

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between w-full overflow-hidden bg-white/80 dark:bg-[#1E2028]/90 border-2 border-white/20 dark:border-zinc-700 rounded-2xl p-2.5 sm:p-3.5 shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#1D1D1D] dark:hover:shadow-[5px_5px_0px_#000] transition-all duration-300 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:to-white/5 before:opacity-30 before:md:opacity-0 before:md:group-hover:opacity-100 before:transition-opacity before:duration-500 before:z-0"
    >
      <motion.div
        aria-hidden="true"
        className="absolute -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-60 pointer-events-none"
        initial={{ x: -180 }}
        animate={{ x: [ -180, 420 ] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'linear',
        }}
      />

      {/* Top Header: Category & Optional Badge */}
      <div className="flex items-center justify-between pb-1.5 px-0.5 min-h-[22px]">
        <span className="text-[9px] sm:text-[10px] font-bold text-[#1D1D1D]/80 dark:text-zinc-300 uppercase tracking-wider line-clamp-1">
          {game.category}
        </span>
        {game.badge && (
          <span className="text-[9px] sm:text-xs font-black uppercase px-1.5 sm:px-2 py-0.5 rounded-md bg-[#A8C88A] text-[#1D1D1D] border border-[#1D1D1D] shadow-[1px_1px_0px_#1D1D1D] line-clamp-1">
            {game.badge}
          </span>
        )}
      </div>

      {/* Game Logo / Thumbnail Display Container */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-1.5 border-[#1D1D1D] dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center bg-amber-50/10 sm:bg-transparent sm:group-hover:bg-amber-50/60 dark:group-hover:bg-zinc-800/80 transition-colors">
        {!imgError && game.image ? (
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-full object-cover object-center filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback Game Icon + Name Badge Thumbnail */
          <div className={`w-full h-full ${catStyle.bg} ${catStyle.textColor} p-2.5 flex flex-col items-center justify-center relative overflow-hidden`}>
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 bg-grid-white/10 opacity-20 pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/10 blur-sm pointer-events-none" />

            {/* Icon Badge */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-black/25 backdrop-blur-sm border border-white/20 shadow-sm mb-1 shrink-0 group-hover:scale-110 transition-transform duration-200">
              {catStyle.icon}
            </div>

            {/* Styled Game Name */}
            <span className="font-black text-center text-xs sm:text-sm tracking-tight leading-tight uppercase line-clamp-2 drop-shadow-md px-1">
              {game.name}
            </span>
          </div>
        )}

        {/* Subtle Overlay gradient on hover */}
        <div className="absolute inset-0 bg-black/10 opacity-25 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="p-1.5 sm:p-2 rounded-full bg-white/90 border border-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D]">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D1D1D]" />
          </div>
        </div>
      </div>

      {/* Game Name */}
      <div className="my-2 sm:my-3 px-0.5 text-center sm:text-left">
        <h3 className="font-extrabold text-sm sm:text-lg text-[#1D1D1D] dark:text-white tracking-tight leading-snug line-clamp-1 group-hover:text-[#1D1D1D] dark:group-hover:text-white">
          {game.name}
        </h3>
        {game.publisher && (
          <p className="text-[11px] sm:text-xs text-[#1D1D1D]/70 dark:text-zinc-300 font-medium line-clamp-1 mt-0.5">
            {game.publisher}
          </p>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="pt-0.5">
        <Button
          variant="primary"
          fullWidth
          size="md"
          onClick={() => onTopupClick(game)}
          className="text-[11px] sm:text-sm font-extrabold tracking-wide py-1.5 sm:py-2 px-1"
        >
          <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 stroke-[2.2]" />
          <span>Topup Game</span>
        </Button>
      </div>
    </motion.div>
  );
};
