import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchService from "@/utils/classes/fetchService";
import { GameAPIResponse } from "@/utils/helpers/types";
import { getGamesWithRandomPrices } from "@/utils/prices";

interface FilterState {
  gamesWithFilters: GameAPIResponse[];
  genresIdArray: number[];
  platformsIdArray: number[];
  storesIdArray: number[];
  publishersIdArray: number[];
  ordering: string;
  isLoading: boolean;
  error: string | null;
  page: number;
  gamesCount: number;
  nextPage: string | null;
  previousPage: string | null;
}

const initialState: FilterState = {
  gamesWithFilters: [],
  genresIdArray: [],
  platformsIdArray: [],
  storesIdArray: [],
  publishersIdArray: [],
  ordering: "",
  isLoading: false,
  error: null,
  page: 1,
  gamesCount: 0,
  nextPage: null,
  previousPage: null,
};

export const fetchGamesWithFilters = createAsyncThunk<
  GameAPIResponse[],
  { page: number },
  { rejectValue: string; getState: () => unknown }
>(
  "gamesFilter/fetchGamesWithFilters",
  async ({ page = 1 }: { page: number }, { rejectWithValue, getState }) => {
    const {
      genresIdArray,
      platformsIdArray,
      storesIdArray,
      publishersIdArray,
      ordering,
    } = (getState() as { gamesFilter: FilterState }).gamesFilter;
    try {
      const getGamesWithFilters = await fetchService.getGamesWithFilters(
        genresIdArray,
        page,
        platformsIdArray,
        storesIdArray,
        publishersIdArray,
        ordering
      );
      const gamesWithPrices = await getGamesWithRandomPrices(
        getGamesWithFilters.results
      );
      return {
        ...getGamesWithFilters,
        results: gamesWithPrices,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const gamesFilterSlice = createSlice({
  name: "gamesFilter",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page;
    },
    setGenresIdArray: (state, action: PayloadAction<number[]>) => {
      state.genresIdArray = action.payload;
    },
    setPlatformsIdArray: (state, action: PayloadAction<number[]>) => {
      state.platformsIdArray = action.payload;
    },
    setStoresIdArray: (state, action: PayloadAction<number[]>) => {
      state.storesIdArray = action.payload;
    },
    setPublishersIdArray: (state, action: PayloadAction<number[]>) => {
      state.publishersIdArray = action.payload;
    },
    setOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload;
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
      .addCase(fetchGamesWithFilters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchGamesWithFilters.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.gamesWithFilters = action.payload.results;
          state.gamesCount = action.payload.count;
          state.nextPage = action.payload.next;
          state.previousPage = action.payload.previous;
        }
      )
      .addCase(fetchGamesWithFilters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPage,
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
  setPublishersIdArray,
  setOrdering,
  setNextPage,
  setPreviousPage,
} = gamesFilterSlice.actions;
export default gamesFilterSlice.reducer;
