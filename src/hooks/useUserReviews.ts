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

  console.log(userReviewsState);

  const handleFetchUserReviews = React.useCallback(
    async (externalProductId: number) => {
      await dispatch(fetchUserReviews({ externalProductId }));
    },
    [dispatch]
  );

  const handleFetchLikeUserReview = React.useCallback(
    async (email: string, externalProductId: number) => {
      await dispatch(fetchLikeUserReview({ email, externalProductId }));
      handleFetchUserReviews(externalProductId);
    },
    [dispatch, handleFetchUserReviews]
  );

  const handleFetchUnLikeUserReview = React.useCallback(
    async (email: string, externalProductId: number) => {
      await dispatch(fetchUnLikeUserReview({ email, externalProductId }));
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
