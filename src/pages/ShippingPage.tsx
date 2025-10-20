/**
 * Shipping Information Page
 * 
 * Detailed shipping policies, delivery times, and costs.
 */

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shipping Information
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about our shipping options and delivery times
          </p>
        </div>

        {/* Shipping Options */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard Shipping</h3>
              <p className="text-gray-600 mb-2">5-7 business days</p>
              <p className="text-2xl font-bold text-gray-900">$5.99</p>
              <p className="text-sm text-gray-500">Free on orders over $75</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Express Shipping</h3>
              <p className="text-gray-600 mb-2">2-3 business days</p>
              <p className="text-2xl font-bold text-gray-900">$12.99</p>
              <p className="text-sm text-gray-500">Fast delivery</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Overnight Shipping</h3>
              <p className="text-gray-600 mb-2">Next business day</p>
              <p className="text-2xl font-bold text-gray-900">$24.99</p>
              <p className="text-sm text-gray-500">Order by 2 PM</p>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing Time</h3>
              <p className="text-gray-600">
                Most orders are processed within 1-2 business days. During peak seasons, processing may take 2-3 business days.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Areas</h3>
              <p className="text-gray-600 mb-3">
                We currently ship to all 50 US states and Washington D.C. International shipping is available to select countries.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>United States: Free standard shipping on orders over $75</li>
                <li>Canada: Starting at $15.99</li>
                <li>International: Starting at $25.99 (customs fees may apply)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Package Tracking</h3>
              <p className="text-gray-600">
                Once your order ships, you'll receive a confirmation email with tracking information. You can track your package anytime on our website or through the carrier's website.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Notifications</h3>
              <p className="text-gray-600">
                We'll send you email and SMS notifications (if opted in) about your delivery status, including when your package is out for delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Special Shipping */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Special Shipping Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Large Items</h3>
              <p className="text-gray-600">
                Furniture and large appliances require special delivery. We'll contact you to schedule a convenient delivery time.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Gift Wrapping</h3>
              <p className="text-gray-600">
                Professional gift wrapping available for $4.99. Perfect for special occasions and holidays.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">White Glove Service</h3>
              <p className="text-gray-600">
                Premium delivery service includes unpacking, setup, and packaging removal. Available for select items.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Store Pickup</h3>
              <p className="text-gray-600">
                Order online and pick up at select locations. Free and ready in 2-4 hours for most items.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}