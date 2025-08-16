import { createSlice } from "@reduxjs/toolkit";
import { getProductHistory } from "./productHistory.thunk";
import { ProductHistoryState } from "./productHistory.types";

const initialState: ProductHistoryState = {
  productHistoryArray: [],
  status: "idle",
  error: null,
  success: null,
  message: null,
  isLoading: false,
};

const productHistorySlice = createSlice({
  name: "userProductHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductHistory.pending, (state) => {
        state.status = "Loading";
        state.isLoading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(getProductHistory.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.success = "Product history fetched successfully!";
        state.productHistoryArray = action.payload.data;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(getProductHistory.rejected, (state, action) => {
        state.status = "Failed";
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Failed to fetch product history.";
      });
  },
});

export default productHistorySlice.reducer;
