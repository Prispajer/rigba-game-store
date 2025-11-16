import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import LocalStorageCartProduct from "@/features/cart/types/localStorageCart/localStorageCartProduct";
import { LocalStorageCartState } from "./localStorageCart.types";

const initialState: LocalStorageCartState = {
  localStorageCart: [],
};

const localStorageCartSlice = createSlice({
  name: "localStorageCart",
  initialState,
  reducers: {
    setLocalStorageCart: (
      state,
      action: PayloadAction<LocalStorageCartState["localStorageCart"]>
    ) => {
      state.localStorageCart = action.payload ?? [];
    },
    addLocalStorageProductToCart: (
      state,
      action: PayloadAction<LocalStorageCartProduct>
    ) => {
      const productIndex = state.localStorageCart.findIndex(
        (product) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (productIndex !== -1) {
        state.localStorageCart[productIndex].quantity =
          (state.localStorageCart[productIndex].quantity ?? 0) + 1;
      } else {
        state.localStorageCart = [...state.localStorageCart, action.payload];
      }
    },
    deleteLocalStorageProductFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      state.localStorageCart = state.localStorageCart.filter(
        (product) => product.externalProductId !== action.payload
      );
    },
    increaseQuantityLocalStorageProductFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      const productIndex = state.localStorageCart.findIndex(
        (product) => product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localStorageCart[productIndex].quantity =
          (state.localStorageCart[productIndex].quantity ?? 0) + 1;
      }
    },
    decreaseQuantityLocalStorageProductFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      const productIndex = state.localStorageCart.findIndex(
        (product) => product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localStorageCart[productIndex].quantity =
          (state.localStorageCart[productIndex].quantity ?? 0) - 1;
        if (state.localStorageCart[productIndex].quantity === 0) {
          state.localStorageCart = state.localStorageCart.filter(
            (product) => product.externalProductId !== action.payload
          );
        }
      }
    },
  },
});

export const {
  setLocalStorageCart,
  addLocalStorageProductToCart,
  deleteLocalStorageProductFromCart,
  increaseQuantityLocalStorageProductFromCart,
  decreaseQuantityLocalStorageProductFromCart,
} = localStorageCartSlice.actions;

export default localStorageCartSlice.reducer;
