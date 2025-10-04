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
