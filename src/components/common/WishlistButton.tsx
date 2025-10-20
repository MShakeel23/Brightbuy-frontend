/**
 * Wishlist Button Component
 * 
 * A heart-shaped button for adding/removing products from wishlist.
 * Shows different states (empty/filled heart) based on wishlist status.
 * Now optimized to use WishlistContext for instant status checks.
 */

import { useState, useEffect } from 'react';
import { useWishlistContext } from '../../contexts/WishlistContext';
import { useAuth } from '../../hooks/useAuth';

interface WishlistButtonProps {
  productId: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

export default function WishlistButton({ 
  productId, 
  size = 'md', 
  className = '', 
  showTooltip = true 
}: WishlistButtonProps) {
  const { isAuthenticated } = useAuth();
  const { 
    toggleWishlist, 
    isInWishlist, 
    checkWishlistStatusBatch,
    isLoading 
  } = useWishlistContext();
  
  const [showTooltipText, setShowTooltipText] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Size configurations
  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Get wishlist status from context (instant, no API call)
  const inWishlist = isInWishlist(productId);

  // Batch check status when component mounts (only if not already cached)
  useEffect(() => {
    if (isAuthenticated && !inWishlist) {
      // Add to batch check - this will be debounced and batched
      checkWishlistStatusBatch([productId]);
    }
  }, [productId, isAuthenticated, inWishlist, checkWishlistStatusBatch]);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // You could show a login modal here
      alert('Please log in to add items to your wishlist');
      return;
    }

    const success = await toggleWishlist(productId);
    if (success) {
      const newInWishlist = !inWishlist;
      
      // Show animation when added
      if (newInWishlist) {
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 600);
      }
    }
  };

  const handleMouseEnter = () => {
    if (showTooltip) {
      setShowTooltipText(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltipText(false);
  };

  const tooltipText = isAuthenticated 
    ? (inWishlist ? 'Remove from wishlist' : 'Add to wishlist')
    : 'Login to add to wishlist';

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggleWishlist}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={isLoading}
        className={`
          ${sizeClasses[size]}
          relative
          rounded-full
          bg-white/95
          backdrop-blur-sm
          border-2
          shadow-md
          hover:shadow-lg
          transform
          hover:scale-105
          active:scale-95
          transition-all
          duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-red-500
          focus:ring-offset-2
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${inWishlist 
            ? 'border-red-300 bg-red-50/95 hover:bg-red-100/95' 
            : 'border-gray-200 hover:border-red-200 hover:bg-red-50/50'
          }
          ${className}
        `}
        aria-label={tooltipText}
      >
        {/* Heart Icon */}
        <svg
          className={`${iconSizes[size]} transition-all duration-300 ${
            inWishlist 
              ? 'text-red-500 fill-current scale-110' 
              : 'text-gray-400 hover:text-red-500 hover:scale-105'
          } ${justAdded ? 'animate-pulse' : ''}`}
          fill={inWishlist ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={inWishlist ? 0 : 2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && showTooltipText && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap z-10">
          {tooltipText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
}