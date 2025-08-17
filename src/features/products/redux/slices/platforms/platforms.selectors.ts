import { RootState } from "@/redux/store";

export const selectPlatformsArray = (state: RootState) =>
  state.platforms.platformsArray;

export const selectPlatformsLoading = (state: RootState) =>
  state.platforms.isLoading;

export const selectPlatformsError = (state: RootState) => state.platforms.error;

export const selectPlatformsPageSize = (state: RootState) =>
  state.platforms.page_size;
