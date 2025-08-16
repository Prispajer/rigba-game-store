import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./cart.thunk";
import { CartState } from "./cart.types";

const initialState: CartState = {
  products: [],
  status: "idle",
  error: null,
  success: null,
  message: null,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.success = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      })
      .addCase(increaseQuantity.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      })
      .addCase(decreaseQuantity.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
