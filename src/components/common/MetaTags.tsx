import React, { useEffect } from 'react';

// Temporary interface for development without react-helmet-async
interface MetaTagsProps {
  page?: string;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  structuredData?: object;
}

// Default SEO values
const defaultSEO = {
  title: 'BrightBuy - Electronics & Gadgets Store in Texas',
  description: 'Shop the latest electronics, smartphones, laptops, gaming consoles, and gadgets at BrightBuy. Fast delivery across Texas with competitive prices and excellent customer service.',
  keywords: 'electronics, smartphones, laptops, gaming, gadgets, texas, online shopping, technology',
  image: '/logo.png',
  siteName: 'BrightBuy',
  twitterHandle: '@brightbuy',
};

// Page-specific SEO configurations
const pageConfigs: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: 'BrightBuy - Electronics & Gadgets Store in Texas',
    description: 'Discover the latest electronics and gadgets at BrightBuy. Shop smartphones, laptops, gaming consoles, and more with fast delivery across Texas.',
    keywords: 'electronics store texas, buy smartphones online, laptops gaming consoles, gadgets texas delivery',
  },
  catalog: {
    title: 'Product Catalog - Electronics & Gadgets',
    description: 'Browse our extensive catalog of electronics including smartphones, laptops, audio devices, gaming equipment, and smart home gadgets.',
    keywords: 'product catalog electronics, browse gadgets, smartphones laptops audio devices',
  },
  deals: {
    title: 'Best Deals on Electronics & Gadgets',
    description: 'Save big on electronics! Find the best deals on smartphones, laptops, gaming gear, and tech accessories with fast Texas delivery.',
    keywords: 'electronics deals, smartphone discounts, laptop sales, gaming deals texas',
  },
  about: {
    title: 'About BrightBuy - Texas Electronics Retailer',
    description: 'Learn about BrightBuy, your trusted electronics retailer in Texas. We offer quality products, competitive prices, and excellent customer service.',
    keywords: 'about brightbuy, texas electronics retailer, company information',
  },
  contact: {
    title: 'Contact BrightBuy - Customer Support',
    description: 'Get in touch with BrightBuy customer support. We\'re here to help with your electronics purchases and answer any questions.',
    keywords: 'contact brightbuy, customer support, electronics help texas',
  },
  login: {
    title: 'Login to Your BrightBuy Account',
    description: 'Access your BrightBuy account to view orders, manage your wishlist, and enjoy a personalized shopping experience.',
    keywords: 'login brightbuy account, customer login, account access',
  },
  register: {
    title: 'Create Your BrightBuy Account',
    description: 'Join BrightBuy today! Create your account to enjoy faster checkout, order tracking, and exclusive member benefits.',
    keywords: 'register brightbuy account, create account, join brightbuy',
  },
  cart: {
    title: 'Shopping Cart - Review Your Items',
    description: 'Review your selected electronics and gadgets before checkout. Secure payment and fast delivery across Texas.',
    keywords: 'shopping cart, review items, checkout electronics',
  },
  wishlist: {
    title: 'Your Wishlist - Saved Electronics & Gadgets',
    description: 'View your saved electronics and gadgets. Add items to cart when ready or share your wishlist with friends.',
    keywords: 'wishlist electronics, saved items, favorite gadgets',
  },
};

export const MetaTags: React.FC<MetaTagsProps> = ({
  page,
  title,
  description,
  keywords,
  image,
  canonical,
  noIndex = false,
  structuredData,
}) => {
  useEffect(() => {
    // Get page-specific config or use defaults
    const pageConfig = page && pageConfigs[page] ? pageConfigs[page] : null;
    
    const finalTitle = title || pageConfig?.title || defaultSEO.title;
    const finalDescription = description || pageConfig?.description || defaultSEO.description;
    const finalKeywords = keywords || pageConfig?.keywords || defaultSEO.keywords;
    const finalImage = image || defaultSEO.image;
    
    // Update document title
    document.title = finalTitle;
    
    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Update basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('author', 'BrightBuy');
    
    // Update Open Graph tags
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:site_name', defaultSEO.siteName, true);
    updateMetaTag('og:locale', 'en_US', true);
    
    if (canonical) {
      updateMetaTag('og:url', canonical, true);
    }
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    updateMetaTag('twitter:site', defaultSEO.twitterHandle);
    
    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
    
    // Add structured data
    if (structuredData) {
      let script = document.querySelector('script[data-seo="structured-data"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-seo', 'structured-data');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
    
    // Add default organization schema if not present
    if (!document.querySelector('script[data-seo="organization"]')) {
      const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'BrightBuy',
        url: 'https://brightbuy.netlify.app',
        logo: 'https://brightbuy.netlify.app/logo.png',
        description: 'Electronics and gadgets retailer serving Texas with quality products and fast delivery.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
          addressRegion: 'TX',
        },
        areaServed: {
          '@type': 'State',
          name: 'Texas',
        },
      };
      
      const orgScript = document.createElement('script');
      orgScript.setAttribute('type', 'application/ld+json');
      orgScript.setAttribute('data-seo', 'organization');
      orgScript.textContent = JSON.stringify(organizationSchema);
      document.head.appendChild(orgScript);
    }
    
  }, [page, title, description, keywords, image, canonical, noIndex, structuredData]);

  // This component doesn't render anything visible
  return null;
};

export default MetaTags;