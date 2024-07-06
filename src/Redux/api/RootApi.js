import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://carelink-server-a8k3.onrender.com/api/v1/`,
    credentials: 'include',
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
  devTools: true,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
