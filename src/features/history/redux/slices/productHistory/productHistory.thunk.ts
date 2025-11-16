import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import RequestResponse from "@/shared/types/requestResponse";
import PurchasedProductRecord from "@/features/history/types/purchasedProductRecord";

export const getUserProductHistory = createAsyncThunk<
  { data: PurchasedProductRecord[]; message: string },
  { email: string },
  { rejectValue: string }
>(
  "productHistory/getUserProductHistory",
  async ({ email }, { rejectWithValue }) => {
    try {
      const getUserProductHistoryResponse: RequestResponse<
        PurchasedProductRecord[]
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
