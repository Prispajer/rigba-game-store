import { RootState } from "@/redux/store";

export const selectSearchGenreText = (state: RootState) => state.search.searchGenreText;
export const selectSearchPlatformText = (state: RootState) => state.search.searchPlatformText;
export const selectSearchPublisherText = (state: RootState) => state.search.searchPublisherText;
export const selectSearchStoreText = (state: RootState) => state.search.searchStoreText;
export const selectSearchWishlistText = (state: RootState) => state.search.searchWishlistText;
export const selectCompartmentNumberOne = (state: RootState) => state.search.compartmentNumberOne;
export const selectCompartmentNumberTwo = (state: RootState) => state.search.compartmentNumberTwo;