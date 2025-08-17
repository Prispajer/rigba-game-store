import { RootState } from "@/redux/store";

export const selectGenres = (state: RootState) => state.genres.genresArray;

export const selectGenresLoading = (state: RootState) => state.genres.isLoading;

export const selectGenresError = (state: RootState) => state.genres.error;

export const selectGenresPageSize = (state: RootState) =>
  state.genres.page_size;
