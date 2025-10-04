import { Button } from "@/components/ui/button";
import {
  useVerifyOtpMutation,
  useSendOtpMutation,
} from "@/redux/features/auth/auth.api";
import { setUser } from "@/redux/features/auth/auth.slice";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { OTPInput } from "input-otp";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();

  const handleVerify = async () => {
    if (!email) {
      toast.error("Email is required for verification");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const result = await verifyOtp({ email, otp }).unwrap();

      if (result.success) {
        toast.success("Email verified successfully!");

        if (result.data?.user) {
          dispatch(setUser(result.data.user));

          // Redirect based on user role
          const role = result.data.user.role;
          if (role === "admin" || role === "super_admin") {
            navigate("/admin");
          } else if (role === "sender") {
            navigate("/sender");
          } else if (role === "receiver") {
            navigate("/receiver");
          }
        } else {
          navigate("/login");
        }
      }
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Verification failed. Please try again.";
      toast.error(message);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is required to resend OTP");
      return;
    }

    try {
      await sendOtp({ email }).unwrap();
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    }
  };

  const isLoading = isVerifying || isResending;

  return (
    <div className='min-h-screen flex items-center justify-center bg-muted/30'>
      <div className='w-full max-w-md p-8 space-y-8 bg-background rounded-lg shadow-lg'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Verify Your Email</h1>
          <p className='text-muted-foreground mt-2'>
            We've sent a verification code to{" "}
            <span className='font-medium'>{email || "your email"}</span>
          </p>
        </div>

        <div className='space-y-6'>
          <div className='space-y-4'>
            <div className='flex justify-center'>
              <OTPInput
                maxLength={6}
                value={otp}
                onChange={setOtp}
                render={({ slots }) => (
                  <div className='flex gap-2'>
                    {slots.map((slot, idx) => (
                      <div
                        key={idx}
                        className='w-10 h-12 border rounded-md flex items-center justify-center text-lg'>
                        {slot !== null ? slot.toString() : ""}
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>

          <Button
            onClick={handleVerify}
            className='w-full'
            disabled={isLoading || otp.length !== 6}>
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>

          <div className='text-center'>
            <p className='text-sm text-muted-foreground'>
              Didn't receive the code?{" "}
              <button
                type='button'
                onClick={handleResendOtp}
                className='text-primary hover:underline'
                disabled={isLoading}>
                {isResending ? "Sending..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
