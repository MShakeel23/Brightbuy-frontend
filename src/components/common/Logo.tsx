/**
 * Logo Component
 * 
 * Reusable logo component with fallback to text logo.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  href?: string;
}

export default function Logo({ 
  size = 'md', 
  showText = true, 
  className = '',
  href = '/'
}: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const LogoContent = () => (
    <div className={`flex items-center ${className}`}>
      {!imageError ? (
        <img 
          src="/logo.png" 
          alt="BrightBuy Logo" 
          className={`${sizeClasses[size]} w-auto`}
          onError={handleImageError}
        />
      ) : (
        <div className={`${sizeClasses[size]} w-8 bg-[#0A58CA] rounded-lg flex items-center justify-center`}>
          <span className="text-white font-bold text-lg">B</span>
        </div>
      )}
      {showText && (
        <span className={`ml-3 font-bold text-[#212529] ${textSizes[size]}`}>
          BrightBuy
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="hover:opacity-80 transition-opacity">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}
