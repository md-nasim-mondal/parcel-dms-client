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

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "sender" | "receiver" | "admin" | "super_admin";
  status: "active" | "blocked";
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: IUser;
  };
}
