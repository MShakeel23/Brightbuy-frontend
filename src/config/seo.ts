// SEO Configuration for BrightBuy
export const seoConfig = {
  // Default meta tags
  defaultTitle: 'BrightBuy - Electronics & Gadgets Store in Texas',
  titleTemplate: '%s | BrightBuy',
  defaultDescription: 'Shop the latest electronics, smartphones, laptops, gaming consoles, and gadgets at BrightBuy. Fast delivery across Texas with competitive prices and excellent customer service.',
  
  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brightbuy.netlify.app',
    siteName: 'BrightBuy',
    images: [
      {
        url: 'https://brightbuy.netlify.app/logo.png',
        width: 1200,
        height: 630,
        alt: 'BrightBuy - Electronics Store',
      },
    ],
  },
  
  // Twitter Card defaults
  twitter: {
    handle: '@brightbuy',
    site: '@brightbuy',
    cardType: 'summary_large_image',
  },
  
  // Additional meta tags
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'electronics, smartphones, laptops, gaming, gadgets, texas, online shopping, technology',
    },
    {
      name: 'author',
      content: 'BrightBuy',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    {
      httpEquiv: 'Content-Type',
      content: 'text/html; charset=utf-8',
    },
    {
      name: 'geo.region',
      content: 'US-TX',
    },
    {
      name: 'geo.placename',
      content: 'Texas',
    },
    {
      name: 'geo.position',
      content: '31.9686;-99.9018',
    },
    {
      name: 'ICBM',
      content: '31.9686, -99.9018',
    },
  ],
  
  // Page-specific SEO configurations
  pages: {
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
  },
  
  // Structured data templates
  structuredData: {
    organization: {
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
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'BrightBuy',
      url: 'https://brightbuy.netlify.app',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://brightbuy.netlify.app/catalog?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  },
};

// Helper function to generate page-specific meta tags
export const generatePageMeta = (page: keyof typeof seoConfig.pages) => {
  const pageConfig = seoConfig.pages[page];
  if (!pageConfig) return {};
  
  return {
    title: pageConfig.title,
    description: pageConfig.description,
    openGraph: {
      ...seoConfig.openGraph,
      title: pageConfig.title,
      description: pageConfig.description,
    },
    twitter: {
      ...seoConfig.twitter,
      title: pageConfig.title,
      description: pageConfig.description,
    },
    additionalMetaTags: [
      ...seoConfig.additionalMetaTags,
      {
        name: 'keywords',
        content: pageConfig.keywords,
      },
    ],
  };
};

// Helper function to generate product schema
export const generateProductSchema = (product: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.images?.[0]?.image_path,
  brand: {
    '@type': 'Brand',
    name: 'BrightBuy',
  },
  offers: {
    '@type': 'Offer',
    price: product.base_price,
    priceCurrency: 'USD',
    availability: product.variants?.some((v: any) => v.stock > 0) 
      ? 'https://schema.org/InStock' 
      : 'https://schema.org/OutOfStock',
    seller: {
      '@type': 'Organization',
      name: 'BrightBuy',
    },
  },
  category: product.category?.name,
});

export default seoConfig;