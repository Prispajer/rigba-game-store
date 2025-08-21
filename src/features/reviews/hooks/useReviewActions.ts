import { useDispatch } from "react-redux";
import {
  likeUserReviewThunk,
  unlikeUserReviewThunk,
} from "../redux/slices/userReviews/userReviews.thunk";
import useActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import { AppDispatch } from "@/redux/store";

export default function useReviewActions() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, executeWithLoading } = useActionWithLoading();

  const likeUserReviewAction = (
    email: string,
    externalProductId: number,
    reviewId: string
  ) => {
    executeWithLoading("likeUserReview", () =>
      dispatch(likeUserReviewThunk({ email, externalProductId, reviewId }))
    );
  };

  const unlikeUserReviewAction = (
    email: string,
    externalProductId: number,
    reviewId: string
  ) => {
    executeWithLoading("unlikeUserReview", () =>
      dispatch(unlikeUserReviewThunk({ email, externalProductId, reviewId }))
    );
  };

  return {
    isLoading,
    likeUserReviewAction,
    unlikeUserReviewAction,
  };
}
