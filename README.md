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


```
├── .git/ 🚫 (auto-hidden)
├── .vercel/ 🚫 (auto-hidden)
├── dist/ 🚫 (auto-hidden)
├── node_modules/ 🚫 (auto-hidden)
├── public/
│   ├── logo.png
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── Logo.tsx
│   │   │   └── logo.png
│   │   ├── images/
│   │   └── react.svg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── error/
│   │   │   │   └── ErrorBoundary.tsx
│   │   │   ├── loading/
│   │   │   │   └── LoadingSpinner.tsx
│   │   │   ├── CommonLayout.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ModeToggler.tsx
│   │   │   └── Navbar.tsx
│   │   ├── modules/
│   │   │   ├── admin/
│   │   │   │   ├── parcels/
│   │   │   │   │   ├── AdminParcelDetails.tsx
│   │   │   │   │   ├── AdminParcelModal.tsx
│   │   │   │   │   ├── AdminParcelTimeLine.tsx
│   │   │   │   │   └── ParcelManagementTable.tsx
│   │   │   │   └── users/
│   │   │   │       ├── CreateStuff.tsx
│   │   │   │       └── UsersTable.tsx
│   │   │   ├── authentication/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── charts/
│   │   │   │   └── index.tsx
│   │   │   ├── receiver/
│   │   │   │   ├── ReceiverHistoryParcelTable.tsx
│   │   │   │   └── ReceiverIncomingParcelTable.tsx
│   │   │   └── sender/
│   │   │       ├── SendParcelModal.tsx
│   │   │       ├── SenderParcelTable.tsx
│   │   │       ├── StatusDetails.tsx
│   │   │       └── StatusTimeLine.tsx
│   │   ├── ui/
│   │   │   ├── shadcn-io/
│   │   │   │   └── spinner/
│   │   │   │       └── index.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── password.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── tooltip.tsx
│   │   ├── DeleteConformation.tsx
│   │   ├── Error.tsx
│   │   ├── Information.tsx
│   │   ├── Loading.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── nav-main.tsx
│   │   ├── nav-projects.tsx
│   │   ├── nav-user.tsx
│   │   └── team-switcher.tsx
│   ├── config/
│   │   └── index.ts
│   ├── constants/
│   │   └── role.ts
│   ├── context/
│   │   └── theme.context.ts
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   ├── useAuth.ts
│   │   ├── useSidebarLinks.tsx
│   │   └── useTheme.ts
│   ├── lib/
│   │   ├── axios.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── admin/
│   │   │   └── dashboard/
│   │   │       ├── AdminDashboard.tsx
│   │   │       ├── ManageParcels.tsx
│   │   │       ├── ManageUsers.tsx
│   │   │       └── ViewParcelDetails.tsx
│   │   ├── public/
│   │   │   ├── authentication/
│   │   │   │   ├── ForgotPassword.tsx
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Register.tsx
│   │   │   │   ├── ResetPassword.tsx
│   │   │   │   └── Verify.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── TrackParcel.tsx
│   │   │   └── Unauthorized.tsx
│   │   ├── receiver/
│   │   │   └── dashboard/
│   │   │       ├── DeliveryHistory.tsx
│   │   │       ├── IncomingParcels.tsx
│   │   │       └── ReceiverDashboard.tsx
│   │   ├── sender/
│   │   │   └── dashboard/
│   │   │       ├── ParcelStatus.tsx
│   │   │       ├── SenderDashboard.tsx
│   │   │       └── SenderParcels.tsx
│   │   └── shared/
│   │       └── Profile.tsx
│   ├── providers/
│   │   └── theme.provider.tsx
│   ├── redux/
│   │   ├── api/
│   │   │   ├── axiosBaseQuery.ts
│   │   │   └── baseApi.ts
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── auth.api.ts
│   │   │   │   └── auth.slice.ts
│   │   │   ├── parcel/
│   │   │   │   └── parcel.api.ts
│   │   │   ├── stats/
│   │   │   │   └── stats.api.ts
│   │   │   └── user/
│   │   │       └── user.api.ts
│   │   ├── hook.ts
│   │   └── store.ts
│   ├── routes/
│   │   ├── middlewares/
│   │   │   └── ProtectedRoute.tsx
│   │   └── index.tsx
│   ├── types/
│   │   ├── auth.type.ts
│   │   ├── index.ts
│   │   ├── parcel.type.ts
│   │   ├── sender.parcel.type.ts
│   │   └── user.type.ts
│   ├── utils/
│   │   ├── generateRoutes.ts
│   │   ├── getNameInitials.ts
│   │   └── getStatusColor.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.local 🚫 (auto-hidden)
├── .gitignore
├── README.md
├── bun.lock
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```




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