import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// Change this from an interface to a type alias
export type PasswordProps = React.InputHTMLAttributes<HTMLInputElement>;

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div className='relative'>
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700'
          aria-label={showPassword ? "Hide password" : "Show password"}>
          {showPassword ? (
            <EyeOff className='h-5 w-5' />
          ) : (
            <Eye className='h-5 w-5' />
          )}
        </button>
      </div>
    );
  }
);
Password.displayName = "Password";

export default Password;
