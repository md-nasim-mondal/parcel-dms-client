/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetAdminStatsQuery,
  useGetSenderStatsQuery,
  useGetReceiverStatsQuery,
} = statsApi;
