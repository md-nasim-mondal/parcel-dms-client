import { baseApi } from "@/redux/api/baseApi";
import type { IResponse } from "@/types";
import type { IUser, IUserParams } from "@/types/user.type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserRole: builder.mutation<
      IResponse<null>,
      { id: string; role: string }
    >({
      query: ({ id, role }) => ({
        url: `/users/${id}`,
        method: "PUT",
        data: { role },
      }),
      invalidatesTags: ["USER", "USERS"],
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
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER", "USERS"],
    }),
    userInfo: builder.query<{ success: boolean; data: IUser }, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getAllUsers: builder.query<IResponse<IUser[]>, IUserParams>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["USER", "USERS"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER", "USERS"],
    }),
    createDeliveryPersonnel: builder.mutation({
      query: (data) => ({
        url: "/users/create-delivery-personnel",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER", "USERS"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["USER", "USERS"],
    }),
    blockUserById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/block-user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER", "USERS"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUserInfoQuery,
  useUpdateUserRoleMutation,
  useUpdateProfileMutation,
  useGetMeQuery,
  useCreateAdminMutation,
  useCreateDeliveryPersonnelMutation,
  useBlockUserByIdMutation,
} = userApi;
