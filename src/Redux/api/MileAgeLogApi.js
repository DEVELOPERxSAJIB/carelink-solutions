import { rootApi } from './RootApi';

export const MileageLogApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMileageLogById: builder.query({
      query: (mileageLogId) => `mileagelog/${mileageLogId}`,
      providesTags: (result, error, _id) => [{ type: 'MileageLog', id: _id }],
    }),
    createMileageLog: builder.mutation({
      query: (mileageLogData) => ({
        url: 'mileagelog',
        method: 'POST',
        body: mileageLogData,
      }),
      invalidatesTags: [{ type: 'MileageLog' }],
    }),
    getAllMileageLogs: builder.query({
      query: () => ({
        url: 'mileagelog',
        method: 'GET',
      }),
      providesTags: (result, error, _) => [{ type: 'MileageLog' }],
    }),
    updateMileageLog: builder.mutation({
      query: ({ mileageLogId, mileageLogData }) => ({
        url: `mileagelog/${mileageLogId}`,
        method: 'PUT',
        body: mileageLogData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: 'MileageLog', id: _id }],
    }),
    deleteMileageLog: builder.mutation({
      query: (mileageLogId) => ({
        url: `mileagelog/${mileageLogId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, _id) => [{ type: 'MileageLog', id: _id }],
    }),
  }),
});

export const {
  useGetMileageLogByIdQuery,
  useCreateMileageLogMutation,
  useGetAllMileageLogsQuery,
  useUpdateMileageLogMutation,
  useDeleteMileageLogMutation,
} = MileageLogApi;
