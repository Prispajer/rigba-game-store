import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sortWishlist } from "./localStorageWishlist.helpers";
import { LocalStorageWishlistState } from "./localStorageWishlist.types";
import LocalStorageWishlistProduct from "@/features/wishlist/types/localStorageWishlistProduct";

const initialState: LocalStorageWishlistState = {
  localStorageWishlist: [],
  ordering: null,
};

const localStorageWishlistSlice = createSlice({
  name: "localStorageWishlist",
  initialState,
  reducers: {
    setLocalStorageWishlist: (
      state,
      action: PayloadAction<LocalStorageWishlistState["localStorageWishlist"]>
    ) => {
      state.localStorageWishlist = action.payload;
      if (state.ordering) {
        state.localStorageWishlist = sortWishlist(
          state.localStorageWishlist,
          state.ordering
        );
      }
    },
    setLocalStorageWishlistOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload;
      state.localStorageWishlist = sortWishlist(
        state.localStorageWishlist,
        state.ordering
      );
    },
    addLocalStorageProductToWishlist: (
      state,
      action: PayloadAction<LocalStorageWishlistProduct>
    ) => {
      const isProductInWishlist = state.localStorageWishlist.some(
        (product) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (isProductInWishlist) {
        return;
      }

      state.localStorageWishlist = [
        ...state.localStorageWishlist,
        action.payload,
      ];
      state.localStorageWishlist = sortWishlist(
        state.localStorageWishlist,
        state.ordering
      );
    },
    deleteLocalStorageProductFromWishlist: (
      state,
      action: PayloadAction<number>
    ) => {
      state.localStorageWishlist = state.localStorageWishlist.filter(
        (product) => product.externalProductId !== action.payload
      );
    },
  },
});

export const {
  setLocalStorageWishlist,
  setLocalStorageWishlistOrdering,
  addLocalStorageProductToWishlist,
  deleteLocalStorageProductFromWishlist,
} = localStorageWishlistSlice.actions;

export default localStorageWishlistSlice.reducer;
