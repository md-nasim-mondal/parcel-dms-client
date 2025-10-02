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
  id: string;
  email: string;
  role: "sender" | "receiver" | "admin" | "super_admin" | "delivery_personnel";
  name: string;
  picture?: string;
}
