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
    addProduct: (state, action: PayloadAction<Product>) => {
      const productIndex = state.localCart.findIndex(
        (product) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity += 1;
      } else {
        state.localCart.push({ ...action.payload });
      }
    },
    addProductWishList: (state, action: PayloadAction<LocalStorageProduct>) => {
      const isProductInWishList = state.wishList.some(
        (product) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (isProductInWishList) {
        return;
      }

      state.wishList.push(action.payload);
    },
    removeProductWishList: (
      state,
      action: PayloadAction<LocalStorageProduct>
    ) => {
      const productIndex = state.wishList.findIndex(
        (product) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (productIndex !== -1) {
        state.wishList.splice(productIndex, 1);
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const productIndex = state.localCart.findIndex(
        (product) => product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart.splice(productIndex, 1);
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.localCart.findIndex(
        (product) => product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.localCart.findIndex(
        (product) => product.externalProductId === action.payload
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
  removeProductWishList,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  setLocalCart,
  setWishList,
} = localStorageSlice.actions;

export default localStorageSlice.reducer;
