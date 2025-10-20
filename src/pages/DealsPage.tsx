/**
 * Deals Page Component
 * 
 * Special offers, discounts, and promotional products.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import apiService from '../services/api';
import { Product, Category } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function DealsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadDeals();
  }, [selectedCategory]);

  const loadDeals = async () => {
    setLoading(true);
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        apiService.getProducts({
          category: selectedCategory === 'all' ? undefined : parseInt(selectedCategory),
          page: 1,
          limit: 20,
        }),
        apiService.getCategories()
      ]);
      
      // Simulate deals by adding discount to some products
      const dealsProducts = productsResponse.data?.map(product => ({
        ...product,
        variants: product.variants?.map(variant => ({
          ...variant,
          originalPrice: variant.price,
          price: variant.price * 0.8, // 20% discount
          discount: 20,
        })) || [],
      })) || [];
      
      setProducts(dealsProducts);
      setCategories(categoriesResponse.categories || []);
    } catch (error) {
      console.error('Failed to load deals:', error);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Special Deals & Offers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss out on these amazing deals! Limited time offers on your favorite products.
          </p>
        </div>

        {/* Deal Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All Deals
            </button>
            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id.toString()
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Promo Code Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 mb-6 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">🎉 Special Promo Code!</h2>
            <p className="text-lg mb-4">Get 20% off on all items</p>
            <div className="flex justify-center items-center space-x-4">
              <div className="bg-white text-gray-800 px-6 py-3 rounded-lg font-mono text-xl font-bold">
                SAVE20
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('SAVE20');
                  // You could add a toast notification here
                }}
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Copy Code
              </button>
            </div>
            <p className="text-sm mt-2 opacity-90">Valid until December 31, 2025</p>
          </div>
        </div>

        {/* Featured Deal Banner */}
        <div className="bg-gradient-to-r from-brand-orange to-secondary-600 rounded-lg p-8 mb-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Flash Sale!</h2>
            <p className="text-xl mb-4">Up to 50% off on selected items</p>
            <div className="flex justify-center items-center space-x-4 text-2xl font-bold">
              <span>Ends in:</span>
              <div className="bg-white text-red-600 px-4 py-2 rounded">
                23:59:59
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedCategory === 'all' ? 'All Deals' : categories.find(c => c.id.toString() === selectedCategory)?.name} Deals
              </h2>
              <p className="text-gray-600">
                {products?.length || 0} amazing deals available
              </p>
            </div>

            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="relative">
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.variants[0]?.discount || 20}%
                      </span>
                    </div>
                    
                    <ProductCard
                      product={product}
                      onAddToCart={(product, variant) => {
                        // Handle add to cart with discounted price
                        console.log('Add to cart:', product, variant);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals found</h3>
                <p className="text-gray-600 mb-4">
                  We're working on adding more amazing deals for this category.
                </p>
                <Link
                  to="/catalog"
                  className="btn btn-primary"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-brand-blue to-primary-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-primary-100 mb-6">
            Subscribe to our newsletter and be the first to know about exclusive offers and flash sales.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button className="bg-white text-primary-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
