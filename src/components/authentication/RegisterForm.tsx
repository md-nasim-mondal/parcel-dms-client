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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  UserCheck,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Role string union and object to match your interface
export const Role = {
  SENDER: "sender",
  RECEIVER: "receiver",
  DELIVERY_PERSONNEL: "delivery_personnel",
} as const;
type Role = (typeof Role)[keyof typeof Role];

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z
      .string()
      .min(11, { message: "Phone number must be at least 11 digits" }),
    role: z.nativeEnum(Role),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      password: data.password,
    };

    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("Account created successfully! Please verify your email.");
      navigate("/verify", { state: { email: data.email }, replace: true });
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.data?.message || "Registration failed. Please try again."
      );

      if (error?.data?.message === "User Already Exist") {
        navigate("/verify", { state: { email: data.email }, replace: true });
      }
    }
  };

  return (
    <Card className='border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
      <CardContent className='p-6'>
        <div className={cn("flex flex-col gap-4", className)} {...props}>
          {/* Compact Header */}
          <div className='text-center space-y-1 mb-2'>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
              Create Account
            </h2>
            <p className='text-gray-600 dark:text-gray-400 text-xs'>
              Join SwiftDrop in seconds
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Personal Information - Compact Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel className='text-gray-700 dark:text-gray-300 font-medium text-xs'>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400' />
                          <Input
                            placeholder='John Doe'
                            {...field}
                            className='pl-8 pr-3 py-2 text-sm border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 dark:text-gray-300 font-medium text-xs'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400' />
                          <Input
                            placeholder='john@example.com'
                            type='email'
                            {...field}
                            className='pl-8 pr-3 py-2 text-sm border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 dark:text-gray-300 font-medium text-xs'>
                        Phone
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400' />
                          <Input
                            placeholder='+1234567890'
                            {...field}
                            className='pl-8 pr-3 py-2 text-sm border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                {/* Role Selection */}
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel className='text-gray-700 dark:text-gray-300 font-medium text-xs'>
                        Role
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <div className='relative'>
                            <UserCheck className='absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 z-10' />
                            <SelectTrigger className='pl-8 pr-3 py-2 text-sm border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200 h-auto w-full'>
                              <SelectValue placeholder='Select role' />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={Role.SENDER}>Sender</SelectItem>
                          <SelectItem value={Role.RECEIVER}>
                            Receiver
                          </SelectItem>
                          <SelectItem value={Role.DELIVERY_PERSONNEL}>
                            Delivery Personnel
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Fields - Side by Side */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 dark:text-gray-300 font-medium text-xs'>
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400' />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder='Create password'
                            {...field}
                            className='pl-8 pr-8 py-2 text-sm border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200'
                          />
                          <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'>
                            {showPassword ? (
                              <EyeOff className='w-3 h-3' />
                            ) : (
                              <Eye className='w-3 h-3' />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 dark:text-gray-300 font-medium text-xs'>
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400' />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder='Confirm password'
                            {...field}
                            className='pl-8 pr-8 py-2 text-sm border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200'
                          />
                          <button
                            type='button'
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'>
                            {showConfirmPassword ? (
                              <EyeOff className='w-3 h-3' />
                            ) : (
                              <Eye className='w-3 h-3' />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>

              {/* Register Button */}
              <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-medium transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2'
                disabled={isLoading}>
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <Loader2 className='w-4 h-4 animate-spin mr-2' />
                    Creating Account...
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    Create Account
                    <ArrowRight className='w-3 h-3 ml-1' />
                  </div>
                )}
              </Button>
            </form>
          </Form>

          {/* Compact Divider */}
          <div className='relative my-2'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300 dark:border-gray-600'></div>
            </div>
            <div className='relative flex justify-center text-xs'>
              <span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <Button
            onClick={() =>
              window.open(`${config.baseApiUrl}/auth/google`, "_self")
            }
            type='button'
            variant='outline'
            disabled={isLoading}
            className='w-full cursor-pointer border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 py-2 text-sm font-medium disabled:opacity-50'>
            <svg className='w-4 h-4 mr-2' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='currentColor'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='currentColor'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='currentColor'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
            Continue with Google
          </Button>

          {/* Compact Login Link */}
          <div className='text-center text-xs pt-3 border-t border-gray-200 dark:border-gray-700'>
            <p className='text-gray-600 dark:text-gray-400'>
              Already have an account?{" "}
              <Link
                to='/login'
                className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors hover:underline'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
