import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
import { Package, Truck } from "lucide-react";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900 flex flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Logo Section */}
        <div className='text-center mb-6'>
          <div className='flex justify-center mb-3'>
            <div onClick={() => navigate("/")} className='relative'>
              <div className='w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg'>
                <Package className='w-8 h-8 text-blue-600 dark:text-blue-400' />
              </div>
              <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900'>
                <Truck className='w-4 h-4 text-white' />
              </div>
            </div>
          </div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>
            Create Your SwiftDrop Account
          </h1>
          <p className='text-gray-600 dark:text-gray-300 text-sm'>
            Join us and experience seamless delivery.
          </p>
        </div>

        {/* Register Form Component */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
