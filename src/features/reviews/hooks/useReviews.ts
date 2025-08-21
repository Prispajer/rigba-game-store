import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviewsThunk } from "../redux/slices/userReviews/userReviews.thunk";
import { AppDispatch, RootState } from "@/redux/store";
import executeWithLoading from "@/shared/executeWithLoading";

export default function useReviews(externalProductId: number) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = React.useState<Record<string, boolean>>({});

  const reviews = useSelector((state: RootState) => state.reviews);

  const getUserReviews = async () => {
    await executeWithLoading("fetchReviews", setIsLoading, () =>
      dispatch(getUserReviewsThunk({ externalProductId }))
    );
  };

  React.useEffect(() => {
    getUserReviews();
  }, [externalProductId]);

  return {
    reviews,
    isLoading,
    getUserReviews,
  };
}
