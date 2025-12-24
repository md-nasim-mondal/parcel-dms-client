/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
    MapPin,
} from "lucide-react"; // MapPin icon import kora hoyeche

import { useRegisterMutation } from "@/redux/features/auth/auth.api";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

// import { config } from "@/config";

export const Role = { SENDER: "sender", RECEIVER: "receiver" } as const;

// Step 1: registerSchema te defaultAddress field add kora hoyeche
export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(11, "Phone number must be at least 11 digits"),
    defaultAddress: z
      .string()
      .min(10, "Address must be at least 10 characters"), // Notun field
    role: z.enum([Role.SENDER, Role.RECEIVER], {
      message: "Please select a role",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    // Step 2: defaultValues e defaultAddress add kora hoyeche
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      defaultAddress: "", // Notun field er default value
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await register(data).unwrap();
      toast.success("Account created successfully! Please verify your email.");
      navigate("/verify", { state: { email: data.email }, replace: true });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <Card className='border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
      <CardContent className='p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Form Fields */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                      <Input
                        placeholder='John Doe'
                        {...field}
                        className='pl-9'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <Input
                          placeholder='john@example.com'
                          type='email'
                          {...field}
                          className='pl-9'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <Input
                          placeholder='01XXXXXXXXX'
                          {...field}
                          className='pl-9'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Step 3: defaultAddress er jonno notun FormField add kora hoyeche */}
            <FormField
              control={form.control}
              name='defaultAddress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Address</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                      <Input
                        placeholder='123 Main St, Dhaka'
                        {...field}
                        className='pl-9'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Register as a</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <div className='relative'>
                        <UserCheck className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10' />
                        <SelectTrigger className='pl-9'>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Role.SENDER}>Sender</SelectItem>
                      <SelectItem value={Role.RECEIVER}>Receiver</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder='••••••••'
                          {...field}
                          className='pl-9 pr-10'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
                          {showPassword ? (
                            <EyeOff className='w-4 h-4' />
                          ) : (
                            <Eye className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
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
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder='••••••••'
                          {...field}
                          className='pl-9 pr-10'
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
                          {showConfirmPassword ? (
                            <EyeOff className='w-4 h-4' />
                          ) : (
                            <Eye className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type='submit'
              className='w-full !mt-6 text-white'
              disabled={isLoading}>
              {isLoading ? (
                <Loader2 className='w-4 h-4 animate-spin mr-2' />
              ) : (
                <ArrowRight className='w-4 h-4 mr-2' />
              )}
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Form>

        {/* <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/80 dark:bg-gray-800/80 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
             <Button variant="outline" className="w-full hover:bg-gray-50 dark:hover:bg-gray-700" disabled={isLoading} onClick={() => window.open(`${config.baseApiUrl}/auth/google`, "_self")}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
            </Button>
            <Button
                variant='outline'
                className='w-full hover:bg-blue-50 dark:hover:bg-blue-900/20'
                disabled={isLoading}
                onClick={() => toast.info("Facebook Login coming soon!")}
                >
                <svg className='w-4 h-4 mr-2 text-blue-600' fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
            </Button>
        </div> */}

        {/* Footer Text */}
        <div className='text-center mt-6 text-sm'>
          <p className='text-gray-600 dark:text-gray-400'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='font-medium text-blue-600 dark:text-blue-400 hover:underline'>
              Sign In
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
