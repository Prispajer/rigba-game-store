import { createSlice } from "@reduxjs/toolkit";
import {
  getUserCartThunk,
  addUserProductToCartThunk,
  deleteUserProductFromCartThunk,
  increaseUserCartQuantityThunk,
  decreaseUserCartQuantityThunk,
} from "./userCart.thunk";
import { UserCartState } from "./userCart.types";

const initialState: UserCartState = {
  products: [],
  status: "idle",
  error: null,
  success: null,
  message: null,
};

const userCartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCartThunk.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.success = null;
      })
      .addCase(getUserCartThunk.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(getUserCartThunk.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      })
      .addCase(addUserProductToCartThunk.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(addUserProductToCartThunk.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(addUserProductToCartThunk.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      })
      .addCase(deleteUserProductFromCartThunk.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(deleteUserProductFromCartThunk.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(deleteUserProductFromCartThunk.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      })
      .addCase(increaseUserCartQuantityThunk.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(increaseUserCartQuantityThunk.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(increaseUserCartQuantityThunk.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      })
      .addCase(decreaseUserCartQuantityThunk.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(decreaseUserCartQuantityThunk.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
      })
      .addCase(decreaseUserCartQuantityThunk.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
      });
  },
});

export default userCartSlice.reducer;
