import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/utils/classes/fetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

interface PlatformsState {
  platformsArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
}

const initialState: PlatformsState = {
  platformsArray: [],
  isLoading: false,
  error: null,
  page_size: 1,
};

export const fetchPlatforms = createAsyncThunk<
  GameAPIResponse[],
  { quantity: number },
  { rejectValue: string }
>("platforms/fetchPlatforms", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    const response = await fetchService.getGamesPlatforms(quantity);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const platformsSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatforms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlatforms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.platformsArray = action.payload;
      })
      .addCase(fetchPlatforms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default platformsSlice.reducer;

// import createResourceSlice from "./createResourceSlice";
// import fetchService from "@/utils/classes/fetchService";

// const { reducer: platformsReducer, fetchResource: fetchPlatforms } =
//   createResourceSlice("platforms", fetchService.getGamesPlatforms);

// export { fetchPlatforms };
// export default platformsReducer;
