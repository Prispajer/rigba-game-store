import { RootState } from "@/redux/store";

export const selectSearchGenreTextState = (state: RootState) => state.search.searchGenreText;
export const selectSearchPlatformTextState = (state: RootState) => state.search.searchPlatformText;
export const selectSearchPublisherTextState = (state: RootState) => state.search.searchPublisherText;
export const selectSearchStoreTextState = (state: RootState) => state.search.searchStoreText;
export const selectSearchWishlistTextState = (state: RootState) => state.search.searchWishlistText;
export const selectCompartmentNumberOneState = (state: RootState) => state.search.compartmentNumberOne;
export const selectCompartmentNumberTwoState = (state: RootState) => state.search.compartmentNumberTwo;