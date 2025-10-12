import { cn } from "@/lib/utils";
import { Package, Truck } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className, size = "md" }) => {
  const sizes = {
    sm: { container: "w-8 h-8", icon: "w-4 h-4", text: "text-lg" },
    md: { container: "w-10 h-10", icon: "w-5 h-5", text: "text-xl" },
    lg: { container: "w-12 h-12", icon: "w-6 h-6", text: "text-2xl" },
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* Logo Icon */}
      <div
        className={cn(
          "relative rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-600/20",
          "bg-gradient-to-br from-blue-600 to-blue-700",
          "dark:from-blue-500 dark:to-blue-600",
          sizes[size].container
        )}>
        <Package className={cn("text-white", sizes[size].icon)} />

        {/* Speed Indicator */}
        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center",
            "bg-green-500 border-2 border-white dark:border-gray-900",
            size === "lg" ? "w-5 h-5" : "",
            size === "sm" ? "w-3 h-3" : ""
          )}>
          <Truck className='w-2 h-2 text-white' />
        </div>
      </div>

      {/* Logo Text */}
      <div className='flex flex-col'>
        <h1
          className={cn(
            "font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent",
            sizes[size].text
          )}>
          SwiftDrop
        </h1>
        <p
          className={cn(
            "text-xs text-gray-600 dark:text-gray-400",
            size === "sm" ? "text-[10px]" : "",
            size === "lg" ? "text-sm" : ""
          )}>
          Parcel Delivery
        </p>
      </div>
    </div>
  );
};

interface Logo1Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  isExpended?: boolean;
}

export const Logo1: React.FC<Logo1Props> = ({
  className,
  size = "sm",
  isExpended = false,
}) => {
  const sizes = {
    sm: { container: "w-8 h-8", icon: "w-4 h-4", text: "text-base" },
    md: { container: "w-10 h-10", icon: "w-5 h-5", text: "text-lg" },
    lg: { container: "w-12 h-12", icon: "w-6 h-6", text: "text-xl" },
  };

  return (
    <div
      className={cn(
        `flex items-center ${!isExpended && "justify-center"} space-x-3 w-full`,
        className
      )}>
      {/* Logo Icon */}
      <div
        className={cn(
          "relative rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-600/20",
          "bg-gradient-to-br from-blue-600 to-blue-700",
          "dark:from-blue-500 dark:to-blue-600",
          sizes[size].container
        )}>
        <Package className={cn("text-white flex-1", sizes[size].icon)} />

        {/* Speed Indicator */}
        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center",
            "bg-green-500 border-2 border-white dark:border-gray-900",
            size === "lg" ? "w-5 h-5" : "",
            size === "sm" ? "w-3 h-3" : ""
          )}>
          <Truck className='w-2 h-2 text-white' />
        </div>
      </div>
      {isExpended && (
        <>
          {/* Logo Text */}
          <div className='flex flex-col'>
            <h1
              className={cn(
                "font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent",
                sizes[size].text
              )}>
              SwiftDrop
            </h1>
            <p
              className={cn(
                "text-xs text-gray-600 dark:text-gray-400",
                size === "sm" ? "text-[10px]" : "",
                size === "lg" ? "text-sm" : ""
              )}>
              Parcel Delivery
            </p>
          </div>
        </>
      )}
    </div>
  );
};
