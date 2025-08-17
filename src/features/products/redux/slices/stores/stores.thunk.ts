import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/services/FetchService";
import { GameAPIResponse } from "@/types/types";

export const getStores = createAsyncThunk<
  GameAPIResponse[],
  { quantity: number },
  { rejectValue: string }
>("stores/fetchStores", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    const getStoresResponse = await fetchService.getStoresForProducts(quantity);
    return getStoresResponse;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
