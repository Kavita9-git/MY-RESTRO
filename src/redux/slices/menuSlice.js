import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
  const res = await api.get("/menu");

  // Handle all possible backend formats
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.menu)) return res.data.menu;
  if (Array.isArray(res.data.data)) return res.data.data;

  return []; // fallback
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load menu";
      });
  },
});

export default menuSlice.reducer;
