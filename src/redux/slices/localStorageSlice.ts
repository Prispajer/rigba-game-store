import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalCart, LocalWishList } from "@/utils/helpers/types";

export interface LocalStorageSlice {
  localCart: LocalCart[];
  localWishList: LocalWishList[];
  ordering: string | null;
}

const initialState: LocalStorageSlice = {
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
      action: PayloadAction<LocalStorageSlice["localCart"]>
    ) => {
      state.localCart = action.payload;
    },
    setLocalWishList: (
      state,
      action: PayloadAction<LocalStorageSlice["localWishList"]>
    ) => {
      state.localWishList = action.payload;
      if (state.ordering) {
        state.localWishList = sortWishList(state.localWishList, state.ordering);
      }
    },
    setLocalOrdering: (state, action: PayloadAction<string>) => {
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
      action: PayloadAction<LocalWishList>
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

const sortWishList = (
  wishlist: LocalStorageSlice["localWishList"],
  ordering: string | null
): LocalWishList[] => {
  switch (ordering) {
    case "price":
      return [...wishlist].sort((a, b) => (a.price || 0) - (b.price || 0));
    case "-price":
      return [...wishlist].sort((a, b) => (b.price || 0) - (a.price || 0));
    case "released":
      return [...wishlist].sort(
        (a, b) =>
          new Date(a.released || "").getTime() -
          new Date(b.released || "").getTime()
      );
    case "-released":
      return [...wishlist].sort(
        (a, b) =>
          new Date(b.released || "").getTime() -
          new Date(a.released || "").getTime()
      );
    case "added":
      return [...wishlist].sort((a, b) => (a.added || 0) - (b.added || 0));
    case "-added":
      return [...wishlist].sort((a, b) => (b.added || 0) - (a.added || 0));
    case "name":
      return [...wishlist].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    case "-name":
      return [...wishlist].sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    default:
      return [...wishlist].sort((a, b) => (a.price || 0) - (b.price || 0));
  }
};

export const {
  setLocalCart,
  setLocalWishList,
  setLocalOrdering,
  addLocalProductToCart,
  addLocalProductToWishList,
  deleteLocalProductFromCart,
  deleteLocalProductFromWishList,
  increaseQuantityLocalProductFromCart,
  decreaseQuantityLocalProductFromCart,
} = localStorageSlice.actions;

export default localStorageSlice.reducer;
