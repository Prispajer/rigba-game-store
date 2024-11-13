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
}

const initialState: UserOrderHistoryState = {
  orderHistoryArray: [],
  status: "idle",
  error: null,
  success: null,
  message: null,
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
          {
            email,
          }
        );
      if (
        fetchUserOrderHistoryResponse &&
        fetchUserOrderHistoryResponse.success
      ) {
        return {
          data: fetchUserOrderHistoryResponse.data || [],
          message:
            fetchUserOrderHistoryResponse.message ||
            "Failed to fetch order history!",
        };
      } else {
        throw new Error(fetchUserOrderHistoryResponse.message);
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.status = "Loading";
        clearMessages();
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.orderHistoryArray = action.payload.data;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = userOrderHistorySlice.actions;

export default userOrderHistorySlice.reducer;
