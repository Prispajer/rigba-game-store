import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchService from "@/utils/services/FetchService";
import { getGamesWithRandomPrices } from "@/utils/prices";
import { GameAPIResponse, RequestResponse } from "@/utils/helpers/types";

export interface ProductFilterState {
  productsWithFilters: GameAPIResponse[];
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

const initialState: ProductFilterState = {
  productsWithFilters: [],
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

export const fetchProductsWithFilters = createAsyncThunk<
  {
    results: GameAPIResponse[];
    count: number;
    next: string | null;
    previous: string | null;
  },
  { page: number },
  { rejectValue: string }
>(
  "productFilter/fetchProductsWithFilters",
  async ({ page = 1 }, { rejectWithValue, getState }) => {
    const {
      productsWithFilters,
      genresIdArray,
      platformsIdArray,
      storesIdArray,
      publishersIdArray,
      ordering,
    } = (getState() as { productFilter: ProductFilterState }).productFilter;

    try {
      const getProductsWithFilters = await fetchService.getProductsWithFilters(
        genresIdArray,
        page,
        platformsIdArray,
        storesIdArray,
        publishersIdArray,
        ordering
      );

      const gamesWithPrices = await getGamesWithRandomPrices(
        getProductsWithFilters.results,
        productsWithFilters
      );

      if (ordering === "price") {
        gamesWithPrices.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      } else if (ordering === "-price") {
        gamesWithPrices.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      }

      return {
        ...getProductsWithFilters,
        results: gamesWithPrices,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

const productFiltersSlice = createSlice({
  name: "gamesFilter",
  initialState,
  reducers: {
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
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page;
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
      .addCase(fetchProductsWithFilters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsWithFilters.fulfilled,
        (
          state,
          action: PayloadAction<{
            results: GameAPIResponse[];
            count: number;
            next: string | null;
            previous: string | null;
          }>
        ) => {
          state.isLoading = false;
          state.productsWithFilters = action.payload.results;
          state.gamesCount = action.payload.count;
          state.nextPage = action.payload.next;
          state.previousPage = action.payload.previous;
        }
      )
      .addCase(fetchProductsWithFilters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
  setPublishersIdArray,
  setOrdering,
  setPage,
  setNextPage,
  setPreviousPage,
} = productFiltersSlice.actions;
export default productFiltersSlice.reducer;
