export const ParcelStatus = {
  REQUESTED: "requested",
  APPROVED: "approved",
  PICKED: "picked",
  DISPATCHED: "dispatched",
  IN_TRANSIT: "in-transit",
  RESCHEDULED: "rescheduled",
  DELIVERED: "delivered",
  RETURNED: "returned",
  CANCELLED: "cancelled",
  BLOCKED: "blocked",
  FLAGGED: "flagged",
} as const;

export type ParcelStatus = (typeof ParcelStatus)[keyof typeof ParcelStatus];

export const ParcelType = {
  DOCUMENT: "document",
  PACKAGE: "package",
  FRAGILE: "fragile",
  ELECTRONICS: "electronics",
} as const;

export type ParcelType = (typeof ParcelType)[keyof typeof ParcelType];

export const ShippingType = {
  STANDARD: "standard",
  EXPRESS: "express",
  SAME_DAY: "same_day",
  OVERNIGHT: "overnight",
} as const;

export type ShippingType = (typeof ShippingType)[keyof typeof ShippingType];

export interface IParcel {
  _id: string;
  trackingId: string;
  type: ParcelType;
  shippingType: ShippingType;
  weight: number;
  weightUnit: string;
  fee: number;
  couponCode: string;
  estimatedDelivery: Date | null;
  currentStatus: ParcelStatus;
  currentLocation: string | null;
  isPaid: boolean;
  sender: Sender;
  receiver: Receiver;
  pickupAddress: string;
  deliveryAddress: string;
  statusLog: StatusLog[];
  deliveredAt: Date | null;
  cancelledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deliveryPersonnel?: string[];
  deliveryPersonnelId?: string; // just for form
  isBlocked?: boolean;
  reason?: string;
}

export interface Sender {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Receiver {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface StatusLog {
  status: string;
  location: string;
  note: string;
  updatedBy: UpdatedBy;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatedBy {
  name: string;
  role: string;
}

export interface IParcelParams {
  searchTerm?: string;
  page: number;
  limit: number;
  sort?: string;
  currentStatus?: string[];
}
