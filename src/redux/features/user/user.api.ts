import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IUser } from "@/types/user.type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      {
        success: boolean;
        data: IUser[];
        meta: { page: number; limit: number; total: number };
      },
      {
        page?: number;
        limit?: number;
        role?: string;
        status?: string;
        searchTerm?: string;
        isActive?: string;
      }
    >({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),
    getUserById: builder.query<{ success: boolean; data: IUser }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUserStatus: builder.mutation<
      IResponse<null>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/users/${id}`,
        method: "PUT",
        data: { status },
      }),
      invalidatesTags: ["USERS"],
    }),
    updateProfile: builder.mutation<
      IResponse<null>,
      { id: string; name: string; phone?: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["USER", "USERS"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
  useUpdateProfileMutation,
} = userApi;
