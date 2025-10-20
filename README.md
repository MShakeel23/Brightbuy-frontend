# BrightBuy Frontend

A modern React frontend for the BrightBuy retail inventory and online order management system.

## Features

- **Modern React 18** with TypeScript and Vite
- **Tailwind CSS** for styling with custom design system
- **React Router** for client-side routing
- **Context-based state management** for auth and cart
- **Responsive design** for all screen sizes
- **Mock mode support** for development without backend
- **Component-based architecture** with reusable components

## Quick Start

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCK=false

# Stripe Configuration (for card payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Supabase Configuration (for image storage)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
VITE_APP_NAME=BrightBuy
VITE_APP_VERSION=1.0.0
```

## Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

### Mock Mode

Set `VITE_USE_MOCK=true` in your environment variables to use mock data instead of the backend API. This is useful for:

- Frontend development without backend
- Testing and demonstrations
- Offline development

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components
│   └── products/       # Product-related components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   └── admin/reports/  # Report pages
├── services/           # API and data services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main app component
```

## Features

### Customer Features

- **Home Page** - Featured products and promotions
- **Product Catalog** - Browse and search products
- **Product Details** - Detailed product information with variants
- **Shopping Cart** - Add/remove items, quantity management
- **Checkout** - Payment options (Card + COD) and delivery modes
- **Order History** - Track past orders
- **User Profile** - Manage account information

### Admin Features

- **Dashboard** - Overview metrics and recent activity
- **Product Management** - CRUD operations for products
- **Inventory Management** - Stock tracking and bulk updates
- **Order Management** - Process and track orders
- **Customer Management** - View customer information
- **Reports** - 5 comprehensive business reports
- **Settings** - Application configuration

### Technical Features

- **Authentication** - JWT-based auth with role management
- **State Management** - Context API for global state
- **Form Validation** - Client-side validation with error handling
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components
- **Error Handling** - Global error boundaries and notifications
- **Loading States** - Skeleton loaders and spinners

## Styling

The project uses Tailwind CSS with a custom design system:

- **Colors** - Primary and secondary color palettes
- **Typography** - Inter font family with consistent sizing
- **Components** - Reusable component classes
- **Animations** - Smooth transitions and hover effects
- **Responsive** - Mobile-first responsive design

## Testing

The project includes comprehensive testing setup:

- **Unit Tests** - Component and utility function tests
- **Integration Tests** - API integration tests
- **E2E Tests** - End-to-end user flow tests
- **Coverage Reports** - Test coverage analysis

## Deployment

### Netlify Deployment

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Configure Netlify:**

   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables: Set all `VITE_*` variables

3. **Deploy:**
   - Connect your GitHub repository
   - Configure build settings
   - Deploy automatically on push

### Environment Variables for Production

Ensure all environment variables are set in your production environment:

- `VITE_API_URL` - Backend API URL
- `VITE_USE_MOCK` - Set to `false` for production
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
