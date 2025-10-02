/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fix: Extract email from location.state object
  const [email, setEmail] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(30);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Extract email from location state
  useEffect(() => {
    if (location.state) {
      // Handle both object and string formats
      if (typeof location.state === 'object' && location.state.email) {
        setEmail(location.state.email);
      } else if (typeof location.state === 'string') {
        setEmail(location.state);
      } else {
        console.warn('Unexpected location.state format:', location.state);
        navigate('/register');
      }
    } else {
      navigate('/register');
    }
  }, [location.state, navigate]);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    const toastId = toast.loading("Sending verification code...");

    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("Verification code sent!", { id: toastId });
        setConfirmed(true);
        setTimer(30);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send code", { id: toastId });
      console.log(err);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    const toastId = toast.loading("Verifying code...");
    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("Email verified successfully!", { id: toastId });
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid verification code", { id: toastId });
      console.log(err);
    }
  };

  useEffect(() => {
    if (!confirmed || !email) return;

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  // Show loading while extracting email
  if (!email) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900 flex items-center justify-center p-4'>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Logo/Brand Section */}
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-4'>
            <div className='relative'>
              <div className='w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg'>
                <ShieldCheck className='w-8 h-8 text-blue-600 dark:text-blue-400' />
              </div>
              <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900'>
                <Mail className='w-3 h-3 text-white' />
              </div>
            </div>
          </div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Verify Your Email
          </h1>
          <p className='text-gray-600 dark:text-gray-300 text-sm'>
            Secure your SwiftDrop account
          </p>
        </div>

        {confirmed ? (
          <Card className='border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
            <CardHeader className='text-center pb-4'>
              <CardTitle className='text-xl text-gray-900 dark:text-white'>
                Enter Verification Code
              </CardTitle>
              <CardDescription className='text-gray-600 dark:text-gray-300'>
                We sent a 6-digit code to
                <br />
                <span className='font-medium text-blue-600 dark:text-blue-400'>
                  {email} {/* Now this is a string, not an object */}
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form
                  id='otp-form'
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'>
                  <FormField
                    control={form.control}
                    name='pin'
                    render={({ field }) => (
                      <FormItem className='space-y-4'>
                        <FormLabel className='text-gray-700 dark:text-gray-300 font-medium text-sm'>
                          Verification Code
                        </FormLabel>
                        <FormControl>
                          <div className='flex justify-center'>
                            <InputOTP 
                              maxLength={6} 
                              {...field}
                              containerClassName="gap-2"
                            >
                              <InputOTPGroup className='gap-2'>
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                  <InputOTPSlot 
                                    key={index} 
                                    index={index}
                                    className='w-12 h-12 text-lg border-2 border-gray-300 dark:border-gray-600 data-[state=active]:border-blue-500 data-[state=active]:ring-2 data-[state=active]:ring-blue-500/20 transition-all duration-200'
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </FormControl>
                        
                        <FormDescription className='text-center text-xs'>
                          <Button
                            onClick={handleSendOtp}
                            type='button'
                            variant='link'
                            disabled={timer !== 0 || isSending}
                            className={cn(
                              "p-0 m-0 h-auto font-normal text-xs",
                              timer === 0 && !isSending
                                ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                : "text-gray-500 dark:text-gray-400"
                            )}>
                            {isSending ? (
                              <Loader2 className='w-3 h-3 animate-spin mr-1' />
                            ) : timer === 0 ? (
                              "Resend code"
                            ) : (
                              `Resend in ${timer}s`
                            )}
                          </Button>
                        </FormDescription>
                        <FormMessage className='text-center text-xs' />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className='flex flex-col space-y-4'>
              <Button 
                form='otp-form' 
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 disabled:opacity-50'
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <div className='flex items-center justify-center'>
                    <Loader2 className='w-4 h-4 animate-spin mr-2' />
                    Verifying...
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    Verify Email
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </div>
                )}
              </Button>
              
              <Button
                onClick={() => navigate('/register')}
                type='button'
                variant='ghost'
                className='w-full text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              >
                Wrong email? Go back
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className='border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'>
            <CardHeader className='text-center pb-4'>
              <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <Mail className='w-6 h-6 text-blue-600 dark:text-blue-400' />
              </div>
              <CardTitle className='text-xl text-gray-900 dark:text-white'>
                Verify Your Email
              </CardTitle>
              <CardDescription className='text-gray-600 dark:text-gray-300'>
                We'll send a verification code to
                <br />
                <span className='font-medium text-blue-600 dark:text-blue-400'>
                  {email} {/* Now this is a string, not an object */}
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardFooter className='flex flex-col space-y-4'>
              <Button 
                onClick={handleSendOtp}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 disabled:opacity-50'
                disabled={isSending}
              >
                {isSending ? (
                  <div className='flex items-center justify-center'>
                    <Loader2 className='w-4 h-4 animate-spin mr-2' />
                    Sending...
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    Send Verification Code
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </div>
                )}
              </Button>
              
              <Button
                onClick={() => navigate('/register')}
                type='button'
                variant='ghost'
                className='w-full text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              >
                Wrong email? Go back
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Security Note */}
        <div className='text-center mt-6'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            <ShieldCheck className='w-3 h-3 inline mr-1' />
            Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}