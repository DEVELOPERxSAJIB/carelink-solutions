
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const rootApi = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5173/api`,
  }),
  tagTypes: [],
  endpoints: () => ({}),
})