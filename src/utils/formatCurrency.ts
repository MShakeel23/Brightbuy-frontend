/**
 * Currency Formatting Utilities
 * 
 * Functions for formatting currency values and handling monetary calculations.
 */

/**
 * Format a number as currency
 * @param amount - The amount to format (number or string)
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | string,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(0);
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(numericAmount);
}

/**
 * Format a number as currency with custom options
 * @param amount - The amount to format (number or string)
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted currency string
 */
export function formatCurrencyWithOptions(
  amount: number | string,
  options: Intl.NumberFormatOptions = {}
): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) {
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(0);
  }
  
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(numericAmount);
}

/**
 * Format a number as compact currency (e.g., $1.2K, $1.5M)
 * @param amount - The amount to format (number or string)
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted compact currency string
 */
export function formatCompactCurrency(
  amount: number | string,
  currency: string = 'USD'
): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(0);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(numericAmount);
}

/**
 * Calculate percentage change between two values
 * @param oldValue - The original value
 * @param newValue - The new value
 * @returns Percentage change (positive or negative)
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Format percentage with sign and color class
 * @param percentage - The percentage value
 * @returns Object with formatted percentage and color class
 */
export function formatPercentage(percentage: number): {
  text: string;
  colorClass: string;
  isPositive: boolean;
} {
  const isPositive = percentage >= 0;
  const sign = isPositive ? '+' : '';
  const text = `${sign}${percentage.toFixed(1)}%`;
  
  let colorClass = 'text-gray-500';
  if (isPositive) {
    colorClass = 'text-green-600';
  } else if (percentage < 0) {
    colorClass = 'text-red-600';
  }

  return { text, colorClass, isPositive };
}

/**
 * Calculate tax amount
 * @param amount - The base amount
 * @param taxRate - The tax rate as a decimal (e.g., 0.08 for 8%)
 * @returns Tax amount
 */
export function calculateTax(amount: number, taxRate: number = 0.08): number {
  return Math.round(amount * taxRate * 100) / 100;
}

/**
 * Calculate total with tax
 * @param amount - The base amount
 * @param taxRate - The tax rate as a decimal (e.g., 0.08 for 8%)
 * @returns Total amount including tax
 */
export function calculateTotalWithTax(amount: number, taxRate: number = 0.08): number {
  return amount + calculateTax(amount, taxRate);
}

/**
 * Format a number with thousand separators
 * @param number - The number to format
 * @returns Formatted number string
 */
export function formatNumber(number: number): string {
  return new Intl.NumberFormat('en-US').format(number);
}

/**
 * Format a number as a percentage
 * @param value - The value to format (0-1 for decimal, 0-100 for percentage)
 * @param isDecimal - Whether the value is already a decimal (default: false)
 * @returns Formatted percentage string
 */
export function formatPercentageValue(value: number, isDecimal: boolean = false): string {
  const percentage = isDecimal ? value * 100 : value;
  return `${percentage.toFixed(1)}%`;
}

/**
 * Parse currency string to number
 * @param currencyString - The currency string to parse
 * @returns Parsed number or 0 if invalid
 */
export function parseCurrency(currencyString: string): number {
  // Remove currency symbols and parse
  const cleaned = currencyString.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validate if a string is a valid currency amount
 * @param value - The string to validate
 * @returns True if valid currency amount
 */
export function isValidCurrency(value: string): boolean {
  const currencyRegex = /^\$?[0-9]+(\.[0-9]{1,2})?$/;
  return currencyRegex.test(value);
}

/**
 * Round to nearest cent
 * @param amount - The amount to round
 * @returns Rounded amount
 */
export function roundToCent(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * Calculate discount amount
 * @param originalPrice - The original price
 * @param discountPercent - The discount percentage (0-100)
 * @returns Discount amount
 */
export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  return roundToCent(originalPrice * (discountPercent / 100));
}

/**
 * Calculate price after discount
 * @param originalPrice - The original price
 * @param discountPercent - The discount percentage (0-100)
 * @returns Price after discount
 */
export function calculateDiscountedPrice(originalPrice: number, discountPercent: number): number {
  return roundToCent(originalPrice - calculateDiscount(originalPrice, discountPercent));
}
