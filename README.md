<!-- @format -->

# Product Management Dashboard

A modern, responsive product management dashboard built with Next.js 16, featuring real-time product data, search functionality, category filtering, and detailed product views.

## Live Demo

**[View Live Application](https://product-management-web-with-nextjs.vercel.app/products)**

## Tech Stack

| Technology        | Version | Purpose                         |
| ----------------- | ------- | ------------------------------- |
| Next.js           | 16.2.0  | React framework with App Router |
| React             | 19.2.4  | UI library                      |
| TypeScript        | 5.x     | Type safety                     |
| Redux Toolkit     | 2.11.2  | State management                |
| RTK Query         | -       | API data fetching & caching     |
| Tailwind CSS      | 4.x     | Utility-first styling           |
| Ant Design        | -       | UI components                   |
| Shadcn/ui         | 4.1.0   | Accessible component primitives |
| Styled Components | 6.3.12  | CSS-in-JS styling               |
| SASS              | 1.98.0  | CSS preprocessing               |

## Architecture Decisions

### 1. Next.js App Router

Using Next.js 16 App Router for:

- Server-side rendering (SSR) for better SEO and initial load performance
- File-based routing with dynamic routes (`[product-id]`)
- Built-in layouts and loading states
- Server and Client Component separation

### 2. State Management with Redux Toolkit + RTK Query

```
src/redux/
├── store.ts              # Store configuration
├── api/
│   └── baseAPI.tsx       # RTK Query base API setup
├── features/
│   └── products/
│       ├── productsAPI.tsx   # Product endpoints
│       └── productsSlice.tsx # Product state slice
└── Providers.tsx         # Redux provider wrapper
```

**Why RTK Query?**

- Automatic caching with 5-minute retention (`keepUnusedDataFor: 300`)
- Cache invalidation via tags (`Products`, `Categories`)
- Built-in loading and error states
- Automatic request deduplication

### 3. Component Architecture

```
src/components/
├── CommonComponents/     # Shared layout components
│   ├── LayoutWrapper.tsx     # Conditional layout (auth vs dashboard)
│   ├── DashboardSidebar.tsx  # Navigation sidebar
│   ├── NabBar.tsx            # Top navigation bar
│   ├── LoadingPage.tsx       # Full-screen loader
│   └── NotFoundPage.tsx      # 404 error page
├── ProductsComponents/   # Product-specific components
│   ├── ProductsContainer.tsx
│   ├── ProductsTable.tsx
│   ├── TableSkeleton.tsx
│   └── ProductDetailsComponents/
│       ├── ProductDetailsContainer.tsx
│       ├── Details.tsx
│       ├── ImageView.tsx
│       ├── EditDrawer.tsx
│       └── DetailsPageSkeleton.tsx
├── StyledComponents/     # Styled-components
│   ├── Container.tsx
│   └── Title.tsx
└── ui/                   # Shadcn/ui primitives
    ├── button.tsx
    ├── sidebar.tsx
    ├── skeleton.tsx
    └── ...
```

### 4. Styling Strategy

- **Tailwind CSS**: Primary utility classes for layout and spacing
- **SCSS Modules**: Component-specific styles (`CommonStyles.module.scss`, `NavBarStyles.module.scss`)
- **Styled Components**: Dynamic, prop-based styling with SSR support
- **Shadcn/ui**: Pre-built accessible components customized via CSS variables

### 5. Type Safety

```
src/types/
├── ProductsTypes.tsx     # Product-related interfaces
└── CommonTypes.tsx       # Shared type definitions
```

All API responses and component props are fully typed for better DX and runtime safety.

## Project Structure

```
product-management-web-app-nextjs/
├── public/
│   └── roxnor-logo.png
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (redirects to /products)
│   │   ├── loading.tsx         # Root loading state
│   │   ├── not-found.tsx       # 404 page
│   │   ├── globals.css         # Global styles & CSS variables
│   │   └── products/
│   │       ├── page.tsx        # Products list page
│   │       └── [product-id]/
│   │           └── page.tsx    # Product details page
│   ├── components/             # React components
│   ├── redux/                  # Redux store & API
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   ├── types/                  # TypeScript definitions
│   └── scssstyle/              # SCSS modules
├── .env                        # Environment variables
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd product-management-web-app-nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=https://dummyjson.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Available Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Features

- **Product Listing**: Paginated table view with search and category filtering
- **Product Search**: Real-time search across product titles
- **Category Filter**: Filter products by category
- **Product Details**: Detailed view with image gallery
- **Edit Products**: Drawer-based edit functionality
- **Responsive Design**: Mobile-first responsive layout
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Custom 404 page

## API Integration

This application uses the [DummyJSON API](https://dummyjson.com) for product data.

### Endpoints Used

| Endpoint                            | Description              |
| ----------------------------------- | ------------------------ |
| `GET /products`                     | Fetch paginated products |
| `GET /products/search?q={query}`    | Search products          |
| `GET /products/category/{category}` | Filter by category       |
| `GET /products/categories`          | Get all categories       |
| `GET /products/{id}`                | Get product details      |

## Deployment

The application is deployed on [Vercel](https://vercel.com). Any push to the main branch triggers an automatic deployment.

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/product-management-web-app-nextjs)

## License

This project is private and proprietary.

---

**Author**: Rahul Mallik
