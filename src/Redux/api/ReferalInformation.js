import { rootApi } from "./RootApi";

export const ReferralApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getReferralById: builder.query({
      query: (referralId) => `referral/${referralId}`,
      providesTags: (result, error, _id) => [{ type: "Referral", id: _id }],
    }),
    getReferralByPatientId: builder.query({
      query: (referralId) => `referral/single/${referralId}`,
      providesTags: (result, error, _id) => [{ type: "Referral", id: _id }],
    }),
    createReferral: builder.mutation({
      query: (referralData) => ({
        url: "referral",
        method: "POST",
        body: referralData,
      }),
      invalidatesTags: [{ type: "Referral" }],
    }),
    getAllReferrals: builder.query({
      query: () => ({
        url: "referral",
        method: "GET",
      }),
      providesTags: (result, error, _) => [{ type: "Referral" }],
    }),
    updateReferral: builder.mutation({
      query: ({ referralId, referralData }) => ({
        url: `referral/${referralId}`,
        method: "PUT",
        body: referralData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Referral", id: _id }],
    }),
    deleteReferral: builder.mutation({
      query: (referralId) => ({
        url: `referral/${referralId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Referral", id: _id }],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetReferralByIdQuery,
  useGetReferralByPatientIdQuery,
  useCreateReferralMutation,
  useGetAllReferralsQuery,
  useUpdateReferralMutation,
  useDeleteReferralMutation,
} = ReferralApi;
