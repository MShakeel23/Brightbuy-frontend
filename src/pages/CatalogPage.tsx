/**
 * Catalog Page Component
 * 
 * Product listing page with filters, search, and pagination.
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import FilterPanel from '../components/products/FilterPanel';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Product, Category } from '../types';
import apiService from '../services/api';
import { useCart } from '../hooks/useCart';
import { useWishlistContext } from '../contexts/WishlistContext';
import { useAuth } from '../hooks/useAuth';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const { addItem } = useCart();
  const { checkWishlistStatusBatch } = useWishlistContext();
  const { isAuthenticated } = useAuth();

  // Get filters from URL
  const category = searchParams.get('category');
  const search = searchParams.get('q');
  const sort = searchParams.get('sort') || 'created_at';
  const order = searchParams.get('order') || 'desc';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    loadData();
  }, [category, search, sort, order, page]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        apiService.getProducts({
          category: category ? parseInt(category) : undefined,
          search: search || undefined,
          sort,
          order,
          page,
          limit: 20,
        }),
        apiService.getCategories(),
      ]);

      setProducts(productsResponse.data);
      setPagination(productsResponse.pagination);
      setCategories(categoriesResponse.categories);
      
      // Batch check wishlist status for all products on this page
      if (isAuthenticated && productsResponse.data.length > 0) {
        const productIds = productsResponse.data.map((product: Product) => product.id);
        checkWishlistStatusBatch(productIds);
      }
    } catch (error) {
      console.error('Failed to load catalog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: {
    category?: number;
    search?: string;
    sort?: string;
    order?: string;
  }) => {
    const params = new URLSearchParams(searchParams);
    
    if (newFilters.category) {
      params.set('category', newFilters.category.toString());
    } else {
      params.delete('category');
    }

    if (newFilters.search) {
      params.set('q', newFilters.search);
    } else {
      params.delete('q');
    }

    if (newFilters.sort) {
      params.set('sort', newFilters.sort);
    }

    if (newFilters.order) {
      params.set('order', newFilters.order);
    }

    params.delete('page'); // Reset to page 1 when filters change
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const handleAddToCart = (product: Product, variant: any) => {
    addItem({
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      variantName: variant.name,
      price: variant.price,
      image: product.images[0]?.imagePath,
      stock: variant.stock,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Product Catalog</h1>
          <p className="text-sm sm:text-base text-gray-600">
            {pagination.total} products found
            {category && ` in ${categories.find(c => c.id === parseInt(category))?.name}`}
            {search && ` for "${search}"`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterPanel
              categories={categories}
              selectedCategory={category ? parseInt(category) : undefined}
              searchQuery={search || ''}
              sortBy={sort}
              sortOrder={order}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : products && products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => setSearchParams({})}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
