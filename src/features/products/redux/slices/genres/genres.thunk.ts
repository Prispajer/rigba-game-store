import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/services/FetchService";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export const getGenres = createAsyncThunk<
    ApiProductDetails[],
  { quantity: number },
  { rejectValue: string }
>("genres/getGenres", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    return await fetchService.getGenresForProducts(quantity);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
