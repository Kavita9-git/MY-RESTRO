import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const bookTable = createAsyncThunk("booking/bookTable", async (data) => {
  const res = await api.post("/tables", data);
  return res.data;
});

const bookingSlice = createSlice({
  name: "booking",
  initialState: { status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTable.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bookTable.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(bookTable.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookingSlice.reducer;
