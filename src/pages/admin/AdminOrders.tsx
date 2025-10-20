/**
 * Admin Orders Component
 * 
 * Order management page for admins.
 */

import { useState, useEffect } from 'react';
import { AdminOrder, Pagination } from '../../types';
import { apiService } from '../../services/api';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import SearchBar from '../../components/admin/SearchBar';
import StatusBadge from '../../components/admin/StatusBadge';
import PaginationComponent from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
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
  }, [search, statusFilter, paymentStatusFilter, pagination.page, sortKey, sortDirection]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getAdminOrders({
        status: statusFilter || undefined,
        paymentStatus: paymentStatusFilter || undefined,
        page: pagination.page,
        limit: pagination.limit
      });

      setOrders(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Failed to load orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePaymentStatusFilter = (status: string) => {
    setPaymentStatusFilter(status);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleViewOrder = async (orderId: number) => {
    try {
      const response = await apiService.getAdminOrder(orderId);
      setSelectedOrder(response.order);
      setShowOrderModal(true);
    } catch (err) {
      console.error('Failed to load order details:', err);
      alert('Failed to load order details');
    }
  };

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      await loadData(); // Reload data
      setShowOrderModal(false);
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update order status');
    }
  };

  const handleUpdatePaymentStatus = async (orderId: number, newPaymentStatus: string) => {
    try {
      await apiService.updatePaymentStatus(orderId, newPaymentStatus);
      await loadData(); // Reload data
      setShowOrderModal(false);
    } catch (err) {
      console.error('Failed to update payment status:', err);
      alert('Failed to update payment status');
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

  const columns = [
    {
      key: 'orderNumber',
      label: 'Order #',
      sortable: true
    },
    {
      key: 'customerName',
      label: 'Customer',
      sortable: true,
      render: (name: string, order: AdminOrder) => (
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{order.customerEmail}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (status: string) => <StatusBadge status={status} type="order" />
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      render: (status: string) => <StatusBadge status={status} type="payment" />
    },
    {
      key: 'totalAmount',
      label: 'Total',
      sortable: true,
      render: (amount: number) => formatCurrency(amount)
    },
    {
      key: 'itemCount',
      label: 'Items',
      render: (count: number) => `${count} item${count !== 1 ? 's' : ''}`
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (date: string) => formatDate(date)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, order: AdminOrder) => (
        <button
          onClick={() => handleViewOrder(order.id)}
          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
        >
          View Details
        </button>
      )
    }
  ];

  if (loading && orders.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Management</h1>
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Management</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading orders</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search orders..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment</label>
            <select
              value={paymentStatusFilter}
              onChange={(e) => handlePaymentStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Payment Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
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

      {/* Orders Table */}
      <AdminTable
        data={orders}
        columns={columns}
        loading={loading}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        emptyMessage="No orders found"
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

      {/* Order Details Modal */}
      <AdminModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title={`Order Details - ${selectedOrder?.orderNumber}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900">Order Information</h4>
                <dl className="mt-2 space-y-1">
                  <div>
                    <dt className="text-sm text-gray-500">Order Number</dt>
                    <dd className="text-sm font-medium">{selectedOrder.orderNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Status</dt>
                    <dd><StatusBadge status={selectedOrder.status} type="order" /></dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Payment Status</dt>
                    <dd><StatusBadge status={selectedOrder.paymentStatus} type="payment" /></dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Total Amount</dt>
                    <dd className="text-sm font-medium">{formatCurrency(selectedOrder.totalAmount)}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Customer Information</h4>
                <dl className="mt-2 space-y-1">
                  <div>
                    <dt className="text-sm text-gray-500">Name</dt>
                    <dd className="text-sm font-medium">{selectedOrder.customerName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Email</dt>
                    <dd className="text-sm">{selectedOrder.customerEmail}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCT</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QUANTITY</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIT PRICE</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                            <div className="text-sm text-gray-500">{item.variantName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(item.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-4">
              {/* Order Status Actions */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Status</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                  >
                    Close
                  </button>
                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'confirmed')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      Confirm Order
                    </button>
                  )}
                  {selectedOrder.status === 'confirmed' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    >
                      Mark as Shipped
                    </button>
                  )}
                  {selectedOrder.status === 'shipped' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered')}
                      className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  {(selectedOrder.status === 'pending' || selectedOrder.status === 'confirmed') && (
                    <button
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Payment Status Actions */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Payment Status</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedOrder.paymentStatus === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdatePaymentStatus(selectedOrder.id, 'paid')}
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                      >
                        Mark as Paid
                      </button>
                      <button
                        onClick={() => handleUpdatePaymentStatus(selectedOrder.id, 'failed')}
                        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                      >
                        Mark as Failed
                      </button>
                    </>
                  )}
                  {selectedOrder.paymentStatus === 'failed' && (
                    <button
                      onClick={() => handleUpdatePaymentStatus(selectedOrder.id, 'paid')}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    >
                      Mark as Paid
                    </button>
                  )}
                  {selectedOrder.paymentStatus === 'paid' && (
                    <button
                      onClick={() => handleUpdatePaymentStatus(selectedOrder.id, 'failed')}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                    >
                      Mark as Failed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
