import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/utils/classes/fetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

interface PublishersState {
  publishersArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
}

const initialState: PublishersState = {
  publishersArray: [],
  isLoading: false,
  error: null,
  page_size: 1,
};

export const fetchPublishers = createAsyncThunk<
  GameAPIResponse[],
  { quantity: number },
  { rejectValue: string }
>(
  "publishers/fetchPublishers",
  async ({ quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await fetchService.getGamesPublishers(quantity);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const publishersSlice = createSlice({
  name: "publishers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublishers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publishersArray = action.payload;
      })
      .addCase(fetchPublishers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default publishersSlice.reducer;
