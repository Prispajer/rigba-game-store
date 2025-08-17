import { createSlice } from "@reduxjs/toolkit";
import { getStores } from "./stores.thunk";
import { StoresState } from "./stores.types";

const initialState: StoresState = {
  storesArray: [],
  isLoading: false,
  error: null,
  page_size: 1,
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.storesArray = action.payload;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default storesSlice.reducer;
