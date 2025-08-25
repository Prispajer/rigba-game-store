import { createSlice } from "@reduxjs/toolkit";
import { getUserOrderHistory } from "./orderHistory.thunk";
import { UserOrderHistoryState } from "./orderHistory.types";

const initialState: UserOrderHistoryState = {
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
      .addCase(getUserOrderHistory.pending, (state) => {
        state.status = "Loading";
        state.isLoading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(getUserOrderHistory.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.orderHistoryArray = action.payload.data;
        state.success = "Order history fetched successfully!";
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(getUserOrderHistory.rejected, (state, action) => {
        state.status = "Failed";
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch order history.";
      });
  },
});

export default orderHistorySlice.reducer;
