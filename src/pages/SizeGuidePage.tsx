/**
 * Size Guide Page
 * 
 * Comprehensive sizing charts for different product categories.
 */

import { useState } from 'react';

const sizeCategories = [
  'Women\'s Clothing',
  'Men\'s Clothing',
  'Women\'s Shoes',
  'Men\'s Shoes',
  'Children\'s Clothing',
  'Children\'s Shoes',
  'Accessories'
];

export default function SizeGuidePage() {
  const [activeCategory, setActiveCategory] = useState('Women\'s Clothing');

  const renderSizeChart = () => {
    switch (activeCategory) {
      case 'Women\'s Clothing':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Bust (inches)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist (inches)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Hips (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">XS</td><td className="border border-gray-300 px-4 py-2">30-32</td><td className="border border-gray-300 px-4 py-2">23-25</td><td className="border border-gray-300 px-4 py-2">33-35</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">S</td><td className="border border-gray-300 px-4 py-2">32-34</td><td className="border border-gray-300 px-4 py-2">25-27</td><td className="border border-gray-300 px-4 py-2">35-37</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">M</td><td className="border border-gray-300 px-4 py-2">34-36</td><td className="border border-gray-300 px-4 py-2">27-29</td><td className="border border-gray-300 px-4 py-2">37-39</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">L</td><td className="border border-gray-300 px-4 py-2">36-38</td><td className="border border-gray-300 px-4 py-2">29-31</td><td className="border border-gray-300 px-4 py-2">39-41</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">XL</td><td className="border border-gray-300 px-4 py-2">38-40</td><td className="border border-gray-300 px-4 py-2">31-33</td><td className="border border-gray-300 px-4 py-2">41-43</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">XXL</td><td className="border border-gray-300 px-4 py-2">40-42</td><td className="border border-gray-300 px-4 py-2">33-35</td><td className="border border-gray-300 px-4 py-2">43-45</td></tr>
              </tbody>
            </table>
          </div>
        );

      case 'Men\'s Clothing':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chest (inches)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist (inches)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Sleeve (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">XS</td><td className="border border-gray-300 px-4 py-2">34-36</td><td className="border border-gray-300 px-4 py-2">28-30</td><td className="border border-gray-300 px-4 py-2">32-33</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">S</td><td className="border border-gray-300 px-4 py-2">36-38</td><td className="border border-gray-300 px-4 py-2">30-32</td><td className="border border-gray-300 px-4 py-2">33-34</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">M</td><td className="border border-gray-300 px-4 py-2">38-40</td><td className="border border-gray-300 px-4 py-2">32-34</td><td className="border border-gray-300 px-4 py-2">34-35</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">L</td><td className="border border-gray-300 px-4 py-2">40-42</td><td className="border border-gray-300 px-4 py-2">34-36</td><td className="border border-gray-300 px-4 py-2">35-36</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">XL</td><td className="border border-gray-300 px-4 py-2">42-44</td><td className="border border-gray-300 px-4 py-2">36-38</td><td className="border border-gray-300 px-4 py-2">36-37</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">XXL</td><td className="border border-gray-300 px-4 py-2">44-46</td><td className="border border-gray-300 px-4 py-2">38-40</td><td className="border border-gray-300 px-4 py-2">37-38</td></tr>
              </tbody>
            </table>
          </div>
        );

      case 'Women\'s Shoes':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">US Size</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">EU Size</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">UK Size</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">35</td><td className="border border-gray-300 px-4 py-2">2.5</td><td className="border border-gray-300 px-4 py-2">8.5</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">36</td><td className="border border-gray-300 px-4 py-2">3.5</td><td className="border border-gray-300 px-4 py-2">9.0</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">7</td><td className="border border-gray-300 px-4 py-2">37</td><td className="border border-gray-300 px-4 py-2">4.5</td><td className="border border-gray-300 px-4 py-2">9.5</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">38</td><td className="border border-gray-300 px-4 py-2">5.5</td><td className="border border-gray-300 px-4 py-2">10.0</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">9</td><td className="border border-gray-300 px-4 py-2">39</td><td className="border border-gray-300 px-4 py-2">6.5</td><td className="border border-gray-300 px-4 py-2">10.5</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">40</td><td className="border border-gray-300 px-4 py-2">7.5</td><td className="border border-gray-300 px-4 py-2">11.0</td></tr>
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Size chart for {activeCategory} coming soon...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Size Guide
          </h1>
          <p className="text-xl text-gray-600">
            Find your perfect fit with our comprehensive sizing charts
          </p>
        </div>

        {/* How to Measure */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Measure</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Bust/Chest</h3>
              <p className="text-sm text-gray-600">Measure around the fullest part of your chest, keeping the tape parallel to the floor</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Waist</h3>
              <p className="text-sm text-gray-600">Measure around your natural waistline, about an inch above your navel</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hips</h3>
              <p className="text-sm text-gray-600">Measure around the fullest part of your hips, keeping feet together</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Inseam</h3>
              <p className="text-sm text-gray-600">Measure from the top of your inner thigh to your ankle bone</p>
            </div>
          </div>
        </div>

        {/* Size Chart Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap">
              {sizeCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`py-4 px-6 text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{activeCategory} Size Chart</h3>
            {renderSizeChart()}
          </div>
        </div>

        {/* Sizing Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sizing Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Measure yourself while wearing well-fitting undergarments
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Have someone help you measure for more accuracy
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                When in doubt, size up for comfort
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Check individual product pages for specific fit notes
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Still Unsure?</h3>
            <p className="text-gray-600 mb-4">
              Our customer service team is here to help you find the perfect fit. We also offer easy exchanges if the size isn't quite right.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Ask an Expert
              </a>
              <a
                href="/returns"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Exchange Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}