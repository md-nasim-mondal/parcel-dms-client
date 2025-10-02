import { RegisterForm } from "@/components/authentication/RegisterForm";
import { Package, Truck } from "lucide-react";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'> {/* ✅ Back to normal max-width */}
        {/* Compact Logo Section */}
        <div className='text-center mb-6'>
          <div className='flex justify-center mb-3'>
            <div className='relative'>
              <div className='w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-md'>
                <Package className='w-6 h-6 text-blue-600 dark:text-blue-400' />
              </div>
              <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900'>
                <Truck className='w-3 h-3 text-white' />
              </div>
            </div>
          </div>
          <h1 className='text-xl font-bold text-gray-900 dark:text-white mb-1'>
            Join SwiftDrop
          </h1>
          <p className='text-gray-600 dark:text-gray-300 text-sm'>
            Create your account in seconds
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Compact Footer Note */}
        <div className='text-center mt-4'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            By creating an account, you agree to our{" "}
            <Link
              to='/terms'
              className='hover:text-gray-700 dark:hover:text-gray-300 transition-colors hover:underline'>
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to='/privacy'
              className='hover:text-gray-700 dark:hover:text-gray-300 transition-colors hover:underline'>
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;