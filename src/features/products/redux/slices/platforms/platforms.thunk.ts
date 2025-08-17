import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/services/FetchService";
import { GameAPIResponse } from "@/types/types";

export const getPlatforms = createAsyncThunk<
  GameAPIResponse[],
  { quantity: number },
  { rejectValue: string }
>("platforms/getPlatforms", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    const getPlatformsResponse = await fetchService.getPlatformsForProducts(
      quantity
    );
    return getPlatformsResponse;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
