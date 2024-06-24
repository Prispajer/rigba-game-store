import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalProduct } from "@/utils/helpers/types";

interface CartState {
  localCart: LocalProduct[];
}

const initialState: CartState = {
  localCart: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<LocalProduct>) => {
      const productIndex = state.localCart.findIndex(
        (product: LocalProduct) =>
          product.externalProductId === action.payload.externalProductId
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity += 1;
      } else {
        state.localCart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const productIndex = state.localCart.findIndex(
        (product: LocalProduct) => product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart.splice(productIndex, 1);
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.localCart.findIndex(
        (product: LocalProduct) => product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.localCart.findIndex(
        (product: LocalProduct) => product.externalProductId === action.payload
      );

      if (productIndex !== -1) {
        state.localCart[productIndex].quantity -= 1;
        if (state.localCart[productIndex].quantity === 0) {
          state.localCart.splice(productIndex, 1);
        }
      }
    },
    setLocalCart: (state, action: PayloadAction<LocalProduct[]>) => {
      state.localCart = action.payload;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  setLocalCart,
} = productSlice.actions;
export default productSlice.reducer;
