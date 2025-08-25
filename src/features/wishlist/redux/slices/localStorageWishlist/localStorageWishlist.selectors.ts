import { RootState } from "@/redux/store";

export const selectLocalStorageWishlistState = (state: RootState) =>
  state.localStorageWishlist;
