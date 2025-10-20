/**
 * Track Order Page
 * 
 * Order tracking functionality with status updates.
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import { formatDate } from '../utils/validators';
import apiService from '../services/api';
import { Order } from '../types';

// Helper function to get progress percentage based on order status
const getOrderProgress = (status: string): number => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 20;
    case 'confirmed':
      return 40;
    case 'shipped':
      return 80;
    case 'delivered':
      return 100;
    case 'cancelled':
      return 0;
    default:
      return 0;
  }
};

export default function TrackOrderPage() {
  const { showNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const [trackingInput, setTrackingInput] = useState('');
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  // Read order number from URL parameters
  useEffect(() => {
    const orderNumber = searchParams.get('order');
    if (orderNumber) {
      setTrackingInput(orderNumber);
      // Auto-track the order if order number is provided
      handleAutoTrack(orderNumber);
    }
  }, [searchParams]);

  const handleAutoTrack = async (orderNumber: string) => {
    setLoading(true);
    try {
      const response = await apiService.trackOrder(orderNumber);
      setOrderData(response.order);
      showNotification('Order found successfully!', 'success');
    } catch (error) {
      setOrderData(null);
      showNotification('Order not found. Please check your order number and try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) {
      showNotification('Please enter an order number or tracking number', 'error');
      return;
    }

    setLoading(true);
    
    try {
      const response = await apiService.trackOrder(trackingInput);
      setOrderData(response.order);
      showNotification('Order found successfully!', 'success');
    } catch (error) {
      setOrderData(null);
      showNotification('Order not found. Please check your order number and try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-xl text-gray-600">
            Enter your order number or tracking number to get real-time updates
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="tracking-input" className="block text-sm font-medium text-gray-700 mb-2">
                Order Number or Tracking Number
              </label>
              <input
                id="tracking-input"
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="e.g., BB-2024-001234 or 1Z999AA1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking...
                </>
              ) : (
                'Track Order'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Try: <button onClick={() => setTrackingInput('BB-2024-001234')} className="text-blue-600 hover:underline">BB-2024-001234</button> or <button onClick={() => setTrackingInput('1Z999AA1234567890')} className="text-blue-600 hover:underline">1Z999AA1234567890</button>
            </p>
          </div>
        </div>

        {/* Order Details */}
        {orderData && (
          <>
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Order #{orderData.orderNumber}</h2>
                  <p className="text-gray-600">Status: {orderData.status}</p>
                  <p className="text-gray-600">Payment: {orderData.paymentMethod}</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {orderData.status}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Est. Delivery: {formatDate(orderData.estimatedDelivery)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Order Progress</span>
                  <span>{getOrderProgress(orderData.status)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getOrderProgress(orderData.status)}%` }}
                  ></div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Items in this order</h3>
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">IMG</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-600">{item.variantName}</p>
                        <p className="text-sm text-gray-600">SKU: {item.productSku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-600">${Number(item.totalPrice).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-900">Order Status</span>
                  <span className="text-sm text-gray-600 capitalize">{orderData.status}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-900">Payment Status</span>
                  <span className="text-sm text-gray-600 capitalize">{orderData.paymentStatus}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-900">Payment Method</span>
                  <span className="text-sm text-gray-600 capitalize">{orderData.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-900">Delivery Mode</span>
                  <span className="text-sm text-gray-600 capitalize">{orderData.deliveryMode}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-900">Total Amount</span>
                  <span className="text-sm text-gray-600">${Number(orderData.totalAmount).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-900">Order Date</span>
                  <span className="text-sm text-gray-600">{formatDate(orderData.createdAt)}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Can't find your order or have questions about delivery?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact Support
            </a>
            <a
              href="/shipping"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Shipping Info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}