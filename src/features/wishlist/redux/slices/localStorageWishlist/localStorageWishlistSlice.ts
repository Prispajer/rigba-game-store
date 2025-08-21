import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sortWishList } from "./localStorageWishlist.helpers";
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
        state.localStorageWishlist = sortWishList(
          state.localStorageWishlist,
          state.ordering
        );
      }
    },
    setLocalStorageWishlistOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload;
      state.localStorageWishlist = sortWishList(
        state.localStorageWishlist,
        state.ordering
      );
    },
    addLocalStorageProductToWishList: (
      state,
      action: PayloadAction<LocalStorageWishlistProduct>
    ) => {
      const isProductInWishList = state.localStorageWishlist.some(
        (product) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (isProductInWishList) {
        return;
      }

      state.localStorageWishlist = [
        ...state.localStorageWishlist,
        action.payload,
      ];
      state.localStorageWishlist = sortWishList(
        state.localStorageWishlist,
        state.ordering
      );
    },
    deleteLocalStorageProductFromWishList: (
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
  addLocalStorageProductToWishList,
  deleteLocalStorageProductFromWishList,
} = localStorageWishlistSlice.actions;

export default localStorageWishlistSlice.reducer;
