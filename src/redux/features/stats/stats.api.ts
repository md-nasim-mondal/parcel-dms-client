/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParcelStats: builder.query<any, void>({
      query: () => ({
        url: "/stats/parcel",
        method: "GET",
      }),
      providesTags: ["STATS", "PARCELS"],
    }),
    getUserStats: builder.query<any, void>({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["USER", "USERS", "STATS"],
    }),
    getAdminStats: builder.query<any, void>({
      query: () => ({
        url: "/stats/admin",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),
    getSenderStats: builder.query<any, void>({
      query: () => ({
        url: "/stats/sender",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),
    getReceiverStats: builder.query<any, void>({
      query: () => ({
        url: "/stats/receiver",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),
  }),
});

export const {
  useGetParcelStatsQuery,
  useGetUserStatsQuery,
  useGetAdminStatsQuery,
  useGetSenderStatsQuery,
  useGetReceiverStatsQuery,
} = statsApi;
