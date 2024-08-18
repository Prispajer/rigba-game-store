import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import requestService from "@/utils/classes/RequestService";
import { RequestResponse, UserReviews } from "@/utils/helpers/types";

interface UserReviewsSlice {
  reviews: UserReviews[];
  status: string;
  error: string | null;
  success: string | null;
}

const initialState: UserReviewsSlice = {
  reviews: [],
  status: "Idle",
  error: null,
  success: null,
};

export const fetchUserReviews = createAsyncThunk<
  UserReviews[],
  { externalProductId: number },
  { rejectValue: string }
>(
  "userReviews/fetchUserReviews",
  async ({ externalProductId }, { rejectWithValue }) => {
    try {
      const getReviewsResponse: RequestResponse<{ reviews: UserReviews[] }> =
        await requestService.postMethod(
          "products/endpoints/productManagement/getReviews",
          {
            externalProductId,
          }
        );

      if (getReviewsResponse.success) {
        return getReviewsResponse.data?.reviews ?? [];
      } else {
        throw new Error(getReviewsResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchLikeUserReview = createAsyncThunk<
  UserReviews[],
  { email: string; reviewId: string },
  { rejectValue: string }
>(
  "userReviews/fetchLikeUserReview",
  async ({ email, reviewId }, { rejectWithValue }) => {
    try {
      const likeUserReviewResponse: RequestResponse<{
        reviews: UserReviews[];
      }> = await requestService.patchMethod(
        "products/endpoints/productManagement/likeReview",
        { email, reviewId }
      );

      if (likeUserReviewResponse.success) {
        return likeUserReviewResponse.data?.reviews ?? [];
      } else {
        throw new Error(likeUserReviewResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUnLikeUserReview = createAsyncThunk<
  UserReviews[],
  { email: string; reviewId: string },
  { rejectValue: string }
>(
  "userReviews/fetchUnLikeUserReview",
  async ({ email, reviewId }, { rejectWithValue }) => {
    try {
      const unLikeUserReviewResponse: RequestResponse<{
        reviews: UserReviews[];
      }> = await requestService.patchMethod(
        "products/endpoints/productManagement/unLikeReview",
        { email, reviewId }
      );

      if (unLikeUserReviewResponse.success) {
        return unLikeUserReviewResponse.data?.reviews ?? [];
      } else {
        throw new Error(unLikeUserReviewResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userReviewsSlice = createSlice({
  name: "userReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .addCase(fetchLikeUserReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchLikeUserReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLikeUserReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .addCase(fetchUnLikeUserReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUnLikeUserReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnLikeUserReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default userReviewsSlice.reducer;
