import { createSlice } from "@reduxjs/toolkit";
import { getOrderHistory } from "./orderHistory.thunk";
import { OrderHistoryState } from "./orderHistory.types";

const initialState: OrderHistoryState = {
  orderHistoryArray: [],
  status: "Idle",
  error: null,
  success: null,
  message: null,
  isLoading: false,
};

const orderHistorySlice = createSlice({
  name: "userOrderHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.status = "Loading";
        state.isLoading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.orderHistoryArray = action.payload.data;
        state.success = "Order history fetched successfully!";
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.status = "Failed";
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch order history.";
      });
  },
});

export default orderHistorySlice.reducer;
