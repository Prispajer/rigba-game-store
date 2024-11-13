import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, UserProductHistory } from "@/utils/helpers/types";

export interface UserProductHistoryState {
  productHistoryArray: UserProductHistory[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
}

const initialState: UserProductHistoryState = {
  productHistoryArray: [],
  status: "idle",
  error: null,
  success: null,
  message: null,
};

export const fetchUserProductHistory = createAsyncThunk<
  { data: UserProductHistory[]; message: string },
  { email: string },
  { rejectValue: string }
>(
  "userProductHistory/fetchUserProductHistory",
  async ({ email }, { rejectWithValue }) => {
    try {
      const fetchUserProductHistoryResponse: RequestResponse<
        UserProductHistory[]
      > = await requestService.postMethod(
        "products/endpoints/productManagement/getProductHistory",
        {
          email,
        }
      );
      if (
        fetchUserProductHistoryResponse &&
        fetchUserProductHistoryResponse.success
      ) {
        return {
          data: fetchUserProductHistoryResponse.data || [],
          message:
            fetchUserProductHistoryResponse.message ||
            "Failed to fetch product history!",
        };
      } else {
        throw new Error(fetchUserProductHistoryResponse.message);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userProductHistorySlice = createSlice({
  name: "userProductHistory",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProductHistory.pending, (state) => {
        state.status = "Loading";
        clearMessages();
      })
      .addCase(fetchUserProductHistory.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.productHistoryArray = action.payload.data;
      })
      .addCase(fetchUserProductHistory.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = userProductHistorySlice.actions;

export default userProductHistorySlice.reducer;
