/**
 * ScrollToTop Component
 * 
 * Automatically scrolls to the top of the page when the route changes.
 * This ensures that when users navigate to a new page, they start from the top
 * instead of maintaining the scroll position from the previous page.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  smooth?: boolean; // Whether to use smooth scrolling animation
}

const ScrollToTop = ({ smooth = true }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, [pathname, smooth]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;