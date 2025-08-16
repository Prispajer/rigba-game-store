import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, Wishlist } from "@/types/types";
import {
  AddUserProductToWishListDTO,
  DeleteUserProductFromWishListDTO,
} from "@/utils/helpers/frontendDTO";

export const getWishlist = createAsyncThunk<
  { products: Wishlist["products"]; message: string },
  { email: string },
  { rejectValue: string }
>("wishlist/getWishlist", async ({ email }, { rejectWithValue }) => {
  try {
    const getWishlistResponse: RequestResponse<Wishlist> =
      await requestService.postMethod(
        "products/endpoints/productManagement/getWishList",
        { email }
      );
    if (getWishlistResponse.success) {
      return {
        products: getWishlistResponse.data?.products || [],
        message: getWishlistResponse.message,
      };
    } else {
      throw new Error(
        getWishlistResponse.message || "Failed to load wishlist."
      );
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const addToWishlist = createAsyncThunk<
  { products: Wishlist["products"]; message: string },
  AddUserProductToWishListDTO,
  { rejectValue: string }
>("wishlist/addToWishlist", async (dto, { rejectWithValue }) => {
  try {
    const addToWishlistResponse: RequestResponse<Wishlist> =
      await requestService.postMethod(
        "products/endpoints/productManagement/addProductToWishList",
        dto
      );
    if (addToWishlistResponse.success && addToWishlistResponse.data?.products) {
      return {
        products: addToWishlistResponse.data.products,
        message: addToWishlistResponse.message,
      };
    } else {
      throw new Error(
        addToWishlistResponse.message || "Failed to add product."
      );
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const removeFromWishlist = createAsyncThunk<
  { products: Wishlist["products"]; message: string },
  DeleteUserProductFromWishListDTO,
  { rejectValue: string }
>("wishlist/removeFromWishlist", async (dto, { rejectWithValue }) => {
  try {
    const removeFromWishlistResponse: RequestResponse<Wishlist> =
      await requestService.deleteMethod(
        "products/endpoints/productManagement/deleteProductFromWishList",
        dto
      );
    if (removeFromWishlistResponse.success) {
      return {
        products: removeFromWishlistResponse.data?.products || [],
        message: removeFromWishlistResponse.message,
      };
    } else {
      throw new Error(
        removeFromWishlistResponse.message || "Failed to remove product."
      );
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
