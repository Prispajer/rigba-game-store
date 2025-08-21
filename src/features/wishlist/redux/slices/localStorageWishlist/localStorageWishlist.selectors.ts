import { RootState } from "@/redux/store";

export const selectLocalStorageWishlist = (state: RootState) =>
  state.localStorageWishlist;
