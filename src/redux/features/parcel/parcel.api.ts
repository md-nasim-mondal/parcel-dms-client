import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation({
      query: (parcelData) => ({
        url: "/parcels",
        method: "POST",
        data: parcelData,
      }),
      invalidatesTags: ["PARCELS"],
    }),
    getSenderParcels: builder.query({
      query: (params) => ({
        url: "/parcels/my-parcels",
        method: "GET",
        params,
      }),
      providesTags: ["PARCELS"],
    }),
    getReceiverParcels: builder.query({
      query: (params) => ({
        url: "/parcels/incoming",
        method: "GET",
        params,
      }),
      providesTags: ["PARCELS"],
    }),
    getAllParcels: builder.query({
      query: (params) => ({
        url: "/parcels",
        method: "GET",
        params,
      }),
      providesTags: ["PARCELS"],
    }),
    getParcelById: builder.query({
      query: (id) => ({
        url: `/parcels/${id}`,
        method: "GET",
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
    trackParcel: builder.query({
      query: (trackingId) => ({
        url: `/parcels/track/${trackingId}`,
        method: "GET",
      }),
    }),
    updateParcelStatus: builder.mutation({
      query: ({ id, status, note }) => ({
        url: `/parcels/${id}/status`,
        method: "PATCH",
        data: { status, note },
      }),
      invalidatesTags: ["PARCELS"],
    }),
    cancelParcel: builder.mutation({
      query: (id) => ({
        url: `/parcels/${id}/cancel`,
        method: "PATCH",
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
} = parcelApi;