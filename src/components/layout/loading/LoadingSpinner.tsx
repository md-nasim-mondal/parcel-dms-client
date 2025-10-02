import { Loader2, Package } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  text = "Loading..." 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className={`${sizeClasses[size]} bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center`}>
              <Package className={`${sizeClasses[size]} text-blue-600 dark:text-blue-400`} />
            </div>
            <div className="absolute -bottom-1 -right-1">
              <Loader2 className={`${sizeClasses[size]} animate-spin text-green-500`} />
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>
      </div>
    </div>
  );
}