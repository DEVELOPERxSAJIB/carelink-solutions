import { rootApi } from "./RootApi";

export const PayerApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayerById: builder.query({
      query: (payerId) => `payers/${payerId}`,
      providesTags: (result, error, _id) => [{ type: "Payer", id: _id }],
    }),
    createPayer: builder.mutation({
      query: (payerData) => ({
        url: "payer",
        method: "POST",
        body: payerData,
      }),
      invalidatesTags: [{ type: "Payer" }],
    }),
    getAllPayers: builder.query({
      query: () => ({
        url: "payer",
        method: "GET",
      }),
      providesTags: (result, error, _) => [{ type: "Payer" }],
    }),
    updatePayer: builder.mutation({
      query: ({ payerId, payerData }) => ({
        url: `payer/${payerId}`,
        method: "PUT",
        body: payerData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Payer", id: _id }],
    }),
    deletePayer: builder.mutation({
      query: (payerId) => ({
        url: `payer/${payerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Payer", id: _id }],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetPayerByIdQuery,
  useCreatePayerMutation,
  useGetAllPayersQuery,
  useUpdatePayerMutation,
  useDeletePayerMutation,
} = PayerApi;
