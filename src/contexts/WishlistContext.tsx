/**
 * Wishlist Context
 * 
 * Centralized wishlist state management with batch loading and caching.
 * Prevents excessive API calls by maintaining local state and batching requests.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { WishlistItem } from '../types';
import { apiService } from '../services/api';
import { useAuth } from '../hooks/useAuth';

interface WishlistContextType {
  // State
  items: WishlistItem[];
  count: number;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  
  // Status tracking
  wishlistStatus: Map<number, boolean>; // productId -> inWishlist
  pendingStatusChecks: Set<number>; // productIds being checked
  
  // Actions
  addToWishlist: (productId: number) => Promise<boolean>;
  removeFromWishlist: (productId: number) => Promise<boolean>;
  toggleWishlist: (productId: number) => Promise<boolean>;
  isInWishlist: (productId: number) => boolean;
  checkWishlistStatus: (productId: number) => Promise<boolean>;
  checkWishlistStatusBatch: (productIds: number[]) => Promise<void>;
  loadWishlist: (page?: number) => Promise<void>;
  clearWishlist: () => Promise<boolean>;
  refreshCount: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null>(null);
  
  // Status tracking
  const [wishlistStatus, setWishlistStatus] = useState<Map<number, boolean>>(new Map());
  const [pendingStatusChecks, setPendingStatusChecks] = useState<Set<number>>(new Set());
  
  // Refs for batching and request deduplication
  const batchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingBatchRef = useRef<Set<number>>(new Set());
  const activeRequestsRef = useRef<Set<string>>(new Set()); // Track active requests
  
  const { isAuthenticated, user } = useAuth();

  // Load wishlist data with request deduplication
  const loadWishlist = useCallback(async (page: number = 1) => {
    if (!isAuthenticated || !user) return;

    // Create a unique request key to prevent duplicate requests
    const requestKey = `wishlist-${page}`;
    
    // Check if this request is already in progress
    if (activeRequestsRef.current.has(requestKey)) {
      console.log('Wishlist request already in progress, skipping...');
      return;
    }

    // Mark request as active
    activeRequestsRef.current.add(requestKey);
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.getWishlist(page, 20);
      
      if (page === 1) {
        setItems(response.items || []);
      } else {
        setItems(prev => [...prev, ...(response.items || [])]);
      }

      setPagination({
        page: response.pagination.page,
        totalPages: response.pagination.totalPages,
        hasNext: response.pagination.hasNext,
        hasPrev: response.pagination.hasPrev,
      });

      setCount(response.pagination.total);
      
      // Update status map with loaded items
      const newStatusMap = new Map(wishlistStatus);
      response.items?.forEach((item: WishlistItem) => {
        newStatusMap.set(item.product.id, true);
      });
      setWishlistStatus(newStatusMap);
      
    } catch (err: any) {
      console.error('Failed to load wishlist:', err);
      setError(err.response?.data?.error || 'Failed to load wishlist');
    } finally {
      setIsLoading(false);
      // Remove request from active set
      activeRequestsRef.current.delete(requestKey);
    }
  }, [isAuthenticated, user, wishlistStatus]);

  // Refresh wishlist count with request deduplication
  const refreshCount = useCallback(async () => {
    if (!isAuthenticated || !user) return;

    const requestKey = 'wishlist-count';
    
    // Check if this request is already in progress
    if (activeRequestsRef.current.has(requestKey)) {
      console.log('Wishlist count request already in progress, skipping...');
      return;
    }

    // Mark request as active
    activeRequestsRef.current.add(requestKey);

    try {
      const response = await apiService.getWishlistCount();
      setCount(response.count);
    } catch (err: any) {
      console.error('Failed to get wishlist count:', err);
    } finally {
      // Remove request from active set
      activeRequestsRef.current.delete(requestKey);
    }
  }, [isAuthenticated, user]);

  // Batch status check with debouncing
  const checkWishlistStatusBatch = useCallback(async (productIds: number[]) => {
    if (!isAuthenticated || !user || productIds.length === 0) return;

    // Add to pending batch
    productIds.forEach(id => pendingBatchRef.current.add(id));
    setPendingStatusChecks(prev => new Set([...prev, ...productIds]));

    // Clear existing timeout
    if (batchTimeoutRef.current) {
      clearTimeout(batchTimeoutRef.current);
    }

    // Set new timeout for batching
    batchTimeoutRef.current = setTimeout(async () => {
      const idsToCheck = Array.from(pendingBatchRef.current);
      pendingBatchRef.current.clear();
      
      if (idsToCheck.length === 0) return;

      try {
        const response = await apiService.checkWishlistStatusBatch(idsToCheck);
        
        // Update status map
        setWishlistStatus(prev => {
          const newMap = new Map(prev);
          response.statuses.forEach((status: { productId: number; inWishlist: boolean }) => {
            newMap.set(status.productId, status.inWishlist);
          });
          return newMap;
        });
        
      } catch (err: any) {
        console.error('Failed to check wishlist status batch:', err);
      } finally {
        // Remove from pending checks
        setPendingStatusChecks(prev => {
          const newSet = new Set(prev);
          idsToCheck.forEach(id => newSet.delete(id));
          return newSet;
        });
      }
    }, 100); // 100ms debounce
  }, [isAuthenticated, user]);

  // Individual status check (for backward compatibility)
  const checkWishlistStatus = useCallback(async (productId: number): Promise<boolean> => {
    if (!isAuthenticated || !user) return false;

    // Check if already cached
    if (wishlistStatus.has(productId)) {
      return wishlistStatus.get(productId) || false;
    }

    // Check if already pending
    if (pendingStatusChecks.has(productId)) {
      // Wait for batch to complete
      return new Promise((resolve) => {
        const checkPending = () => {
          if (wishlistStatus.has(productId)) {
            resolve(wishlistStatus.get(productId) || false);
          } else if (pendingStatusChecks.has(productId)) {
            setTimeout(checkPending, 50);
          } else {
            resolve(false);
          }
        };
        checkPending();
      });
    }

    // Add to batch
    await checkWishlistStatusBatch([productId]);
    
    // Return cached result
    return wishlistStatus.get(productId) || false;
  }, [isAuthenticated, user, wishlistStatus, pendingStatusChecks, checkWishlistStatusBatch]);

  // Add item to wishlist
  const addToWishlist = useCallback(async (productId: number): Promise<boolean> => {
    if (!isAuthenticated || !user) {
      setError('Please log in to add items to your wishlist');
      return false;
    }

    try {
      const response = await apiService.addToWishlist(productId);
      setCount(response.wishlistCount);
      
      // Update status map
      setWishlistStatus(prev => new Map(prev).set(productId, true));
      
      // If we're currently viewing the wishlist, reload it
      if (items.length > 0) {
        await loadWishlist(1);
      }

      return true;
    } catch (err: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to add to wishlist:', err);
      }
      setError(err.response?.data?.error || 'Failed to add item to wishlist');
      return false;
    }
  }, [isAuthenticated, user, items.length, loadWishlist]);

  // Remove item from wishlist
  const removeFromWishlist = useCallback(async (productId: number): Promise<boolean> => {
    if (!isAuthenticated || !user) {
      setError('Please log in to manage your wishlist');
      return false;
    }

    try {
      const response = await apiService.removeFromWishlist(productId);
      setCount(response.wishlistCount);
      
      // Update status map
      setWishlistStatus(prev => new Map(prev).set(productId, false));
      
      // Remove item from local state
      setItems(prev => prev.filter(item => item.product.id !== productId));

      return true;
    } catch (err: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to remove from wishlist:', err);
      }
      setError(err.response?.data?.error || 'Failed to remove item from wishlist');
      return false;
    }
  }, [isAuthenticated, user]);

  // Toggle wishlist status
  const toggleWishlist = useCallback(async (productId: number): Promise<boolean> => {
    const inWishlist = isInWishlist(productId);
    
    if (inWishlist) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(productId);
    }
  }, [addToWishlist, removeFromWishlist]);

  // Check if product is in wishlist (local state)
  const isInWishlist = useCallback((productId: number): boolean => {
    return wishlistStatus.get(productId) || false;
  }, [wishlistStatus]);

  // Clear entire wishlist
  const clearWishlist = useCallback(async (): Promise<boolean> => {
    if (!isAuthenticated || !user) {
      setError('Please log in to manage your wishlist');
      return false;
    }

    try {
      await apiService.clearWishlist();
      setItems([]);
      setCount(0);
      setWishlistStatus(new Map());
      return true;
    } catch (err: any) {
      console.error('Failed to clear wishlist:', err);
      setError(err.response?.data?.error || 'Failed to clear wishlist');
      return false;
    }
  }, [isAuthenticated, user]);

  // Load wishlist count when user authenticates
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshCount();
    } else {
      setItems([]);
      setCount(0);
      setPagination(null);
      setWishlistStatus(new Map());
      setPendingStatusChecks(new Set());
      // Clear any active requests when user logs out
      activeRequestsRef.current.clear();
    }
  }, [isAuthenticated, user, refreshCount]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (batchTimeoutRef.current) {
        clearTimeout(batchTimeoutRef.current);
      }
    };
  }, []);

  const value: WishlistContextType = {
    items,
    count,
    isLoading,
    error,
    pagination,
    wishlistStatus,
    pendingStatusChecks,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    checkWishlistStatus,
    checkWishlistStatusBatch,
    loadWishlist,
    clearWishlist,
    refreshCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
};
