/**
 * Stock Status Component
 * 
 * Component to display stock status and backorder warnings for cart items
 */

import React from 'react';

interface StockStatusProps {
  stock: number;
  quantity: number;
  className?: string;
}

export const StockStatus: React.FC<StockStatusProps> = ({ stock, quantity, className = '' }) => {
  const getStockStatus = () => {
    if (stock <= 0) {
      return {
        status: 'out_of_stock',
        text: 'Out of stock',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: '❌'
      };
    } else if (stock < quantity) {
      return {
        status: 'partial_stock',
        text: `Only ${stock} in stock`,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        icon: '⚠️'
      };
    } else if (stock <= 5) {
      return {
        status: 'low_stock',
        text: `${stock} in stock`,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        icon: '⚡'
      };
    } else {
      return {
        status: 'in_stock',
        text: `${stock} in stock`,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: '✓'
      };
    }
  };

  const statusInfo = getStockStatus();

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color} ${className}`}>
      <span className="mr-1">{statusInfo.icon}</span>
      {statusInfo.text}
    </div>
  );
};

interface BackorderWarningProps {
  outOfStockItems: Array<{
    variantId: number;
    variantName?: string;
    requested: number;
    available: number;
    backorder: number;
  }>;
  className?: string;
}

export const BackorderWarning: React.FC<BackorderWarningProps> = ({ outOfStockItems, className = '' }) => {
  if (outOfStockItems.length === 0) return null;

  return (
    <div className={`bg-orange-50 border border-orange-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-orange-800">
            Backorder Notice
          </h3>
          <div className="mt-2 text-sm text-orange-700">
            <p>Some items in your cart have limited stock and will be backordered:</p>
            <ul className="mt-2 space-y-1">
              {outOfStockItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.variantName || `Item ${item.variantId}`}</span>
                  <span className="text-orange-600 font-medium">
                    {item.backorder} backordered
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs">
              Backordered items will add 3 extra days to your delivery time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockStatus;