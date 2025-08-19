import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "./../redux/slices/reviews/reviews.thunk";
import { AppDispatch, RootState } from "@/redux/store";
import executeWithLoading from "@/shared/executeWithLoading";

export default function useReviews(externalProductId: number) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = React.useState<Record<string, boolean>>({});

  const reviews = useSelector((state: RootState) => state.reviews);

  const refetch = async () => {
    await executeWithLoading("fetchReviews", setIsLoading, () =>
      dispatch(getReviews({ externalProductId }))
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
