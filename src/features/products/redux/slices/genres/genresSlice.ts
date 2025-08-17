import { createSlice } from "@reduxjs/toolkit";
import { getGenres } from "./genres.thunk";
import { GenresState } from "./genres.types";

const initialState: GenresState = {
  genresArray: [],
  isLoading: false,
  error: null,
  page_size: 1,
};

const productGenresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    incrementPageSize: (state) => {
      state.page_size += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.genresArray = action.payload;
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default productGenresSlice.reducer;
export const { incrementPageSize } = productGenresSlice.actions;
