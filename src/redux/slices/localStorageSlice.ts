import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalStorageProduct } from "@/utils/helpers/types";

interface CartState {
  localCart: LocalStorageProduct[];
  wishList: LocalStorageProduct[];
}

const initialState: CartState = {
  localCart: [],
  wishList: [],
};

const localStorageSlice = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    setLocalCart: (state, action: PayloadAction<LocalStorageProduct[]>) => {
      state.localCart = action.payload;
    },
    setWishList: (state, action: PayloadAction<LocalStorageProduct[]>) => {
      state.wishList = action.payload;
    },
    addProduct: (state, action: PayloadAction<LocalStorageProduct>) => {
      const productIndex = state.localCart.findIndex(
        (product: LocalStorageProduct) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity += 1;
      } else {
        state.localCart.push({ ...action.payload, quantity: 1 });
      }
    },
    addProductWishList: (state, action: PayloadAction<LocalStorageProduct>) => {
      const productIndex = state.wishList.findIndex(
        (product: LocalStorageProduct) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (productIndex === -1) {
        state.wishList.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const productIndex = state.localCart.findIndex(
        (product: LocalStorageProduct) =>
          product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart.splice(productIndex, 1);
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.localCart.findIndex(
        (product: LocalStorageProduct) =>
          product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.localCart.findIndex(
        (product: LocalStorageProduct) =>
          product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity -= 1;
        if (state.localCart[productIndex].quantity === 0) {
          state.localCart.splice(productIndex, 1);
        }
      }
    },
  },
});

export const {
  addProduct,
  addProductWishList,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  setLocalCart,
  setWishList,
} = localStorageSlice.actions;

export default localStorageSlice.reducer;
