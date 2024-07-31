import { rootApi } from "./RootApi";

export const VehicleApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicleById: builder.query({
      query: (vehicleId) => `vehicles/${vehicleId}`,
      providesTags: (result, error, id) => [{ type: "Vehicle", id }],
    }),
    createVehicle: builder.mutation({
      query: (vehicleData) => ({
        url: "vehicles",
        method: "POST",
        body: vehicleData,
      }),
      invalidatesTags: [{ type: "Vehicle", id: "LIST" }],
    }),
    getAllVehicles: builder.query({
      query: () => ({
        url: "vehicles",
        method: "GET",
      }),
      providesTags: (result, error, _) => [{ type: "Vehicle", id: "LIST" }],
    }),
    updateVehicle: builder.mutation({
      query: ({ vehicleId, vehicleData }) => ({
        url: `vehicles/${vehicleId}`,
        method: "PUT",
        body: vehicleData,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Vehicle", id }],
    }),
    deleteVehicle: builder.mutation({
      query: (vehicleId) => ({
        url: `vehicles/${vehicleId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Vehicle", id }],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetVehicleByIdQuery,
  useCreateVehicleMutation,
  useGetAllVehiclesQuery,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = VehicleApi;