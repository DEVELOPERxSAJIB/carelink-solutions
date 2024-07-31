// api/SubUserApi.js

import { rootApi } from "./RootApi";

export const SubUserApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubUserById: builder.query({
      query: (subUserId) => `sub-user/${subUserId}`,
      providesTags: (result, error, _id) => [{ type: "SubUser", id: _id }],
    }),
    createSubUser: builder.mutation({
      query: (subUserData) => ({
        url: "sub-user",
        method: "POST",
        body: subUserData,
      }),
      invalidatesTags: [{ type: "SubUser" }],
    }),
    getAllSubUsers: builder.query({
      query: () => ({
        url: "sub-user",
        method: "GET",
      }),
      providesTags: (result, error, _) => [{ type: "SubUser" }],
    }),
    updateSubUser: builder.mutation({
      query: ({ subUserId, subUserData }) => ({
        url: `sub-user/${subUserId}`,
        method: "PUT",
        body: subUserData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "SubUser", id: _id }],
    }),
    deleteSubUser: builder.mutation({
      query: (subUserId) => ({
        url: `sub-user/${subUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "SubUser", id: _id }],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetSubUserByIdQuery,
  useCreateSubUserMutation,
  useGetAllSubUsersQuery,
  useUpdateSubUserMutation,
  useDeleteSubUserMutation,
} = SubUserApi;