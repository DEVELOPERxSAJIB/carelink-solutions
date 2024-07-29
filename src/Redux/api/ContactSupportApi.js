import { rootApi } from "./RootApi";

export const ContactSupportApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getTimeSheetById: builder.query({
      query: (timeSheetId) => `timesheet/${timeSheetId}`,
      providesTags: (result, error, _id) => [{ type: "TimeSheet", id: _id }],
    }),
    createContactSupportApi: builder.mutation({
      query: (data) => ({
        url: "contactsupport",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "contactsupport" }],
    }),
    getAllTickets: builder.query({
      query: () => ({
        url: "ticket",
        method: "GET",
      }),
      providesTags: (result, error, _) => [{ type: "Tickets" }],
    }),
    updateTimeSheet: builder.mutation({
      query: ({ timesheetId, timeSheetData }) => ({
        url: `timesheet/${timesheetId}`,
        method: "PUT",
        body: timeSheetData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "TimeSheet", id: _id }],
    }),
    deleteTicket: builder.mutation({
      query: (ticketId) => ({
        url: `ticket/${ticketId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Tickets", id: _id }],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetTimeSheetByIdQuery,
  useCreateContactSupportApiMutation,
  useGetAllTicketsQuery,
  useUpdateTimeSheetMutation,
  useDeleteTicketMutation,
} = ContactSupportApi;
