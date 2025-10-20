/**
 * Checkout Page Component
 * 
 * Checkout page with payment options and delivery mode selection.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../contexts/NotificationContext';
import { formatCurrency } from '../utils/formatCurrency';
import deliveryService, { DeliveryEstimate } from '../services/delivery';
import apiService from '../services/api';

export default function CheckoutPage() {
  const { items, totalItems, totalAmount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    // Customer Info
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    
    // Address
    address: {
      street: '',
      city: 'Austin',
      state: 'TX',
      zipCode: '',
      country: 'USA',
    },
    
    // Delivery
    deliveryMode: 'standard' as 'standard' | 'pickup',
    
    // Payment
    paymentMethod: 'card' as 'card' | 'cod',
    
    // Order Notes
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deliveryEstimate, setDeliveryEstimate] = useState<DeliveryEstimate | null>(null);
  const [estimateLoading, setEstimateLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      showNotification('Please log in to checkout', 'warning');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      showNotification('Your cart is empty', 'warning');
      navigate('/cart');
      return;
    }

    // Get initial delivery estimate
    if (formData.address.city && items.length > 0) {
      updateDeliveryEstimate();
    }
  }, [isAuthenticated, items.length, navigate, showNotification, formData.address.city]);

  const updateDeliveryEstimate = async () => {
    if (!formData.address.city || items.length === 0) return;

    setEstimateLoading(true);
    try {
      const estimate = await deliveryService.getDeliveryEstimate({
        items: items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        })),
        shippingAddress: {
          city: formData.address.city,
          state: formData.address.state,
          zipCode: formData.address.zipCode
        }
      });
      setDeliveryEstimate(estimate);
    } catch (error) {
      console.error('Failed to get delivery estimate:', error);
      // Fallback to basic estimate
      const basicDays = deliveryService.getBasicEstimate(formData.address.city, true);
      setDeliveryEstimate({
        estimatedDeliveryDays: basicDays,
        estimatedDeliveryDate: new Date(Date.now() + basicDays * 24 * 60 * 60 * 1000).toISOString(),
        allItemsInStock: true,
        isMainCity: deliveryService.isMainCity(formData.address.city),
        deliveryNote: `Estimated ${basicDays} business days`,
        outOfStockItems: []
      });
    } finally {
      setEstimateLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }

    // Update delivery estimate when city changes
    if (field === 'address.city') {
      setTimeout(updateDeliveryEstimate, 500); // Debounce API calls
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.street.trim()) newErrors['address.street'] = 'Street address is required';
    if (!formData.address.zipCode.trim()) newErrors['address.zipCode'] = 'ZIP code is required';

    if (formData.paymentMethod === 'card' && !isAuthenticated) {
      newErrors.paymentMethod = 'Please log in to use card payment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please fix the errors below', 'error');
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        })),
        shippingAddress: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zipCode: formData.address.zipCode
        },
        paymentMethod: formData.paymentMethod,
        deliveryMode: (formData.deliveryMode === 'standard' ? 'standard' : 'store_pickup') as 'standard' | 'store_pickup'
      };

      // Create order via API
      const response = await apiService.createOrder(orderData);

      // Show warnings if there were backorders
      if (response.warnings && response.warnings.type === 'BACKORDER_ITEMS') {
        showNotification(
          `Order placed successfully! Note: ${response.warnings.message}`,
          'warning',
          10000 // Show for 10 seconds
        );
      } else {
        showNotification(`Order #${response.order.orderNumber} placed successfully!`, 'success');
      }

      // Clear cart and redirect
      clearCart();
      navigate('/orders');
    } catch (error: any) {
      console.error('Order placement failed:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to place order. Please try again.';
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = totalAmount;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isAuthenticated || items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your order in just a few steps
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`input ${errors.name ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`input ${errors.email ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`input ${errors.phone ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Address</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                    className={`input ${errors['address.street'] ? 'border-red-500' : ''}`}
                    placeholder="123 Main St"
                    required
                  />
                  {errors['address.street'] && <p className="text-red-500 text-sm mt-1">{errors['address.street']}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => handleInputChange('address.state', e.target.value)}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={formData.address.zipCode}
                      onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                      className={`input ${errors['address.zipCode'] ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors['address.zipCode'] && <p className="text-red-500 text-sm mt-1">{errors['address.zipCode']}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Mode */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Options</h2>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMode"
                    value="standard"
                    checked={formData.deliveryMode === 'standard'}
                    onChange={(e) => handleInputChange('deliveryMode', e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Standard Delivery</div>
                    <div className="text-sm text-gray-500">
                      {estimateLoading ? (
                        <span className="inline-flex items-center">
                          <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Calculating...
                        </span>
                      ) : deliveryEstimate ? (
                        <>
                          {deliveryEstimate.deliveryNote} • {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                          {deliveryEstimate.outOfStockItems.length > 0 && (
                            <div className="text-orange-600 text-xs mt-1">
                              ⚠️ Some items are backordered (+3 days)
                            </div>
                          )}
                        </>
                      ) : (
                        `Estimated delivery • ${shipping === 0 ? 'Free' : formatCurrency(shipping)}`
                      )}
                    </div>
                  </div>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMode"
                    value="pickup"
                    checked={formData.deliveryMode === 'pickup'}
                    onChange={(e) => handleInputChange('deliveryMode', e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Store Pickup</div>
                    <div className="text-sm text-gray-500">
                      Ready in 1-2 hours • Free
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Credit/Debit Card</div>
                    <div className="text-sm text-gray-500">Pay securely with Stripe</div>
                  </div>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Cash on Delivery (COD)</div>
                    <div className="text-sm text-gray-500">Pay when your order arrives</div>
                  </div>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    Card payment will be processed securely through Stripe. 
                    You'll be redirected to complete the payment.
                  </p>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Notes (Optional)</h2>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="input"
                placeholder="Any special instructions for your order..."
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.variantId} className="flex items-center space-x-3">
                    <img
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-500">{item.variantName}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">{formatCurrency(tax)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-base font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Place Order - ${formatCurrency(total)}`
                )}
              </button>

              {/* Security Info */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure checkout protected by SSL
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
