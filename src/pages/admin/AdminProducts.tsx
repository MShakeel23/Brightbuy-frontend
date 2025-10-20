/**
 * Admin Products Component
 * 
 * Product management page for admins.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category, Pagination } from '../../types';
import { apiService } from '../../services/api';
import AdminTable from '../../components/admin/AdminTable';
import SearchBar from '../../components/admin/SearchBar';
import PaginationComponent from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [sortKey, setSortKey] = useState('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadData();
  }, [search, selectedCategory, pagination.page, sortKey, sortDirection]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [productsResponse, categoriesResponse] = await Promise.all([
        apiService.getAdminProducts({
          search: search || undefined,
          category: selectedCategory,
          page: pagination.page,
          limit: pagination.limit,
          sort: sortKey,
          order: sortDirection
        }),
        apiService.getCategories()
      ]);

      setProducts(productsResponse.data);
      setPagination(productsResponse.pagination);
      setCategories(categoriesResponse.categories);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleDelete = async (productId: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await apiService.deleteProduct(productId);
      await loadData(); // Reload data
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Failed to delete product');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return 'N/A';
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
      return 'Invalid Date';
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalStock = (variants: any[] | null | undefined) => {
    if (!variants || variants.length === 0) return 0;
    return variants.reduce((total, variant) => total + (variant.stock || 0), 0);
  };

  const getStockColor = (totalStock: number) => {
    const threshold = parseInt(localStorage.getItem('lowStockThreshold') || '10', 10);
    if (totalStock <= threshold) return 'text-red-600';
    if (totalStock <= threshold * 2) return 'text-yellow-600';
    return 'text-green-600';
  };

  const columns = [
    {
      key: 'images',
      label: 'Image',
      render: (images: any[]) => (
        <div className="w-12 h-12">
          {images && images.length > 0 ? (
            <img
              src={images[0].imagePath}
              alt={images[0].altText || 'Product image'}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (name: string, product: Product) => (
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">SKU: {product.sku}</div>
        </div>
      )
    },
    {
      key: 'categoryName',
      label: 'Category',
      sortable: true
    },
    {
      key: 'basePrice',
      label: 'Base Price',
      sortable: true,
      render: (price: number) => formatCurrency(price)
    },
    {
      key: 'variants',
      label: 'Stock',
      sortable: true,
      render: (variants: any[] | null | undefined) => {
        const totalStock = getTotalStock(variants);
        const colorClass = getStockColor(totalStock);
        return (
          <span className={`font-medium ${colorClass}`}>
            {totalStock}
          </span>
        );
      }
    },
    {
      key: 'variants',
      label: 'Variants',
      render: (variants: any[] | null | undefined) => {
        const variantCount = variants?.length || 0;
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {variantCount} variant{variantCount !== 1 ? 's' : ''}
          </span>
        );
      }
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (date: string) => formatDate(date)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, product: Product) => (
        <div className="flex space-x-2">
          <Link
            to={`/admin/products/${product.id}/edit`}
            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(product.id)}
            className="text-red-600 hover:text-red-900 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  if (loading && products.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Management</h1>
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <Link
          to="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search products..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory || ''}
              onChange={(e) => handleCategoryChange(e.target.value ? parseInt(e.target.value) : undefined)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={loadData}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <AdminTable
        data={products}
        columns={columns}
        loading={loading}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        emptyMessage="No products found"
      />

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-6">
          <PaginationComponent
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
