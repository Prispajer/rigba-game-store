import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import RequestResponse from "@/shared/types/requestResponse";
import UserWishlist from "@/features/wishlist/types/userWishlist/userWishlist";
import type AddUserWishlistItemDTO from "@/features/wishlist/dto/AddUserWishlistItemDTO";

export const getUserWishlistThunk = createAsyncThunk<
  { products: UserWishlist["products"]; message: string },
  { email: string },
  { rejectValue: string }
>("wishlist/getUserWishlistThunk", async ({ email }, { rejectWithValue }) => {
  try {
    const getUserWishlistThunkResponse: RequestResponse<UserWishlist> =
      await requestService.postMethod(
        "products/endpoints/productManagement/getWishlist",
        { email }
      );
    if (getUserWishlistThunkResponse.success) {
      return {
        products: getUserWishlistThunkResponse.data?.products || [],
        message: getUserWishlistThunkResponse.message,
      };
    } else {
      throw new Error(
        getUserWishlistThunkResponse.message || "Failed to load wishlist."
      );
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const addUserProductToWishlistThunk = createAsyncThunk<
  { products: UserWishlist["products"]; message: string },
  AddUserWishlistItemDTO,
  { rejectValue: string }
>(
  "wishlist/addUserProductToWishlistThunk",
  async (addUserProductToWishlistDTO, { rejectWithValue }) => {
    try {
      const addUserProductToWishlistThunkResponse: RequestResponse<UserWishlist> =
        await requestService.postMethod(
          "products/endpoints/productManagement/addProductToWishlist",
          addUserProductToWishlistDTO
        );
      if (
        addUserProductToWishlistThunkResponse.success &&
        addUserProductToWishlistThunkResponse.data?.products
      ) {
        return {
          products: addUserProductToWishlistThunkResponse.data.products,
          message: addUserProductToWishlistThunkResponse.message,
        };
      } else {
        throw new Error(
          addUserProductToWishlistThunkResponse.message ||
            "Failed to add product."
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteUserProductFromWishlistThunk = createAsyncThunk<
  { products: UserWishlist["products"]; message: string },
  {
    email: string;
    externalProductId: number;
  },
  { rejectValue: string }
>(
  "wishlist/deleteUserProductFromWishlistThunk",
  async ({ email, externalProductId }, { rejectWithValue }) => {
    try {
      const deleteUserProductFromWishlistThunkResponse: RequestResponse<UserWishlist> =
        await requestService.deleteMethod(
          "products/endpoints/productManagement/deleteProductFromWishlist",
          { email, externalProductId }
        );
      if (deleteUserProductFromWishlistThunkResponse.success) {
        return {
          products:
            deleteUserProductFromWishlistThunkResponse.data?.products || [],
          message: deleteUserProductFromWishlistThunkResponse.message,
        };
      } else {
        throw new Error(
          deleteUserProductFromWishlistThunkResponse.message ||
            "Failed to remove product."
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
