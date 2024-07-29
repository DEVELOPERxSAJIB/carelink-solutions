import { rootApi } from "./RootApi";

export const UserApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `auth/${userId}`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    processRegister: builder.mutation({
      query: (userData) => ({
        url: "auth/process-register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    verifyRegister: builder.mutation({
      query: (token) => ({
        url: `auth/verify-register`,
        method: "POST",
        body: { token },
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        body: "",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    me: builder.query({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
      invalidatesTags: [{ type: "User" }],
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `auth/forgot-password`,
        method: "POST",
        body: email,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    resetPassword: builder.mutation({
      query: (userData) => ({
        url: `auth/reset-password`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    updatePasswordLogged: builder.mutation({
      query: (userData) => ({
        url: `auth//update-password-logged`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `auth/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),

    createUser: builder.mutation({
      query: (userData) => ({
        url: `user/create-user`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    activateUser: builder.mutation({
      query: (token) => ({
        url: `user/activate-user`,
        method: "POST",
        body: { token },
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    roleBasedUser: builder.query({
      query: (role) => ({
        url: `user/get-user-by-role?role=${role}`,
        method: "GET",
      }),
      providesTags: [{ type: "User" }], 
    }),
    deleteRoleBasedUser: builder.mutation({
      query: (userId) => ({
        url: `user/delete-user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetUserByIdQuery,
  useMeQuery,
  useProcessRegisterMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
  useVerifyRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordLoggedMutation,

  useCreateUserMutation,
  useActivateUserMutation,
  useRoleBasedUserQuery,
  useDeleteRoleBasedUserMutation,
} = UserApi;
