import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductsWithFilters } from "./filters.thunk";
import { FiltersState } from "./filters.types";

const initialState: FiltersState = {
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

const filtersSlice = createSlice({
  name: "filters",
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
      .addCase(getProductsWithFilters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductsWithFilters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsWithFilters = action.payload.results;
        state.gamesCount = action.payload.count;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
      })
      .addCase(getProductsWithFilters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.page = 1;
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
} = filtersSlice.actions;

export default filtersSlice.reducer;
