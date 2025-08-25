"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "@/features/history/redux/slices/orderHistory/orderHistory.thunk";
import useCurrentUser from "../../user/hooks/useCurrentUser";
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
      await dispatch(getUserOrderHistory({ email: user.email }));
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
