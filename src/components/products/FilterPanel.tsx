/**
 * Filter Panel Component
 * 
 * Sidebar filter panel for product catalog with category, search, and sorting options.
 */

import { useState } from 'react';
import { Category } from '../../types';

interface FilterPanelProps {
  categories: Category[];
  selectedCategory?: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  onFilterChange: (filters: {
    category?: number;
    search?: string;
    sort?: string;
    order?: string;
  }) => void;
}

export default function FilterPanel({
  categories,
  selectedCategory,
  searchQuery,
  sortBy,
  sortOrder,
  onFilterChange,
}: FilterPanelProps) {
  const [search, setSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search: search.trim() || undefined });
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    onFilterChange({ category: categoryId });
  };

  const handleSortChange = (sort: string) => {
    onFilterChange({ sort });
  };

  const handleOrderChange = (order: string) => {
    onFilterChange({ order });
  };

  const clearFilters = () => {
    setSearch('');
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 btn-touch"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Search Products
        </label>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input w-full pl-8 sm:pl-10 mobile-input"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </form>
      </div>

      {/* Categories */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3">
          Categories
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto mobile-scroll">
          <label className="flex items-center btn-touch">
            <input
              type="radio"
              name="category"
              checked={!selectedCategory}
              onChange={() => handleCategoryChange(undefined)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-xs sm:text-sm text-gray-700">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center btn-touch">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-xs sm:text-sm text-gray-700">
                {category.name} ({category.productCount})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="input w-full mobile-input"
        >
          <option value="created_at">Newest First</option>
          <option value="name">Name A-Z</option>
          <option value="price">Price</option>
        </select>
      </div>

      {/* Sort Order */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Order
        </label>
        <select
          value={sortOrder}
          onChange={(e) => handleOrderChange(e.target.value)}
          className="input w-full mobile-input"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Active Filters Summary */}
      {(selectedCategory || searchQuery) && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
          <div className="space-y-1">
            {selectedCategory && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-600">
                  Category: {categories.find(c => c.id === selectedCategory)?.name}
                </span>
                <button
                  onClick={() => handleCategoryChange(undefined)}
                  className="text-red-600 hover:text-red-700 btn-touch"
                >
                  ×
                </button>
              </div>
            )}
            {searchQuery && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Search: "{searchQuery}"</span>
                <button
                  onClick={() => onFilterChange({ search: undefined })}
                  className="text-red-600 hover:text-red-700 btn-touch"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
