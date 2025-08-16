import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "./wishlist.thunk";
import { WishlistState } from "./wishlist.types";

const initialState: WishlistState = {
  products: [],
  status: "Idle",
  error: null,
  success: null,
  ordering: null,
  message: null,
  isLoading: false,
};

const userWishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.message = "Loading...";
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.status = "Succeded";
        state.message = action.payload.message;
        state.isLoading = false;
        state.products = action.payload.products || [];
        switch (state.ordering) {
          case "price": {
            state.products = [...action.payload.products].sort((a, b) => {
              const priceA = a.productsInformations?.price || 0;
              const priceB = b.productsInformations?.price || 0;
              return priceA - priceB;
            });
            break;
          }
          case "-price": {
            state.products = [...action.payload.products].sort((a, b) => {
              const priceA = a.productsInformations?.price || 0;
              const priceB = b.productsInformations?.price || 0;
              return priceB - priceA;
            });
            break;
          }
          case "-released": {
            state.products = [...action.payload.products].sort((a, b) => {
              const nameA = a.productsInformations?.released || "";
              const nameB = b.productsInformations?.released || "";
              return nameA.localeCompare(nameB);
            });
            break;
          }
          case "released": {
            state.products = [...action.payload.products].sort((a, b) => {
              const nameA = a.productsInformations?.released || "";
              const nameB = b.productsInformations?.released || "";
              return nameB.localeCompare(nameA);
            });
            break;
          }
          case "-added": {
            state.products = [...action.payload.products].sort((a, b) => {
              const nameA = a.productsInformations?.added || 0;
              const nameB = b.productsInformations?.added || 0;
              return nameB - nameA;
            });
            break;
          }
          case "name": {
            state.products = [...action.payload.products].sort((a, b) => {
              const nameA = a.productsInformations?.name || "";
              const nameB = b.productsInformations?.name || "";
              return nameA.localeCompare(nameB);
            });
            break;
          }
          case "-name": {
            state.products = [...action.payload.products].sort((a, b) => {
              const nameA = a.productsInformations?.name || "";
              const nameB = b.productsInformations?.name || "";
              return nameB.localeCompare(nameA);
            });
            break;
          }
          default:
            state.products = [...(action.payload.products || [])];
        }
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.status = "Failed";
        state.message = action.payload as string;
        state.error = action.payload as string;
        state.isLoading = false;
        state.products = [];
      })
      .addCase(addToWishlist.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.message = "Loading...";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = "Succeded";
        state.message = action.payload.message;
        state.products = action.payload.products || [];
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = "Failed";
        state.message = action.payload as string;
        state.error = action.payload as string;
        state.products = [];
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.message = "Loading...";
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products;
        state.message = action.payload.message;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = "Failed";
        state.message = action.payload as string;
        state.error = action.payload as string;
      });
  },
});

export const { setOrdering } = userWishListSlice.actions;
export default userWishListSlice.reducer;
