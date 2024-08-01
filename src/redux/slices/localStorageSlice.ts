import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "@/utils/helpers/types";

interface CartState {
  localCart: Product[];
  wishList: Product[];
}

const initialState: CartState = {
  localCart: [],
  wishList: [],
};

const localStorageSlice = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    setLocalCart: (state, action: PayloadAction<Product[]>) => {
      state.localCart = action.payload;
    },
    setWishList: (state, action: PayloadAction<Product[]>) => {
      state.wishList = action.payload;
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
      const isProductInWishList = state.wishList.some(
        (product) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (isProductInWishList) {
        return;
      }

      state.wishList = [...state.wishList, action.payload];
    },
    deleteLocalProductFromCart: (state, action: PayloadAction<number>) => {
      state.localCart = state.localCart.filter(
        (product) => product.externalProductId !== action.payload
      );
    },
    deleteLocalProductFromWishList: (state, action: PayloadAction<number>) => {
      state.wishList = state.wishList.filter(
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
  setWishList,
  addLocalProductToCart,
  addLocalProductToWishList,
  deleteLocalProductFromCart,
  deleteLocalProductFromWishList,
  increaseQuantityLocalProductFromCart,
  decreaseQuantityLocalProductFromCart,
} = localStorageSlice.actions;

export default localStorageSlice.reducer;
