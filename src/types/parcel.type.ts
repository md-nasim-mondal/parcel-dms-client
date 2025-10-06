export interface IParcel {
  _id: string;
  trackingId: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    defaultAddress?: string;
  };
  receiver: {
    name: string;
    email: string;
    phone: string;
    defaultAddress?: string;
  };
  weight: number;
  cost: number;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "approved"
    | "picked"
    | "dispatched"
    | "in-transit";
  statusLogs: {
    status: string;
    timestamp: string;
    updatedBy?: string;
    note?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  deliveredAt?: Date;
}

export interface IParcelResponse {
  success: boolean;
  message: string;
  data: IParcel;
}

export interface IParcelsResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IParcel[];
}

export interface IParcelTrackData {
  trackingId: string;
  currentStatus: string;
  estimatedDelivery: string;
  deliveredAt: string;
  statusLog: IStatusLog[];
  pickupAddress: string;
  deliveryAddress: string;
}

export interface IStatusLog {
  status: string;
  location: string;
  note: string;
  updatedBy?: IUpdatedBy;
  updatedAt: string;
}

export interface IUpdatedBy {
  _id?: string;
  role?: string;
  name?: string;
  email?: string;
  phone?: string;
}

