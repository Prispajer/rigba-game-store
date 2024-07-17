import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/utils/classes/fetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

interface GenresState {
  genresArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GenresState = {
  genresArray: [],
  isLoading: false,
  error: null,
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
  reducers: {},
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

// import createResourceSlice from "./createResourceSlice";
// import fetchService from "@/utils/classes/fetchService";

// const { reducer: genresReducer, fetchResource: fetchGenres } =
//   createResourceSlice("genres", fetchService.getGamesGenres);

// export { fetchGenres };
// export default genresReducer;
