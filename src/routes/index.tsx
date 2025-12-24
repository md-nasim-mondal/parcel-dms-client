import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/layout/error/ErrorBoundary";
import ProtectedRoute from "@/routes/middlewares/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import App from "@/App";
import Home from "@/pages/public/Home";
import LoadingSpinner from "@/components/layout/loading/LoadingSpinner";

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
const Profile = lazy(() => import("@/pages/shared/Profile"));
const Unauthorized = lazy(() => import("@/pages/public/Unauthorized"));
const NotFound = lazy(() => import("@/pages/public/NotFound"));

// 🔹 Suspense Wrapper
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
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
      { path: "/track-parcel", element: withSuspense(Tracking) },
      { path: "/services", element: withSuspense(Services) },
      { path: "/services/:id", element: withSuspense(ServiceDetails) },
      { path: "/about", element: withSuspense(About) },
      { path: "/contact", element: withSuspense(Contact) },
      { path: "/privacy", element: withSuspense(Privacy) },
      { path: "/terms", element: withSuspense(Terms) },
      { path: "/support", element: withSuspense(Support) },
      { path: "/blog", element: withSuspense(Blog) },
      { path: "/blog/:id", element: withSuspense(BlogDetails) },
    ],
  },
  {
    path: "login",
    element: withSuspense(Login),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "register",
    element: withSuspense(Register),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "verify",
    element: withSuspense(Verify),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "forgot-password",
    element: withSuspense(ForgotPassword),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "reset-password",
    element: withSuspense(ResetPassword),
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
      { index: true, element: withSuspense(SenderDashboard) },
      { path: "dashboard", element: withSuspense(SenderDashboard) },
      { path: "profile", element: withSuspense(Profile) },
      { path: "parcels", element: withSuspense(SenderParcels) },
      { path: "parcels/status/:id", element: withSuspense(ParcelStatus) },
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
      { index: true, element: withSuspense(ReceiverDashboard) },
      { path: "dashboard", element: withSuspense(ReceiverDashboard) },
      { path: "profile", element: withSuspense(Profile) },
      { path: "incoming-parcels", element: withSuspense(IncomingParcels) },
      { path: "delivery-history", element: withSuspense(DeliveryHistory) },
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
      { index: true, element: withSuspense(DeliveryDashboard) },
      { path: "dashboard", element: withSuspense(DeliveryDashboard) },
      { path: "profile", element: withSuspense(Profile) },
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
      { index: true, element: withSuspense(AdminDashboard) },
      { path: "dashboard", element: withSuspense(AdminDashboard) },
      { path: "profile", element: withSuspense(Profile) },
      { path: "manage-users", element: withSuspense(ManageUsers) },
      { path: "manage-parcels", element: withSuspense(ManageParcels) },
      { path: "parcel/details/:id", element: withSuspense(ViewParcelDetails) },
    ],
  },

  { path: "/unauthorized", element: withSuspense(Unauthorized) },
  { path: "*", element: withSuspense(NotFound) },
]);
