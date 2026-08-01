import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { banners } from '../../data/banners';
import { DEFAULT_GAME_IMAGE } from '../../data/games';
import { Button } from '../ui/Button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface HeroSliderProps {
  onBannerClick?: (bannerId: number) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onBannerClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full group">
      {/* Container Frame */}
      <div className="relative w-full rounded-2xl border-2 border-[#1D1D1D] dark:border-zinc-700 bg-[#E6F2E4] dark:bg-[#1A231E] shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          navigation={{
            nextEl: '.hero-swiper-button-next',
            prevEl: '.hero-swiper-button-prev',
          }}
          className="w-full h-auto min-h-[200px] sm:min-h-[280px] lg:min-h-[320px]"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full min-h-[200px] sm:min-h-[280px] lg:min-h-[320px] flex flex-col md:flex-row items-center justify-between p-4 sm:p-8 lg:p-10 overflow-hidden">
                <motion.div
                  aria-hidden="true"
                  className="absolute -left-[40%] top-0 h-full w-2/5 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 pointer-events-none z-10"
                  initial={{ x: '0%' }}
                  animate={{ x: ['0%', '360%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: 'linear',
                  }}
                />
                
                {/* Background Banner Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover object-center opacity-25 dark:opacity-40 mix-blend-multiply dark:mix-blend-overlay"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E6F2E4] dark:from-[#1A231E] via-[#E6F2E4]/90 dark:via-[#1A231E]/90 to-transparent" />
                </div>

                {/* Content Left */}
                <div className="relative z-10 max-w-xl flex flex-col items-start gap-2 sm:gap-3.5">
                  {banner.discountBadge && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#A8C88A] border border-[#1D1D1D] text-[#1D1D1D] font-extrabold text-[11px] sm:text-sm shadow-[1.5px_1.5px_0px_#1D1D1D]">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{banner.discountBadge}</span>
                    </div>
                  )}

                  <h1 className="text-lg sm:text-3xl lg:text-4xl font-black text-[#1D1D1D] dark:text-white tracking-tight leading-snug uppercase font-mono">
                    {banner.title}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base font-semibold text-[#1D1D1D]/80 dark:text-zinc-300 line-clamp-2">
                    {banner.subtitle}
                  </p>

                  <div className="pt-0.5">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onBannerClick && onBannerClick(banner.id)}
                      className="group/btn text-xs sm:text-sm py-1.5 sm:py-2"
                    >
                      <span>{banner.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>

                {/* Floating Retro Game Logo Graphic */}
                <div className="hidden md:flex relative z-10 items-center justify-center gap-3">
                  <div className="relative overflow-hidden w-28 h-28 sm:w-32 sm:h-32 p-3 bg-white/65 dark:bg-[#1A1B22]/70 border-2 border-white/40 dark:border-zinc-700 rounded-2xl shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform backdrop-blur-sm">
                    <motion.div
                      aria-hidden="true"
                      className="absolute -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 pointer-events-none"
                      initial={{ x: -120 }}
                      animate={{ x: [ -120, 220 ] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: 'linear',
                      }}
                    />
                    <img
                      src={banner.image || DEFAULT_GAME_IMAGE}
                      alt={banner.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = DEFAULT_GAME_IMAGE;
                      }}
                    />
                  </div>
                  <div className="relative overflow-hidden px-5 py-3 bg-[#A8C88A]/75 border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl shadow-[4px_4px_0px_#1D1D1D] dark:shadow-[4px_4px_0px_#000] transform rotate-3 hover:rotate-0 transition-transform text-center backdrop-blur-sm">
                    <motion.div
                      aria-hidden="true"
                      className="absolute -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70 pointer-events-none"
                      initial={{ x: -120 }}
                      animate={{ x: [ -120, 220 ] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3.2,
                        ease: 'linear',
                        delay: 0.2,
                      }}
                    />
                    <p className="text-2xl font-black text-[#1D1D1D] tracking-wider">OFFICIAL</p>
                    <p className="text-[10px] font-extrabold text-white bg-[#1D1D1D] px-2 py-0.5 rounded-md uppercase tracking-widest mt-0.5">
                      TOPUP STORE
                    </p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows (Desktop/Tablet only) */}
        <button
          className="hero-swiper-button-prev hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-[#1A1B22] border border-[#1D1D1D] dark:border-zinc-700 text-[#1D1D1D] dark:text-white items-center justify-center shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000] hover:bg-[#A8C88A] transition-colors cursor-pointer opacity-80 hover:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          className="hero-swiper-button-next hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-[#1A1B22] border border-[#1D1D1D] dark:border-zinc-700 text-[#1D1D1D] dark:text-white items-center justify-center shadow-[2px_2px_0px_#1D1D1D] dark:shadow-[2px_2px_0px_#000] hover:bg-[#A8C88A] transition-colors cursor-pointer opacity-80 hover:opacity-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Custom Pagination Indicator Dots (Bottom center under hero box) */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {banners.map((_, idx) => (
          <div
            key={idx}
            className={`transition-all duration-300 border border-[#1D1D1D] cursor-pointer ${
              activeIndex === idx
                ? 'w-6 h-2.5 rounded-full bg-[#A8C88A] shadow-[1px_1px_0px_#1D1D1D]'
                : 'w-2.5 h-2.5 rounded-full bg-[#D8D8D8] hover:bg-[#E6F2E4]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
