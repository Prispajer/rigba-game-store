import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchService from "@/utils/classes/FetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

interface StoresState {
  storesArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
}

const initialState: StoresState = {
  storesArray: [],
  isLoading: false,
  error: null,
  page_size: 1,
};

export const fetchStores = createAsyncThunk<
  GameAPIResponse[],
  { quantity: number },
  { rejectValue: string }
>("stores/fetchStores", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    const response = await FetchService.getGamesStores(quantity);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.storesArray = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default storesSlice.reducer;
