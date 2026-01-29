# Next.js E-commerce Platform

A comprehensive e-commerce application built with Next.js 14, leveraging Wix Headless for backend services and Razorpay for payments. This platform supports browsing products, shopping cart functionality, user authentication, and order management.

## Features

- **Storefront**: Browse products with detailed views and media galleries.
- **Cart & Checkout**: specialized shopping cart and seamless checkout flow using generic providers and Wix E-com.
- **User Accounts**: Authentication and profile management powered by Wix Members.
- **Order History**: Users can view their past orders and status.
- **Responsive Design**: Modern UI built with Tailwind CSS and ShadCN UI/Radix Primitives.
- **State Management**: Client-side state handling with Zustand.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (Icons)
- **Backend Service**: [Wix Headless](https://dev.wix.com/api/sdk) (E-com, Stores, Members, SDK)
- **Authentication**: Wix OAuth / NextAuth
- **Media**: Cloudinary / Wix Media
- **Payment Gateway**: Razorpay

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up Environment Variables:
   Create a `.env` file in the root directory and add the following keys:

   ```env
   # Wix Headless Configuration
   NEXT_PUBLIC_WIX_SITE_ID=your_wix_site_id
   NEXT_PUBLIC_WIX_API_ID=your_wix_api_id
   NEXT_PUBLIC_WIX_CLIENT_ID=your_wix_client_id
   NEXT_PUBLIC_WIX_APP_ID=your_wix_app_id

   # Payment Gateway (Razorpay)
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

### Running the Project

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and Wix Client configuration.
- `src/hooks`: Custom React hooks.
- `src/context`: React Context providers.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint configuration.

## License

[MIT](LICENSE)
