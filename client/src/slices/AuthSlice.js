import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    changeCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { changeCurrentUser } = authSlice.actions;
