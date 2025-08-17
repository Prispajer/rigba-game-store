import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/services/FetchService";
import { GameAPIResponse } from "@/types/types";

export const getPublishers = createAsyncThunk<
  GameAPIResponse[],
  { quantity: number },
  { rejectValue: string }
>("publishers/getPublishers", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    const getPublishersResponse = await fetchService.getPublishersForProducts(
      quantity
    );
    return getPublishersResponse;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
