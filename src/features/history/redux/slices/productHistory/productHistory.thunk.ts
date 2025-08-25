import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, UserProductHistory } from "@/types/types";

export const getProductHistory = createAsyncThunk<
  { data: UserProductHistory[]; message: string },
  { email: string },
  { rejectValue: string }
>(
  "productHistory/getProductHistory",
  async ({ email }, { rejectWithValue }) => {
    try {
      const getUserProductHistoryResponse: RequestResponse<
        UserProductHistory[]
      > = await requestService.postMethod(
        "products/endpoints/productManagement/getProductHistory",
        { email }
      );
      if (getUserProductHistoryResponse.success) {
        return {
          data: getUserProductHistoryResponse.data || [],
          message:
            getUserProductHistoryResponse.message ||
            "Product history fetched successfully!",
        };
      } else {
        throw new Error(
          getUserProductHistoryResponse.message ||
            "Failed to fetch product history!"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
