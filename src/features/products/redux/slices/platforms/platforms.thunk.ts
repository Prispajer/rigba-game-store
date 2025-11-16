import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/services/FetchService";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export const getPlatforms = createAsyncThunk<
  ApiProductDetails[],
  { quantity: number },
  { rejectValue: string }
>("platforms/getPlatforms", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    return  await fetchService.getPlatformsForProducts(
      quantity
    );
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
