import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to Top"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#A8C88A] text-[#1D1D1D] border-2 border-[#1D1D1D] shadow-[3px_3px_0px_#1D1D1D] dark:border-zinc-200 dark:shadow-[3px_3px_0px_#000] hover:bg-[#97B779] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1D1D1D] transition-all duration-300 cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
    </button>
  );
}
