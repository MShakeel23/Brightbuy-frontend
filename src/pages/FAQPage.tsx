/**
 * FAQ Page
 * 
 * Frequently Asked Questions with expandable answers.
 */

import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Overnight shipping delivers by the next business day. Processing time is 1-2 business days for most orders.",
    category: "Shipping"
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer: "We offer a 30-day return window for most items. Items must be in original condition with packaging. We provide free return labels and process refunds within 3-5 business days of receiving your return.",
    category: "Returns"
  },
  {
    id: 3,
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free standard shipping on orders over $75 within the United States. Express and overnight shipping have additional charges but may be eligible for promotions.",
    category: "Shipping"
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account and check 'Order History' to track all your orders in real-time.",
    category: "Orders"
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and BrightBuy store credit. All transactions are secure and encrypted.",
    category: "Payment"
  },
  {
    id: 6,
    question: "How do I create an account?",
    answer: "Click 'Register' in the top navigation, fill out the required information, and verify your email address. Having an account allows you to track orders, save favorites, and checkout faster.",
    category: "Account"
  },
  {
    id: 7,
    question: "Can I modify or cancel my order?",
    answer: "You can modify or cancel orders within 1 hour of placement if they haven't entered processing. Contact customer service immediately for assistance with order changes.",
    category: "Orders"
  },
  {
    id: 8,
    question: "Do you offer price matching?",
    answer: "Yes, we offer price matching on identical items from authorized retailers. Contact customer service with the competitor's price and we'll match it if it meets our policy requirements.",
    category: "Pricing"
  },
  {
    id: 9,
    question: "What if I received a damaged item?",
    answer: "We're sorry about that! Contact us immediately with photos of the damage. We'll arrange a replacement or full refund, and you won't need to return the damaged item in most cases.",
    category: "Returns"
  },
  {
    id: 10,
    question: "How do I use a promo code?",
    answer: "Enter your promo code in the 'Discount Code' field during checkout. The discount will be applied automatically. Promo codes cannot be combined and have expiration dates.",
    category: "Pricing"
  },
  {
    id: 11,
    question: "Is my personal information secure?",
    answer: "Absolutely. We use industry-standard SSL encryption and never store complete credit card information. Your personal data is protected according to our privacy policy and applicable data protection laws.",
    category: "Security"
  },
  {
    id: 12,
    question: "Do you ship internationally?",
    answer: "Yes, we ship to select international locations. Shipping costs and delivery times vary by destination. Customs fees and import duties are the responsibility of the customer.",
    category: "Shipping"
  }
];

const categories = ["All", "Shipping", "Returns", "Orders", "Payment", "Account", "Pricing", "Security"];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find quick answers to common questions about shopping with BrightBuy
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.map(faq => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {faq.question}
                  </h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {faq.category}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openItems.includes(faq.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
            <a
              href="tel:+1-800-555-0123"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}