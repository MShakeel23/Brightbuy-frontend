/**
 * Payment Cancel Page Component
 * 
 * Displayed when user cancels Stripe payment or payment fails.
 * Provides options to try again or continue shopping.
 */

import { useNavigate } from 'react-router-dom';

export default function PaymentCancelPage() {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            {/* Cancel Icon */}
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            {/* Title and Description */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
            <p className="text-gray-600 mb-8">
              Your payment was cancelled or could not be processed. 
              Don't worry - no charges have been made to your card.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleTryAgain}
                className="w-full btn btn-primary"
              >
                Try Payment Again
              </button>
              
              <button
                onClick={handleViewCart}
                className="w-full btn btn-secondary"
              >
                Review Cart
              </button>
              
              <button
                onClick={handleContinueShopping}
                className="w-full btn btn-outline"
              >
                Continue Shopping
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                Having trouble with payment?
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Try using a different payment method</p>
                <p>• Check your card details are correct</p>
                <p>• Use Cash on Delivery as an alternative</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">
              <h4 className="font-medium text-blue-900 mb-1">Payment Options</h4>
              <p className="text-blue-700">
                You can still complete your order using Cash on Delivery (COD) 
                if card payment continues to have issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}