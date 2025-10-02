import LoadingSpinner from "@/components/layout/loading/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[]; // ✅ Single role or array of roles
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner text='Checking authentication...' />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        state={{
          from: location,
          message: "Please login to access this page",
        }}
        replace
      />
    );
  }

  // If user data is not available yet, show loading
  if (!user) {
    return <LoadingSpinner text='Loading user data...' />;
  }

  // Check role-based access
  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];
    const hasAccess = allowedRoles.includes(user.role);

    if (!hasAccess) {
      console.log(
        `Access denied: User role ${user.role} not in allowed roles:`,
        allowedRoles
      );

      // Redirect to appropriate dashboard based on user's actual role
      switch (user.role) {
        case "sender":
          return <Navigate to='/sender/dashboard' replace />;
        case "receiver":
          return <Navigate to='/receiver/dashboard' replace />;
        case "admin":
        case "super_admin":
          return <Navigate to='/admin/dashboard' replace />;
        default:
          return <Navigate to='/' replace />;
      }
    }
  }

  return <>{children}</>;
}
