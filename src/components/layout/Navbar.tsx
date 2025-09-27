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
import { Link, useNavigate } from "react-router";
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
} from "lucide-react";
import { Logo } from "@/assets/icons/Logo";
import { ModeToggle } from "./ModeToggler";
// import { useAppSelector, useAppDispatch } from "@/hooks/redux";
// import { logout } from "@/store/slices/authSlice";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", icon: Home, role: "PUBLIC" },
  { href: "/tracking", label: "Track Package", icon: Package, role: "PUBLIC" },
  { href: "/services", label: "Services", icon: Truck, role: "PUBLIC" },
  { href: "/about", label: "About", icon: ShieldAlert, role: "PUBLIC" },
];

const dashboardLinks = {
  sender: { href: "/dashboard/sender", label: "Sender Dashboard" },
  receiver: { href: "/dashboard/receiver", label: "Receiver Dashboard" },
  admin: { href: "/dashboard/admin", label: "Admin Dashboard" },
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
    navigate("/");
    setMobileMenuOpen(false);
  };

  // Mock user data - Replace with actual Redux state
  const user = {
    name: "Super Admin",
    email: "super@gmail.com",
    role: "admin",
    pic: "", // Empty string for no image
  };
  const isAuthenticated = true;

  const getDashboardLink = () => {
    if (!user) return null;
    return dashboardLinks[user.role as keyof typeof dashboardLinks];
  };

  const dashboardLink = getDashboardLink();

  // User avatar fallback if no image
  const getUserAvatar = () => {
    if (user.pic) {
      return (
        <img
          src={user.pic}
          alt={user.name}
          className='size-8 rounded-full object-cover'
        />
      );
    }
    // Fallback to initials avatar
    const initials = user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    return (
      <div className='size-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm'>
        {initials}
      </div>
    );
  };

  return (
    <header className='border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50'>
      <div className='container mx-auto px-4 flex h-16 items-center justify-between'>
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
            <NavigationMenuList className='gap-2'>
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2'>
                    <Link className='text-nowrap' to={link.href}>
                      {link.icon && (
                        <link.icon className='w-4 h-4 mr-1 inline' />
                      )}
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side - Auth and Mobile Menu */}
        <div className='flex items-center gap-4'>
          {/* Dark Mode Toggle */}
          <ModeToggle />
          {/* Desktop Auth Buttons */}
          <div className='flex items-center gap-2 max-lg:hidden'>
            {isAuthenticated ? (
              <div className='flex items-center gap-4'>
                {/* Dashboard Link Button */}

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='rounded-full p-0 hover:bg-gray-100 dark:hover:bg-gray-800'>
                      {getUserAvatar()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-56'>
                    <DropdownMenuLabel>
                      <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium'>{user.name}</p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          {user.email}
                        </p>
                        <p className='text-xs text-blue-600 dark:text-blue-400 capitalize'>
                          {user.role}
                        </p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {dashboardLink && (
                      <DropdownMenuItem asChild>
                        <Link
                          to='/dashboard'
                          className='flex items-center w-full'>
                          <LayoutDashboard className='w-4 h-4 mr-2' />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem asChild>
                      <Link to='/profile' className='flex items-center w-full'>
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
                <Button asChild variant='ghost' size='sm'>
                  <Link
                    to='/login'
                    className='text-gray-700 dark:text-gray-300'>
                    Login
                  </Link>
                </Button>
                <Button
                  asChild
                  size='sm'
                  className='bg-blue-600 hover:bg-blue-700 text-white'>
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
              className='w-64 p-4 lg:hidden mt-2'
              sideOffset={10}>
              {/* User Info for Mobile */}
              {isAuthenticated && (
                <div className='flex items-center gap-3 p-3 mb-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                  {getUserAvatar()}
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                      {user.name}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                      {user.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Mobile Navigation */}
              <div className='space-y-2'>
                {navigationLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className='flex items-center gap-3 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors'
                    onClick={() => setMobileMenuOpen(false)}>
                    {link.icon && <link.icon className='w-4 h-4' />}
                    <span className='font-medium'>{link.label}</span>
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                <div className='pt-3 border-t border-gray-200 dark:border-gray-700'>
                  {isAuthenticated ? (
                    <div className='space-y-2'>
                      {dashboardLink && (
                        <Button
                          asChild
                          variant='ghost'
                          size='sm'
                          className='w-full justify-start'>
                          <Link
                            to='/dashboard'
                            onClick={() => setMobileMenuOpen(false)}>
                            <LayoutDashboard className='w-4 h-4 mr-2' />
                            Dashboard
                          </Link>
                        </Button>
                      )}
                      <Button
                        asChild
                        variant='ghost'
                        size='sm'
                        className='w-full justify-start'>
                        <Link
                          to='/profile'
                          onClick={() => setMobileMenuOpen(false)}>
                          <User className='w-4 h-4 mr-2' />
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
                        className='w-full justify-start'>
                        <Link
                          to='/login'
                          onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size='sm'
                        className='w-full justify-start bg-blue-600 hover:bg-blue-700 text-white'>
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
