import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/utils/classes/fetchService"; // Adjust import path as per your project structure

interface PublishersState {
  data: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PublishersState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchPublishers = createAsyncThunk<
  GameAPIResponse[],
  { page: number },
  { rejectValue: string }
>("publishers/fetchPublishers", async ({ page = 1 }, { rejectWithValue }) => {
  try {
    const response = await fetchService.getGamesPublishers(page); // Example fetch function
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

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
        state.data = action.payload;
      })
      .addCase(fetchPublishers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default publishersSlice.reducer;
