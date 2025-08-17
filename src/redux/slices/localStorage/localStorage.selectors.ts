import { RootState } from "@/redux/store";

export const selectlocalCart = (state: RootState) =>
  state.localStorage.localCart;

export const selectlocalWishlist = (state: RootState) =>
  state.localStorage.localWishList;
