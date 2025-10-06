import { ParcelStatus } from "@/types/sender.parcel.type";
import { IsActive } from "@/types/user.type";

export type StatusType = ParcelStatus;

export type UserStatusType = IsActive;

const lightColors = {
  // Parcel Status colors
  Delivered:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",

  "In-Transit":
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  Dispatched:
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-800",
  Picked:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",

  Approved:
    "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800",
  Requested:
    "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800",
  Rescheduled:
    "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-800",
  Flagged:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800",

  Returned:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  Cancelled:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  Blocked:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",

  // User status colors
  ACTIVE:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  INACTIVE:
    "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800",
  BLOCKED:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",

  // Default fallback
  default:
    "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800",
};

export const getStatusHexColor = (status: string): string => {
  const hexColors: Record<string, string> = {
    // Parcel Status colors
    Delivered: "#22c55e", // green-500

    "In-Transit": "#3b82f6", // blue-500
    Dispatched: "#8b5cf6", // violet-500
    Picked: "#f59e0b", // amber-500

    Approved: "#eab308", // yellow-500
    Requested: "#64748b", // slate-500
    Rescheduled: "#6366f1", // indigo-500
    Flagged: "#ea580c", // orange-600

    Returned: "#ef4444", // red-500
    Cancelled: "#dc2626", // red-600
    Blocked: "#991b1b", // red-800

    // User status colors
    ACTIVE: "#22c55e", // green-500
    INACTIVE: "#eab308", // yellow-500
    BLOCKED: "#dc2626", // red-600

    // Default fallback
    default: "#64748b", // slate-500
  };

  return hexColors[status] || hexColors.default;
};

// Get status color classes for badges and UI components
export const getStatusColor = (status: string): string => {
  const normalizedStatus = status as StatusType;
  return lightColors[normalizedStatus] || lightColors.default;
};

// Get user status color classes
export const getUserIsActiveStatusColor = (status: string): string => {
  const normalizedStatus = status as UserStatusType;
  return (
    lightColors[normalizedStatus.toUpperCase() as keyof typeof lightColors] ||
    lightColors.default
  );
};

// Get status icon color (for use in icons)
export const getStatusIconColor = (status: string): string => {
  const iconColors: Record<string, string> = {
    Delivered: "text-green-600 dark:text-green-400",

    "In-Transit": "text-blue-600 dark:text-blue-400",
    Dispatched: "text-violet-600 dark:text-violet-400",
    Picked: "text-amber-600 dark:text-amber-400",

    Approved: "text-yellow-600 dark:text-yellow-400",
    Requested: "text-slate-600 dark:text-slate-400",
    Rescheduled: "text-indigo-600 dark:text-indigo-400",
    Flagged: "text-orange-600 dark:text-orange-400",

    Returned: "text-red-600 dark:text-red-400",
    Cancelled: "text-red-600 dark:text-red-400",
    Blocked: "text-red-600 dark:text-red-400",

    // User status colors
    ACTIVE: "text-green-600 dark:text-green-400",
    INACTIVE: "text-yellow-600 dark:text-yellow-400",
    BLOCKED: "text-red-600 dark:text-red-400",
    default: "text-slate-600 dark:text-slate-400",
  };

  return iconColors[status] || iconColors.default;
};

// Get status background color only (for subtle backgrounds)
export const getStatusBgColor = (status: string): string => {
  const bgColors: Record<string, string> = {
    // Parcel Status colors
    Delivered: "bg-green-50 dark:bg-green-950",

    "In-Transit": "bg-blue-50 dark:bg-blue-950",
    Dispatched: "bg-violet-50 dark:bg-violet-950",
    Picked: "bg-amber-50 dark:bg-amber-950",

    Approved: "bg-yellow-50 dark:bg-yellow-950",
    Requested: "bg-slate-50 dark:bg-slate-950",
    Rescheduled: "bg-indigo-50 dark:bg-indigo-950",
    Flagged: "bg-orange-50 dark:bg-orange-950",

    Returned: "bg-red-50 dark:bg-red-950",
    Cancelled: "bg-red-50 dark:bg-red-950",
    Blocked: "bg-red-50 dark:bg-red-950",

    // User status colors
    ACTIVE: "bg-green-50 dark:bg-green-950",
    INACTIVE: "bg-yellow-50 dark:bg-yellow-950",
    BLOCKED: "bg-red-50 dark:bg-red-950",

    default: "bg-slate-50 dark:bg-slate-950",
  };

  return bgColors[status] || bgColors.default;
};

// Get status text color only
export const getStatusTextColor = (status: string): string => {
  const textColors: Record<string, string> = {
    // Parcel Status colors
    Delivered: "text-green-700 dark:text-green-400",

    "In-Transit": "text-blue-700 dark:text-blue-400",
    Dispatched: "text-violet-700 dark:text-violet-400",
    Picked: "text-amber-700 dark:text-amber-400",

    Approved: "text-yellow-700 dark:text-yellow-400",
    Requested: "text-slate-700 dark:text-slate-400",
    Rescheduled: "text-indigo-700 dark:text-indigo-400",
    Flagged: "text-orange-700 dark:text-orange-400",

    Returned: "text-red-700 dark:text-red-400",
    Cancelled: "text-red-700 dark:text-red-400",
    Blocked: "text-red-700 dark:text-red-400",

    // User status colors
    ACTIVE: "text-green-700 dark:text-green-400",
    INACTIVE: "text-yellow-700 dark:text-yellow-400",
    BLOCKED: "text-red-700 dark:text-red-400",

    default: "text-slate-700 dark:text-slate-400",
  };

  return textColors[status] || textColors.default;
};
