import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchService from "@/utils/classes/fetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

interface FilterState {
  data: GameAPIResponse[];
  genresId: number[];
  platformsId: number[];
  storesId: number[];
  publishersId: number[];
  isLoading: boolean;
  error: string | null;
  page: number;
  count: number;
  nextUrl: string | null;
  previousUrl: string | null;
}

const initialState: FilterState = {
  data: [],
  genresId: [],
  platformsId: [],
  isLoading: false,
  error: null,
  page: 1,
  count: 0,
  nextUrl: null,
  previousUrl: null,
};

export const fetchGamesByGenresId = createAsyncThunk(
  "productFetchAndFilterSlice/fetchGamesByTagsId",
  async ({ page = 1 }: { page: number }, { rejectWithValue, getState }) => {
    const { genresId, platformsId, storesId, publishersId } = (
      getState() as { productFetchAndFilter: FilterState }
    ).productFetchAndFilter;
    try {
      const data = await fetchService.getGamesByGenresId(
        genresId,
        page,
        platformsId,
        storesId,
        publishersId
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const productFetchAndFilterSlice = createSlice({
  name: "productFetchAndFilter",
  initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{
        page: number;
      }>
    ) => {
      const { page } = action.payload;
      state.page = page;
    },
    setGenresId: (state, action: PayloadAction<number[]>) => {
      state.genresId = action.payload;
    },
    setPlatformsId: (state, action: PayloadAction<number[]>) => {
      state.platformsId = action.payload;
    },
    setStoresId: (state, action: PayloadAction<number[]>) => {
      state.storesId = action.payload;
    },
    setPublishersId: (state, action: PayloadAction<number[]>) => {
      state.publishersId = action.payload;
    },
    setNextPage: (state) => {
      if (state.page < 500) {
        state.page += 1;
      }
    },
    setPreviousPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesByGenresId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchGamesByGenresId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload.results;
          state.count = action.payload.count;
          state.nextUrl = action.payload.next;
          state.previousUrl = action.payload.previous;
        }
      )
      .addCase(fetchGamesByGenresId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPage,
  setGenresId,
  setPlatformsId,
  setStoresId,
  setPublishersId,
  setNextPage,
  setPreviousPage,
} = productFetchAndFilterSlice.actions;
export default productFetchAndFilterSlice.reducer;
