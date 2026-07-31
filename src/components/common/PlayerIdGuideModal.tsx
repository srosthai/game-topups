import React from 'react';
import { HelpCircle, X, CheckCircle2, User, Gamepad2, Info } from 'lucide-react';

interface PlayerIdGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName?: string;
}

export const PlayerIdGuideModal: React.FC<PlayerIdGuideModalProps> = ({
  isOpen,
  onClose,
  gameName = 'your game',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#1A1B22] border-2 border-[#1D1D1D] dark:border-zinc-700 rounded-2xl shadow-[6px_6px_0px_#1D1D1D] dark:shadow-[6px_6px_0px_#000] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#E2EFE0] dark:bg-[#1E2B22] border-b-2 border-[#1D1D1D] dark:border-zinc-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#A8C88A] border-1.5 border-[#1D1D1D] flex items-center justify-center shadow-[1.5px_1.5px_0px_#1D1D1D]">
              <HelpCircle className="w-5 h-5 text-[#1D1D1D]" />
            </div>
            <div>
              <h3 className="font-black text-base text-[#1D1D1D] dark:text-white leading-tight">
                Where do I find my Player ID?
              </h3>
              <p className="text-[11px] font-bold text-[#1D1D1D]/70 dark:text-zinc-300">
                Guide for {gameName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border-1.5 border-[#1D1D1D] dark:border-zinc-700 bg-white dark:bg-[#121318] text-[#1D1D1D] dark:text-white hover:bg-[#A8C88A] transition-colors shadow-[1.5px_1.5px_0px_#1D1D1D] cursor-pointer"
            aria-label="Close instruction guide"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-[#1D1D1D] dark:text-zinc-200">
          
          {/* Visual Profile Guide Diagram */}
          <div className="relative rounded-xl border-2 border-[#1D1D1D] dark:border-zinc-700 bg-[#121318] p-4 text-white shadow-[3px_3px_0px_#1D1D1D] dark:shadow-[3px_3px_0px_#000] overflow-hidden">
            {/* Mock In-Game Profile Banner */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-700/80">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-[#A8C88A]" />
                <span className="text-xs font-black uppercase tracking-wider text-zinc-300">
                  IN-GAME PROFILE
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-black border border-black">
                Settings / Profile
              </span>
            </div>

            <div className="pt-3.5 pb-2 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Profile Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 border-2 border-white flex items-center justify-center shadow-md">
                  <User className="w-8 h-8 text-black" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#A8C88A] text-black text-[9px] font-black px-1.5 py-0.5 rounded border border-black">
                  Lv.47
                </div>
              </div>

              {/* Profile Details Box */}
              <div className="space-y-2 text-center sm:text-left w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-extrabold text-sm text-white">
                    GamerTag_Pro
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">
                    ● Online
                  </span>
                </div>

                {/* Highlighted ID Field Box */}
                <div className="relative p-2.5 rounded-xl bg-amber-400/10 border-2 border-amber-400 shadow-[2px_2px_0px_#FFD700] animate-pulse">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-amber-300">
                      ID: <span className="text-white underline decoration-amber-400 decoration-2">877851782</span> (10683)
                    </span>
                    <span className="text-[10px] font-black bg-amber-400 text-black px-1.5 py-0.5 rounded">
                      YOUR ID IS HERE!
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-snug">
                  The number before brackets is <strong className="text-amber-300 font-mono">User ID</strong>. The number inside brackets (10683) is your <strong className="text-amber-300 font-mono">Server ID</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions List */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1D1D1D] dark:text-zinc-300 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#A8C88A]" />
              <span>Simple Steps to Find Your ID:</span>
            </h4>

            <ol className="space-y-2 text-xs font-medium">
              <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#121318] border border-[#1D1D1D] dark:border-zinc-700">
                <span className="w-5 h-5 rounded-full bg-[#A8C88A] text-[#1D1D1D] font-black flex items-center justify-center shrink-0 border border-[#1D1D1D] text-[11px]">
                  1
                </span>
                <span>
                  Launch <strong>{gameName}</strong> and log in to your account.
                </span>
              </li>

              <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#121318] border border-[#1D1D1D] dark:border-zinc-700">
                <span className="w-5 h-5 rounded-full bg-[#A8C88A] text-[#1D1D1D] font-black flex items-center justify-center shrink-0 border border-[#1D1D1D] text-[11px]">
                  2
                </span>
                <span>
                  Tap your <strong>Avatar / Profile Picture</strong> at the top-left corner of the main screen.
                </span>
              </li>

              <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#121318] border border-[#1D1D1D] dark:border-zinc-700">
                <span className="w-5 h-5 rounded-full bg-[#A8C88A] text-[#1D1D1D] font-black flex items-center justify-center shrink-0 border border-[#1D1D1D] text-[11px]">
                  3
                </span>
                <span>
                  Locate your <strong>User ID</strong> and <strong>Server/Zone ID</strong> underneath your nickname on the profile card.
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F7F3] dark:bg-[#121318] border-t-2 border-[#1D1D1D] dark:border-zinc-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-black bg-[#A8C88A] text-[#1D1D1D] rounded-xl border-1.5 border-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D] hover:shadow-[3px_3px_0px_#1D1D1D] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
