import { rootApi } from "./RootApi";

export const MileageApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMileageById: builder.query({
      query: (mileageId) => `mileage/${mileageId}`,
      providesTags: (result, error, _id) => [{ type: "Mileage", id: _id }],
    }),
    createMileage: builder.mutation({
      query: (mileageData) => ({
        url: "mileage",
        method: "POST",
        body: mileageData,
      }),
      invalidatesTags: [{ type: "Mileage" }],
    }),
    getAllMileages: builder.query({
      query: () => ({
        url: "mileage",
        method: "GET",
      }),
      providesTags: (result, error, _) => [{ type: "Mileage" }],
    }),
    updateMileage: builder.mutation({
      query: ({ mileageId, mileageData }) => ({
        url: `mileage/${mileageId}`,
        method: "PUT",
        body: mileageData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Mileage", id: _id }],
    }),
    deleteMileage: builder.mutation({
      query: (mileageId) => ({
        url: `mileage/${mileageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Mileage", id: _id }],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetMileageByIdQuery,
  useCreateMileageMutation,
  useGetAllMileagesQuery,
  useUpdateMileageMutation,
  useDeleteMileageMutation,
} = MileageApi;