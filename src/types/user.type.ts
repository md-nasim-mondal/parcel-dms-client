export const Role = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  SENDER: "sender",
  RECEIVER: "receiver",
  DELIVERY_PERSONNEL: "delivery_personnel",
} as const

export type Role = (typeof Role)[keyof typeof Role];

export const IsActive = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
} as const;

export type IsActive = (typeof IsActive)[keyof typeof IsActive];

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  defaultAddress?: string;
  phone?: string;
  picture?: string;
  role: Role;
  isVerified?: boolean;
  isActive?: IsActive;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserParams = Partial<Omit<IUser, "isActive" | "role">> & {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sort?: string;
  isActive?: IsActive[];
  role?: Role[];
};
