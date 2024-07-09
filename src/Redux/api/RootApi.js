import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://localhost:5050/api/v1/`,
    baseUrl: `https://carelinks-server.onrender.com/api/v1/`,
    credentials: 'include',
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
  devTools: true,
  tagTypes: ["User","Setting"],
  endpoints: () => ({}),
});
