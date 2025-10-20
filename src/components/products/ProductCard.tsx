/**
 * Product Card Component
 * 
 * Reusable component for displaying product information in a card format.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductVariant } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import WishlistButton from '../common/WishlistButton';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, variant: ProductVariant) => void;
  showQuickAdd?: boolean;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  showQuickAdd = true 
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );

  const handleAddToCart = () => {
    if (selectedVariant && onAddToCart) {
      onAddToCart(product, selectedVariant);
    }
  };

  const getLowestPrice = () => {
    const variants = product.variants || [];
    if (variants.length === 0) return product.basePrice;
    return Math.min(...variants.map(v => v.price));
  };

  const getHighestPrice = () => {
    const variants = product.variants || [];
    if (variants.length === 0) return product.basePrice;
    return Math.max(...variants.map(v => v.price));
  };

  const hasPriceRange = () => {
    const variants = product.variants || [];
    return variants.length > 1 && getLowestPrice() !== getHighestPrice();
  };

  const isOutOfStock = () => {
    if (!selectedVariant) return true;
    return selectedVariant.stock === 0;
  };

  const isLowStock = () => {
    if (!selectedVariant) return false;
    return selectedVariant.stock > 0 && selectedVariant.stock <= 10;
  };

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]?.imagePath || '/placeholder-product.jpg'}
            alt={product.images[0]?.altText || product.name}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </Link>
        
        {/* Stock Status Badge */}
        {isOutOfStock() && (
          <div className="absolute top-2 left-2">
            <span className="badge badge-danger">Out of Stock</span>
          </div>
        )}
        {isLowStock() && !isOutOfStock() && (
          <div className="absolute top-2 left-2">
            <span className="badge badge-warning">Low Stock</span>
          </div>
        )}

        {/* Wishlist Button */}
        <div className="absolute top-2 right-2 z-10">
          <WishlistButton 
            productId={product.id} 
            size="md"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
          />
        </div>

        {/* Quick Add Button */}
        {showQuickAdd && !isOutOfStock() && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 btn btn-primary btn-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        <p className="text-xs sm:text-sm text-gray-500 mb-1">{product.categoryName}</p>
        
        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="mt-2 sm:mt-3">
          {hasPriceRange() ? (
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-sm sm:text-lg font-bold text-gray-900">
                {formatCurrency(getLowestPrice())}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm">-</span>
              <span className="text-sm sm:text-lg font-bold text-gray-900">
                {formatCurrency(getHighestPrice())}
              </span>
            </div>
          ) : (
            <span className="text-sm sm:text-lg font-bold text-gray-900">
              {formatCurrency(selectedVariant?.price || product.basePrice)}
            </span>
          )}
        </div>

        {/* Variant Selector */}
        {product.variants && product.variants.length > 1 && (
          <div className="mt-2 sm:mt-3">
            <select
              value={selectedVariant?.id || ''}
              onChange={(e) => {
                const variant = product.variants?.find(v => v.id === parseInt(e.target.value));
                setSelectedVariant(variant || null);
              }}
              className="input text-xs sm:text-sm w-full"
            >
              {product.variants
                ?.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} - {formatCurrency(variant.price)}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Stock Info */}
        {selectedVariant && (
          <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
            {selectedVariant.stock > 0 ? (
              <span>{selectedVariant.stock} in stock</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        {showQuickAdd && (
          <div className="mt-3 sm:mt-4">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock()}
              className={`w-full btn btn-sm ${
                isOutOfStock() 
                  ? 'btn-secondary cursor-not-allowed opacity-50' 
                  : 'btn-primary'
              }`}
            >
              {isOutOfStock() ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
