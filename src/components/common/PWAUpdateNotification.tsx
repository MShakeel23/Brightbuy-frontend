/**
 * PWA Update Notification
 * 
 * Notifies users when a new version of the app is available.
 * Provides a reload button to activate the new service worker.
 */

import React, { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const PWAUpdateNotification: React.FC = () => {
  const [showReload, setShowReload] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.log('Service Worker registered:', registration);
    },
    onRegisterError(error) {
      console.error('Service Worker registration error:', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setShowReload(true);
    }
  }, [needRefresh]);

  const handleReload = () => {
    updateServiceWorker(true);
  };

  const handleDismiss = () => {
    setShowReload(false);
    setNeedRefresh(false);
  };

  if (!showReload) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-green-600 rounded-lg shadow-lg p-4 z-50 animate-slide-down">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">
            Update Available
          </h3>
          <p className="text-xs text-green-100 mb-3">
            A new version of BrightBuy is available. Reload to get the latest features and improvements.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleReload}
              className="px-4 py-2 bg-white text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
            >
              Reload Now
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-white text-sm font-medium hover:bg-green-700 rounded-lg transition-colors"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-green-200 hover:text-white"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PWAUpdateNotification;
