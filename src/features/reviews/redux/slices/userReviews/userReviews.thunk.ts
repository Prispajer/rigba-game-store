import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, UserReview } from "@/types/types";

export const getUserReviewsThunk = createAsyncThunk<
  { reviews: UserReview[]; message: string },
  { externalProductId: number },
  { rejectValue: string }
>(
  "reviews/getUserReviewsThunk",
  async ({ externalProductId }, { rejectWithValue }) => {
    try {
      const getUserReviewsThunkResponse: RequestResponse<{
        reviews: UserReview[];
      }> = await requestService.postMethod(
        "products/endpoints/productManagement/getReviews",
        { externalProductId }
      );

      if (getUserReviewsThunkResponse.success) {
        return {
          reviews: getUserReviewsThunkResponse.data?.reviews ?? [],
          message: getUserReviewsThunkResponse.message,
        };
      } else {
        throw new Error(getUserReviewsThunkResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const likeUserReviewThunk = createAsyncThunk<
  { reviews: UserReview[]; message: string },
  { email: string; externalProductId: number; reviewId: string },
  { rejectValue: string }
>(
  "reviews/likeUserReviewThunk",
  async ({ email, externalProductId, reviewId }, { rejectWithValue }) => {
    try {
      const likeUserReviewThunkResponse: RequestResponse<{
        reviews: UserReview[];
      }> = await requestService.patchMethod(
        "products/endpoints/productManagement/likeReview",
        { email, externalProductId, reviewId }
      );

      if (likeUserReviewThunkResponse.success) {
        return {
          reviews: likeUserReviewThunkResponse.data?.reviews ?? [],
          message: likeUserReviewThunkResponse.message,
        };
      } else {
        throw new Error(likeUserReviewThunkResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const unlikeUserReviewThunk = createAsyncThunk<
  { reviews: UserReview[]; message?: string },
  { email: string; externalProductId: number; reviewId: string },
  { rejectValue: string }
>(
  "reviews/unlikeUserReviewThunk",
  async ({ email, externalProductId, reviewId }, { rejectWithValue }) => {
    try {
      const unlikeUserReviewThunkResponse: RequestResponse<{
        reviews: UserReview[];
      }> = await requestService.patchMethod(
        "products/endpoints/productManagement/unLikeReview",
        { email, externalProductId, reviewId }
      );

      if (unlikeUserReviewThunkResponse.success) {
        return {
          reviews: unlikeUserReviewThunkResponse.data?.reviews ?? [],
          message: unlikeUserReviewThunkResponse.message,
        };
      } else {
        throw new Error(
          unlikeUserReviewThunkResponse.message || "Unknown error"
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
