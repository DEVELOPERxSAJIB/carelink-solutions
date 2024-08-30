import { rootApi } from "../RootApi";

export const CommunicationNoteApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query endpoint to get a CommunicationNote by ID
    getCommunicationNoteById: builder.query({
      query: (id) => `communicationnote/${id}`,
      providesTags: (result, error, id) => [{ type: "CommunicationNote", id }],
    }),

    // Query endpoint to get all CommunicationNotes by patient ID
    getCommunicationNotesByPatientId: builder.query({
      query: (patientId) => `communicationnote/patient/${patientId}`,
      providesTags: (result, error, patientId) => [
        { type: "PatientCommunicationNote", id: patientId },
      ],
    }),

    // Mutation endpoint to create a new CommunicationNote
    createCommunicationNote: builder.mutation({
      query: (communicationNoteData) => ({
        url: "communicationnote",
        method: "POST",
        body: communicationNoteData,
      }),
      invalidatesTags: [
        { type: "CommunicationNote" },
        { type: "PatientCommunicationNote" },
      ],
    }),

    // Mutation endpoint to update an existing CommunicationNote
    updateCommunicationNote: builder.mutation({
      query: ({ id, communicationNoteData }) => ({
        url: `communicationnote/${id}`,
        method: "PUT",
        body: communicationNoteData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CommunicationNote", id },
        { type: "PatientCommunicationNote", id: result?.patientId }, // Assuming result includes patientId
      ],
    }),

    // Mutation endpoint to delete a CommunicationNote
    deleteCommunicationNote: builder.mutation({
      query: (id) => ({
        url: `communicationnote/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CommunicationNote", id },
        { type: "PatientCommunicationNote", id: result?.patientId }, // Assuming result includes patientId
      ],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetCommunicationNoteByIdQuery,
  useGetCommunicationNotesByPatientIdQuery,
  useCreateCommunicationNoteMutation,
  useUpdateCommunicationNoteMutation,
  useDeleteCommunicationNoteMutation,
} = CommunicationNoteApi;
