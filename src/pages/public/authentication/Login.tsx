import { LoginForm } from "@/components/authentication/LoginForm";
import { Package, Truck } from "lucide-react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Logo Section */}
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-4'>
            <div className='relative'>
              <div className='w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg'>
                <Package className='w-8 h-8 text-blue-600 dark:text-blue-400' />
              </div>
              <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900'>
                <Truck className='w-3 h-3 text-white' />
              </div>
            </div>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Sign in to your SwiftDrop account
          </p>
        </div>
        {/* Login Form */}
        <LoginForm />
        {/* Footer Note */}
        <div className='text-center mt-8'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            By continuing, you agree to our{" "}
            <Link
              to='/terms'
              className='hover:text-gray-700 dark:hover:text-gray-300 transition-colors'>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to='/privacy'
              className='hover:text-gray-700 dark:hover:text-gray-300 transition-colors'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
