/**
 * 500 Error Page Component
 * 
 * Page displayed when a server error occurs.
 */

import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">500</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Server Error</h2>
        <p className="text-gray-600 mb-8">
          Something went wrong on our end. Please try again later.
        </p>
        <Link
          to="/"
          className="btn btn-primary"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
