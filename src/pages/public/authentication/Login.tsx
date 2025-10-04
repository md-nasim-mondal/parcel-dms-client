import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { setUser } from "@/redux/features/auth/auth.slice";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login(data).unwrap();
      if (result.success) {
        toast.success("Login successful!");
        dispatch(setUser(result.data!.user));

        // Redirect based on user role
        const role = result.data!.user.role;
        if (role === "admin" || role === "super_admin") {
          navigate("/admin");
        } else if (role === "sender") {
          navigate("/sender");
        } else if (role === "receiver") {
          navigate("/receiver");
        }
      }
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-muted/30'>
      <div className='w-full max-w-md p-8 space-y-8 bg-background rounded-lg shadow-lg'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Login to Your Account</h1>
          <p className='text-muted-foreground mt-2'>
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='your.email@example.com'
              {...register("email")}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='password'>Password</Label>
              <Link
                to='/forgot-password'
                className='text-sm text-primary hover:underline'>
                Forgot password?
              </Link>
            </div>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              {...register("password")}
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className='text-center text-sm'>
          <p>
            Don't have an account?{" "}
            <Link to='/register' className='text-primary hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
