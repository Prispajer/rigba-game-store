import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserReviews,
  fetchLikeUserReview,
  fetchUnLikeUserReview,
} from "@/redux/slices/userReviewsSlice";
import { AppDispatch, RootState } from "@/redux/store";

export default function useUserReviews() {
  const dispatch = useDispatch<AppDispatch>();
  const userReviewsState = useSelector((state: RootState) => state.userReviews);

  const handleFetchUserReviews = React.useCallback(
    (externalProductId: number) => {
      dispatch(fetchUserReviews({ externalProductId }));
    },
    [dispatch]
  );

  const handleFetchLikeUserReview = React.useCallback(
    (email: string, reviewId: string, externalProductId: number) => {
      dispatch(fetchLikeUserReview({ email, reviewId }));
      handleFetchUserReviews(externalProductId);
    },
    [dispatch, handleFetchUserReviews]
  );

  const handleFetchUnLikeUserReview = React.useCallback(
    (email: string, reviewId: string, externalProductId: number) => {
      dispatch(fetchUnLikeUserReview({ email, reviewId }));
      handleFetchUserReviews(externalProductId);
    },
    [dispatch, handleFetchUserReviews]
  );

  return {
    userReviewsState,
    handleFetchUserReviews,
    handleFetchLikeUserReview,
    handleFetchUnLikeUserReview,
  };
}
