/**
 * API Service
 * 
 * Axios wrapper for making HTTP requests to the BrightBuy backend API.
 * Includes authentication interceptors and error handling.
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { User, Product, Category, Order, PaginatedResponse, AdminOrder, AdminCustomer, ProductFormData, AdminOrderFilters, AdminCustomerFilters, DashboardStats, WishlistItem } from '../types';

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
    this.loadToken();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid, clear auth state
          this.clearToken();
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
        return Promise.reject(error);
      }
    );
  }

  private loadToken() {
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Authentication endpoints
  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }): Promise<{ user: User; message: string }> {
    const response = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async login(email: string, password: string): Promise<{ accessToken: string; user: User }> {
    const response = await this.api.post('/auth/login', { email, password });
    this.setToken(response.data.accessToken);
    return response.data;
  }

  async logout(): Promise<{ message: string }> {
    const response = await this.api.post('/auth/logout');
    this.clearToken();
    return response.data;
  }

  async getCurrentUser(): Promise<{ user: User }> {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  async updateProfile(userData: {
    name: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }): Promise<{ user: User; message: string }> {
    const response = await this.api.put('/auth/profile', userData);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await this.api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  // Product endpoints
  async getProducts(filters?: {
    category?: number;
    search?: string;
    sort?: string;
    order?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Product>> {
    // Transform 'search' to 'q' for the backend API
    const params = filters ? {
      ...filters,
      q: filters.search,
      search: undefined
    } : {};
    
    const response = await this.api.get('/products', { params });
    return response.data;
  }

  async getAdminProducts(filters?: {
    category?: number;
    search?: string;
    sort?: string;
    order?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Product>> {
    // Transform 'search' to 'q' for the backend API
    const params = filters ? {
      ...filters,
      q: filters.search,
      search: undefined
    } : {};
    
    const response = await this.api.get('/admin/products', { params });
    return response.data;
  }

  async getProduct(id: number): Promise<{ product: Product }> {
    const response = await this.api.get(`/products/${id}`);
    return response.data;
  }

  async getCategories(): Promise<{ categories: Category[] }> {
    const response = await this.api.get('/products/categories');
    return response.data;
  }

  // Order endpoints
  async createOrder(orderData: {
    items: Array<{ variantId: number; quantity: number }>;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    paymentMethod: 'card' | 'cod';
    deliveryMode: 'standard' | 'store_pickup';
  }): Promise<{ order: Order; message: string; warnings?: { type: string; message: string; items: any[] } }> {
    const response = await this.api.post('/orders', orderData);
    return response.data;
  }

  async getOrders(filters?: {
    status?: string;
    paymentStatus?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Order>> {
    const response = await this.api.get('/orders', { params: filters });
    return response.data;
  }

  async getOrder(id: number): Promise<{ order: Order }> {
    const response = await this.api.get(`/orders/${id}`);
    return response.data;
  }

  async trackOrder(orderNumber: string): Promise<{ order: Order }> {
    const response = await this.api.get(`/orders/track/${orderNumber}`);
    return response.data;
  }

  async getCustomerOrders(customerId: number, page?: number, limit?: number): Promise<PaginatedResponse<Order>> {
    const response = await this.api.get(`/orders/customers/${customerId}/orders`, {
      params: { page, limit },
    });
    return response.data;
  }



  async updateOrderStatus(orderId: number, status: string, notes?: string): Promise<{ message: string }> {
    const response = await this.api.patch(`/admin/orders/${orderId}/status`, { status, notes });
    return response.data;
  }

  async updatePaymentStatus(orderId: number, paymentStatus: string, notes?: string): Promise<{ message: string }> {
    const response = await this.api.patch(`/admin/orders/${orderId}/payment-status`, { paymentStatus, notes });
    return response.data;
  }

  // Report endpoints
  async getQuarterlySalesReport(filters?: { year?: number; quarter?: number }): Promise<{
    report: {
      year: number;
      totalSales: number;
      totalOrders: number;
      averageOrderValue: number;
      quarterlyBreakdown: Array<{
        quarter: number;
        totalSales: number;
        totalOrders: number;
        monthlyBreakdown: Array<{
          month: string;
          sales: number;
          orders: number;
        }>;
      }>;
    };
  }> {
    const response = await this.api.get('/admin/reports/quarterly-sales', { params: filters });
    return response.data;
  }

  async getTopSellingProductsReport(filters?: {
    dateFrom?: string;
    dateTo?: string;
    limit?: number;
  }): Promise<{
    products: Array<{
      productId: number;
      productName: string;
      productSku: string;
      categoryName: string;
      variantId: number;
      variantName: string;
      variantSku: string;
      totalQuantitySold: number;
      totalOrders: number;
      totalRevenue: number;
      averagePrice: number;
    }>;
  }> {
    const response = await this.api.get('/admin/reports/top-selling-products', { params: filters });
    return response.data;
  }

  async getCategoryOrdersReport(filters?: {
    dateFrom?: string;
    dateTo?: string;
  }): Promise<{
    categories: Array<{
      categoryId: number;
      categoryName: string;
      totalOrders: number;
      totalItems: number;
      totalRevenue: number;
      averageOrderValue: number;
    }>;
  }> {
    const response = await this.api.get('/admin/reports/category-orders', { params: filters });
    return response.data;
  }

  async getDeliveryEstimatesReport(filters?: {
    status?: string;
  }): Promise<{
    orders: Array<{
      orderId: number;
      orderNumber: string;
      status: string;
      deliveryMode: string;
      estimatedDelivery: string;
      createdAt: string;
      customerName: string;
      customerEmail: string;
      shippingAddress: any;
      deliveryStatus: 'overdue' | 'due_soon' | 'on_time';
      daysUntilDelivery: number;
    }>;
    summary: {
      total: number;
      overdue: number;
      dueSoon: number;
      onTime: number;
    };
  }> {
    const response = await this.api.get('/admin/reports/delivery-estimates', { params: filters });
    return response.data;
  }

  async getCustomerSummaryReport(filters?: {
    dateFrom?: string;
    dateTo?: string;
    limit?: number;
  }): Promise<{
    customers: Array<{
      customerId: number;
      customerName: string;
      customerEmail: string;
      customerSince: string;
      totalOrders: number;
      totalSpent: number;
      averageOrderValue: number;
      lastOrderDate: string;
      orderStatusBreakdown: {
        pending: number;
        paid: number;
        failed: number;
      };
    }>;
  }> {
    const response = await this.api.get('/admin/reports/customer-summary', { params: filters });
    return response.data;
  }

  // Additional admin methods
  async getAdminOrders(filters?: AdminOrderFilters): Promise<PaginatedResponse<AdminOrder>> {
    const response = await this.api.get('/admin/orders', { params: filters });
    return response.data;
  }

  async getAdminOrder(id: number): Promise<{ order: AdminOrder }> {
    const response = await this.api.get(`/admin/orders/${id}`);
    return response.data;
  }

  async getAdminCustomers(filters?: AdminCustomerFilters): Promise<PaginatedResponse<AdminCustomer>> {
    const response = await this.api.get('/admin/customers', { params: filters });
    return response.data;
  }

  async getAdminCustomer(id: number): Promise<{ customer: AdminCustomer }> {
    const response = await this.api.get(`/admin/customers/${id}`);
    return response.data;
  }


  async createProduct(productData: ProductFormData): Promise<{ product: Product; message: string }> {
    const response = await this.api.post('/admin/products', productData);
    return response.data;
  }

  async updateProduct(id: number, productData: ProductFormData): Promise<{ product: Product; message: string }> {
    const response = await this.api.put(`/admin/products/${id}`, productData);
    return response.data;
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    const response = await this.api.delete(`/admin/products/${id}`);
    return response.data;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    // This would need to be implemented in the backend
    // For now, we'll aggregate data from existing endpoints
    const threshold = parseInt(localStorage.getItem('lowStockThreshold') || '10', 10);
    
    const [ordersResponse, customersResponse, productsResponse, lowStockResponse] = await Promise.all([
      this.api.get('/admin/orders', { params: { limit: 10 } }),
      this.api.get('/admin/customers', { params: { limit: 1 } }),
      this.api.get('/products', { params: { limit: 1 } }),
      this.getLowStockProducts(threshold)
    ]);

    const orders = ordersResponse.data.data || [];
    const lowStockProducts = lowStockResponse.products || [];

    // Calculate total revenue from paid orders
    const totalRevenue = orders
      .filter((order: AdminOrder) => order.paymentStatus === 'paid')
      .reduce((sum: number, order: AdminOrder) => sum + order.totalAmount, 0);

    return {
      totalRevenue,
      totalOrders: ordersResponse.data.pagination?.total || 0,
      totalCustomers: customersResponse.data.pagination?.total || 0,
      totalProducts: productsResponse.data.pagination?.total || 0,
      recentOrders: orders.slice(0, 10),
      lowStockAlerts: lowStockProducts.slice(0, 10).map((product: any) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        categoryName: product.categoryName,
        totalStock: product.totalStock,
        stockStatus: product.stockStatus
      }))
    };
  }

  async getLowStockProducts(threshold: number): Promise<{
    products: Array<{
      id: number;
      name: string;
      sku: string;
      basePrice: number;
      categoryName: string;
      totalStock: number;
      variantCount: number;
      stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
      createdAt: string;
      updatedAt: string;
    }>;
    threshold: number;
    count: number;
  }> {
    const response = await this.api.get('/admin/low-stock-products', { 
      params: { threshold } 
    });
    return response.data;
  }

  // Admin user management
  async getAdminUsers(filters?: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<AdminCustomer>> {
    const response = await this.api.get('/admin/users', { params: filters });
    return response.data;
  }

  async updateCustomer(id: number, customerData: {
    name: string;
    email: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }): Promise<{ customer: AdminCustomer; message: string }> {
    const response = await this.api.put(`/admin/customers/${id}`, customerData);
    return response.data;
  }

  async deleteCustomer(id: number): Promise<{ message: string }> {
    const response = await this.api.delete(`/admin/customers/${id}`);
    return response.data;
  }

  async updateAdminUser(id: number, userData: {
    name: string;
    email: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }): Promise<{ user: AdminCustomer; message: string }> {
    const response = await this.api.put(`/admin/users/${id}`, userData);
    return response.data;
  }

  async deleteAdminUser(id: number): Promise<{ message: string }> {
    const response = await this.api.delete(`/admin/users/${id}`);
    return response.data;
  }

  // Wishlist endpoints
  async getWishlist(page?: number, limit?: number): Promise<{
    items: WishlistItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    const response = await this.api.get('/wishlist', { params: { page, limit } });
    return response.data;
  }

  async addToWishlist(productId: number): Promise<{ message: string; wishlistCount: number; inWishlist: boolean }> {
    const response = await this.api.post(`/wishlist/${productId}`);
    return response.data;
  }

  async removeFromWishlist(productId: number): Promise<{ message: string; wishlistCount: number; inWishlist: boolean }> {
    const response = await this.api.delete(`/wishlist/${productId}`);
    return response.data;
  }

  async checkWishlistStatus(productId: number): Promise<{ productId: number; inWishlist: boolean }> {
    const response = await this.api.get(`/wishlist/status/${productId}`);
    return response.data;
  }

  async checkWishlistStatusBatch(productIds: number[]): Promise<{ statuses: Array<{ productId: number; inWishlist: boolean }>; count: number }> {
    const response = await this.api.post('/wishlist/status/batch', { productIds });
    return response.data;
  }

  async getWishlistCount(): Promise<{ count: number }> {
    const response = await this.api.get('/wishlist/count');
    return response.data;
  }

  async clearWishlist(): Promise<{ message: string; deletedCount: number; wishlistCount: number }> {
    const response = await this.api.delete('/wishlist');
    return response.data;
  }

  // Delivery estimation
  async getDeliveryEstimate(request: {
    items: Array<{ variantId: number; quantity: number }>;
    shippingAddress: { city: string; state?: string; zipCode?: string };
  }): Promise<{
    deliveryEstimate: {
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
  }> {
    const response = await this.api.post('/orders/estimate-delivery', request);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
