import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["USERS"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["USERS"],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/users/update-profile",
        method: "PATCH",
        data: userData,
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
