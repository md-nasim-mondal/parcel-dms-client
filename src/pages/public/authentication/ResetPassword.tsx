/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

interface TokenPayload {
  exp: number;
  [key: string]: any;
}
const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  // ===== 1. ALL HOOKS AT THE TOP =====
  const [searchParams] = useSearchParams();
  const { user, isLoading: isUserLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]); // dependency array

  useEffect(() => {
    // This effect now runs unconditionally, but the logic inside is conditional
    if (!token) {
      setCheckingToken(false);
      return;
    }

    const checkToken = () => {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          toast.error("Reset token has expired!");
          navigate("/forgot-password");
        }
      } catch {
        toast.error("Invalid token");
        navigate("/forgot-password");
      } finally {
        setCheckingToken(false);
      }
    };

    checkToken();
  }, [token, navigate]);

  // ===== 2. CONDITIONAL RETURNS (EARLY EXITS) =====
  if (!id || !token) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
          <div className='text-center'>
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900 dark:text-white'>
              Invalid Reset Link
            </h2>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              The password reset link is invalid or has expired.
            </p>
            <div className='mt-8'>
              <Link
                to='/forgot-password'
                className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium'>
                Request a new password reset link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (checkingToken) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          <p className='text-gray-600 dark:text-gray-400'>Verifying token...</p>
        </div>
      </div>
    );
  }

  // ===== 3. HANDLERS AND MAIN RENDER =====
  const onSubmit = async (values: TResetPasswordSchema) => {
    try {
      const res = await resetPassword({
        id,
        newPassword: values.newPassword,
        resetToken: token,
      }).unwrap();

      if (res.success) {
        toast.success(res.message || "Password reset successfully");
        navigate("/login", {
          state: {
            message:
              "Your password has been reset successfully. Please login with your new password.",
          },
        });
      }
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (isUserLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600'></div>
      </div>
    );
  }

  if (user) return null;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900 dark:text-white'>
            Reset Password
          </h2>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Enter your new password below
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-8 space-y-6'>
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <KeyRound className='h-5 w-5 text-gray-400' />
                      </div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter new password'
                        {...field}
                        className='pl-10 pr-12 py-3 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200'
                        disabled={isLoading}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50'>
                        {showPassword ? (
                          <EyeOff className='w-4 h-4' />
                        ) : (
                          <Eye className='w-4 h-4' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className='text-red-500 text-sm' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <KeyRound className='h-5 w-5 text-gray-400' />
                      </div>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder='Confirm new password'
                        {...field}
                        className='pl-10 pr-12 py-3 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200'
                        disabled={isLoading}
                      />
                      <button
                        type='button'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isLoading}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50'>
                        {showConfirmPassword ? (
                          <EyeOff className='w-4 h-4' />
                        ) : (
                          <Eye className='w-4 h-4' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className='text-red-500 text-sm' />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200'
              disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>

            <div className='text-center mt-4'>
              <Link
                to='/login'
                className='text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium'>
                Back to Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
