"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProductHistory } from "@/redux/slices/userProductHistorySlice";
import useCurrentUser from "./useCurrentUser";
import { AppDispatch, RootState } from "@/redux/store";

export default function useUserProductHistory() {
  const { user } = useCurrentUser();

  const dispatch = useDispatch<AppDispatch>();
  const userProductHistoryState = useSelector(
    (state: RootState) => state.userProductHistory
  );

  const handleFetchUserProductHistory = React.useCallback(async () => {
    if (user?.email) {
      await dispatch(fetchUserProductHistory({ email: user.email }));
    }
  }, [dispatch, user?.email]);

  React.useEffect(() => {
    handleFetchUserProductHistory();
  }, [handleFetchUserProductHistory]);

  return {
    userProductHistoryState,
    handleFetchUserProductHistory,
  };
}
