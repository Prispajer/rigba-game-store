import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, ProductHistory } from "@/types/types";

export const getProductHistory = createAsyncThunk<
  { data: ProductHistory[]; message: string },
  { email: string },
  { rejectValue: string }
>(
  "productHistory/getProductHistory",
  async ({ email }, { rejectWithValue }) => {
    try {
      const getProductHistoryResponse: RequestResponse<ProductHistory[]> =
        await requestService.postMethod(
          "products/endpoints/productManagement/getProductHistory",
          { email }
        );
      if (getProductHistoryResponse.success) {
        return {
          data: getProductHistoryResponse.data || [],
          message:
            getProductHistoryResponse.message ||
            "Product history fetched successfully!",
        };
      } else {
        throw new Error(
          getProductHistoryResponse.message ||
            "Failed to fetch product history!"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
