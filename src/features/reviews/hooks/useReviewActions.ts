import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserReviews,
  fetchLikeUserReview,
  fetchUnLikeUserReview,
} from "@/features/reviews/redux/slices/reviews/reviewsSlice";
import executeWithLoading from "@/shared/executeWithLoading";
import {
  LikeUserReviewDTO,
  UnLikeUserReviewDTO,
} from "@/utils/helpers/frontendDTO";
import { AppDispatch, RootState } from "@/redux/store";

export default function useUserReviews(refetch: () => Promise<void>) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = React.useState<Record<string, boolean>>({});

  const likeReview = async (likeUserReviewDTO: LikeUserReviewDTO) => {
    await executeWithLoading("likeReview", setIsLoading, () =>
      dispatch(fetchLikeUserReview(likeUserReviewDTO))
    );
    await refetch();
  };

  const unlikeReview = async (unLikeUserReviewDTO: UnLikeUserReviewDTO) => {
    await executeWithLoading("unlikeReview", setIsLoading, () =>
      dispatch(fetchUnLikeUserReview(unLikeUserReviewDTO))
    );
    await refetch();
  };

  return {
    isLoading,
    likeReview,
    unlikeReview,
  };
}
