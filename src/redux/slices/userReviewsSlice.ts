import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, UserReviews } from "@/utils/helpers/types";

export interface UserReviewsSlice {
  reviews: UserReviews[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
}

const initialState: UserReviewsSlice = {
  reviews: [],
  status: "Idle",
  error: null,
  success: null,
  message: null,
};

export const fetchUserReviews = createAsyncThunk<
  { reviews: UserReviews[]; message: string },
  { externalProductId: number },
  { rejectValue: string }
>(
  "userReviews/fetchUserReviews",
  async ({ externalProductId }, { rejectWithValue }) => {
    try {
      const getReviewsResponse: RequestResponse<{ reviews: UserReviews[] }> =
        await requestService.postMethod(
          "products/endpoints/productManagement/getReviews",
          { externalProductId }
        );

      if (getReviewsResponse.success) {
        return {
          reviews: getReviewsResponse.data?.reviews ?? [],
          message: getReviewsResponse.message,
        };
      } else {
        throw new Error(getReviewsResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchLikeUserReview = createAsyncThunk<
  { reviews: UserReviews[]; message: string },
  { email: string; externalProductId: number; reviewId: string },
  { rejectValue: string }
>(
  "userReviews/fetchLikeUserReview",
  async ({ email, externalProductId, reviewId }, { rejectWithValue }) => {
    try {
      const likeUserReviewResponse: RequestResponse<{
        reviews: UserReviews[];
      }> = await requestService.patchMethod(
        "products/endpoints/productManagement/likeReview",
        { email, externalProductId, reviewId }
      );

      if (likeUserReviewResponse.success) {
        return {
          reviews: likeUserReviewResponse.data?.reviews ?? [],
          message: likeUserReviewResponse.message,
        };
      } else {
        throw new Error(likeUserReviewResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUnLikeUserReview = createAsyncThunk<
  { reviews: UserReviews[]; message?: string },
  { email: string; externalProductId: number; reviewId: string },
  { rejectValue: string }
>(
  "userReviews/fetchUnLikeUserReview",
  async ({ email, externalProductId, reviewId }, { rejectWithValue }) => {
    try {
      const unLikeUserReviewResponse: RequestResponse<{
        reviews: UserReviews[];
      }> = await requestService.patchMethod(
        "products/endpoints/productManagement/unLikeReview",
        { email, externalProductId, reviewId }
      );

      if (unLikeUserReviewResponse.success) {
        return {
          reviews: unLikeUserReviewResponse.data?.reviews ?? [],
          message: unLikeUserReviewResponse.message,
        };
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
  reducers: {
    clearNotifications: (state) => {
      state.message = null;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReviews.pending, (state) => {
        state.status = "Loading";
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.reviews = action.payload.reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.message =
          action.payload.message || "User reviews fetched successfully.";
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
        state.message = action.payload as string;
        state.reviews = [];
      })
      .addCase(fetchLikeUserReview.pending, (state) => {
        state.status = "Loading";
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchLikeUserReview.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.reviews = action.payload.reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.message = action.payload.message || "Review liked successfully.";
      })
      .addCase(fetchLikeUserReview.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
        state.message = action.payload as string;
      })
      .addCase(fetchUnLikeUserReview.pending, (state) => {
        state.status = "Loading";
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchUnLikeUserReview.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.reviews = action.payload.reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.message =
          action.payload.message || "Review unliked successfully.";
      })
      .addCase(fetchUnLikeUserReview.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
        state.message = action.payload as string;
      });
  },
});

export const { clearNotifications } = userReviewsSlice.actions;

export default userReviewsSlice.reducer;
