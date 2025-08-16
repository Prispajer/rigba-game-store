import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, Cart } from "@/types/types";
import {
  AddUserProductToCartDTO,
  DeleteUserProductFromCartDTO,
} from "@/utils/helpers/frontendDTO";
import {
  IncreaseProductQuantityDTO,
  DecreaseProductQuantityDTO,
} from "@/utils/helpers/backendDTO";

export const getCart = createAsyncThunk<
  { products: Cart["products"]; message: string },
  { email: string },
  { rejectValue: string }
>("cart/getCart", async ({ email }, { rejectWithValue }) => {
  try {
    const getCartResponse: RequestResponse<Cart> =
      await requestService.postMethod(
        "products/endpoints/productManagement/getCart",
        { email }
      );

    if (getCartResponse.success) {
      return {
        products: getCartResponse.data?.products ?? [],
        message: getCartResponse.message,
      };
    } else {
      throw new Error(getCartResponse.message || "Unknown error");
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const addToCart = createAsyncThunk<
  { products: Cart["products"]; message: string },
  AddUserProductToCartDTO,
  { rejectValue: string }
>("cart/addToCart", async (addUserProductToCartDTO, { rejectWithValue }) => {
  try {
    const addToCartResponse: RequestResponse<Cart> =
      await requestService.postMethod(
        "products/endpoints/productManagement/addProductToCart",
        addUserProductToCartDTO
      );

    if (addToCartResponse.success) {
      return {
        products: addToCartResponse.data?.products ?? [],
        message: addToCartResponse.message,
      };
    } else {
      throw new Error(addToCartResponse.message || "Unknown error");
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const removeFromCart = createAsyncThunk<
  { products: Cart["products"]; message: string },
  DeleteUserProductFromCartDTO,
  { rejectValue: string }
>(
  "cart/removeFromCart",
  async (deleteUserProductFromCartDTO, { rejectWithValue }) => {
    try {
      const removeFromCartResponse: RequestResponse<Cart> =
        await requestService.deleteMethod(
          "products/endpoints/productManagement/deleteProductFromCart",
          deleteUserProductFromCartDTO
        );

      if (removeFromCartResponse.success) {
        return {
          products: removeFromCartResponse.data?.products ?? [],
          message: removeFromCartResponse.message,
        };
      } else {
        throw new Error(removeFromCartResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const increaseQuantity = createAsyncThunk<
  { products: Cart["products"]; message: string },
  IncreaseProductQuantityDTO,
  { rejectValue: string }
>(
  "cart/increaseQuantity",
  async (increaseProductQuantityDTO, { rejectWithValue }) => {
    try {
      const increaseQuantityResponse: RequestResponse<Cart> =
        await requestService.patchMethod(
          "products/endpoints/productManagement/increaseProductQuantity",
          increaseProductQuantityDTO
        );

      if (increaseQuantityResponse.success) {
        return {
          products: increaseQuantityResponse.data?.products ?? [],
          message: increaseQuantityResponse.message,
        };
      } else {
        throw new Error(increaseQuantityResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const decreaseQuantity = createAsyncThunk<
  { products: Cart["products"]; message: string },
  DecreaseProductQuantityDTO,
  { rejectValue: string }
>(
  "cart/decreaseQuantity",
  async (decreaseProductQuantityDTO, { rejectWithValue }) => {
    try {
      const decreaseQuantityResponse: RequestResponse<Cart> =
        await requestService.patchMethod(
          "products/endpoints/productManagement/decreaseProductQuantity",
          decreaseProductQuantityDTO
        );

      if (decreaseQuantityResponse.success) {
        return {
          products: decreaseQuantityResponse.data?.products ?? [],
          message: decreaseQuantityResponse.message,
        };
      } else {
        throw new Error(decreaseQuantityResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
