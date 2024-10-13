import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import RequestService from "@/services/RequestService";
import { RequestResponse, UserCart } from "@/utils/helpers/types";
import {
  FetchAddUserProductToCart,
  FetchUserCart,
} from "@/utils/helpers/frontendDTO";

interface UserCartState {
  products: UserCart[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
}

const initialState: UserCartState = {
  products: [],
  status: "idle",
  error: null,
  success: null,
  message: null,
};

export const fetchUserCart = createAsyncThunk<
  { products: UserCart[]; message: string },
  { email: string },
  { rejectValue: string }
>("userCart/fetchUserCart", async ({ email }, { rejectWithValue }) => {
  try {
    const fetchUserCartResponse: RequestResponse<{
      products: UserCart[];
      message: string;
    }> = await RequestService.postMethod(
      "products/endpoints/productManagement/getCart",
      {
        email,
      }
    );

    if (fetchUserCartResponse.success) {
      return {
        products: fetchUserCartResponse.data?.products,
        message: fetchUserCartResponse.message,
      };
    } else {
      throw new Error(fetchUserCartResponse.message || "Unknown error");
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchAddUserProductToCart = createAsyncThunk<
  UserCart[],
  FetchAddUserProductToCart,
  { rejectValue: string }
>(
  "userCart/fetchAddUserProductToCart",
  async (fetchAddUserProductToCart, { rejectWithValue }) => {
    try {
      const response = await RequestService.postMethod(
        "products/endpoints/productManagement/addProductToCart",

        fetchAddUserProductToCart
      );
      if (response.success) {
        return response.data?.products;
      } else {
        throw new Error(response.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteUserProductFromCart = createAsyncThunk<
  UserCart[],
  { email: string | null | undefined; externalProductId: number },
  { rejectValue: string }
>(
  "userCart/fetchDeleteUserProductFromCart",
  async ({ email, externalProductId }, { rejectWithValue }) => {
    try {
      const response = await RequestService.deleteMethod(
        "products/endpoints/productManagement/deleteProductFromCart",
        { email, externalProductId }
      );
      if (response.success) {
        return response.data?.products;
      }
      throw new Error("Failed to remove product");
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchIncreaseQuantityUserProductFromCart = createAsyncThunk<
  LoggedUserCart[],
  { email: string | null | undefined; externalProductId: number },
  { rejectValue: string }
>(
  "userCart/fetchIncreaseQuantityUserProductFromCart",
  async ({ email, externalProductId }, { rejectWithValue }) => {
    try {
      const response = await RequestService.patchMethod(
        "products/endpoints/productManagement/increaseProductQuantity",
        { email, externalProductId }
      );
      if (response.success) {
        return response.data?.products;
      }
      throw new Error("Failed to increase product quantity");
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDecreaseQuantityUserProductFromCart = createAsyncThunk<
  UserCart[],
  { email: string | null | undefined; externalProductId: number },
  { rejectValue: string }
>(
  "userCart/fetchDecreaseQuantityUserProductFromCart",
  async ({ email, externalProductId }, { rejectWithValue }) => {
    try {
      const response = await RequestService.patchMethod(
        "products/endpoints/productManagement/decreaseProductQuantity",
        { email, externalProductId }
      );
      if (response.success) {
        return response.data?.products;
      }
      throw new Error("Failed to decrease product quantity");
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userCartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.status = "Loading";
        clearMessages();
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products.sort((a, b) =>
          a.id.localeCompare(b.id)
        );
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchAddUserProductToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddUserProductToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.sort((a, b) =>
          a.id.localeCompare(b.id)
        );
      })
      .addCase(fetchAddUserProductToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchDeleteUserProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteUserProductFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.sort((a, b) =>
          a.id.localeCompare(b.id)
        );
      })
      .addCase(fetchDeleteUserProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchIncreaseQuantityUserProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchIncreaseQuantityUserProductFromCart.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.products = action.payload.sort((a, b) =>
            a.id.localeCompare(b.id)
          );
        }
      )
      .addCase(
        fetchIncreaseQuantityUserProductFromCart.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        }
      )
      .addCase(fetchDecreaseQuantityUserProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDecreaseQuantityUserProductFromCart.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.products = action.payload.sort((a, b) =>
            a.id.localeCompare(b.id)
          );
        }
      )
      .addCase(
        fetchDecreaseQuantityUserProductFromCart.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});

export const { clearMessages } = userCartSlice.actions;

export default userCartSlice.reducer;
