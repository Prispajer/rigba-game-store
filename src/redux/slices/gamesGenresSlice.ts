import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchService from "@/utils/classes/fetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

interface GenresState {
  genresArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
}

const initialState: GenresState = {
  genresArray: [],
  isLoading: false,
  error: null,
  page_size: 1,
};

export const fetchGenres = createAsyncThunk<
  GameAPIResponse[],
  { quantity: number },
  { rejectValue: string }
>("genres/fetchGenres", async ({ quantity = 1 }, { rejectWithValue }) => {
  try {
    const response = await fetchService.getGamesGenres(quantity);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    loadMore: (state) => {
      state.page_size += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.genresArray = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default genresSlice.reducer;
export const { loadMore } = genresSlice.actions;

// import createResourceSlice from "./createResourceSlice";
// import fetchService from "@/utils/classes/fetchService";

// const { reducer: genresReducer, fetchResource: fetchGenres } =
//   createResourceSlice("genres", fetchService.getGamesGenres);

// export { fetchGenres };
// export default genresReducer;
