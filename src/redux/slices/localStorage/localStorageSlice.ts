import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sortWishList } from "./localStorage.helpers";
import { LocalCart, LocalWishlist } from "@/types/types";
import { LocalStorageState } from "./localStorage.types";

const initialState: LocalStorageState = {
  localCart: [],
  localWishList: [],
  ordering: null,
};

const localStorageSlice = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    setLocalCart: (
      state,
      action: PayloadAction<LocalStorageState["localCart"]>
    ) => {
      state.localCart = action.payload;
    },
    setLocalWishlist: (
      state,
      action: PayloadAction<LocalStorageState["localWishList"]>
    ) => {
      state.localWishList = action.payload;
      if (state.ordering) {
        state.localWishList = sortWishList(state.localWishList, state.ordering);
      }
    },
    setLocalWishlistOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload;
      state.localWishList = sortWishList(state.localWishList, state.ordering);
    },
    addLocalProductToCart: (state, action: PayloadAction<LocalCart>) => {
      const productIndex = state.localCart.findIndex(
        (product) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity =
          (state.localCart[productIndex].quantity ?? 0) + 1;
      } else {
        state.localCart = [...state.localCart, action.payload];
      }
    },
    addLocalProductToWishList: (
      state,
      action: PayloadAction<LocalWishlist>
    ) => {
      const isProductInWishList = state.localWishList.some(
        (product) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (isProductInWishList) {
        return;
      }

      state.localWishList = [...state.localWishList, action.payload];
      state.localWishList = sortWishList(state.localWishList, state.ordering);
    },
    deleteLocalProductFromCart: (state, action: PayloadAction<number>) => {
      state.localCart = state.localCart.filter(
        (product) => product.externalProductId !== action.payload
      );
    },
    deleteLocalProductFromWishList: (state, action: PayloadAction<number>) => {
      state.localWishList = state.localWishList.filter(
        (product) => product.externalProductId !== action.payload
      );
    },
    increaseQuantityLocalProductFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      const productIndex = state.localCart.findIndex(
        (product) => product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity =
          (state.localCart[productIndex].quantity ?? 0) + 1;
      }
    },
    decreaseQuantityLocalProductFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      const productIndex = state.localCart.findIndex(
        (product) => product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity =
          (state.localCart[productIndex].quantity ?? 0) - 1;
        if (state.localCart[productIndex].quantity === 0) {
          state.localCart = state.localCart.filter(
            (product) => product.externalProductId !== action.payload
          );
        }
      }
    },
  },
});

export const {
  setLocalCart,
  setLocalWishlist,
  setLocalWishlistOrdering,
  addLocalProductToCart,
  addLocalProductToWishList,
  deleteLocalProductFromCart,
  deleteLocalProductFromWishList,
  increaseQuantityLocalProductFromCart,
  decreaseQuantityLocalProductFromCart,
} = localStorageSlice.actions;

export default localStorageSlice.reducer;
