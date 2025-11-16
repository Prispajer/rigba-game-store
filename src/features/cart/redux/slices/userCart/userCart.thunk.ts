import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import RequestResponse from "@/shared/types/requestResponse";
import UserCart from "@/features/cart/types/userCart/userCart";
import AddUserCartItemDTO from "@/features/cart/dto/AddUserCartItemDTO";

export const getUserCartThunk = createAsyncThunk<
  { products: UserCart["products"]; message: string },
  { email: string },
  { rejectValue: string }
>("cart/getUserCartThunk", async ({ email }, { rejectWithValue }) => {
  try {
    const getUserCartThunkResponse: RequestResponse<UserCart> =
      await requestService.postMethod(
        "products/endpoints/productManagement/getCart",
        { email }
      );

    if (getUserCartThunkResponse.success) {
      return {
        products: getUserCartThunkResponse.data?.products ?? [],
        message: getUserCartThunkResponse.message,
      };
    } else {
      throw new Error(getUserCartThunkResponse.message || "Unknown error");
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const addUserProductToCartThunk = createAsyncThunk<
  { products: UserCart["products"]; message: string },
    AddUserCartItemDTO,
  { rejectValue: string }
>(
  "cart/addUserProductToCartThunk",
  async (addUserProductToCartDTO, { rejectWithValue }) => {
    try {
      const addUserProductToCartThunkResponse: RequestResponse<UserCart> =
        await requestService.postMethod(
          "products/endpoints/productManagement/addProductToCart",
          addUserProductToCartDTO
        );

      if (addUserProductToCartThunkResponse.success) {
        return {
          products: addUserProductToCartThunkResponse.data?.products ?? [],
          message: addUserProductToCartThunkResponse.message,
        };
      } else {
        throw new Error(
          addUserProductToCartThunkResponse.message || "Unknown error"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteUserProductFromCartThunk = createAsyncThunk<
  { products: UserCart["products"]; message: string },
  { email: string; externalProductId: number },
  { rejectValue: string }
>(
  "cart/deleteUserProductFromCartThunk",
  async ({ email, externalProductId }, { rejectWithValue }) => {
    try {
      const deleteUserProductFromCartThunkResponse: RequestResponse<UserCart> =
        await requestService.deleteMethod(
          "products/endpoints/productManagement/deleteProductFromCart",
          { email, externalProductId }
        );

      if (deleteUserProductFromCartThunkResponse.success) {
        return {
          products: deleteUserProductFromCartThunkResponse.data?.products ?? [],
          message: deleteUserProductFromCartThunkResponse.message,
        };
      } else {
        throw new Error(
          deleteUserProductFromCartThunkResponse.message || "Unknown error"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const increaseUserCartQuantityThunk = createAsyncThunk<
  { products: UserCart["products"]; message: string },
  { email: string; externalProductId: number },
  { rejectValue: string }
>(
  "cart/increaseUserCartQuantityThunk",
  async ({ email, externalProductId }, { rejectWithValue }) => {
    try {
      const increaseUserCartQuantityThunkResponse: RequestResponse<UserCart> =
        await requestService.patchMethod(
          "products/endpoints/productManagement/increaseProductQuantity",
          { email, externalProductId }
        );

      if (increaseUserCartQuantityThunkResponse.success) {
        return {
          products: increaseUserCartQuantityThunkResponse.data?.products ?? [],
          message: increaseUserCartQuantityThunkResponse.message,
        };
      } else {
        throw new Error(
          increaseUserCartQuantityThunkResponse.message || "Unknown error"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const decreaseUserCartQuantityThunk = createAsyncThunk<
  { products: UserCart["products"]; message: string },
  { email: string; externalProductId: number },
  { rejectValue: string }
>(
  "cart/decreaseUserCartQuantityThunk",
  async ({ email, externalProductId }, { rejectWithValue }) => {
    try {
      const decreaseUserCartQuantityThunkResponse: RequestResponse<UserCart> =
        await requestService.patchMethod(
          "products/endpoints/productManagement/decreaseProductQuantity",
          { email, externalProductId }
        );

      if (decreaseUserCartQuantityThunkResponse.success) {
        return {
          products: decreaseUserCartQuantityThunkResponse.data?.products ?? [],
          message: decreaseUserCartQuantityThunkResponse.message,
        };
      } else {
        throw new Error(
          decreaseUserCartQuantityThunkResponse.message || "Unknown error"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
