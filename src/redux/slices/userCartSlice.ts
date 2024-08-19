import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import RequestService from "@/utils/classes/RequestService";
import { UserWishList } from "@/utils/helpers/types";

interface UserCartState {
  products: UserWishList[];
  status: string;
  error: string | null;
  success: string | null;
}

const initialState: UserCartState = {
  products: [],
  status: "idle",
  error: null,
  success: null,
};

export const fetchUserCart = createAsyncThunk<
  LoggedUserCart[],
  {
    email: string | null | undefined;
  },
  { rejectValue: string }
>("userCart/fetchUserCart", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await RequestService.postMethod(
      "products/endpoints/productManagement/getCart",
      {
        email,
      }
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
});

export const fetchAddUserProductToCart = createAsyncThunk<
  LoggedUserCart[],
  {
    email: string | null | undefined;
    externalProductId: string | undefined;
    name: string;
    description: string | undefined;
    price: number;
    background_image: string;
    rating: number | undefined;
    slug: string | undefined;
    released: string | undefined;
    added: number | undefined;
  },
  { rejectValue: string }
>(
  "userCart/fetchAddUserProductToCart",
  async (
    {
      email,
      externalProductId,
      name,
      description,
      price,
      background_image,
      rating,
      slug,
      released,
      added,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await RequestService.postMethod(
        "products/endpoints/productManagement/addProductToCart",
        {
          email,
          externalProductId,
          name,
          description,
          price,
          background_image,
          rating,
          slug,
          released,
          added,
        }
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
  LoggedUserCart[],
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
  LoggedUserCart[],
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
    setProducts: (state, action: PayloadAction<LoggedUserCart[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.sort((a, b) =>
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

export const { clearMessages, setProducts } = userCartSlice.actions;

export default userCartSlice.reducer;
