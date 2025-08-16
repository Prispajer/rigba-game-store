import { createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "@/services/RequestService";
import { RequestResponse, Review } from "@/types/types";

export const getReviews = createAsyncThunk<
  { reviews: Review[]; message: string },
  { externalProductId: number },
  { rejectValue: string }
>("reviews/getReviews", async ({ externalProductId }, { rejectWithValue }) => {
  try {
    const getReviewsResponse: RequestResponse<{ reviews: Review[] }> =
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
});

export const likeReview = createAsyncThunk<
  { reviews: Review[]; message: string },
  { email: string; externalProductId: number; reviewId: string },
  { rejectValue: string }
>(
  "reviews/likeReview",
  async ({ email, externalProductId, reviewId }, { rejectWithValue }) => {
    try {
      const likeReviewResponse: RequestResponse<{
        reviews: Review[];
      }> = await requestService.patchMethod(
        "products/endpoints/productManagement/likeReview",
        { email, externalProductId, reviewId }
      );

      if (likeReviewResponse.success) {
        return {
          reviews: likeReviewResponse.data?.reviews ?? [],
          message: likeReviewResponse.message,
        };
      } else {
        throw new Error(likeReviewResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const unlikeReview = createAsyncThunk<
  { reviews: Review[]; message?: string },
  { email: string; externalProductId: number; reviewId: string },
  { rejectValue: string }
>(
  "reviews/unlikeReview",
  async ({ email, externalProductId, reviewId }, { rejectWithValue }) => {
    try {
      const unLikeReviewResponse: RequestResponse<{
        reviews: Review[];
      }> = await requestService.patchMethod(
        "products/endpoints/productManagement/unLikeReview",
        { email, externalProductId, reviewId }
      );

      if (unLikeReviewResponse.success) {
        return {
          reviews: unLikeReviewResponse.data?.reviews ?? [],
          message: unLikeReviewResponse.message,
        };
      } else {
        throw new Error(unLikeReviewResponse.message || "Unknown error");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
