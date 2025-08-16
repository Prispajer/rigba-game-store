"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrderHistory } from "@/features/history/redux/slices/orderHistory/orderHistorySlice";
import useCurrentUser from "../features/user/hooks/useCurrentUser";
import { AppDispatch, RootState } from "@/redux/store";

export default function useUserOrderHistory() {
  const [isOrderHistoryLoading, setIsOrderHistoryLoading] =
    React.useState(true);

  const { user } = useCurrentUser();

  const dispatch = useDispatch<AppDispatch>();
  const userOrderHistoryState = useSelector(
    (state: RootState) => state.userOrderHistory
  );

  const handleFetchUserOrderHistory = React.useCallback(async () => {
    if (user?.email) {
      await dispatch(fetchUserOrderHistory({ email: user.email }));
      setIsOrderHistoryLoading(false);
    }
  }, [dispatch, user?.email]);

  React.useEffect(() => {
    handleFetchUserOrderHistory();
  }, [handleFetchUserOrderHistory]);

  return {
    userOrderHistoryState,
    handleFetchUserOrderHistory,
    isOrderHistoryLoading,
  };
}
