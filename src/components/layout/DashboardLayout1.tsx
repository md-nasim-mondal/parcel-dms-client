import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Package, Truck, Users, Settings, Home } from "lucide-react";
import { Link, useLocation, Outlet } from "react-router"; // ✅ Outlet import
import type { RootState } from "@/redux/store";

interface DashboardLayoutProps {
  children?: React.ReactNode; // ✅ Optional
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const navigation = {
    sender: [
      { name: "Dashboard", href: "/sender/dashboard", icon: Home },
      { name: "Create Parcel", href: "/sender/create-parcel", icon: Package },
      { name: "My Parcels", href: "/sender/parcels", icon: Truck },
    ],
    receiver: [
      { name: "Dashboard", href: "/receiver/dashboard", icon: Home },
      { name: "Incoming Parcels", href: "/receiver/parcels", icon: Package },
      { name: "Delivery History", href: "/receiver/history", icon: Truck },
    ],
    admin: [
      { name: "Dashboard", href: "/admin/dashboard", icon: Home },
      { name: "All Parcels", href: "/admin/parcels", icon: Package },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
    super_admin: [
      { name: "Dashboard", href: "/admin/dashboard", icon: Home },
      { name: "All Parcels", href: "/admin/parcels", icon: Package },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  };

  const currentNav = navigation[user?.role as keyof typeof navigation] || [];

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex'>
      {/* Sidebar */}
      <div className='w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col'>
        <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
              <Package className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-lg font-bold text-gray-900 dark:text-white'>
                SwiftDrop
              </h1>
              <p className='text-sm text-gray-500 dark:text-gray-400 capitalize'>
                {user?.role} Panel
              </p>
            </div>
          </div>
        </div>

        <nav className='p-4 space-y-2 flex-1'>
          {currentNav.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={item.name}
                asChild
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}>
                <Link to={item.href} className='flex items-center space-x-3'>
                  <item.icon className='w-5 h-5' />
                  <span>{item.name}</span>
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
          {/* <LogoutButton /> */}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        <main className='p-6'>
          {children || <Outlet />} {/* ✅ Both children and Outlet support */}
        </main>
      </div>
    </div>
  );
}
