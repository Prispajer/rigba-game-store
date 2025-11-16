import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/services/FetchService";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export const getPublishers = createAsyncThunk<
    ApiProductDetails[],
  { quantity: number },
  { rejectValue: string }
>("publishers/getPublishers", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
      return await fetchService.getPublishersForProducts(
      quantity
    );
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
