/**
 * TypeScript type definitions for BrightBuy frontend
 */

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, any>;
  isActive: boolean;
  originalPrice?: number;
  discount?: number;
}

export interface ProductImage {
  id: number;
  imagePath: string;
  altText: string;
  displayOrder: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  sku: string;
  basePrice: number;
  categoryId: number;
  categoryName: string;
  variants: ProductVariant[];
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  variantId: number;
  productId: number;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  image?: string;
  stock: number;
}

export interface WishlistItem {
  wishlistId: number;
  addedAt: string;
  product: Product;
}

export interface WishlistState {
  items: WishlistItem[];
  count: number;
  isLoading: boolean;
}

export interface OrderItem {
  id: number;
  productVariantId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variantName: string;
  productName: string;
  productSku: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: 'card' | 'cod';
  deliveryMode: 'standard' | 'store_pickup';
  shippingAddress: Address;
  totalAmount: number;
  estimatedDelivery: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface ProductFilters {
  category?: number;
  search?: string;
  sort?: 'name' | 'price' | 'created_at';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface OrderFilters {
  status?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
}

export interface ReportFilters {
  year?: number;
  quarter?: number;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}

export interface DeliveryEstimate {
  orderId: number;
  orderNumber: string;
  status: string;
  deliveryMode: string;
  estimatedDelivery: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: Address;
  deliveryStatus: 'overdue' | 'due_soon' | 'on_time';
  daysUntilDelivery: number;
}

export interface StockUpdate {
  variantId: number;
  stock: number;
  reason?: string;
}

export interface BulkStockUpdate {
  updates: StockUpdate[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

// Admin-specific types
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: AdminOrder[];
  lowStockAlerts: Array<{
    id: number;
    name: string;
    sku: string;
    categoryName: string;
    totalStock: number;
    stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  }>;
}

export interface AdminOrder extends Order {
  customerName: string;
  customerEmail: string;
  itemCount: number;
  shippedAt?: string;
}

export interface AdminCustomer extends User {
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  recentOrders?: AdminOrder[];
}


export interface ProductFormData {
  name: string;
  description: string;
  sku: string;
  categoryId: number;
  basePrice: number;
  variants: Array<{
    name: string;
    sku: string;
    price: number;
    stock: number;
    attributes: Record<string, any>;
  }>;
  images: Array<{
    imagePath: string;
    altText: string;
  }>;
}

export interface AdminOrderFilters {
  status?: string;
  paymentStatus?: string;
  customerId?: number;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface AdminCustomerFilters {
  search?: string;
  page?: number;
  limit?: number;
}
