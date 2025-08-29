import React from "react";
import { useDispatch } from "react-redux";
import {
  likeUserReviewThunk,
  unlikeUserReviewThunk,
} from "../redux/slices/userReviews/userReviews.thunk";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import { AppDispatch } from "@/redux/store";

export default function useUserReviewActions(onRefresh?: () => void) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();

  const likeUserReviewAction = React.useCallback(
    async (email: string, externalProductId: number, reviewId: string) => {
      await executeWithLoading("likeUserReviewAction", () =>
        dispatch(likeUserReviewThunk({ email, externalProductId, reviewId }))
      );
      onRefresh?.();
    },
    [dispatch, executeWithLoading, onRefresh]
  );

  const unlikeUserReviewAction = React.useCallback(
    async (email: string, externalProductId: number, reviewId: string) => {
      await executeWithLoading("unlikeUserReviewAction", () =>
        dispatch(unlikeUserReviewThunk({ email, externalProductId, reviewId }))
      );
      onRefresh?.();
    },
    [dispatch, executeWithLoading, onRefresh]
  );

  return {
    isLoading,
    likeUserReviewAction,
    unlikeUserReviewAction,
  };
}
