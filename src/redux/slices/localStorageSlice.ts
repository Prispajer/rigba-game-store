import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "@/utils/helpers/types";

interface CartState {
  localCart: Product[];
  localWishList: Product[];
  ordering: string | null;
}

const initialState: CartState = {
  localCart: [],
  localWishList: [],
  ordering: null,
};

const localStorageSlice = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    setLocalCart: (state, action: PayloadAction<Product[]>) => {
      state.localCart = action.payload;
    },
    setLocalWishList: (state, action: PayloadAction<Product[]>) => {
      state.localWishList = [...action.payload];
      if (state.ordering) {
        state.localWishList = sortWishList(state.localWishList, state.ordering);
      }
    },
    setLocalOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload;
      state.localWishList = sortWishList(state.localWishList, state.ordering);
    },
    addLocalProductToCart: (state, action: PayloadAction<Product>) => {
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
    addLocalProductToWishList: (state, action: PayloadAction<Product>) => {
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
  wishList: Product[],
  ordering: string | null
): Product[] => {
  switch (ordering) {
    case "price":
      return [...wishList].sort((a, b) => (a.price || 0) - (b.price || 0));
    case "-price":
      return [...wishList].sort((a, b) => (b.price || 0) - (a.price || 0));
    case "released":
      return [...wishList].sort(
        (a, b) =>
          new Date(a.released || "").getTime() -
          new Date(b.released || "").getTime()
      );
    case "-released":
      return [...wishList].sort(
        (a, b) =>
          new Date(b.released || "").getTime() -
          new Date(a.released || "").getTime()
      );
    case "added":
      return [...wishList].sort((a, b) => (a.added || 0) - (b.added || 0));
    case "-added":
      return [...wishList].sort((a, b) => (b.added || 0) - (a.added || 0));
    case "name":
      return [...wishList].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    case "-name":
      return [...wishList].sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    default:
      return [...wishList].sort((a, b) => (a.price || 0) - (b.price || 0));
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
