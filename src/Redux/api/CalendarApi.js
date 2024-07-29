import { rootApi } from "./RootApi";

export const CalendarApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    
    createCalendar: builder.mutation({
      query: (calendarData) => ({
        url: "calendar",
        method: "POST",
        body: calendarData,
      }),
      invalidatesTags: [{ type: "Calendar" }],
    }),
    getAllCalendar: builder.query({
      query: () => ({
        url: "calendar",
        method: "GET",
      }),
      providesTags: (result, error, _) => [{ type: "Calendar" }],
    }),
    updateCalendar: builder.mutation({
      query: ({ Id, calendarData }) => ({
        url: `clock/${Id}`,
        method: "PUT",
        body: calendarData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Clock", id: _id }],
    }),
    deleteCalendar: builder.mutation({
      query: (calenderId) => ({
        url: `calendar/${calenderId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Calendar", id: _id }],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {  
  useCreateCalendarMutation,
  useGetAllCalendarQuery,
  useUpdateClockMutation,
  useDeleteCalendarMutation,
} = CalendarApi;
