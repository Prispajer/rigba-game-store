import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import RequestService from "@/utils/services/RequestService";
import { UserWishList } from "@/utils/helpers/types";

interface UserWishListSlice {
  products: UserWishList[];
  status: string;
  error: string | null;
  success: string | null;
  ordering: string | null;
  message: string | null;
}

const initialState: UserWishListSlice = {
  products: [],
  status: "idle",
  error: null,
  success: null,
  ordering: null,
  message: null,
};

export const fetchAddUserProductToWishList = createAsyncThunk<
  { products: UserWishList[]; message: string },
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
      released,
      added,
    },
    { rejectWithValue }
  ) => {
    try {
      const fetchAddUserProductToWishListResponse: RequestService<{
        message: string;
        products: UserWishList[];
      }> = await RequestService.postMethod(
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
          released,
          added,
        }
      );

      if (
        fetchAddUserProductToWishListResponse.success &&
        fetchAddUserProductToWishListResponse.data &&
        fetchAddUserProductToWishListResponse.data.products
      ) {
        return {
          products: fetchAddUserProductToWishListResponse.data.products,
          message: fetchAddUserProductToWishListResponse.message,
        };
      } else {
        return rejectWithValue(
          fetchAddUserProductToWishListResponse.message ||
            "Failed to add product to wishlist"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteUserProductFromWishList = createAsyncThunk<
  { products: UserWishList[]; message: string },
  {
    email: string | null | undefined;
    externalProductId: number;
  },
  { rejectValue: string }
>(
  "userWishList/fetchDeleteUserProductFromWishList",
  async ({ email, externalProductId }, { rejectWithValue }) => {
    try {
      const fetchDeleteUserProductFromWishListResponse: RequestService<{
        message: string;
        products: UserWishList[];
      }> = await RequestService.deleteMethod(
        "products/endpoints/productManagement/deleteProductFromWishList",
        { email, externalProductId }
      );
      if (fetchDeleteUserProductFromWishListResponse.success) {
        return {
          products: fetchDeleteUserProductFromWishListResponse.data.products,
          message: fetchDeleteUserProductFromWishListResponse.message,
        };
      } else {
        return rejectWithValue(
          fetchDeleteUserProductFromWishListResponse.message ||
            "Failed to delete product from wishlist"
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
      switch (state.ordering) {
        case "price": {
          state.products = [...action.payload].sort((a, b) => {
            const priceA = a.productsInformations?.price || 0;
            const priceB = b.productsInformations?.price || 0;
            return priceA - priceB;
          });
          break;
        }
        case "-price": {
          state.products = [...action.payload].sort((a, b) => {
            const priceA = a.productsInformations?.price || 0;
            const priceB = b.productsInformations?.price || 0;
            return priceB - priceA;
          });
          break;
        }
        case "-released": {
          state.products = [...action.payload].sort((a, b) => {
            const nameA = a.productsInformations?.released || "";
            const nameB = b.productsInformations?.released || "";
            return nameA.localeCompare(nameB);
          });
          break;
        }
        case "released": {
          state.products = [...action.payload].sort((a, b) => {
            const nameA = a.productsInformations?.released || "";
            const nameB = b.productsInformations?.released || "";
            return nameB.localeCompare(nameA);
          });
          break;
        }
        case "-added": {
          state.products = [...action.payload].sort((a, b) => {
            const nameA = a.productsInformations?.added || 0;
            const nameB = b.productsInformations?.added || 0;
            return nameB - nameA;
          });
          break;
        }
        case "name": {
          state.products = [...action.payload].sort((a, b) => {
            const nameA = a.productsInformations?.name || "";
            const nameB = b.productsInformations?.name || "";
            return nameA.localeCompare(nameB);
          });
          break;
        }
        case "-name": {
          state.products = [...action.payload].sort((a, b) => {
            const nameA = a.productsInformations?.name || "";
            const nameB = b.productsInformations?.name || "";
            return nameB.localeCompare(nameA);
          });
          break;
        }
        default:
          state.products = [...action.payload];
      }
    },
    setOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddUserProductToWishList.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.message = "Loading...";
      })
      .addCase(fetchAddUserProductToWishList.fulfilled, (state, action) => {
        state.status = "Succeded";
        state.message = action.payload.message;
        state.products = action.payload.products || [];
      })
      .addCase(fetchAddUserProductToWishList.rejected, (state, action) => {
        state.status = "Failed";
        state.message = action.payload as string;
        state.error = action.payload as string;
        state.products = [];
      })
      .addCase(fetchDeleteUserProductFromWishList.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.message = "Loading...";
      })
      .addCase(
        fetchDeleteUserProductFromWishList.fulfilled,
        (state, action) => {
          state.status = "Succeeded";
          state.products = action.payload.products;
          state.message = action.payload.message;
        }
      )
      .addCase(fetchDeleteUserProductFromWishList.rejected, (state, action) => {
        state.status = "Failed";
        state.message = action.payload as string;
        state.error = action.payload as string;
      });
  },
});

export const { setProducts, setOrdering } = userWishListSlice.actions;
export default userWishListSlice.reducer;
