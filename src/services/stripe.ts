/**
 * Stripe Service
 * 
 * Service for Stripe payment operations using Stripe Checkout.
 * Handles payment session creation and redirects to Stripe Checkout.
 */

import { loadStripe } from '@stripe/stripe-js';
import apiService from './api';

class StripeService {
  private stripePromise: Promise<any>;
  private stripePublicKey: string | undefined;

  constructor() {
    // Get the Stripe public key from environment variables
    this.stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    
    if (!this.stripePublicKey) {
      console.warn('VITE_STRIPE_PUBLISHABLE_KEY not configured');
      throw new Error('Stripe configuration missing');
    }

    // Initialize Stripe
    this.stripePromise = loadStripe(this.stripePublicKey);
  }

  /**
   * Create a checkout session for card payment and redirect to Stripe
   */
  async createCheckoutSession(
    items: Array<{
      variantId: number;
      quantity: number;
    }>,
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    },
    deliveryMode: 'standard' | 'store_pickup'
  ): Promise<{
    sessionId: string;
    url: string;
  }> {
    try {
      // Call backend to create Stripe checkout session
      const response = await apiService.createStripeCheckoutSession({
        items,
        shippingAddress,
        deliveryMode
      });

      return {
        sessionId: response.sessionId,
        url: response.url
      };
    } catch (error: any) {
      console.error('Failed to create checkout session:', error);
      throw new Error(error.response?.data?.error || error.message || 'Failed to create payment session');
    }
  }

  /**
   * Redirect to Stripe Checkout
   */
  async redirectToCheckout(sessionId: string): Promise<void> {
    // Note: stripe.redirectToCheckout is deprecated
    // We don't need to use it anymore since the backend returns the checkout URL
    // This method is kept for backward compatibility but shouldn't be used
    throw new Error('Use the checkout URL returned from createCheckoutSession instead');
  }

  /**
   * Create checkout session and immediately redirect to Stripe
   * This is the main method that combines session creation and redirect
   */
  async processCardPayment(
    items: Array<{
      variantId: number;
      quantity: number;
    }>,
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    },
    deliveryMode: 'standard' | 'store_pickup'
  ): Promise<void> {
    try {
      // Create checkout session
      const { url } = await this.createCheckoutSession(
        items,
        shippingAddress,
        deliveryMode
      );

      // Redirect to Stripe Checkout using the URL (modern approach)
      window.location.href = url;
    } catch (error: any) {
      console.error('Failed to process card payment:', error);
      throw error;
    }
  }

  /**
   * Get checkout session details
   */
  async getSessionDetails(sessionId: string): Promise<{
    id: string;
    payment_status: string;
    payment_intent: string;
    amount_total: number;
    currency: string;
  }> {
    try {
      const response = await apiService.getStripeSessionDetails(sessionId);
      return response;
    } catch (error: any) {
      console.error('Failed to get session details:', error);
      throw new Error(error.response?.data?.error || error.message || 'Failed to retrieve payment session');
    }
  }

  /**
   * Check if Stripe is configured
   */
  isConfigured(): boolean {
    return !!this.stripePublicKey;
  }

  /**
   * Get configuration status
   */
  getStatus(): { configured: boolean; message: string } {
    if (this.stripePublicKey) {
      return {
        configured: true,
        message: 'Stripe is configured and ready for payments',
      };
    }
    
    return {
      configured: false,
      message: 'Stripe public key not configured. Set VITE_STRIPE_PUBLISHABLE_KEY environment variable.',
    };
  }
}

const stripeService = new StripeService();
export default stripeService;