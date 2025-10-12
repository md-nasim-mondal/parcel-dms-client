import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { Package, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Credentials Modal Component
const CredentialsModal = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const credentials = [
    { role: "Admin", email: "bedonad434@ekuali.com", pass: "12345@Mn" },
    { role: "Sender", email: "vilicab354@poesd.com", pass: "12345@Mn" },
    { role: "Receiver", email: "ciweto1555@ekuali.com", pass: "12345@Mn" }
  ];

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'
      onClick={() => setIsOpen(false)} // Overlay click to close
    >
      <div
        className='relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800'
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        <button
          onClick={() => setIsOpen(false)}
          className='absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-colors hover:bg-red-500 hover:text-white dark:bg-gray-700 dark:text-gray-200'>
          ✕
        </button>
        <h3 className='mb-4 text-center text-xl font-bold text-gray-900 dark:text-white'>
          Demo Credentials
        </h3>
        <div className='space-y-4'>
          {credentials.map((cred) => (
            <div
              key={cred.role}
              className='rounded-lg bg-gray-100 p-3 dark:bg-gray-700'>
              <h4 className='font-semibold text-blue-600 dark:text-blue-400'>
                {cred.role}
              </h4>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                <strong>Email:</strong> {cred.email}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                <strong>Password:</strong> {cred.pass}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600'></div>
      </div>
    );
  }

  return (
    <>
      {isModalOpen && <CredentialsModal setIsOpen={setIsModalOpen} />}

      <div className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900 flex flex-col items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          {/* Logo Section */}
          <div className='text-center mb-6'>
            <div className='flex justify-center mb-3'>
              <div
                onClick={() => navigate("/")}
                className='relative cursor-pointer'>
                <div className='w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg'>
                  <Package className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                </div>
                <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900'>
                  <Truck className='w-4 h-4 text-white' />
                </div>
              </div>
            </div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>
              Welcome Back!
            </h1>
            <p className='text-gray-600 dark:text-gray-300 text-sm'>
              Sign in to continue to your account.
            </p>
          </div>

          <LoginForm setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
    </>
  );
};

export default Login;
