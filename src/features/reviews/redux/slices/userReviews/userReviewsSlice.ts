import { createSlice } from "@reduxjs/toolkit";
import {
  getUserReviewsThunk,
  likeUserReviewThunk,
  unlikeUserReviewThunk,
} from "./userReviews.thunk";
import { UserReviewsState } from "./userReviews.types";

const initialState: UserReviewsState = {
  reviews: [],
  status: "Idle",
  error: null,
  success: null,
  message: null,
};

const reviewsSlice = createSlice({
  name: "userReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserReviewsThunk.pending, (state) => {
        state.status = "Loading";
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(getUserReviewsThunk.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.reviews = action.payload.reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.message =
          action.payload.message || "Reviews fetched successfully.";
      })
      .addCase(getUserReviewsThunk.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
        state.message = action.payload as string;
        state.reviews = [];
      })
      .addCase(likeUserReviewThunk.pending, (state) => {
        state.status = "Loading";
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(likeUserReviewThunk.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.reviews = action.payload.reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.message = action.payload.message || "Review liked successfully.";
      })
      .addCase(likeUserReviewThunk.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
        state.message = action.payload as string;
      })
      .addCase(unlikeUserReviewThunk.pending, (state) => {
        state.status = "Loading";
        state.message = null;
        state.error = null;
        state.success = null;
      })
      .addCase(unlikeUserReviewThunk.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.reviews = action.payload.reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.message =
          action.payload.message || "Review unliked successfully.";
      })
      .addCase(unlikeUserReviewThunk.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload as string;
        state.message = action.payload as string;
      });
  },
});

export default reviewsSlice.reducer;
