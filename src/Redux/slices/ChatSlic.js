// create atuh slice

import { createSlice } from "@reduxjs/toolkit";
const ChatSlice = createSlice({
  name: "chats",
  initialState: {
    chatsData: [],
  },
  reducers: {
    setChatData: (state, action) => {
      state.chatsData = action.payload;
    },
  },
});

export const getChatState = (state) => state.chat;

export const { setChatData } = ChatSlice.actions;
export default ChatSlice.reducer;
