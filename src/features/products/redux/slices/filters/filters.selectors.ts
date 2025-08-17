import { RootState } from "@/redux/store";

export const selectFilteredProducts = (state: RootState) =>
  state.productFilter.productsWithFilters;

export const selectGenresIds = (state: RootState) =>
  state.productFilter.genresIdArray;

export const selectPlatformsIds = (state: RootState) =>
  state.productFilter.platformsIdArray;

export const selectStoresIds = (state: RootState) =>
  state.productFilter.storesIdArray;

export const selectPublishersIds = (state: RootState) =>
  state.productFilter.publishersIdArray;

export const selectOrdering = (state: RootState) =>
  state.productFilter.ordering;

export const selectPage = (state: RootState) => state.productFilter.page;

export const selectGamesCount = (state: RootState) =>
  state.productFilter.gamesCount;

export const selectNextPage = (state: RootState) =>
  state.productFilter.nextPage;

export const selectPreviousPage = (state: RootState) =>
  state.productFilter.previousPage;

export const selectFiltersLoading = (state: RootState) =>
  state.productFilter.isLoading;

export const selectFiltersError = (state: RootState) =>
  state.productFilter.error;
