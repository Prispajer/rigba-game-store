import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import FetchService from "@/utils/classes/FetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

interface ProductGenresState {
  genresArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
}

const initialState: ProductGenresState = {
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
    const response = await FetchService.getGenresForProducts(quantity);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const productGenresSlice = createSlice({
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

export default productGenresSlice.reducer;
export const { loadMore } = productGenresSlice.actions;
