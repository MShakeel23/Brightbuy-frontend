/**
 * Wishlist Page Component
 * 
 * Displays the user's saved products (wishlist) with options to
 * add to cart, remove from wishlist, or continue shopping.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import WishlistButton from '../components/common/WishlistButton';

export default function WishlistPage() {
  const { isAuthenticated, user } = useAuth();
  const { addItem } = useCart();
  const { 
    items, 
    count, 
    isLoading, 
    error, 
    pagination, 
    loadWishlist, 
    clearWishlist,
    removeFromWishlist 
  } = useWishlist();

  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  const [addingToCart, setAddingToCart] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isAuthenticated && user) {
      loadWishlist(1);
    }
  }, [isAuthenticated, user]); // Remove loadWishlist from dependencies to prevent infinite loop

  const handleVariantChange = (productId: number, variantId: number) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantId
    }));
  };

  const handleAddToCart = async (productId: number) => {
    const selectedVariantId = selectedVariants[productId];
    const product = items.find(item => item.product.id === productId)?.product;
    
    if (!product || !selectedVariantId) {
      alert('Please select a variant first');
      return;
    }

    const variant = product.variants.find(v => v.id === selectedVariantId);
    if (!variant || variant.stock === 0) {
      alert('Selected variant is out of stock');
      return;
    }

    setAddingToCart(prev => ({ ...prev, [productId]: true }));

    try {
      addItem({
        variantId: selectedVariantId,
        productId,
        productName: product.name,
        variantName: variant.name,
        price: variant.price,
        image: product.images[0]?.imagePath,
        stock: variant.stock
      });
      
      // Optionally remove from wishlist after adding to cart
      // await removeFromWishlist(productId);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemoveFromWishlist = async (productId: number) => {
    await removeFromWishlist(productId);
  };

  const handleClearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      await clearWishlist();
    }
  };

  const loadMoreItems = () => {
    if (pagination?.hasNext) {
      loadWishlist(pagination.page + 1);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign in to view your wishlist</h2>
          <p className="text-gray-600 mb-6">Save your favorite products and access them anytime.</p>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-1">
              {count === 0 ? 'No items in your wishlist' : `${count} item${count === 1 ? '' : 's'} saved`}
            </p>
          </div>

          {count > 0 && (
            <button
              onClick={handleClearWishlist}
              className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Empty State */}
        {count === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start browsing and save your favorite products!</p>
            <Link
              to="/catalog"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Wishlist Items */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const product = item.product;
              const selectedVariantId = selectedVariants[product.id] || product.variants[0]?.id;
              const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
              const isAddingToCart = addingToCart[product.id];

              return (
                <div key={item.wishlistId} className="bg-white rounded-lg shadow-md overflow-hidden group">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-200">
                    <Link to={`/product/${product.id}`}>
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0].imagePath}
                          alt={product.images[0].altText || product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </Link>

                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3">
                      <WishlistButton productId={product.id} size="md" />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-600 mt-1">{product.categoryName}</p>
                    
                    {selectedVariant && (
                      <p className="text-lg font-semibold text-primary-600 mt-2">
                        ${selectedVariant.price.toFixed(2)}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </p>

                    {/* Variant Selection */}
                    {product.variants.length > 1 && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Variant
                        </label>
                        <select
                          value={selectedVariantId || ''}
                          onChange={(e) => handleVariantChange(product.id, parseInt(e.target.value))}
                          className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {product.variants.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                              {variant.name} - ${variant.price.toFixed(2)} 
                              {variant.stock === 0 ? ' (Out of Stock)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 space-y-2">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={!selectedVariant || selectedVariant.stock === 0 || isAddingToCart}
                        className="w-full px-3 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                      </button>
                      
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {pagination?.hasNext && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreItems}
              disabled={isLoading}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}