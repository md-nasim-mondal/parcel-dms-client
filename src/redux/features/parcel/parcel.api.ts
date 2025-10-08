import { baseApi } from "@/redux/api/baseApi";
import type { IAnalyticsData, IResponse } from "@/types";
import type { IParcelTrackData } from "@/types/parcel.type";
import type { IParcel, IParcelParams } from "@/types/sender.parcel.type";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReceiverParcels: builder.query({
      query: (params) => ({
        url: "/parcels/incoming",
        method: "GET",
        params,
      }),
      providesTags: ["PARCELS"],
    }),
    getDeliveryHistory: builder.query({
      query: (params) => ({
        url: "/parcels/me/history",
        method: "GET",
        params,
      }),
      providesTags: ["PARCELS"],
    }),
    updateParcelStatus: builder.mutation({
      query: ({ id, status, note }) => ({
        url: `/parcels/${id}/status`,
        method: "PATCH",
        data: { status, note },
      }),
      invalidatesTags: ["PARCELS"],
    }),
    confirmDelivery: builder.mutation({
      query: (id) => ({
        url: `/parcels/${id}/confirm-delivery`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCELS"],
    }),
    // Sender
    createParcel: builder.mutation<IResponse<IParcel>, Partial<IParcel>>({
      query: (data) => ({
        url: "/parcels",
        method: "POST",
        data,
      }),
      invalidatesTags: ["PARCELS"],
    }),
    cancelParcel: builder.mutation<unknown, { id: string; note: string }>({
      query: ({ id, note }) => ({
        url: `/parcels/cancel/${id}`,
        method: "POST",
        data: { note },
      }),
      invalidatesTags: ["PARCELS"],
    }),
    deleteParcel: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/parcels/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["PARCELS"],
    }),
    getParcelStatusLog: builder.query<IResponse<IParcel>, string | undefined>({
      query: (id) => ({
        url: `/parcels/${id}/status-log`,
        method: "GET",
      }),
      providesTags: ["PARCELS"],
    }),
    getSenderParcels: builder.query<IResponse<IParcel[]>, IParcelParams>({
      query: ({ searchTerm, page, limit, sort, currentStatus }) => ({
        url: "/parcels/me",
        method: "GET",
        params: {
          searchTerm: searchTerm,
          page: page,
          limit: limit,
          sort: sort,
          currentStatus: currentStatus,
        },
      }),
      providesTags: ["PARCELS"],
    }),
    // Receiver
    getIncomingParcels: builder.query<IResponse<IParcel[]>, IParcelParams>({
      query: ({ searchTerm, page, limit, sort, currentStatus }) => ({
        url: "/parcels/me/incoming",
        method: "GET",
        params: {
          searchTerm: searchTerm,
          page: page,
          limit: limit,
          sort: sort,
          currentStatus: currentStatus,
        },
      }),
      providesTags: ["PARCELS"],
    }),
    getReceiverParcelHistory: builder.query<
      IResponse<IParcel[]>,
      IParcelParams
    >({
      query: ({ searchTerm, page, limit, sort, currentStatus }) => ({
        url: "/parcels/me/history",
        method: "GET",
        params: {
          searchTerm: searchTerm,
          page: page,
          limit: limit,
          sort: sort,
          currentStatus: currentStatus,
        },
      }),
      providesTags: ["PARCELS"],
    }),
    confirmParcelDelivery: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/parcels/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCELS"],
    }),
    // admin
    getAllParcels: builder.query<IResponse<IParcel[]>, IParcelParams>({
      query: (params) => ({
        url: "/parcels",
        method: "GET",
        params,
      }),
      providesTags: ["PARCELS"],
    }),
    getParcelById: builder.query<IResponse<IParcel>, string | undefined>({
      query: (id) => ({
        url: `/parcels/details/${id}`,
        method: "GET",
      }),
      providesTags: ["PARCELS"],
    }),
    updateStatusAndPersonnel: builder.mutation<
      unknown,
      { id: string; data: Partial<IParcel> }
    >({
      query: ({ id, data }) => ({
        url: `/parcels/delivery-status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PARCELS"],
    }),
    blockParcel: builder.mutation<
      unknown,
      { id: string; data: Partial<IParcel> }
    >({
      query: ({ id, data }) => ({
        url: `/parcels/block-status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PARCELS"],
    }),
    adminCreateParcel: builder.mutation<IResponse<IParcel>, Partial<IParcel>>({
      query: (data) => ({
        url: "/parcels/create-parcel",
        method: "POST",
        data,
      }),
      invalidatesTags: ["PARCELS"],
    }),
    getParcelAnalytics: builder.query<IResponse<IAnalyticsData>, void>({
      query: () => ({
        url: "/stats/parcels",
        method: "GET",
      }),
      providesTags: ["PARCELS"],
    }),
    // public
    trackParcel: builder.query<IResponse<IParcelTrackData>, string>({
      query: (trackingId) => ({
        url: `/parcels/tracking/${trackingId}`,
        method: "GET",
      }),
      providesTags: ["PARCELS"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useGetSenderParcelsQuery,
  useGetReceiverParcelsQuery,
  useGetAllParcelsQuery,
  useGetParcelByIdQuery,
  useGetDeliveryHistoryQuery,
  useTrackParcelQuery,
  useLazyTrackParcelQuery,
  useUpdateParcelStatusMutation,
  useCancelParcelMutation,
  useConfirmDeliveryMutation,
  useDeleteParcelMutation,
  useGetParcelStatusLogQuery,
  useGetIncomingParcelsQuery,
  useGetReceiverParcelHistoryQuery,
  useAdminCreateParcelMutation,
  useUpdateStatusAndPersonnelMutation,
  useBlockParcelMutation,
  useConfirmParcelDeliveryMutation,
  useGetParcelAnalyticsQuery,
} = parcelApi;
