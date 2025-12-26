import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { admin: null },
  reducers: {
    loginAdmin: (state, action) => {
      state.admin = action.payload;
    },
    logoutAdmin: (state) => {
      state.admin = null;
    },
  },
});

export const { loginAdmin, logoutAdmin } = userSlice.actions;
export default userSlice.reducer;
