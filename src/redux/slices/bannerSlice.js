import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchBanners = createAsyncThunk("banner/fetchBanners", async () => {
  const res = await api.get("/banners");
  return res.data;
});

const bannerSlice = createSlice({
  name: "banner",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default bannerSlice.reducer;
