/**
 * Status Badge Component
 * 
 * Color-coded status badges for orders, payments, etc.
 */

interface StatusBadgeProps {
  status?: string;
  type?: 'order' | 'payment' | 'custom';
  className?: string;
}

export default function StatusBadge({ status, type = 'custom', className = '' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    // Handle undefined or null status
    if (!status) {
      return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };
    }

    switch (type) {
      case 'order':
        switch (status.toLowerCase()) {
          case 'pending':
            return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' };
          case 'confirmed':
            return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmed' };
          case 'shipped':
            return { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Shipped' };
          case 'delivered':
            return { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' };
          case 'cancelled':
            return { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' };
          default:
            return { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
        }
      
      case 'payment':
        switch (status.toLowerCase()) {
          case 'pending':
            return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' };
          case 'paid':
            return { bg: 'bg-green-100', text: 'text-green-800', label: 'Paid' };
          case 'failed':
            return { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' };
          default:
            return { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
        }
      
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text} ${className}`}
    >
      {config.label}
    </span>
  );
}
