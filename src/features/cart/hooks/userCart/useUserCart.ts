"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartThunk } from "../../redux/slices/userCart/userCart.thunk";
import useCurrentUser from "../../../user/hooks/useCurrentUser";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import debounce from "@/utils/debounce";
import { AppDispatch, RootState } from "@/redux/store";

export default function useUserCart() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCurrentUser();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();
  const userCartState = useSelector((state: RootState) => state.userCart);

  const getUserCart = React.useCallback(
    () =>
      debounce(() => {
        if (user?.email) {
          executeWithLoading("getUserCart", () =>
            dispatch(getUserCartThunk({ email: user.email }))
          );
        }
      }, 200),
    [dispatch, user?.email]
  );

  React.useEffect(() => {
    getUserCart();
  }, [userCartState]);

  return {
    isLoading,
    userCartState,
    getUserCart,
  };
}
