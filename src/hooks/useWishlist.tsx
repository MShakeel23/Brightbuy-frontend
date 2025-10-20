/**
 * Wishlist Hook
 * 
 * Custom React hook for managing wishlist state and operations.
 * Now acts as a thin wrapper around WishlistContext for backward compatibility.
 */

import { useWishlistContext } from '../contexts/WishlistContext';

export const useWishlist = () => {
  const context = useWishlistContext();
  
  // Return the same interface for backward compatibility
  return {
    items: context.items,
    count: context.count,
    isLoading: context.isLoading,
    error: context.error,
    pagination: context.pagination,
    addToWishlist: context.addToWishlist,
    removeFromWishlist: context.removeFromWishlist,
    toggleWishlist: context.toggleWishlist,
    isInWishlist: context.isInWishlist,
    checkWishlistStatus: context.checkWishlistStatus,
    loadWishlist: context.loadWishlist,
    clearWishlist: context.clearWishlist,
    refreshCount: context.refreshCount,
  };
};