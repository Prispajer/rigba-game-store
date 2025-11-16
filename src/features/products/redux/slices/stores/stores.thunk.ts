import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/services/FetchService";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export const getStores = createAsyncThunk<
  ApiProductDetails[],
  { quantity: number },
  { rejectValue: string }
>("stores/fetchStores", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    return await fetchService.getStoresForProducts(quantity);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
