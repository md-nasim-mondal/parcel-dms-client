import App from "@/App";
import About from "@/pages/public/About";
import Login from "@/pages/public/authentication/Login";
import Register from "@/pages/public/authentication/Register";
import Contact from "@/pages/public/Contact";
import Home from "@/pages/public/Home";
import Services from "@/pages/public/Services";
import Tracking from "@/pages/public/TrackParcel";
import { createBrowserRouter } from "react-router";
import ErrorBoundary from "@/components/layout/error/ErrorBoundary";
import ProtectedRoute from "@/routes/middlewares/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SenderDashboard from "@/pages/sender/dashboard/SenderDashboard";
import ReceiverDashboard from "@/pages/receiver/dashboard/ReceiverDashboard";
import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import Verify from "@/pages/public/authentication/Verify";
import CreateParcel from "@/pages/sender/dashboard/CreateParcel";
import MyParcels from "@/pages/sender/dashboard/MyParcels";
import ReceiverParcels from "@/pages/receiver/dashboard/ReceiverParcels";
import ManageUsers from "@/pages/admin/dashboard/ManageUsers";
import ManageParcels from "@/pages/admin/dashboard/ManageParcels";
import ForgotPassword from "@/pages/public/authentication/ForgotPassword";
import ResetPassword from "@/pages/public/authentication/ResetPassword";
import Profile from "@/pages/shared/Profile";
import ParcelHistory from "@/pages/receiver/dashboard/ParcelHistory";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    errorElement: <ErrorBoundary />,
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: Tracking,
        path: "/tracking",
      },
      {
        Component: Services,
        path: "/services",
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: Contact,
        path: "/contact",
      },
    ],
  },
  {
    Component: Login,
    path: "login",
    errorElement: <ErrorBoundary />,
  },
  {
    Component: Register,
    path: "register",
    errorElement: <ErrorBoundary />,
  },
  {
    Component: Verify,
    path: "verify",
    errorElement: <ErrorBoundary />,
  },
  {
    Component: ForgotPassword,
    path: "forgot-password",
    errorElement: <ErrorBoundary />,
  },
  {
    Component: ResetPassword,
    path: "reset-password",
    errorElement: <ErrorBoundary />,
  },
  // ✅ Protected Dashboard Routes - Fixed structure
  {
    path: "/sender/dashboard",
    element: (
      <ProtectedRoute children={<DashboardLayout />} requiredRole='sender' />
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        Component: SenderDashboard,
      },
      {
        path: "dashboard",
        Component: SenderDashboard,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "create-parcel",
        Component: CreateParcel,
      },
    ],
  },
  {
    path: "/receiver/dashboard",
    element: (
      <ProtectedRoute children={<DashboardLayout />} requiredRole='receiver' />
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        Component: ReceiverDashboard,
      },
      {
        path: "dashboard",
        Component: ReceiverDashboard,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "incoming-parcels",
        Component: ReceiverParcels,
      },
      {
        path: "delivery-history",
        Component: ParcelHistory,
      },
    ],
  },
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
      {
        index: true,
        Component: AdminDashboard,
      },
      {
        path: "dashboard",
        Component: AdminDashboard,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "manage-users",
        Component: ManageUsers,
      },
      {
        path: "manage-parcels",
        Component: ManageParcels,
      },
    ],
  },
]);
