import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviewsThunk } from "../redux/slices/userReviews/userReviews.thunk";
import { selectUserReviewsState } from "./../redux/slices/userReviews/userReviews.selectors";
import { AppDispatch } from "@/redux/store";
import executeWithLoading from "@/utils/executeWithLoading";

export default function useUserReviews(externalProductId: number) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = React.useState<Record<string, boolean>>({});

  const userReviewsState = useSelector(selectUserReviewsState);

  const getUserReviews = React.useCallback(async () => {
    await executeWithLoading("getUserReviews", setIsLoading, () =>
      dispatch(getUserReviewsThunk({ externalProductId }))
    );
  }, [dispatch, externalProductId]);

  React.useEffect(() => {
    getUserReviews();
  }, [externalProductId]);

  return {
    userReviewsState,
    isLoading,
    getUserReviews,
  };
}
