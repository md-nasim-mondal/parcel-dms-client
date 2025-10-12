import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate, useLocation } from "react-router";
import {
  Package,
  Truck,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Home,
  ShieldAlert,
  Contact,
} from "lucide-react";
import { Logo } from "@/assets/icons/Logo";
import { ModeToggle } from "./ModeToggler";
import { cn } from "@/lib/utils";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/features/auth/auth.slice";
import { useAuth } from "@/hooks/useAuth";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", icon: Home, role: "PUBLIC" },
  { href: "/track-parcel", label: "Track Parcel", icon: Package, role: "PUBLIC" },
  { href: "/services", label: "Services", icon: Truck, role: "PUBLIC" },
  { href: "/contact", label: "Contact", icon: Contact, role: "PUBLIC" },
  { href: "/about", label: "About", icon: ShieldAlert, role: "PUBLIC" },
];

const dashboardLinks = {
  sender: { href: "/sender/dashboard", label: "Sender Dashboard" },
  receiver: { href: "/receiver/dashboard", label: "Receiver Dashboard" },
  admin: { href: "/admin/dashboard", label: "Admin Dashboard" },
  super_admin: { href: "/admin/dashboard", label: "Admin Dashboard" },
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      dispatch(logoutAction());
      dispatch(authApi.util.resetApiState()); // cache clear
      navigate("/", { replace: true });
      setMobileMenuOpen(false);
    }
  };

  const getDashboardLink = () => {
    if (!user) return null;
    return dashboardLinks[user.role as keyof typeof dashboardLinks];
  };

  const dashboardLink = getDashboardLink();

  // Check if a route is active
  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  // User avatar fallback if no image
  const getUserAvatar = () => {
    if (!user) return null;

    // If user has profile picture
    if (user.picture) {
      return (
        <img
          src={user.picture}
          alt={user.name}
          className='size-8 rounded-full object-cover'
        />
      );
    }

    // Fallback to initials avatar
    const initials = user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <div className='size-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm'>
        {initials}
      </div>
    );
  };

  return (
    <header className='border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50'>
      <div className='container mx-auto px-2 md:px-4 flex h-16 items-center justify-between'>
        {/* Left side - Logo and Navigation */}
        <div className='flex items-center gap-6'>
          {/* Logo */}
          <Link
            to='/'
            className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
            <Logo size='md' />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className='max-lg:hidden'>
            <NavigationMenuList className='gap-1'>
              {navigationLinks.map((link, index) => {
                const isActive = isActiveRoute(link.href);
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={link.href}
                        className={cn(
                          "flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                          "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
                          "hover:bg-blue-50 dark:hover:bg-blue-950/30",
                          isActive &&
                            "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
                          isActive &&
                            "border border-blue-200 dark:border-blue-800"
                        )}>
                        {link.icon && <link.icon className='w-4 h-4' />}
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side - Auth and Mobile Menu */}
        <div className='flex items-center gap-4'>
          {/* Dark Mode Toggle */}
          <ModeToggle />

          {/* Desktop Auth Buttons */}
          <div className='flex items-center gap-2 max-lg:hidden'>
            {isAuthenticated && user ? (
              <div className='flex items-center gap-4'>
                {/* Dashboard Link Button */}
                {/* {dashboardLink && (
                  <Button
                    asChild
                    variant='outline'
                    size='sm'
                    className={cn(
                      "border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20",
                      isActiveRoute(dashboardLink.href) &&
                        "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700"
                    )}>
                    <Link
                      to={dashboardLink.href}
                      className='flex items-center gap-2'>
                      <LayoutDashboard className='w-4 h-4' />
                      Dashboard
                    </Link>
                  </Button>
                )} */}

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className={cn(
                        "rounded-full p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
                        isActiveRoute("/profile") &&
                          "ring-2 ring-blue-200 dark:ring-blue-800"
                      )}>
                      {getUserAvatar()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-56 dark:bg-slate-800'>
                    <DropdownMenuLabel>
                      <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium'>{user.name}</p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          {user.email}
                        </p>
                        <p className='text-xs text-blue-600 dark:text-blue-400'>
                          You are a{" "}
                          <span className="capitalize">
                          {user.role === "super_admin"
                            ? "Super Admin"
                            : user.role}
                          </span>
                        </p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {dashboardLink && (
                      <DropdownMenuItem asChild>
                        <Link
                          to={dashboardLink.href}
                          className={cn(
                            "flex items-center w-full cursor-pointer",
                            isActiveRoute(dashboardLink.href) &&
                              "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          )}>
                          <LayoutDashboard className='w-4 h-4 mr-2' />
                          {dashboardLink.label}
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem asChild>
                      <Link
                        to='/profile'
                        className={cn(
                          "flex items-center w-full cursor-pointer",
                          isActiveRoute("/profile") &&
                            "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        )}>
                        <User className='w-4 h-4 mr-2' />
                        My Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className='text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 cursor-pointer'>
                      <LogOut className='w-4 h-4 mr-2' />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Button
                  asChild
                  variant='ghost'
                  size='sm'
                  className={cn(
                    "text-gray-700 dark:text-gray-300",
                    isActiveRoute("/login") &&
                      "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                  )}>
                  <Link to='/login'>Login</Link>
                </Button>
                <Button
                  asChild
                  size='sm'
                  className={cn(
                    "bg-blue-600 hover:bg-blue-700 text-white",
                    isActiveRoute("/register") && "bg-blue-700 dark:bg-blue-600"
                  )}>
                  <Link to='/register'>Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <Popover open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <PopoverTrigger asChild className='lg:hidden'>
              <Button variant='ghost' size='icon' className='relative z-50'>
                {mobileMenuOpen ? (
                  <X className='w-5 h-5' />
                ) : (
                  <Menu className='w-5 h-5' />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align='end'
              className='w-64 dark:bg-slate-800 p-4 lg:hidden mt-2 max-h-[80vh] overflow-y-auto'
              sideOffset={10}>
              {/* User Info for Mobile */}
              {isAuthenticated && user && (
                <div className='flex items-center gap-3 p-3 mb-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                  {getUserAvatar()}
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                      {user.name}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-white truncate'>
                      {user.email}
                    </p>
                    <p className='text-xs text-blue-600 dark:text-blue-400 capitalize'>
                      You are a{" "}
                      {user.role === "super_admin" ? "Super Admin" : user.role}
                    </p>
                  </div>
                </div>
              )}

              {/* Mobile Navigation */}
              <div className='space-y-1'>
                {navigationLinks.map((link, index) => {
                  const isActive = isActiveRoute(link.href);
                  return (
                    <Link
                      key={index}
                      to={link.href}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                        "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
                        "hover:bg-blue-50 dark:hover:bg-blue-950/30",
                        isActive &&
                          "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
                        isActive &&
                          "border border-blue-200 dark:border-blue-800"
                      )}
                      onClick={() => setMobileMenuOpen(false)}>
                      {link.icon && <link.icon className='w-4 h-4' />}
                      <span className='font-medium'>{link.label}</span>
                    </Link>
                  );
                })}

                {/* Mobile Auth Section */}
                <div className='pt-3 border-t border-gray-200 dark:border-gray-700'>
                  {isAuthenticated && user ? (
                    <div className='space-y-1'>
                      {dashboardLink && (
                        <Button
                          asChild
                          variant='ghost'
                          size='sm'
                          className={cn(
                            "w-full justify-start",
                            isActiveRoute(dashboardLink.href) &&
                              "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                          )}>
                          <Link
                            to={dashboardLink.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className='flex items-center gap-2'>
                            <LayoutDashboard className='w-4 h-4' />
                            {dashboardLink.label}
                          </Link>
                        </Button>
                      )}
                      <Button
                        asChild
                        variant='ghost'
                        size='sm'
                        className={cn(
                          "w-full justify-start",
                          isActiveRoute("/profile") &&
                            "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                        )}>
                        <Link
                          to='/profile'
                          onClick={() => setMobileMenuOpen(false)}
                          className='flex items-center gap-2'>
                          <User className='w-4 h-4' />
                          My Profile
                        </Link>
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant='outline'
                        size='sm'
                        className='w-full justify-start border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950'>
                        <LogOut className='w-4 h-4 mr-2' />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className='space-y-2'>
                      <Button
                        asChild
                        variant='ghost'
                        size='sm'
                        className={cn(
                          "w-full justify-start",
                          isActiveRoute("/login") &&
                            "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                        )}>
                        <Link
                          to='/login'
                          onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size='sm'
                        className={cn(
                          "w-full justify-start bg-blue-600 hover:bg-blue-700 text-white",
                          isActiveRoute("/register") &&
                            "bg-blue-700 dark:bg-blue-600"
                        )}>
                        <Link
                          to='/register'
                          onClick={() => setMobileMenuOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
