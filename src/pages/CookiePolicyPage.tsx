/**
 * Cookie Policy Page
 * 
 * Information about cookie usage and privacy settings.
 */

import { useState } from 'react';

export default function CookiePolicyPage() {
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    personalization: false,
  });

  const handlePreferenceChange = (category: string, enabled: boolean) => {
    if (category !== 'necessary') {
      setPreferences(prev => ({
        ...prev,
        [category]: enabled
      }));
    }
  };

  const savePreferences = () => {
    // In a real app, this would save to localStorage and/or send to server
    console.log('Saving cookie preferences:', preferences);
    alert('Cookie preferences saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: October 15, 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you 
              with a better browsing experience by remembering your preferences, analyzing site usage, and personalizing content.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This Cookie Policy explains what cookies we use, why we use them, and how you can control your cookie preferences.
            </p>
          </div>

          {/* Types of Cookies */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Necessary Cookies</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  These cookies are essential for the website to function properly and cannot be disabled. They enable core functionality 
                  such as security, network management, and accessibility.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Examples include:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Session cookies for maintaining your login state</li>
                    <li>Shopping cart contents</li>
                    <li>Security tokens for preventing CSRF attacks</li>
                    <li>Load balancing cookies for optimal performance</li>
                  </ul>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. 
                  This helps us improve our website's functionality and user experience.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Examples include:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Google Analytics cookies (e.g., _ga, _gid)</li>
                    <li>Page view tracking</li>
                    <li>Time spent on pages</li>
                    <li>Bounce rate analysis</li>
                  </ul>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used 
                  to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Examples include:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Facebook Pixel for targeted advertising</li>
                    <li>Google Ads conversion tracking</li>
                    <li>Retargeting campaign cookies</li>
                    <li>Social media integration cookies</li>
                  </ul>
                </div>
              </div>

              {/* Personalization Cookies */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalization Cookies</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences, 
                  language settings, and providing customized content based on your browsing behavior.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Examples include:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Language preference settings</li>
                    <li>Recently viewed products</li>
                    <li>Customized product recommendations</li>
                    <li>User interface preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Cookie Preferences */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Your Cookie Preferences</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              You can control which cookies you accept by adjusting the settings below. Note that necessary cookies cannot be 
              disabled as they are required for the website to function properly.
            </p>

            <div className="space-y-6">
              {/* Necessary Cookies Toggle */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Necessary Cookies</h3>
                  <p className="text-sm text-gray-600 mt-1">Required for basic website functionality</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-300 rounded-full w-12 h-6 flex items-center cursor-not-allowed">
                    <div className="bg-white w-5 h-5 rounded-full shadow-sm translate-x-6 transition-transform"></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">Always On</span>
                </div>
              </div>

              {/* Analytics Cookies Toggle */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600 mt-1">Help us improve our website performance</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handlePreferenceChange('analytics', !preferences.analytics)}
                    className={`rounded-full w-12 h-6 flex items-center transition-colors ${
                      preferences.analytics ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-sm transition-transform ${
                      preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </button>
                  <span className="ml-2 text-sm text-gray-600">
                    {preferences.analytics ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Marketing Cookies Toggle */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                  <p className="text-sm text-gray-600 mt-1">Deliver personalized advertisements</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handlePreferenceChange('marketing', !preferences.marketing)}
                    className={`rounded-full w-12 h-6 flex items-center transition-colors ${
                      preferences.marketing ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-sm transition-transform ${
                      preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </button>
                  <span className="ml-2 text-sm text-gray-600">
                    {preferences.marketing ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Personalization Cookies Toggle */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Personalization Cookies</h3>
                  <p className="text-sm text-gray-600 mt-1">Customize your browsing experience</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handlePreferenceChange('personalization', !preferences.personalization)}
                    className={`rounded-full w-12 h-6 flex items-center transition-colors ${
                      preferences.personalization ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-sm transition-transform ${
                      preferences.personalization ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </button>
                  <span className="ml-2 text-sm text-gray-600">
                    {preferences.personalization ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={savePreferences}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save Preferences
              </button>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Some cookies are set by third-party services that appear on our pages. We use the following third-party services 
              that may set cookies:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Google Analytics:</strong> For website traffic analysis and user behavior insights</li>
              <li><strong>Google Ads:</strong> For conversion tracking and remarketing campaigns</li>
              <li><strong>Facebook Pixel:</strong> For social media advertising and audience building</li>
              <li><strong>Payment Processors:</strong> For secure payment processing (Stripe, PayPal)</li>
              <li><strong>Customer Support:</strong> For chat functionality and support services</li>
            </ul>
          </div>

          {/* Browser Controls */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Browser Cookie Controls</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. 
              Here's how to manage cookies in popular browsers:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Chrome</h3>
                <p className="text-sm text-gray-600">Settings → Privacy and Security → Cookies and other site data</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Firefox</h3>
                <p className="text-sm text-gray-600">Options → Privacy & Security → Cookies and Site Data</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Safari</h3>
                <p className="text-sm text-gray-600">Preferences → Privacy → Cookies and website data</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Edge</h3>
                <p className="text-sm text-gray-600">Settings → Cookies and site permissions → Cookies and site data</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website and your browsing experience.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> privacy@brightbuy.com</p>
                <p><strong>Phone:</strong> 1-800-555-0123</p>
                <p><strong>Address:</strong> 123 Commerce Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}