import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://192.168.29.201:5000/api/banners"; // 👈 update this!

export const fetchBanners = createAsyncThunk(
  "banner/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();

      if (data.success) {
        return data.data; // array of banners
      } else {
        return rejectWithValue("Failed to fetch banners");
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default bannerSlice.reducer;
