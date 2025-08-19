"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProductHistory } from "@/features/history/redux/slices/productHistory/productHistorySlice";
import useCurrentUser from "../features/user/hooks/useCurrentUser";
import { AppDispatch, RootState } from "@/redux/store";

export default function useUserProductHistory() {
  const [isProductHistoryLoading, setIsProductHistoryLoading] =
    React.useState(true);

  const { user } = useCurrentUser();

  const dispatch = useDispatch<AppDispatch>();
  const userProductHistoryState = useSelector(
    (state: RootState) => state.userProductHistory
  );

  const handleFetchUserProductHistory = React.useCallback(async () => {
    if (user?.email) {
      await dispatch(fetchUserProductHistory({ email: user.email }));
      setIsProductHistoryLoading(false);
    }
  }, [dispatch, user?.email]);

  React.useEffect(() => {
    setTimeout(() => {
      handleFetchUserProductHistory();
    }, 2000);
  }, [handleFetchUserProductHistory]);

  return {
    userProductHistoryState,
    handleFetchUserProductHistory,
    isProductHistoryLoading,
  };
}
