import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, UserOrderHistory } from "@/types/types";

export const getUserOrderHistory = createAsyncThunk<
  { data: UserOrderHistory[]; message: string },
  { email: string },
  { rejectValue: string }
>("orderHistory/getOrderHistory", async ({ email }, { rejectWithValue }) => {
  try {
    const getUserOrderHistoryResponse: RequestResponse<UserOrderHistory[]> =
      await requestService.postMethod(
        "products/endpoints/productManagement/getOrderHistory",
        { email }
      );
    if (getUserOrderHistoryResponse.success) {
      return {
        data: getUserOrderHistoryResponse.data || [],
        message:
          getUserOrderHistoryResponse.message ||
          "Order history fetched successfully!",
      };
    } else {
      throw new Error(
        getUserOrderHistoryResponse.message || "Failed to fetch order history!"
      );
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
