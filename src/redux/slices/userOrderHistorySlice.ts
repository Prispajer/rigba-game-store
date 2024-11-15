import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { OrderHistory } from "@prisma/client";
import { RequestResponse } from "@/utils/helpers/types";

export interface UserOrderHistoryState {
  orderHistoryArray: OrderHistory[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
  isLoading: boolean;
}

const initialState: UserOrderHistoryState = {
  orderHistoryArray: [],
  status: "idle",
  error: null,
  success: null,
  message: null,
  isLoading: false,
};

export const fetchUserOrderHistory = createAsyncThunk<
  { data: OrderHistory[]; message: string },
  { email: string },
  { rejectValue: string }
>(
  "orderHistory/fetchUserOrderHistory",
  async ({ email }, { rejectWithValue }) => {
    try {
      const fetchUserOrderHistoryResponse: RequestResponse<OrderHistory[]> =
        await requestService.postMethod(
          "products/endpoints/productManagement/getOrderHistory",
          { email }
        );

      if (fetchUserOrderHistoryResponse?.success) {
        return {
          data: fetchUserOrderHistoryResponse.data || [],
          message:
            fetchUserOrderHistoryResponse.message ||
            "Order history fetched successfully!",
        };
      } else {
        throw new Error(
          fetchUserOrderHistoryResponse.message ||
            "Failed to fetch order history!"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userOrderHistorySlice = createSlice({
  name: "userOrderHistory",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.status = "Loading";
        state.isLoading = true;
        state.error = null;
        state.success = null;
        state.message = null;
        clearMessages();
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.orderHistoryArray = action.payload.data;
        state.success = "Order history fetched successfully!";
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.status = "Failed";
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch order history.";
      });
  },
});

export const { clearMessages } = userOrderHistorySlice.actions;

export default userOrderHistorySlice.reducer;
