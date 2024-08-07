import { rootApi } from "./RootApi";

export const TripApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getTripById: builder.query({
      query: (tripId) => `trip/${tripId}`,
      providesTags: (result, error, id) => [{ type: "Trip", id }],
    }),
    createTrip: builder.mutation({
      query: (tripData) => ({
        url: "trip",
        method: "POST",
        body: tripData,
      }),
      invalidatesTags: [{ type: "Trip" }],
    }),
    getAllTrips: builder.query({
      query: () => ({
        url: "trip",
        method: "GET",
      }),
      providesTags: (result, error, _) => [{ type: "Trip" }],
    }),
    updateTrip: builder.mutation({
      query: ({ tripId, tripData }) => ({
        url: `trip/${tripId}`,
        method: "PUT",
        body: tripData,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Trip", id }],
    }),
    deleteTrip: builder.mutation({
      query: (tripId) => ({
        url: `trip/${tripId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Trip", id }],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetTripByIdQuery,
  useCreateTripMutation,
  useGetAllTripsQuery,
  useUpdateTripMutation,
  useDeleteTripMutation,
} = TripApi;
