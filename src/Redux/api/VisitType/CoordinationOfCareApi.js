import { rootApi } from "../RootApi";

export const CoordinationOfCareApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query endpoint to get a CoordinationOfCare by ID
    getCoordinationOfCareById: builder.query({
      query: (id) => `coordinationofcare/${id}`,
      providesTags: (result, error, id) => [{ type: "CoordinationOfCare", id }],
    }),

    // Query endpoint to get all CoordinationOfCare records by patient ID
    getCoordinationOfCareByPatientId: builder.query({
      query: (patientId) => `coordinationofcare/patient/${patientId}`,
      providesTags: (result, error, patientId) => [
        { type: "PatientCoordinationOfCare", id: patientId },
      ],
    }),

    // Mutation endpoint to create a new CoordinationOfCare
    createCoordinationOfCare: builder.mutation({
      query: (coordinationOfCareData) => ({
        url: "coordinationofcare",
        method: "POST",
        body: coordinationOfCareData,
      }),
      invalidatesTags: [
        { type: "CoordinationOfCare" },
        { type: "PatientCoordinationOfCare" },
      ],
    }),

    // Mutation endpoint to update an existing CoordinationOfCare
    updateCoordinationOfCare: builder.mutation({
      query: ({ id, coordinationOfCareData }) => ({
        url: `coordinationofcare/${id}`,
        method: "PUT",
        body: coordinationOfCareData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CoordinationOfCare", id },
        { type: "PatientCoordinationOfCare", id: result?.patientId }, // Assuming result includes patientId
      ],
    }),

    // Mutation endpoint to delete a CoordinationOfCare
    deleteCoordinationOfCare: builder.mutation({
      query: (id) => ({
        url: `coordinationofcare/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CoordinationOfCare", id },
        { type: "PatientCoordinationOfCare", id: result?.patientId }, // Assuming result includes patientId
      ],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetCoordinationOfCareByIdQuery,
  useGetCoordinationOfCareByPatientIdQuery,
  useCreateCoordinationOfCareMutation,
  useUpdateCoordinationOfCareMutation,
  useDeleteCoordinationOfCareMutation,
} = CoordinationOfCareApi;
