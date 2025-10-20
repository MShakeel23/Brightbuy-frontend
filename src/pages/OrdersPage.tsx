/**
 * Orders Page Component
 * 
 * Customer order history page with filtering and pagination.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import apiService from '../services/api';
import { Order } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/validators';

export default function OrdersPage() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  
  const [filters, setFilters] = useState({
    status: '',
    page: 1
  });

  useEffect(() => {
    loadOrders();
  }, [filters]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await apiService.getOrders({
        status: filters.status || undefined,
        page: filters.page,
        limit: pagination.limit
      });
      
      setOrders(response.data);
      setPagination(response.pagination);
    } catch (error: any) {
      showNotification(error.message || 'Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilter = (status: string) => {
    setFilters({ ...filters, status, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method: string | undefined) => {
    if (!method) return '💳';
    switch (method.toLowerCase()) {
      case 'card':
        return '💳';
      case 'cod':
        return '💰';
      default:
        return '💳';
    }
  };

  const getDeliveryModeIcon = (mode: string | undefined) => {
    if (!mode) return '🚚';
    switch (mode.toLowerCase()) {
      case 'standard':
        return '🚚';
      case 'store_pickup':
        return '🏪';
      default:
        return '🚚';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Loading..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Filter by status:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusFilter('')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filters.status === '' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => handleStatusFilter('pending')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filters.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusFilter('confirmed')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filters.status === 'confirmed' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => handleStatusFilter('shipped')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filters.status === 'shipped' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Shipped
                </button>
                <button
                  onClick={() => handleStatusFilter('delivered')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filters.status === 'delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Delivered
                </button>
                <button
                  onClick={() => handleStatusFilter('cancelled')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filters.status === 'cancelled' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Loading orders..." />
          </div>
        ) : orders && orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {filters.status 
                  ? `You don't have any ${filters.status} orders yet.`
                  : "You haven't placed any orders yet."
                }
              </p>
              <a
                href="/catalog"
                className="btn btn-primary"
              >
                Start Shopping
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow">
                <div className="px-6 py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderNumber}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Order Date:</span>
                          <br />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        
                        <div>
                          <span className="font-medium">Total Amount:</span>
                          <br />
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(order.totalAmount)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium">Payment:</span>
                          <br />
                          <span className="flex items-center gap-1">
                            <span>{getPaymentMethodIcon(order.paymentMethod)}</span>
                            {order.paymentMethod === 'card' ? 'Card Payment' : 'Cash on Delivery'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-600">
                        <span className="font-medium">Delivery:</span>
                        <span className="flex items-center gap-1 ml-2">
                          <span>{getDeliveryModeIcon(order.deliveryMode)}</span>
                          {order.deliveryMode === 'standard' ? 'Standard Delivery' : 'Store Pickup'}
                        </span>
                        {order.shippingAddress && (
                          <span className="ml-4">
                            to {order.shippingAddress.city}, {order.shippingAddress.state}
                          </span>
                        )}
                      </div>
                      
                      {order.estimatedDelivery && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Estimated Delivery:</span>
                          <span className="ml-2">
                            {formatDate(order.estimatedDelivery)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <a
                        href={`/track-order?order=${order.orderNumber}`}
                        className="btn btn-secondary"
                      >
                        Track Order
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
