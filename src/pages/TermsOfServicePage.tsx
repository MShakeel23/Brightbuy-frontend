/**
 * Terms of Service Page
 * 
 * Legal terms and conditions for using BrightBuy services.
 */

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: October 15, 2025
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service ("Terms") constitute a legally binding agreement between you and BrightBuy ("Company," "we," "us," or "our") 
              regarding your use of our website and services. By accessing or using our services, you agree to be bound by these Terms. 
              If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By creating an account, making a purchase, or using any of our services, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You must be at least 18 years old to use our services. If you are between 13 and 18, you may only use our services 
              with the involvement and consent of a parent or guardian.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Registration</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Requirements</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>You must provide accurate and complete information during registration</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You may not create multiple accounts or share your account with others</li>
                  <li>You are responsible for all activities that occur under your account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Termination</h3>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time for violation of these Terms, 
                  fraudulent activity, or any other reason at our sole discretion.
                </p>
              </div>
            </div>
          </section>

          {/* Products and Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Products and Services</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>We strive to provide accurate product descriptions, images, and pricing</li>
                  <li>Colors and appearances may vary due to monitor settings and photography</li>
                  <li>We reserve the right to modify or discontinue products without notice</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Product availability is not guaranteed until your order is confirmed</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing and Payment</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>All prices are displayed in USD and include applicable taxes where required</li>
                  <li>Payment must be received before order processing</li>
                  <li>We accept major credit cards, PayPal, and other approved payment methods</li>
                  <li>Additional fees may apply for expedited shipping or special services</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Orders and Shipping */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders and Shipping</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Processing</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Orders are processed Monday through Friday, excluding holidays</li>
                  <li>We reserve the right to refuse or cancel any order at our discretion</li>
                  <li>Order modifications or cancellations must be requested within 1 hour of placement</li>
                  <li>You will receive email confirmations for order placement and shipment</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping and Delivery</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Shipping times are estimates and not guaranteed</li>
                  <li>Risk of loss passes to you upon delivery to the carrier</li>
                  <li>You are responsible for providing accurate shipping information</li>
                  <li>Additional charges may apply for delivery to remote locations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns and Refunds</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our return policy allows returns within 30 days of delivery for most items. Items must be in original condition 
              with all packaging and tags intact. For detailed return information, please see our Returns & Refunds page.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Refunds are processed to the original payment method</li>
              <li>Return shipping costs are the customer's responsibility unless the item is defective</li>
              <li>Certain items may be non-returnable (personalized items, perishables, etc.)</li>
              <li>Refund processing may take 3-5 business days after we receive the return</li>
            </ul>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Conduct</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree not to use our services for any unlawful purpose or in any way that could damage, disable, 
              overburden, or impair our services. Prohibited activities include:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Violating any applicable laws or regulations</li>
              <li>Transmitting harmful, offensive, or inappropriate content</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Using automated tools to access our website without permission</li>
              <li>Interfering with other users' ability to use our services</li>
              <li>Engaging in fraudulent activities or identity theft</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content on our website, including text, graphics, logos, images, and software, is the property of BrightBuy 
              or its licensors and is protected by copyright and other intellectual property laws.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>You may not reproduce, modify, or distribute our content without permission</li>
              <li>Product images and descriptions are for personal use only</li>
              <li>Trademarks and logos may not be used without explicit written consent</li>
              <li>User-generated content may be used by us for promotional purposes</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Limitation of Liability</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Disclaimer</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our services are provided "as is" without warranties of any kind. We do not guarantee that our services will be 
                  uninterrupted, error-free, or free of viruses or other harmful components.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, BrightBuy shall not be liable for any indirect, incidental, special, 
                  or consequential damages arising out of or in connection with your use of our services.
                </p>
              </div>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to indemnify and hold harmless BrightBuy, its officers, directors, employees, and agents from any claims, 
              damages, losses, or expenses arising out of your use of our services or violation of these Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Disputes</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms are governed by the laws of the State of New York, without regard to conflict of law principles. 
              Any disputes arising out of these Terms or your use of our services shall be resolved through binding arbitration.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Before initiating formal proceedings, we encourage you to contact us directly to resolve any concerns.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may modify these Terms at any time by posting the updated version on our website. Your continued use of our 
              services after such modifications constitutes acceptance of the updated Terms. We will provide notice of material 
              changes when required by law.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> legal@brightbuy.com</p>
                <p><strong>Phone:</strong> 1-800-555-0123</p>
                <p><strong>Address:</strong> 123 Commerce Street, New York, NY 10001</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}