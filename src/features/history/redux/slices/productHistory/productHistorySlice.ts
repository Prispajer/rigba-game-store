import { createSlice } from "@reduxjs/toolkit";
import { getUserProductHistory } from "./productHistory.thunk";
import { UserProductHistoryState } from "./productHistory.types";

const initialState: UserProductHistoryState = {
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
      .addCase(getUserProductHistory.pending, (state) => {
        state.status = "Loading";
        state.isLoading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(getUserProductHistory.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.success = "Product history fetched successfully!";
        state.productHistoryArray = action.payload.data;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(getUserProductHistory.rejected, (state, action) => {
        state.status = "Failed";
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Failed to fetch product history.";
      });
  },
});

export default productHistorySlice.reducer;
