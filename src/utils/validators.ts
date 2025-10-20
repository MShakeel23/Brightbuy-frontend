/**
 * Validation Utilities
 * 
 * Functions for form validation, data validation, and business logic validation.
 */

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation regex (US format)
 */
const PHONE_REGEX = /^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;

/**
 * ZIP code validation regex (US format)
 */
const ZIP_REGEX = /^\d{5}(-\d{4})?$/;

/**
 * Validate email address
 * @param email - Email to validate
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validate phone number (US format)
 * @param phone - Phone number to validate
 * @returns True if valid phone number
 */
export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone);
}

/**
 * Validate ZIP code (US format)
 * @param zipCode - ZIP code to validate
 * @returns True if valid ZIP code
 */
export function isValidZipCode(zipCode: string): boolean {
  return ZIP_REGEX.test(zipCode);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Validation result with details
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
  strength: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    specialChars: boolean;
  };
} {
  const errors: string[] = [];
  const strength = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  if (!strength.length) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!strength.lowercase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!strength.uppercase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!strength.numbers) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Validate required field
 * @param value - Value to validate
 * @param fieldName - Name of the field for error message
 * @returns Validation result
 */
export function validateRequired(value: any, fieldName: string): {
  isValid: boolean;
  error?: string;
} {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }
  return { isValid: true };
}

/**
 * Validate string length
 * @param value - Value to validate
 * @param minLength - Minimum length
 * @param maxLength - Maximum length
 * @param fieldName - Name of the field for error message
 * @returns Validation result
 */
export function validateLength(
  value: string,
  minLength: number,
  maxLength: number,
  fieldName: string
): {
  isValid: boolean;
  error?: string;
} {
  if (value.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters long`,
    };
  }
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must be no more than ${maxLength} characters long`,
    };
  }
  return { isValid: true };
}

/**
 * Validate number range
 * @param value - Value to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @param fieldName - Name of the field for error message
 * @returns Validation result
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName: string
): {
  isValid: boolean;
  error?: string;
} {
  if (value < min) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${min}`,
    };
  }
  if (value > max) {
    return {
      isValid: false,
      error: `${fieldName} must be no more than ${max}`,
    };
  }
  return { isValid: true };
}

/**
 * Validate address object
 * @param address - Address to validate
 * @returns Validation result
 */
export function validateAddress(address: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!address.street || address.street.trim() === '') {
    errors.push('Street address is required');
  }

  if (!address.city || address.city.trim() === '') {
    errors.push('City is required');
  }

  if (!address.state || address.state.trim() === '') {
    errors.push('State is required');
  }

  if (!address.zipCode || address.zipCode.trim() === '') {
    errors.push('ZIP code is required');
  } else if (!isValidZipCode(address.zipCode)) {
    errors.push('ZIP code must be in valid format (12345 or 12345-6789)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate delivery time based on city type and stock availability
 * @param city - City name
 * @param isInStock - Whether the product is in stock
 * @returns Delivery time in days
 */
export function calculateDeliveryTime(city: string, isInStock: boolean): number {
  // Texas main cities (Austin, Houston, Dallas, San Antonio)
  const mainCities = ['austin', 'houston', 'dallas', 'san antonio'];
  const isMainCity = mainCities.includes(city.toLowerCase());
  
  if (isMainCity) {
    return isInStock ? 5 : 8; // 5 days if in stock, 8 days if out of stock
  } else {
    return isInStock ? 7 : 10; // 7 days if in stock, 10 days if out of stock
  }
}

/**
 * Get delivery time description
 * @param days - Number of days
 * @returns Human-readable delivery time description
 */
export function getDeliveryTimeDescription(days: number): string {
  if (days === 1) {
    return '1 day';
  } else if (days <= 3) {
    return `${days} days`;
  } else if (days <= 7) {
    return `${days} days`;
  } else {
    return `${days} days`;
  }
}

/**
 * Safely format a date string
 * @param dateString - Date string to format
 * @returns Formatted date string or fallback text
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return 'Not available';
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return date.toLocaleDateString();
  } catch (error) {
    return 'Invalid date';
  }
}

/**
 * Safely format a date string with time
 * @param dateString - Date string to format
 * @returns Formatted date and time string or fallback text
 */
export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) {
    return 'Not available';
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return date.toLocaleString();
  } catch (error) {
    return 'Invalid date';
  }
}

/**
export function isValidPaymentMethod(method: string): boolean {
  return ['card', 'cod'].includes(method);
}

/**
 * Validate delivery mode
 * @param mode - Delivery mode to validate
 * @returns True if valid delivery mode
 */
export function isValidDeliveryMode(mode: string): boolean {
  return ['standard', 'store_pickup'].includes(mode);
}

/**
 * Validate order status
 * @param status - Order status to validate
 * @returns True if valid order status
 */
export function isValidOrderStatus(status: string): boolean {
  return ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].includes(status);
}

/**
 * Validate payment status
 * @param status - Payment status to validate
 * @returns True if valid payment status
 */
export function isValidPaymentStatus(status: string): boolean {
  return ['pending', 'paid', 'failed'].includes(status);
}

/**
 * Sanitize string input
 * @param input - Input string to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .substring(0, 1000); // Limit length
}

/**
 * Validate SKU format
 * @param sku - SKU to validate
 * @returns True if valid SKU format
 */
export function isValidSKU(sku: string): boolean {
  // SKU should be 3-100 characters, uppercase letters, numbers, and hyphens only
  const skuRegex = /^[A-Z0-9-]{3,100}$/;
  return skuRegex.test(sku);
}

/**
 * Validate quantity
 * @param quantity - Quantity to validate
 * @param maxStock - Maximum available stock
 * @returns Validation result
 */
export function validateQuantity(quantity: number, maxStock: number = 10): {
  isValid: boolean;
  error?: string;
} {
  if (!Number.isInteger(quantity) || quantity < 1) {
    return {
      isValid: false,
      error: 'Quantity must be a positive integer',
    };
  }
  
  if (quantity > maxStock) {
    return {
      isValid: false,
      error: `Quantity cannot exceed ${maxStock} items`,
    };
  }
  
  return { isValid: true };
}

/**
 * Validate date range
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Validation result
 */
export function validateDateRange(startDate: string, endDate: string): {
  isValid: boolean;
  error?: string;
} {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime())) {
    return {
      isValid: false,
      error: 'Invalid start date',
    };
  }
  
  if (isNaN(end.getTime())) {
    return {
      isValid: false,
      error: 'Invalid end date',
    };
  }
  
  if (start > end) {
    return {
      isValid: false,
      error: 'Start date must be before end date',
    };
  }
  
  return { isValid: true };
}

/**
 * Validate file type
 * @param file - File to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns Validation result
 */
export function validateFileType(file: File, allowedTypes: string[]): {
  isValid: boolean;
  error?: string;
} {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type must be one of: ${allowedTypes.join(', ')}`,
    };
  }
  
  return { isValid: true };
}

/**
 * Validate file size
 * @param file - File to validate
 * @param maxSizeMB - Maximum size in MB
 * @returns Validation result
 */
export function validateFileSize(file: File, maxSizeMB: number = 5): {
  isValid: boolean;
  error?: string;
} {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }
  
  return { isValid: true };
}
