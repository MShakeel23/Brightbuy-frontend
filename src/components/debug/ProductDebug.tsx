/**
 * Debug component to inspect product data
 */

import { Product } from '../../types';

interface ProductDebugProps {
  product: Product;
}

export default function ProductDebug({ product }: ProductDebugProps) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 m-4 rounded-lg">
      <h3 className="font-bold text-lg mb-2">Debug: {product.name}</h3>
      <div className="space-y-2 text-sm">
        <div><strong>Product ID:</strong> {product.id}</div>
        <div><strong>Base Price:</strong> {product.basePrice}</div>
        <div><strong>Total Variants:</strong> {product.variants?.length || 0}</div>
        
        {product.variants && product.variants.length > 0 && (
          <div>
            <strong>Variants:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              {product.variants.map((variant, index) => (
                <li key={variant.id || index} className="text-xs">
                  • ID: {variant.id}, Name: {variant.name}, Price: {variant.price}, Stock: {variant.stock}, 
                  isActive: {String(variant.isActive)}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div>
          <strong>Active Variants:</strong> {product.variants?.filter(v => v.isActive).length || 0}
        </div>
        
        <details className="cursor-pointer">
          <summary className="font-medium">Raw Data</summary>
          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(product, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}