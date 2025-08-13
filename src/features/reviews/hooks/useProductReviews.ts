import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReviews } from "@/redux/slices/userReviewsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import executeWithLoading from "@/shared/executeWithLoading";

export default function useProductReviews(externalProductId: number) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = React.useState<Record<string, boolean>>({});

  const reviews = useSelector((state: RootState) => state.userReviews);

  const refetch = async () => {
    await executeWithLoading("fetchReviews", setIsLoading, () =>
      dispatch(fetchUserReviews({ externalProductId }))
    );
  };

  React.useEffect(() => {
    refetch();
  }, [externalProductId]);

  return {
    reviews,
    isLoading,
    refetch,
  };
}
