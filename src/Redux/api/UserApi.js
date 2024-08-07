import { rootApi } from "./RootApi";

export const UserApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `auth/${userId}`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllUsers: builder.query({
      query: () => `auth`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllAdmin: builder.query({
      query: () => `auth/admin`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllCaregiver: builder.query({
      query: () => `auth/caregiver`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllPatient: builder.query({
      query: () => `auth/patient`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllProvider: builder.query({
      query: () => `auth/provider`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllCoadmin: builder.query({
      query: () => `auth/coadmins`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllGuardian: builder.query({
      query: () => `auth/guardians`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllSupportAdministrator: builder.query({
      query: () => `auth/supportadministrators`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllHealthcareProfessional: builder.query({
      query: () => `auth/healthcareprofessionals`,
      providesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    getAllCompliance: builder.query({
      query: () => `auth/compliances`,
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
    updateAdmin: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/admin/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    updateProvider: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/provider/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    updateCaregiver: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/caregiver/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    updateCoAdmin: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/coadmin/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    updateGuardian: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/guardian/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    updateSupportAdministrator: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/supportadministrator/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    updateHealthcareProfessional: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/healthcareprofessional/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, _id) => [{ type: "User", id: _id }],
    }),
    updateCompliance: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `auth/compliance/${userId}`,
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
  useGetAllAdminQuery,
  useGetAllCaregiverQuery,
  useGetAllPatientQuery,
  useGetAllProviderQuery,
  useGetAllCoadminQuery,
  useGetAllGuardianQuery,
  useGetAllSupportAdministratorQuery,
  useGetAllHealthcareProfessionalQuery,
  useGetAllComplianceQuery,
  useMeQuery,
  useProcessRegisterMutation,
  useUpdateUserMutation,
  useUpdateAdminMutation,
  useUpdateProviderMutation,
  useUpdateCaregiverMutation,
  useUpdateCoAdminMutation,
  useUpdateGuardianMutation,
  useUpdateSupportAdministratorMutation,
  useUpdateHealthcareProfessionalMutation,
  useUpdateComplianceMutation,
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
  useGetAllUsersQuery,
} = UserApi;
