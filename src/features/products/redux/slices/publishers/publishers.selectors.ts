import { RootState } from "@/redux/store";

export const selectPublishersArray = (state: RootState) =>
  state.publishers.publishersArray;

export const selectPublishersLoading = (state: RootState) =>
  state.publishers.isLoading;

export const selectPublishersError = (state: RootState) =>
  state.publishers.error;

export const selectPublishersPageSize = (state: RootState) =>
  state.publishers.page_size;
