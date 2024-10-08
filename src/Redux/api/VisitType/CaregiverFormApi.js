import { rootApi } from "../RootApi";

export const CaregiverFormApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query endpoint to get a caregiver form by ID
    getCaregiverFormById: builder.query({
      query: (formId) => `caregiverform/${formId}`,
      providesTags: (result, error, formId) => [
        { type: "CaregiverForm", id: formId },
      ],
    }),

    // Query endpoint to get caregiver forms by patient ID
    getCaregiverFormsByPatientId: builder.query({
      query: (patientId) => `caregiverform/patient/${patientId}`,
      providesTags: (result, error, patientId) => [
        { type: "PatientCaregiverForms", id: patientId },
      ],
    }),

    // Mutation endpoint to create a new caregiver form
    createCaregiverForm: builder.mutation({
      query: (formData) => ({
        url: "caregiverform",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [
        { type: "CaregiverForm" },
        { type: "PatientCaregiverForms" },
      ],
    }),

    // Mutation endpoint to update an existing caregiver form
    updateCaregiverForm: builder.mutation({
      query: ({ formId, formData }) => ({
        url: `caregiverform/${formId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { formId }) => [
        { type: "CaregiverForm", id: formId },
        { type: "PatientCaregiverForms", id: result?.patientId }, // Assuming result includes patientId
      ],
    }),

    // Mutation endpoint to delete a caregiver form
    deleteCaregiverForm: builder.mutation({
      query: (formId) => ({
        url: `caregiverform/${formId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, formId) => [
        { type: "CaregiverForm", id: formId },
        { type: "PatientCaregiverForms", id: result?.patientId }, // Assuming result includes patientId
      ],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetCaregiverFormByIdQuery,
  useGetCaregiverFormsByPatientIdQuery,
  useCreateCaregiverFormMutation,
  useUpdateCaregiverFormMutation,
  useDeleteCaregiverFormMutation,
} = CaregiverFormApi;
