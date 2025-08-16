import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, OrderHistory } from "@/types/types";

export const getOrderHistory = createAsyncThunk<
  { data: OrderHistory[]; message: string },
  { email: string },
  { rejectValue: string }
>("orderHistory/getOrderHistory", async ({ email }, { rejectWithValue }) => {
  try {
    const getOrderHistoryResponse: RequestResponse<OrderHistory[]> =
      await requestService.postMethod(
        "products/endpoints/productManagement/getOrderHistory",
        { email }
      );
    if (getOrderHistoryResponse.success) {
      return {
        data: getOrderHistoryResponse.data || [],
        message:
          getOrderHistoryResponse.message ||
          "Order history fetched successfully!",
      };
    } else {
      throw new Error(
        getOrderHistoryResponse.message || "Failed to fetch order history!"
      );
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
