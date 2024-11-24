import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import {
  AddUserProductToWishListDTO,
  DeleteUserProductFromWishListDTO,
} from "@/utils/helpers/frontendDTO";
import { RequestResponse, UserWishList } from "@/utils/helpers/types";

export interface UserWishListState {
  products: UserWishList["products"];
  status: string;
  error: string | null;
  success: string | null;
  ordering: string | null;
  message: string | null;
  isLoading: boolean;
}

const initialState: UserWishListState = {
  products: [],
  status: "idle",
  error: null,
  success: null,
  ordering: null,
  message: null,
  isLoading: false,
};

export const fetchUserWishList = createAsyncThunk<
  { products: UserWishList["products"]; message: string },
  { email: string },
  { rejectValue: string }
>("userWishList/fetchUserWishList", async ({ email }, { rejectWithValue }) => {
  try {
    const fetchUserWishListResponse: RequestResponse<UserWishList> =
      await requestService.postMethod(
        "products/endpoints/productManagement/getWishList",
        {
          email,
        }
      );

    if (fetchUserWishListResponse && fetchUserWishListResponse.success) {
      return {
        products: fetchUserWishListResponse.data?.products || [],
        message: fetchUserWishListResponse.message,
      };
    } else {
      throw new Error(
        fetchUserWishListResponse.message || "Failed to fetch wishlist!"
      );
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchAddUserProductToWishList = createAsyncThunk<
  { products: UserWishList["products"]; message: string },
  AddUserProductToWishListDTO,
  { rejectValue: string }
>(
  "userWishList/fetchAddUserProductToWishList",
  async (addUserProductToWishListDTO, { rejectWithValue }) => {
    try {
      const fetchAddUserProductToWishListResponse: RequestResponse<UserWishList> =
        await requestService.postMethod(
          "products/endpoints/productManagement/addProductToWishList",
          addUserProductToWishListDTO
        );
      if (
        fetchAddUserProductToWishListResponse.success &&
        fetchAddUserProductToWishListResponse.data &&
        fetchAddUserProductToWishListResponse.data.products
      ) {
        return {
          products: fetchAddUserProductToWishListResponse.data.products || [],
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
  { products: UserWishList["products"]; message: string },
  DeleteUserProductFromWishListDTO,
  { rejectValue: string }
>(
  "userWishList/fetchDeleteUserProductFromWishList",
  async (deleteUserProductFromWishListDTO, { rejectWithValue }) => {
    try {
      const fetchDeleteUserProductFromWishListResponse: RequestResponse<UserWishList> =
        await requestService.deleteMethod(
          "products/endpoints/productManagement/deleteProductFromWishList",
          deleteUserProductFromWishListDTO
        );
      if (fetchDeleteUserProductFromWishListResponse.success) {
        return {
          products:
            fetchDeleteUserProductFromWishListResponse.data?.products || [],
          message: fetchDeleteUserProductFromWishListResponse.message,
        };
      } else {
        return rejectWithValue(
          fetchDeleteUserProductFromWishListResponse.message ||
            "Failed to delete product from wishlist"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userWishListSlice = createSlice({
  name: "userWishList",
  initialState,
  reducers: {
    setOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWishList.pending, (state) => {
        state.status = "Loading";
        state.error = null;
        state.message = "Loading...";
        state.isLoading = true;
      })
      .addCase(fetchUserWishList.fulfilled, (state, action) => {
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
      .addCase(fetchUserWishList.rejected, (state, action) => {
        state.status = "Failed";
        state.message = action.payload as string;
        state.error = action.payload as string;
        state.isLoading = false;
        state.products = [];
      })
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

export const { setOrdering } = userWishListSlice.actions;
export default userWishListSlice.reducer;
