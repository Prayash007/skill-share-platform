import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  totalRatings?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function RatingStars({ 
  rating, 
  totalRatings, 
  size = 'md', 
  interactive = false, 
  onRatingChange 
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            disabled={!interactive}
            className={`transition-all duration-300 ${
              interactive ? 'cursor-pointer hover:scale-110' : ''
            }`}
          >
            <Star
              className={`
                ${sizeClasses[size]}
                ${
                  star <= rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-slate-600'
                }
                ${interactive ? 'hover:text-yellow-300' : ''}
              `}
            />
          </button>
        ))}
      </div>
      <span className="text-sm text-slate-400 ml-2">
        {rating.toFixed(1)}
        {totalRatings && ` (${totalRatings})`}
      </span>
    </div>
  );
}