# Parcel Delivery Management System - Client

![Logo](./public/logo.png)

## Overview

The Parcel Delivery Management System is a comprehensive web application designed to streamline the parcel delivery process. This client-side application provides an intuitive interface for different user roles including senders, receivers, and administrators to manage the entire parcel delivery lifecycle.

🔗 **Live Demo**: [https://parcel-dms.vercel.app](https://parcel-dms.vercel.app)
🔗 **Backend Repository**: `https://github.com/md-nasim-mondal/parcel-dms-server`

## Features

### For All Users
- **User Authentication**: Secure login, registration, email verification, and password recovery
- **Parcel Tracking**: Real-time tracking of parcels using tracking IDs
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **Dark/Light Mode**: Theme switching capability for better user experience

### For Senders
- **Dashboard**: Overview of all sent parcels and delivery statistics
- **Parcel Management**: Create, view, and manage parcels
- **Status Tracking**: Monitor the status of all sent parcels
- **Parcel Cancellation**: Cancel parcels if not yet dispatched

### For Receivers
- **Dashboard**: View incoming parcels and delivery history
- **Incoming Parcels**: Manage and track parcels that are being delivered
- **Delivery History**: Access history of all received parcels
- **Delivery Confirmation**: Confirm parcel delivery upon receipt

### For Administrators
- **Admin Dashboard**: Comprehensive overview of system activities
- **User Management**: Manage all users in the system (block/unblock users)
- **Parcel Management**: View and update the status of all parcels
- **Delivery Personnel Assignment**: Assign delivery personnel to parcels
- **Detailed Reports**: Generate and view detailed reports
- **Coupon Management**: Create and manage discount coupons

## Technologies Used

- **React 19**: For building the user interface
- **TypeScript**: For type-safe code
- **Vite**: For fast development and optimized builds
- **Redux Toolkit**: For state management
- **React Router**: For navigation
- **Tailwind CSS**: For styling
- **Shadcn UI**: For accessible UI components
- **Radix UI**: For headless UI primitives
- **React Hook Form**: For form handling
- **Zod**: For form validation
- **Axios**: For API requests
- **Recharts**: For data visualization
- **JWT**: For authentication
- **Lucide React**: For icons
- **Next Themes**: For theme management
- **Date-fns**: For date manipulation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or Bun package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/md-nasim-mondal/parcel-dms-client
   cd parcel-dms-client
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   bun install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_BASE_URL=https://parcel-dms-server.vercel.app
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
bun run build
```

### Preview Production Build

```bash
npm run preview
# or
bun run preview
```

## Project Structure

src/
├── assets/          # Static assets like images and icons
│   ├── icons/       # Icon assets
│   └── images/      # Image assets
├── components/      # Reusable UI components
│   ├── ui/          # Shadcn UI components
│   ├── layout/      # Layout components
│   └── modules/     # Feature-specific components
├── config/          # Configuration files
├── constants/       # Constant values used across the app
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── pages/           # Page components organized by user roles
│   ├── admin/       # Admin-specific pages
│   ├── public/      # Public pages (login, register, etc.)
│   ├── receiver/    # Receiver-specific pages
│   ├── sender/      # Sender-specific pages
│   └── shared/      # Shared pages across roles
├── providers/       # Provider components
├── redux/           # Redux store, slices, and API
│   ├── api/         # RTK Query API slices
│   ├── features/    # Redux feature slices
│   ├── hook.ts      # Typed hooks
│   └── store.ts     # Store configuration
├── routes/          # Routing configuration
│   └── middlewares/ # Route protection middlewares
├── types/           # TypeScript type definitions
└── utils/           # Utility functions



## User Roles & Permissions

### 🔐 Admin
- System administrators who manage users and parcels
- Can block/unblock users and parcels
- Assign delivery personnel
- Create coupons and manage system settings

### 📦 Sender
- Users who send parcels
- Can create, view, and cancel parcels
- Track parcel status and delivery progress

### 📬 Receiver
- Users who receive parcels
- View incoming parcels and delivery history
- Confirm parcel delivery

### 🚚 Delivery Personnel
- Handle parcel pickup and delivery
- Update parcel status during transit

## API Integration

The client application communicates with the backend API for all data operations. The API base URL is configured in the `.env` file.

**Backend Features:**
- JWT-based authentication
- Role-based access control
- OTP verification system
- Email notifications
- Parcel tracking with unique IDs
- Dynamic fee calculation
- Coupon system

## Test Credentials

For testing purposes, you can use these credentials:
// ADMIN
Email: bedonad434@ekuali.com Password: 12345@Mn

// SENDER
Email: vilicab354@poesd.com Password: 12345@Mn

// RECEIVER
Email: ciweto1555@ekuali.com Password: 12345@Mn


## Deployment

This application is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for proper routing and deployment settings.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

---

**Made with ❤️ for efficient parcel delivery management**