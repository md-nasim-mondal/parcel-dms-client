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
import { Loader2, MailCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 digits.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();

  const locationEmail = location.state?.email || "";
  const [email, setEmail] = useState(
    locationEmail || localStorage.getItem("verify_email") || ""
  );

  const [otpSent, setOtpSent] = useState(true);
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(0);
  const hasVerified = useRef(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    if (!email) return toast.error("Email not found!");

    const toastId = toast.loading("Sending OTP...");
    try {
      const res = await sendOtp({ email }).unwrap();
      if (res?.success) {
        toast.success("OTP sent successfully!", { id: toastId });
        setOtpSent(true);
        localStorage.setItem("verify_email", email);
        setTimer(30);
      } else {
        toast.error(res?.message || "Failed to send OTP", { id: toastId });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Error sending OTP", { id: toastId });
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP...");
    try {
      const res = await verifyOtp({ email, otp: data.pin }).unwrap();
      if (res?.success) {
        toast.success("OTP Verified Successfully!", { id: toastId });
        hasVerified.current = true;
        localStorage.removeItem("verify_email");
        setEmail("");
        await navigate("/login", { replace: true });
      } else {
        toast.error(res?.message || "Invalid OTP", { id: toastId });
        form.setError("pin", { message: res?.message || "Invalid OTP" });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Verification failed!", { id: toastId });
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (!email && !hasVerified.current) {
      navigate("/", { replace: true });
    }
  }, [email, navigate]);

  return (
    <div className='grid place-content-center h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900'>
      {!otpSent ? (
        <Card className='bg-white/80 dark:bg-gray-800/80 min-w-[300px] w-full max-w-md'>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <MailCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className='text-xl'>Verify Your Email</CardTitle>
            <CardDescription>
              We will send you a 6-digit code at <br />{" "}
              <span className='font-semibold text-primary'>{email}</span>
            </CardDescription>
          </CardHeader>
          <CardFooter className='flex justify-end p-6'>
            <Button onClick={handleSendOtp} className='w-full' disabled={isSendingOtp}>
              {isSendingOtp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSendingOtp ? "Sending..." : "Send OTP"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className='bg-white/80 dark:bg-gray-800/80 min-w-[300px] w-full max-w-md'>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <MailCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className='text-xl'>Enter Your OTP</CardTitle>
            <CardDescription>
              Please enter the code sent to <br />{" "}
              <span className='font-semibold text-primary'>{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id='otp-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                  control={form.control}
                  name='pin'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">One-Time Password</FormLabel>
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              {[0, 1, 2, 3, 4, 5].map((i) => (<InputOTPSlot key={i} index={i} />))}
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormDescription className="text-center">
                        <Button
                          onClick={handleSendOtp}
                          type='button'
                          variant='link'
                          disabled={timer > 0 || isSendingOtp}
                           // ✅ FIX: Used cn() for conditional styling
                          className={cn(
                            "p-0 h-auto",
                            timer > 0 && "text-muted-foreground"
                          )}
                        >
                          {isSendingOtp ? "Sending..." : "Resend OTP"}
                        </Button>
                        {timer > 0 && ` in ${timer}s`}
                      </FormDescription>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className='flex justify-end p-6'>
            <Button form='otp-form' type='submit' className="w-full" disabled={isVerifying}>
               {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
               {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}