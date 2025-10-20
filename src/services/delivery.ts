/**
 * Delivery Estimation Service
 * 
 * Service for calculating delivery estimates and checking stock status
 */

import apiService from './api';

export interface DeliveryEstimate {
  estimatedDeliveryDays: number;
  estimatedDeliveryDate: string;
  allItemsInStock: boolean;
  isMainCity: boolean;
  deliveryNote: string;
  outOfStockItems: Array<{
    variantId: number;
    requested: number;
    available: number;
    backorder: number;
  }>;
}

export interface DeliveryEstimateRequest {
  items: Array<{
    variantId: number;
    quantity: number;
  }>;
  shippingAddress: {
    city: string;
    state?: string;
    zipCode?: string;
  };
}

class DeliveryService {
  /**
   * Get delivery estimate for cart items
   */
  async getDeliveryEstimate(request: DeliveryEstimateRequest): Promise<DeliveryEstimate> {
    try {
      const response = await apiService.getDeliveryEstimate(request);
      return response.deliveryEstimate;
    } catch (error: any) {
      console.error('Failed to get delivery estimate:', error);
      throw new Error(error.response?.data?.error || 'Failed to calculate delivery estimate');
    }
  }

  /**
   * Check if a city is a main Texas city
   */
  isMainCity(city: string): boolean {
    const mainCities = [
      'Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth',
      'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Lubbock',
      'Laredo', 'Garland', 'Irving', 'Amarillo', 'Grand Prairie',
      'Brownsville', 'Pasadena', 'Mesquite', 'McKinney', 'Killeen',
      'Frisco', 'McAllen', 'Carrollton', 'Denton', 'Midland',
      'Abilene', 'Beaumont', 'Round Rock', 'Odessa', 'Waco',
      'Richardson', 'Lewisville', 'Sugar Land', 'College Station',
      'Pearland', 'Tyler', 'Allen', 'League City'
    ];
    
    return mainCities.some(mainCity => 
      city.toLowerCase().includes(mainCity.toLowerCase())
    );
  }

  /**
   * Get basic delivery estimate without API call (for quick display)
   */
  getBasicEstimate(city: string, allInStock: boolean = true): number {
    const isMain = this.isMainCity(city);
    let days = isMain ? 5 : 7;
    
    if (!allInStock) {
      days += 3;
    }
    
    return days;
  }

  /**
   * Format delivery time description
   */
  getDeliveryDescription(days: number, isMainCity: boolean, hasBackorders: boolean): string {
    const cityType = isMainCity ? 'main city' : 'other location';
    const backorderNote = hasBackorders ? ' (includes 3 extra days for backordered items)' : '';
    
    return `${days} business days to ${cityType}${backorderNote}`;
  }

  /**
   * Get estimated delivery date
   */
  getEstimatedDeliveryDate(days: number): Date {
    const now = new Date();
    const deliveryDate = new Date(now);
    
    // Add business days (skip weekends)
    let businessDaysAdded = 0;
    while (businessDaysAdded < days) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      const dayOfWeek = deliveryDate.getDay();
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDaysAdded++;
      }
    }
    
    return deliveryDate;
  }
}

export default new DeliveryService();