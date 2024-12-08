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
  const [isReviewLoading, setIsReviewLoading] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const userReviewsState = useSelector((state: RootState) => state.userReviews);

  const handleFetchUserReviews = React.useCallback(
    async (externalProductId: number) => {
      setIsReviewLoading(true);
      await dispatch(fetchUserReviews({ externalProductId }));
      setIsReviewLoading(false);
    },
    [dispatch]
  );

  const handleFetchLikeUserReview = React.useCallback(
    async (likeUserReviewDTO: LikeUserReviewDTO) => {
      setIsReviewLoading(true);
      await dispatch(fetchLikeUserReview(likeUserReviewDTO));
      await handleFetchUserReviews(likeUserReviewDTO.externalProductId);
      setIsReviewLoading(false);
    },
    [dispatch, handleFetchUserReviews]
  );

  const handleFetchUnLikeUserReview = React.useCallback(
    async (unLikeUserReviewDTO: UnLikeUserReviewDTO) => {
      setIsReviewLoading(true);
      await dispatch(fetchUnLikeUserReview(unLikeUserReviewDTO));
      await handleFetchUserReviews(unLikeUserReviewDTO.externalProductId);
      setIsReviewLoading(false);
    },
    [dispatch, handleFetchUserReviews]
  );

  return {
    userReviewsState,
    isReviewLoading,
    handleFetchUserReviews,
    handleFetchLikeUserReview,
    handleFetchUnLikeUserReview,
  };
}
