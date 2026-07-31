import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <DialogPrimitive.Content asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className={cn(
                      'relative w-full max-w-lg bg-white border-2 border-[#1D1D1D] rounded-2xl p-6 shadow-[6px_6px_0px_#1D1D1D] focus:outline-none overflow-hidden',
                      className
                    )}
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D8D8D8]">
                      {title && (
                        <DialogPrimitive.Title className="text-xl font-bold text-[#1D1D1D] flex items-center gap-2">
                          {title}
                        </DialogPrimitive.Title>
                      )}
                      <DialogPrimitive.Close asChild>
                        <button
                          onClick={onClose}
                          className="p-1 rounded-lg border border-[#1D1D1D] bg-[#E2EFE0] text-[#1D1D1D] hover:bg-[#A8C88A] transition-colors cursor-pointer"
                          aria-label="Close"
                        >
                          <X className="w-5 h-5 stroke-[2.5]" />
                        </button>
                      </DialogPrimitive.Close>
                    </div>

                    {description && (
                      <DialogPrimitive.Description className="text-sm text-gray-600 mb-4">
                        {description}
                      </DialogPrimitive.Description>
                    )}

                    <div>{children}</div>
                  </motion.div>
                </DialogPrimitive.Content>
              </motion.div>
            </DialogPrimitive.Overlay>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};
