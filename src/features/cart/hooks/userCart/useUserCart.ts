"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartThunk } from "../../redux/slices/userCart/userCart.thunk";
import useCurrentUser from "../../../user/hooks/useCurrentUser";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import debounce from "@/utils/debounce";
import { AppDispatch, RootState } from "@/redux/store";
import { selectUserCartState } from "../../redux/slices/userCart/userCart.selectors";

export default function useUserCart() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useCurrentUser();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();

  const userCartState = useSelector(selectUserCartState);

  const getUserCart = React.useCallback(
    debounce(async () => {
      if (user?.email) {
        await executeWithLoading("getUserCart", () =>
          dispatch(getUserCartThunk({ email: user.email }))
        );
      }
    }, 200),
    [dispatch, user?.email]
  );

  React.useEffect(() => {
    getUserCart();
  }, []);

  return {
    isLoading,
    userCartState,
    getUserCart,
  };
}
