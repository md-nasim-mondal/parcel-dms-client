import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useRegisterMutation,
  useSendOtpMutation,
} from "@/redux/features/auth/auth.api";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["sender", "receiver"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();

  const {
    control,
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "sender",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      // First register the user
      const result = await register(data).unwrap();

      if (result.success) {
        // Then send OTP for verification
        await sendOtp({ email: data.email }).unwrap();

        toast.success("Registration successful! Please verify your email.");
        // Navigate to verification page with email
        navigate(`/verify?email=${encodeURIComponent(data.email)}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Registration failed. Please try again.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const isLoading = isRegistering || isSendingOtp;

  return (
    <div className='min-h-screen flex items-center justify-center bg-muted/30'>
      <div className='w-full max-w-md p-8 space-y-8 bg-background rounded-lg shadow-lg'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Create an Account</h1>
          <p className='text-muted-foreground mt-2'>
            Sign up to start using our parcel delivery service
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <Input
              id='name'
              placeholder='John Doe'
              {...registerField("name")}
            />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='your.email@example.com'
              {...registerField("email")}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              {...registerField("password")}
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='role'>I am a</Label>
            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select your role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='sender'>Sender</SelectItem>
                    <SelectItem value='receiver'>Receiver</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className='text-sm text-red-500'>{errors.role.message}</p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <div className='text-center text-sm'>
          <p>
            Already have an account?{" "}
            <Link to='/login' className='text-primary hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
