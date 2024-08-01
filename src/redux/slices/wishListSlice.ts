import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoggedUserWishList } from "@/utils/helpers/types";
import requestService from "@/utils/classes/requestService";

interface WishListState {
  products: LoggedUserWishList[];
  status: string;
  error: string | null;
  success: string | null;
}

const initialState: WishListState = {
  products: [],
  status: "idle",
  error: null,
  success: null,
};

export const fetchAddUserProductToWishList = createAsyncThunk<
  LoggedUserWishList[],
  {
    email: string | null | undefined;
    externalProductId: string | undefined;
    name: string;
    description: string | undefined;
    price: number;
    background_image: string;
    rating: number | undefined;
    slug: string | undefined;
  },
  { rejectValue: string }
>(
  "userWishList/fetchAddUserProductToWishList",
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
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await requestService.postMethod(
        "products/endpoints/productManagement/addProductToWishList",
        {
          email,
          externalProductId,
          name,
          description,
          price,
          background_image,
          rating,
          slug,
        }
      );

      if (response.success) {
        return response.data.products;
      } else {
        return rejectWithValue(
          response.message || "Failed to add product to wishlist"
        );
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteUserProductFromWishList = createAsyncThunk<
  LoggedUserWishList[],
  {
    email: string | null | undefined;
    externalProductId: number;
  },
  { rejectValue: string }
>(
  "userWishList/fetchDeleteUserProductFromWishList",
  async ({ email, externalProductId }, { rejectWithValue }) => {
    try {
      const response = await requestService.deleteMethod(
        "products/endpoints/productManagement/deleteProductFromWishList",
        { email, externalProductId }
      );
      if (response.success) {
        return response.data.products;
      } else {
        return rejectWithValue(
          response.message || "Failed to delete product from wishlist"
        );
      }
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

const userWishListSlice = createSlice({
  name: "userWishList",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<LoggedUserWishList[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddUserProductToWishList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAddUserProductToWishList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.sort((a, b) =>
          a.id.localeCompare(b.id)
        );
      })
      .addCase(fetchAddUserProductToWishList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchDeleteUserProductFromWishList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchDeleteUserProductFromWishList.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.products = action.payload.sort((a, b) =>
            a.id.localeCompare(b.id)
          );
        }
      )
      .addCase(fetchDeleteUserProductFromWishList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setProducts } = userWishListSlice.actions;

export default userWishListSlice.reducer;
