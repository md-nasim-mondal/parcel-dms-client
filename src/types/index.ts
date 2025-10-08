export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    totalPage?: number,
    total?: number,
  },
}

export type TRole = "super_admin" | "admin" | "sender" | "receiver";

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}

export interface IAnalyticsData {
  totalParcel?: number;
  totalParcelByStatus?: Array<{
    _id: string;
    count: number;
  }>;
  parcelCreatedInLast7Days?: number;
  parcelCreatedInLast30Days?: number;
  parcelPerType?: Array<{
    _id: string;
    count: number;
  }>;
  parcelPerShippingType?: Array<{
    _id: string;
    count: number;
  }>;
}
