import { createSlice } from "@reduxjs/toolkit";
import { getPlatforms } from "./platforms.thunk";
import { PlatformsState } from "./platforms.types";

const initialState: PlatformsState = {
  platformsArray: [],
  isLoading: false,
  error: null,
  page_size: 1,
};

const platformsSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlatforms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPlatforms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.platformsArray = action.payload;
      })
      .addCase(getPlatforms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default platformsSlice.reducer;
