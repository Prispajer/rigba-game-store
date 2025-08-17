import { RootState } from "@/redux/store";

export const selectStores = (state: RootState) => state.stores.storesArray;
export const selectStoresLoading = (state: RootState) => state.stores.isLoading;
export const selectStoresError = (state: RootState) => state.stores.error;
export const selectStoresPageSize = (state: RootState) =>
  state.stores.page_size;
