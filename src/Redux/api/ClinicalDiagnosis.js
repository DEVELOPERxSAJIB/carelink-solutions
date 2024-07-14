import { rootApi } from "./RootApi";

export const ClinicalDiagnosisApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query endpoint to get a clinical diagnosis by ID
    getClinicalDiagnosisById: builder.query({
      query: (diagnosisId) => `clinical/${diagnosisId}`,
      providesTags: (result, error, _id) => [
        { type: "ClinicalDiagnosis", id: _id },
      ],
    }),

    // Mutation endpoint to create a new clinical diagnosis
    createClinicalDiagnosis: builder.mutation({
      query: (diagnosisData) => ({
        url: "clinical",
        method: "POST",
        body: diagnosisData,
      }),
      invalidatesTags: [{ type: "ClinicalDiagnosis" }],
    }),

    // Query endpoint to get all clinical diagnoses
    getAllClinicalDiagnoses: builder.query({
      query: () => ({
        url: "clinical",
        method: "GET",
      }),
      providesTags: (result, error) => [{ type: "ClinicalDiagnosis" }],
    }),

    // Mutation endpoint to update an existing clinical diagnosis
    updateClinicalDiagnosis: builder.mutation({
      query: ({ diagnosisId, diagnosisData }) => ({
        url: `clinical/${diagnosisId}`,
        method: "PUT",
        body: diagnosisData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ClinicalDiagnosis", id: id },
      ],
    }),

    // Mutation endpoint to delete a clinical diagnosis
    deleteClinicalDiagnosis: builder.mutation({
      query: (diagnosisId) => ({
        url: `clinical/${diagnosisId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [
        { type: "ClinicalDiagnosis", id: _id },
      ],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetClinicalDiagnosisByIdQuery,
  useCreateClinicalDiagnosisMutation,
  useGetAllClinicalDiagnosesQuery,
  useUpdateClinicalDiagnosisMutation,
  useDeleteClinicalDiagnosisMutation,
} = ClinicalDiagnosisApi;
