/**
 * Admin Customers Component
 * 
 * Customer management page for admins.
 */

import { useState, useEffect } from 'react';
import { AdminCustomer, Pagination } from '../../types';
import { apiService } from '../../services/api';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import SearchBar from '../../components/admin/SearchBar';
import PaginationComponent from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<AdminCustomer | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
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
  }, [search, pagination.page, sortKey, sortDirection]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getAdminCustomers({
        search: search || undefined,
        page: pagination.page,
        limit: pagination.limit
      });

      setCustomers(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Failed to load customers:', err);
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleViewCustomer = async (customerId: number) => {
    try {
      const response = await apiService.getAdminCustomer(customerId);
      setSelectedCustomer(response.customer);
      setShowCustomerModal(true);
    } catch (err) {
      console.error('Failed to load customer details:', err);
      alert('Failed to load customer details');
    }
  };

  const handleEditCustomer = (customer: AdminCustomer) => {
    setEditingCustomer(customer);
    setEditFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address || {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    });
    setEditErrors({});
    setShowEditModal(true);
  };

  const handleDeleteCustomer = async (customerId: number) => {
    if (!window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      return;
    }

    try {
      await apiService.deleteCustomer(customerId);
      await loadData(); // Reload data
      alert('Customer deleted successfully');
    } catch (err: any) {
      console.error('Failed to delete customer:', err);
      const errorMessage = err.response?.data?.error || 'Failed to delete customer';
      alert(errorMessage);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setEditFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (editErrors[name]) {
      setEditErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEditForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editFormData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!editFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEditForm()) {
      return;
    }

    if (!editingCustomer) return;

    try {
      await apiService.updateCustomer(editingCustomer.id, {
        name: editFormData.name.trim(),
        email: editFormData.email.trim(),
        phone: editFormData.phone.trim() || undefined,
        address: editFormData.address.street.trim() ? editFormData.address : undefined
      });

      setShowEditModal(false);
      setEditingCustomer(null);
      await loadData(); // Reload data
      alert('Customer updated successfully');
    } catch (err: any) {
      console.error('Failed to update customer:', err);
      const errorMessage = err.response?.data?.error || 'Failed to update customer';
      alert(errorMessage);
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
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (name: string, customer: AdminCustomer) => (
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{customer.email}</div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (phone: string) => phone || 'N/A'
    },
    {
      key: 'totalOrders',
      label: 'Orders',
      sortable: true,
      render: (count: number) => `${count} order${count !== 1 ? 's' : ''}`
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      sortable: true,
      render: (amount: number) => formatCurrency(amount)
    },
    {
      key: 'createdAt',
      label: 'Join Date',
      sortable: true,
      render: (date: string) => formatDate(date)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, customer: AdminCustomer) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewCustomer(customer.id)}
            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
          >
            View
          </button>
          <button
            onClick={() => handleEditCustomer(customer)}
            className="text-green-600 hover:text-green-900 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteCustomer(customer.id)}
            className="text-red-600 hover:text-red-900 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  if (loading && customers.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Management</h1>
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Management</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading customers</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search customers..."
            />
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

      {/* Customers Table */}
      <AdminTable
        data={customers}
        columns={columns}
        loading={loading}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        emptyMessage="No customers found"
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

      {/* Customer Details Modal */}
      <AdminModal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        title={`Customer Details - ${selectedCustomer?.name}`}
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Name</dt>
                    <dd className="text-sm font-medium">{selectedCustomer.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Email</dt>
                    <dd className="text-sm">{selectedCustomer.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Phone</dt>
                    <dd className="text-sm">{selectedCustomer.phone || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Member Since</dt>
                    <dd className="text-sm">{formatDate(selectedCustomer.createdAt)}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Statistics</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Total Orders</dt>
                    <dd className="text-sm font-medium">{selectedCustomer.totalOrders}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Total Spent</dt>
                    <dd className="text-sm font-medium">{formatCurrency(selectedCustomer.totalSpent)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Average Order Value</dt>
                    <dd className="text-sm">
                      {selectedCustomer.totalOrders > 0 
                        ? formatCurrency(selectedCustomer.totalSpent / selectedCustomer.totalOrders)
                        : '$0.00'
                      }
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Last Order</dt>
                    <dd className="text-sm">
                      {selectedCustomer.lastOrderDate ? formatDate(selectedCustomer.lastOrderDate) : 'No orders'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Address */}
            {selectedCustomer.address && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Address</h4>
                <div className="text-sm text-gray-600">
                  <div>{selectedCustomer.address.street}</div>
                  <div>
                    {selectedCustomer.address.city}, {selectedCustomer.address.state} {selectedCustomer.address.zipCode}
                  </div>
                </div>
              </div>
            )}

            {/* Recent Orders */}
            {selectedCustomer.recentOrders && selectedCustomer.recentOrders.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recent Orders</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedCustomer.recentOrders.slice(0, 5).map((order, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.orderNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(order.totalAmount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(order.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowCustomerModal(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Edit Customer Modal */}
      <AdminModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit Customer - ${editingCustomer?.name}`}
        size="lg"
      >
        {editingCustomer && (
          <form onSubmit={handleUpdateCustomer} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  editErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Full name"
              />
              {editErrors.name && <p className="text-red-500 text-sm mt-1">{editErrors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  editErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Email address"
              />
              {editErrors.email && <p className="text-red-500 text-sm mt-1">{editErrors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Phone number"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div className="space-y-2">
                <input
                  type="text"
                  name="address.street"
                  value={editFormData.address.street}
                  onChange={handleEditInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Street address"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="address.city"
                    value={editFormData.address.city}
                    onChange={handleEditInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="address.state"
                    value={editFormData.address.state}
                    onChange={handleEditInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="State"
                  />
                </div>
                <input
                  type="text"
                  name="address.zipCode"
                  value={editFormData.address.zipCode}
                  onChange={handleEditInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="ZIP code"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Update Customer
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
