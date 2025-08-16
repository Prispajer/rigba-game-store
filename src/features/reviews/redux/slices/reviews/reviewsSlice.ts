import { createSlice } from "@reduxjs/toolkit";
import { getReviews, likeReview, unlikeReview } from "./reviews.thunk";
import { ReviewsState } from "./reviews.types";

const initialState: ReviewsState = {
  reviews: [],
  status: "Idle",
  error: null,
  success: null,
  message: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.status = "Loading";
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.reviews = action.payload.reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.message =
          action.payload.message || "Reviews fetched successfully.";
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
        state.message = action.payload as string;
        state.reviews = [];
      })
      .addCase(likeReview.pending, (state) => {
        state.status = "Loading";
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(likeReview.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.reviews = action.payload.reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.message = action.payload.message || "Review liked successfully.";
      })
      .addCase(likeReview.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
        state.message = action.payload as string;
      })
      .addCase(unlikeReview.pending, (state) => {
        state.status = "Loading";
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(unlikeReview.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.reviews = action.payload.reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.message =
          action.payload.message || "Review unliked successfully.";
      })
      .addCase(unlikeReview.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
        state.message = action.payload as string;
      });
  },
});

export default reviewsSlice.reducer;
