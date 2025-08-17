import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/services/FetchService";
import { GameAPIResponse } from "@/types/types";

export const getGenres = createAsyncThunk<
  GameAPIResponse[],
  { quantity: number },
  { rejectValue: string }
>("genres/getGenres", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    const getGenresResponse = await fetchService.getGenresForProducts(quantity);
    return getGenresResponse;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
