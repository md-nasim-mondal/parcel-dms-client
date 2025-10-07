import type { IUser } from "./user.type";
export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: IUser;
  };
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  id: string;
  newPassword: string;
}

export interface ISendOtp {
  name?: string;
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
