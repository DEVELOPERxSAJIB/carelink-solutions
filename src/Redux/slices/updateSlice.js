// create atuh slice

import { createSlice } from "@reduxjs/toolkit";
const updateSlice = createSlice({
  name: "update",
  initialState: {
    update:false
  },
  reducers: {
    setDataRefetch: (state, action) => {
      state.update=action.payload
    },
  },
});

export const getPermissionData = (state) => state.update;

export const { setDataRefetch } = updateSlice.actions;
export default updateSlice.reducer;
