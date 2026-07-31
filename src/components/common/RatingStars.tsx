import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RatingStarsProps {
  rating: number; // 1 to 5
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 'sm',
  className,
}) => {
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`Rating: ${rating} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const isFilled = index < rating;
        return (
          <Star
            key={index}
            className={cn(
              starSizes[size],
              'transition-colors stroke-[#1D1D1D] stroke-[1.5]',
              isFilled ? 'fill-[#FFC700] text-[#FFC700]' : 'fill-[#E2E8F0] text-[#CBD5E1]'
            )}
          />
        );
      })}
    </div>
  );
};
