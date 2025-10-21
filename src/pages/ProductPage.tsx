/**
 * Product Detail Page Component
 * 
 * Individual product page with details, variants, and add to cart functionality.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import apiService from '../services/api';
import { useCart } from '../hooks/useCart';
import { useNotification } from '../contexts/NotificationContext';
import { useWishlistContext } from '../contexts/WishlistContext';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency } from '../utils/formatCurrency';
import { calculateDeliveryTime, getDeliveryTimeDescription } from '../utils/validators';
import LoadingSpinner from '../components/common/LoadingSpinner';
import WishlistButton from '../components/common/WishlistButton';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, getItemQuantity } = useCart();
  const { showNotification } = useNotification();
  const { checkWishlistStatusBatch } = useWishlistContext();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProduct(parseInt(id!));
      setProduct(response.product);
      
      // Set default variant
      const defaultVariant = response.product.variants[0] || null;
      setSelectedVariant(defaultVariant);
      
      // Check wishlist status for this product
      if (isAuthenticated) {
        checkWishlistStatusBatch([response.product.id]);
      }
    } catch (error) {
      console.error('Failed to load product:', error);
      showNotification('Product not found', 'error');
      navigate('/catalog');
    } finally {
      setLoading(false);
    }
  };

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const existingQuantity = getItemQuantity(selectedVariant.id);
    const newQuantity = existingQuantity + quantity;

    // Allow adding to cart even if it exceeds stock (backorders)
    // Show warning but don't block the action
    if (newQuantity > selectedVariant.stock) {
      showNotification(
        `Added to cart (${newQuantity - selectedVariant.stock} items will be backordered)`, 
        'warning'
      );
    } else {
      showNotification('Added to cart successfully', 'success');
    }

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      image: product.images[0]?.imagePath,
      stock: selectedVariant.stock,
    });

    showNotification('Added to cart', 'success');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Loading product..." />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/catalog')}
              className="btn btn-primary"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const deliveryTime = calculateDeliveryTime('Austin', selectedVariant?.stock > 0);
  const isOutOfStock = !selectedVariant || selectedVariant.stock === 0;
  const isLowStock = selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 10;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-gray-700">
                Home
              </button>
            </li>
            <li>/</li>
            <li>
              <button onClick={() => navigate('/catalog')} className="hover:text-gray-700">
                Catalog
              </button>
            </li>
            <li>/</li>
            <li>
              <button 
                onClick={() => navigate(`/catalog?category=${product.categoryId}`)} 
                className="hover:text-gray-700"
              >
                {product.categoryName}
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]?.imagePath || '/placeholder-product.jpg'}
                alt={product.images[selectedImage]?.altText || product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img
                      src={image.imagePath}
                      alt={image.altText}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">{product.categoryName}</span>
              <div className="flex items-start justify-between mt-1">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <p className="text-lg text-gray-600 mt-2">{product.description}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <WishlistButton 
                    productId={product.id} 
                    size="lg"
                    className="bg-white border-2 border-gray-200 hover:border-red-300"
                  />
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(selectedVariant?.price || product.basePrice)}
              </span>
              {product.variants.length > 1 && (
                <span className="text-sm text-gray-500 ml-2">
                  (Starting from {formatCurrency(product.basePrice)})
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {isOutOfStock ? (
                <span className="badge badge-danger">Out of Stock</span>
              ) : isLowStock ? (
                <span className="badge badge-warning">Only {selectedVariant.stock} left in stock</span>
              ) : (
                <span className="badge badge-success">In Stock ({selectedVariant.stock} available)</span>
              )}
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Variant
                </label>
                <div className="space-y-2">
                  {product.variants
                    .map((variant) => (
                      <label key={variant.id} className="flex items-center">
                        <input
                          type="radio"
                          name="variant"
                          checked={selectedVariant?.id === variant.id}
                          onChange={() => handleVariantChange(variant)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          {variant.name} - {formatCurrency(variant.price)}
                          {variant.stock === 0 && ' (Out of Stock)'}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            {!isOutOfStock && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                {/* Backorder Warning */}
                {quantity > (selectedVariant?.stock || 0) && (
                  <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-orange-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-orange-700">
                        {quantity - (selectedVariant?.stock || 0)} items will be backordered 
                        (adds 3 days to delivery)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn btn-primary"
              >
                {isOutOfStock ? 'Add to Cart (Backorder)' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 btn btn-primary"
              >
                Buy Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Delivery Information</h3>
              <p className="text-sm text-gray-600">
                Estimated delivery: {getDeliveryTimeDescription(deliveryTime)} for Austin, TX
              </p>
              <p className="text-sm text-gray-600 mt-1">
                • Free shipping on orders over $50
                • Store pickup available
                • Cash on Delivery (COD) accepted
              </p>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">SKU</dt>
                  <dd className="text-sm text-gray-900">{selectedVariant?.sku || product.sku}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900">{product.categoryName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Base Price</dt>
                  <dd className="text-sm text-gray-900">{formatCurrency(product.basePrice)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
