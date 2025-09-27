import { Package, Truck } from "lucide-react";

// components/Logo.tsx - Blue version
export const Logo1 = () => (
  <div className='flex items-center space-x-3'>
    <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg'>
      <Package className='w-7 h-7 text-white' />
      <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center'>
        <Truck className='w-3 h-3 text-white' />
      </div>
    </div>
    <div>
      <h1 className='text-2xl font-bold text-blue-600'>ParcelExpress</h1>
      <p className='text-sm text-gray-600'>Fast & Reliable Delivery</p>
    </div>
  </div>
);

// src/components/LogoBadge.tsx
import React from "react";
import { Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const LogoBadge: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* Shield Badge Logo */}
      <div className='relative'>
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center relative",
            "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
            "dark:from-blue-400 dark:via-blue-500 dark:to-blue-600",
            "shadow-lg border-2 border-blue-200/30 dark:border-blue-300/20"
          )}>
          {/* Shield Outline */}
          <Shield className='w-8 h-8 text-white/20 absolute' />

          {/* Main Icon */}
          <Package className='w-6 h-6 text-white z-10' />

          {/* Trust Badge */}
          <div
            className={cn(
              "absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center",
              "bg-green-500 border-2 border-white dark:border-gray-900"
            )}>
            <Clock className='w-3 h-3 text-white' />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          QuickSend
        </h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Trusted Delivery
        </p>
      </div>
    </div>
  );
};

export const LogoSimple: React.FC<{
  className?: string;
  withText?: boolean;
}> = ({ className, withText = true }) => {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* Simple Circle Logo */}
      <div className='relative'>
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            "bg-blue-600 dark:bg-blue-500",
            "shadow-md border border-blue-300/30"
          )}>
          <Package className='w-5 h-5 text-white' />
        </div>

        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center",
            "bg-amber-500 border border-white dark:border-gray-900"
          )}>
          <Truck className='w-2 h-2 text-white' />
        </div>
      </div>

      {withText && (
        <div className='flex flex-col'>
          <span className='font-semibold text-gray-900 dark:text-white'>
            ParcelGo
          </span>
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            Fast Delivery
          </span>
        </div>
      )}
    </div>
  );
};

import { Zap } from "lucide-react";

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
            "bg-amber-500 border-2 border-white dark:border-gray-900",
            size === "lg" ? "w-5 h-5" : "",
            size === "sm" ? "w-3 h-3" : ""
          )}>
          <Zap className='w-2 h-2 text-white' />
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



