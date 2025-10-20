/**
 * Accessibility Page
 * 
 * Information about website accessibility features and compliance.
 */

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Accessibility Statement
          </h1>
          <p className="text-xl text-gray-600">
            Our commitment to digital accessibility for all users
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Our Commitment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Accessibility</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At BrightBuy, we are committed to ensuring that our website and services are accessible to all users, 
              including those with disabilities. We strive to provide an inclusive shopping experience that meets or 
              exceeds industry standards and guidelines for digital accessibility.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that everyone should have equal access to information, functionality, and commerce online, 
              regardless of their abilities or the technologies they use to browse the web.
            </p>
          </section>

          {/* Standards Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Standards</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
              These guidelines explain how to make web content more accessible for people with disabilities and more usable for everyone.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WCAG 2.1 Level AA</h3>
                <p className="text-gray-600">
                  We follow the internationally recognized accessibility guidelines to ensure our content is perceivable, 
                  operable, understandable, and robust for all users.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Section 508 Compliance</h3>
                <p className="text-gray-600">
                  Our website is designed to be compatible with Section 508 requirements for federal accessibility standards.
                </p>
              </div>
            </div>
          </section>

          {/* Accessibility Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Accessibility Features</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Full keyboard navigation support for all interactive elements</li>
                  <li>Visible focus indicators for keyboard users</li>
                  <li>Logical tab order throughout all pages</li>
                  <li>Skip links to bypass repetitive content</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Screen Reader Support</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Semantic HTML markup for better screen reader interpretation</li>
                  <li>Alternative text for all images and graphics</li>
                  <li>Descriptive headings and page structure</li>
                  <li>ARIA labels and landmarks for complex interfaces</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Visual Design</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>High contrast color schemes that meet WCAG standards</li>
                  <li>Scalable text that can be resized up to 200% without loss of functionality</li>
                  <li>Color is not used as the sole means of conveying information</li>
                  <li>Consistent and predictable page layouts</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Forms and Interactions</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Clear form labels and instructions</li>
                  <li>Error messages that are descriptive and actionable</li>
                  <li>Sufficient time limits with options to extend</li>
                  <li>No content that causes seizures or vestibular disorders</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Assistive Technologies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Supported Assistive Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website is designed to be compatible with a wide range of assistive technologies, including:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Screen Readers</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>NVDA (NonVisual Desktop Access)</li>
                  <li>JAWS (Job Access With Speech)</li>
                  <li>VoiceOver (macOS and iOS)</li>
                  <li>TalkBack (Android)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Input Methods</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Switch navigation</li>
                  <li>Voice recognition software</li>
                  <li>Eye-tracking devices</li>
                  <li>Alternative keyboards</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Ongoing Efforts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Accessibility Efforts</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Testing</h3>
                <p className="text-gray-600 leading-relaxed">
                  We conduct regular accessibility audits using both automated tools and manual testing with assistive technologies. 
                  Our development team includes accessibility checks in our quality assurance process.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User Feedback</h3>
                <p className="text-gray-600 leading-relaxed">
                  We actively seek feedback from users with disabilities to identify areas for improvement and ensure our 
                  accessibility features meet real-world needs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Staff Training</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our design and development teams receive ongoing training on accessibility best practices and emerging 
                  technologies to ensure we stay current with evolving standards.
                </p>
              </div>
            </div>
          </section>

          {/* Known Issues */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Known Accessibility Issues</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              While we strive for full accessibility, we acknowledge that some areas of our website may not yet meet 
              all accessibility standards. We are actively working to address these issues:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Some product images may lack detailed alternative text descriptions</li>
              <li>Certain third-party widgets may have limited accessibility features</li>
              <li>Video content may not always include captions or audio descriptions</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              We are committed to resolving these issues in future updates and welcome your feedback to help prioritize improvements.
            </p>
          </section>

          {/* Browser Compatibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Browser and Device Compatibility</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website is designed to work across a wide range of browsers and devices. We test accessibility features on:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Desktop Browsers</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Chrome (latest 2 versions)</li>
                  <li>Firefox (latest 2 versions)</li>
                  <li>Safari (latest 2 versions)</li>
                  <li>Microsoft Edge (latest 2 versions)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Platforms</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>iOS Safari and Chrome</li>
                  <li>Android Chrome and Samsung Browser</li>
                  <li>Mobile screen readers (VoiceOver, TalkBack)</li>
                  <li>High contrast and zoom features</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Feedback and Support */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Feedback and Support</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers 
              or have suggestions for improvement, please contact us using one of the methods below:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Our Accessibility Team</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span><strong>Email:</strong> accessibility@brightbuy.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span><strong>Phone:</strong> 1-800-555-0123 (TTY: 1-800-555-0124)</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span><strong>Mail:</strong> BrightBuy Accessibility Team<br />123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Response Time:</strong> We aim to respond to all accessibility inquiries within 2 business days. 
                  For urgent accessibility issues that prevent you from completing a purchase, please call our customer service line.
                </p>
              </div>
            </div>
          </section>

          {/* Last Updated */}
          <section className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              This accessibility statement was last updated on October 15, 2025.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}