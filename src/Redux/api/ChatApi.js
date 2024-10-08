import { rootApi } from "./RootApi";

export const ChatApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatById: builder.query({
      query: (chatId) => `chats/${chatId}`,
      providesTags: (result, error, chatId) => [{ type: "Chat", id: chatId }],
    }),
    createChat: builder.mutation({
      query: (chatData) => ({
        url: "chats",
        method: "POST",
        body: chatData,
      }),
      invalidatesTags: [{ type: "Chat" }],
    }),
    getAllChats: builder.query({
      query: (userId) => ({
        url: `chats/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error) => [{ type: "Chat" }],
    }),
    getAllChatsUsers: builder.query({
      query: (userId) => ({
        url: `chats/chatUser/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error) => [{ type: "Chat" }],
    }),
    updateChat: builder.mutation({
      query: ({ chatId, chatData }) => ({
        url: `chats/${chatId}`,
        method: "PUT",
        body: chatData,
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: "Chat", id: chatId },
      ],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chats/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, chatId) => [
        { type: "Chat", id: chatId },
      ],
    }),
  }),
});

// Export hooks generated by the endpoints
export const {
  useGetChatByIdQuery,
  useGetAllChatsUsersQuery,
  useCreateChatMutation,
  useGetAllChatsQuery,
  useUpdateChatMutation,
  useDeleteChatMutation,
} = ChatApi;
