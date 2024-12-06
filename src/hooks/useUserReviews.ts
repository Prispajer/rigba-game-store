import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserReviews,
  fetchLikeUserReview,
  fetchUnLikeUserReview,
} from "@/redux/slices/userReviewsSlice";
import {
  LikeUserReviewDTO,
  UnLikeUserReviewDTO,
} from "@/utils/helpers/frontendDTO";
import { AppDispatch, RootState } from "@/redux/store";

export default function useUserReviews() {
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const userReviewsState = useSelector((state: RootState) => state.userReviews);

  const handleFetchUserReviews = React.useCallback(
    async (externalProductId: number) => {
      await dispatch(fetchUserReviews({ externalProductId }));
    },
    [dispatch]
  );

  const handleFetchLikeUserReview = React.useCallback(
    async (likeUserReviewDTO: LikeUserReviewDTO) => {
      await dispatch(fetchLikeUserReview(likeUserReviewDTO));
      await handleFetchUserReviews(likeUserReviewDTO.externalProductId);
    },
    [dispatch, handleFetchUserReviews]
  );

  const handleFetchUnLikeUserReview = React.useCallback(
    async (unLikeUserReviewDTO: UnLikeUserReviewDTO) => {
      await dispatch(fetchUnLikeUserReview(unLikeUserReviewDTO));
      await handleFetchUserReviews(unLikeUserReviewDTO.externalProductId);
    },
    [dispatch, handleFetchUserReviews]
  );

  return {
    userReviewsState,
    isLoading,
    handleFetchUserReviews,
    handleFetchLikeUserReview,
    handleFetchUnLikeUserReview,
  };
}
