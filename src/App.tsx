/**
 * BrightBuy Main App Component
 * 
 * Main application component with routing, providers, and global layout.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import { NotificationProvider } from './contexts/NotificationContext';
import { WishlistProvider } from './contexts/WishlistContext';

// Layout components
import AppLayout from './components/layout/AppLayout';
import AdminLayout from './components/layout/AdminLayout';

// Customer pages
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DealsPage from './pages/DealsPage';

// Additional pages
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import FAQPage from './pages/FAQPage';
import SizeGuidePage from './pages/SizeGuidePage';
import TrackOrderPage from './pages/TrackOrderPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import CareersPage from './pages/CareersPage';
import AccessibilityPage from './pages/AccessibilityPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

// Report pages
import QuarterlySalesReport from './pages/admin/reports/QuarterlySalesReport';
import TopSellingProductsReport from './pages/admin/reports/TopSellingProductsReport';
import CategoryOrdersReport from './pages/admin/reports/CategoryOrdersReport';
import DeliveryEstimatesReport from './pages/admin/reports/DeliveryEstimatesReport';
import CustomerSummaryReport from './pages/admin/reports/CustomerSummaryReport';

// Error pages
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';

// Protected route component
import ProtectedRoute from './components/auth/ProtectedRoute';

// PWA Components
import InstallPWA from './components/common/InstallPWA';
import PWAUpdateNotification from './components/common/PWAUpdateNotification';
import OfflineIndicator from './components/common/OfflineIndicator';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <NotificationProvider>
              <div className="min-h-screen bg-gray-50">
              <OfflineIndicator />
              <InstallPWA />
              <PWAUpdateNotification />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="catalog" element={<CatalogPage />} />
                  <Route path="product/:id" element={<ProductPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="deals" element={<DealsPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="shipping" element={<ShippingPage />} />
                  <Route path="returns" element={<ReturnsPage />} />
                  <Route path="faq" element={<FAQPage />} />
                  <Route path="size-guide" element={<SizeGuidePage />} />
                  <Route path="track-order" element={<TrackOrderPage />} />
                  <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="cookie-policy" element={<CookiePolicyPage />} />
                  <Route path="careers" element={<CareersPage />} />
                  <Route path="accessibility" element={<AccessibilityPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  
                  {/* Protected customer routes */}
                  <Route path="wishlist" element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  } />
                  <Route path="checkout" element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } />
                  <Route path="orders" element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  } />
                  <Route path="profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                </Route>

                {/* Admin routes */}
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route path="products/:id/edit" element={<AdminProductForm />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="settings" element={<AdminSettings />} />
                  
                  {/* Report sub-routes */}
                  <Route path="reports/quarterly-sales" element={<QuarterlySalesReport />} />
                  <Route path="reports/top-selling-products" element={<TopSellingProductsReport />} />
                  <Route path="reports/category-orders" element={<CategoryOrdersReport />} />
                  <Route path="reports/delivery-estimates" element={<DeliveryEstimatesReport />} />
                  <Route path="reports/customer-summary" element={<CustomerSummaryReport />} />
                </Route>

                {/* Error routes */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="/500" element={<ErrorPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              </div>
            </NotificationProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
