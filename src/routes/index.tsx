import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/layout/error/ErrorBoundary";
import ProtectedRoute from "@/routes/middlewares/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import App from "@/App";
import Home from "@/pages/public/Home";
import { AppContentSkeleton } from "@/components/shared/skeletons/AppSkeleton";
import { DashboardContentSkeleton } from "@/components/shared/skeletons/DashboardSkeleton";

// 🔹 Lazy Imports
const About = lazy(() => import("@/pages/public/About"));
const Services = lazy(() => import("@/pages/public/Services"));
const ServiceDetails = lazy(() => import("@/pages/public/ServiceDetails"));
const Contact = lazy(() => import("@/pages/public/Contact"));
const Tracking = lazy(() => import("@/pages/public/TrackParcel"));
const Privacy = lazy(() => import("@/pages/public/Privacy"));
const Terms = lazy(() => import("@/pages/public/Terms"));
const Support = lazy(() => import("@/pages/public/Support"));
const Blog = lazy(() => import("@/pages/public/Blog"));
const BlogDetails = lazy(() => import("@/pages/public/BlogDetails"));
const Login = lazy(() => import("@/pages/public/authentication/Login"));
const Register = lazy(() => import("@/pages/public/authentication/Register"));
const Verify = lazy(() => import("@/pages/public/authentication/Verify"));
const ForgotPassword = lazy(
  () => import("@/pages/public/authentication/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("@/pages/public/authentication/ResetPassword")
);
const SenderDashboard = lazy(
  () => import("@/pages/sender/dashboard/SenderDashboard")
);
const SenderParcels = lazy(
  () => import("@/pages/sender/dashboard/SenderParcels")
);
const BookParcel = lazy(
  () => import("@/pages/sender/dashboard/BookParcel")
);
const ParcelStatus = lazy(
  () => import("@/pages/sender/dashboard/ParcelStatus")
);
const ReceiverDashboard = lazy(
  () => import("@/pages/receiver/dashboard/ReceiverDashboard")
);
const IncomingParcels = lazy(
  () => import("@/pages/receiver/dashboard/IncomingParcels")
);
const DeliveryHistory = lazy(
  () => import("@/pages/receiver/dashboard/DeliveryHistory")
);
const AdminDashboard = lazy(
  () => import("@/pages/admin/dashboard/AdminDashboard")
);
const ManageUsers = lazy(() => import("@/pages/admin/dashboard/ManageUsers"));
const ManageParcels = lazy(
  () => import("@/pages/admin/dashboard/ManageParcels")
);
const ViewParcelDetails = lazy(
  () => import("@/pages/admin/dashboard/ViewParcelDetails")
);
const DeliveryDashboard = lazy(
  () => import("@/pages/delivery/dashboard/DeliveryDashboard")
);
const AdminReports = lazy(
  () => import("@/pages/admin/dashboard/AdminReports")
);
const AdminSettings = lazy(
  () => import("@/pages/admin/dashboard/AdminSettings")
);
const Profile = lazy(() => import("@/pages/shared/Profile"));
const Unauthorized = lazy(() => import("@/pages/public/Unauthorized"));
const NotFound = lazy(() => import("@/pages/public/NotFound"));

// 🔹 Suspense Wrapper
// 🔹 Suspense Wrappers
const withAppSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<AppContentSkeleton />}>
    <Component />
  </Suspense>
);

const withDashboardSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<DashboardContentSkeleton />}>
    <Component />
  </Suspense>
);

const withGenericSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "/track-parcel", element: withAppSuspense(Tracking) },
      { path: "/services", element: withAppSuspense(Services) },
      { path: "/services/:id", element: withAppSuspense(ServiceDetails) },
      { path: "/about", element: withAppSuspense(About) },
      { path: "/contact", element: withAppSuspense(Contact) },
      { path: "/privacy", element: withAppSuspense(Privacy) },
      { path: "/terms", element: withAppSuspense(Terms) },
      { path: "/support", element: withAppSuspense(Support) },
      { path: "/blog", element: withAppSuspense(Blog) },
      { path: "/blog/:id", element: withAppSuspense(BlogDetails) },
    ],
  },
  {
    path: "login",
    element: withGenericSuspense(Login),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "register",
    element: withGenericSuspense(Register),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "verify",
    element: withGenericSuspense(Verify),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "forgot-password",
    element: withGenericSuspense(ForgotPassword),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "reset-password",
    element: withGenericSuspense(ResetPassword),
    errorElement: <ErrorBoundary />,
  },

  // 🔹 Sender Dashboard
  {
    path: "/sender/dashboard",
    element: (
      <ProtectedRoute children={<DashboardLayout />} requiredRole='sender' />
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: withDashboardSuspense(SenderDashboard) },
      { path: "dashboard", element: withDashboardSuspense(SenderDashboard) },
      { path: "profile", element: withDashboardSuspense(Profile) },
      { path: "parcels", element: withDashboardSuspense(SenderParcels) },
      { path: "book-parcel", element: withDashboardSuspense(BookParcel) },
      { path: "parcels/status/:id", element: withDashboardSuspense(ParcelStatus) },
    ],
  },

  // 🔹 Receiver Dashboard
  {
    path: "/receiver/dashboard",
    element: (
      <ProtectedRoute children={<DashboardLayout />} requiredRole='receiver' />
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: withDashboardSuspense(ReceiverDashboard) },
      { path: "dashboard", element: withDashboardSuspense(ReceiverDashboard) },
      { path: "profile", element: withDashboardSuspense(Profile) },
      { path: "incoming-parcels", element: withDashboardSuspense(IncomingParcels) },
      { path: "delivery-history", element: withDashboardSuspense(DeliveryHistory) },
    ],
  },
  
  // 🔹 Delivery Man Dashboard
  {
    path: "/delivery-men/dashboard",
    element: (
      <ProtectedRoute children={<DashboardLayout />} requiredRole='delivery_men' />
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: withDashboardSuspense(DeliveryDashboard) },
      { path: "dashboard", element: withDashboardSuspense(DeliveryDashboard) },
      { path: "profile", element: withDashboardSuspense(Profile) },
    ],
  },

  // 🔹 Admin Dashboard
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute
        children={<DashboardLayout />}
        requiredRole={["admin", "super_admin"]}
      />
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: withDashboardSuspense(AdminDashboard) },
      { path: "dashboard", element: withDashboardSuspense(AdminDashboard) },
      { path: "profile", element: withDashboardSuspense(Profile) },
      { path: "manage-users", element: withDashboardSuspense(ManageUsers) },
      { path: "manage-parcels", element: withDashboardSuspense(ManageParcels) },
      { path: "parcel/details/:id", element: withDashboardSuspense(ViewParcelDetails) },
      { path: "reports", element: withDashboardSuspense(AdminReports) },
      { path: "settings", element: withDashboardSuspense(AdminSettings) },
    ],
  },

  { path: "/unauthorized", element: withGenericSuspense(Unauthorized) },
  { path: "*", element: withGenericSuspense(NotFound) },
]);
