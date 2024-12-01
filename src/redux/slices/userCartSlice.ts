import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, UserCart } from "@/utils/helpers/types";
import {
  AddUserProductToCartDTO,
  DeleteUserProductFromCartDTO,
} from "@/utils/helpers/frontendDTO";
import {
  DecreaseProductQuantityDTO,
  IncreaseProductQuantityDTO,
} from "@/utils/helpers/backendDTO";

export interface UserCartState {
  products: UserCart["products"];
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
  { products: UserCart["products"]; message: string },
  { email: string },
  { rejectValue: string }
>("userCart/fetchUserCart", async ({ email }, { rejectWithValue }) => {
  try {
    const fetchUserCartResponse: RequestResponse<UserCart> =
      await requestService.postMethod(
        "products/endpoints/productManagement/getCart",
        {
          email,
        }
      );

    if (fetchUserCartResponse && fetchUserCartResponse.success) {
      return {
        products: fetchUserCartResponse.data?.products || [],
        message: fetchUserCartResponse.message || "Failed to fetch cart!",
      };
    } else {
      throw new Error(fetchUserCartResponse.message);
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchAddUserProductToCart = createAsyncThunk<
  { products: UserCart["products"]; message: string },
  AddUserProductToCartDTO,
  { rejectValue: string }
>(
  "userCart/fetchAddUserProductToCart",
  async (fetchAddUserProductToCartDTO, { rejectWithValue }) => {
    try {
      const fetchAddUserProductToCartResponse: RequestResponse<UserCart> =
        await requestService.postMethod(
          "products/endpoints/productManagement/addProductToCart",
          fetchAddUserProductToCartDTO
        );
      if (
        fetchAddUserProductToCartResponse &&
        fetchAddUserProductToCartResponse.success
      ) {
        return {
          products: fetchAddUserProductToCartResponse.data?.products || [],
          message:
            fetchAddUserProductToCartResponse.message ||
            "Failed to add product to cart!",
        };
      } else {
        throw new Error(fetchAddUserProductToCartResponse.message);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteUserProductFromCart = createAsyncThunk<
  { products: UserCart["products"]; message: string },
  DeleteUserProductFromCartDTO,
  { rejectValue: string }
>(
  "userCart/fetchDeleteUserProductFromCart",
  async (deleteUserProductFromCartDTO, { rejectWithValue }) => {
    try {
      const fetchDeleteUserProductFromCartResponse: RequestResponse<UserCart> =
        await requestService.deleteMethod(
          "products/endpoints/productManagement/deleteProductFromCart",
          deleteUserProductFromCartDTO
        );
      if (
        fetchDeleteUserProductFromCartResponse &&
        fetchDeleteUserProductFromCartResponse.success
      ) {
        return {
          products: fetchDeleteUserProductFromCartResponse.data?.products || [],
          message: fetchDeleteUserProductFromCartResponse.message,
        };
      } else {
        throw new Error(fetchDeleteUserProductFromCartResponse.message);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchIncreaseQuantityUserProductFromCart = createAsyncThunk<
  { products: UserCart["products"]; message: string },
  IncreaseProductQuantityDTO,
  { rejectValue: string }
>(
  "userCart/fetchIncreaseQuantityUserProductFromCart",
  async (
    increaseProductQuantityDTO: IncreaseProductQuantityDTO,
    { rejectWithValue }
  ) => {
    try {
      const fetchIncreaseQuantityUserProductFromCartResponse: RequestResponse<UserCart> =
        await requestService.patchMethod(
          "products/endpoints/productManagement/increaseProductQuantity",
          increaseProductQuantityDTO
        );
      if (
        fetchIncreaseQuantityUserProductFromCartResponse &&
        fetchIncreaseQuantityUserProductFromCartResponse.success
      ) {
        return {
          products:
            fetchIncreaseQuantityUserProductFromCartResponse.data?.products ||
            [],
          message:
            fetchIncreaseQuantityUserProductFromCartResponse.message ||
            "Failed to increase user product quantity!",
        };
      } else {
        throw new Error(
          fetchIncreaseQuantityUserProductFromCartResponse.message
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDecreaseQuantityUserProductFromCart = createAsyncThunk<
  { products: UserCart["products"]; message: string },
  DecreaseProductQuantityDTO,
  { rejectValue: string }
>(
  "userCart/fetchDecreaseQuantityUserProductFromCart",
  async (decreaseProductQuantityDTO, { rejectWithValue }) => {
    try {
      const fetchDecreaseQuantityUserProductFromCartResponse: RequestResponse<UserCart> =
        await requestService.patchMethod(
          "products/endpoints/productManagement/decreaseProductQuantity",
          decreaseProductQuantityDTO
        );
      if (
        fetchDecreaseQuantityUserProductFromCartResponse &&
        fetchDecreaseQuantityUserProductFromCartResponse.success
      ) {
        return {
          products:
            fetchDecreaseQuantityUserProductFromCartResponse.data?.products ||
            [],
          message:
            fetchDecreaseQuantityUserProductFromCartResponse.message ||
            "Failed to decrease user product quantity!",
        };
      } else {
        throw new Error(
          fetchDecreaseQuantityUserProductFromCartResponse.message
        );
      }
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
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
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
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
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
        state.products = action.payload.products
          ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
          : [];
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
          state.products = action.payload.products
            ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
            : [];
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
          state.products = action.payload.products
            ? action.payload.products.sort((a, b) => a.id.localeCompare(b.id))
            : [];
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
