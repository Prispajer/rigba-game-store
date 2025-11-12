"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlistThunk } from "../../redux/slices/userWishlist/userWishlist.thunk";
import debounce from "@/utils/debounce";
import useCurrentUser from "../../../user/hooks/useCurrentUser";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import { selectUserWishlistState } from "./../../redux/slices/userWishlist/userWishlist.selectors";
import { AppDispatch } from "@/redux/store";

export default function useUserWishlist() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useCurrentUser();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();

  const userWishlistState = useSelector(selectUserWishlistState);

  const getUserWishlist = React.useCallback(
    debounce(async () => {
      if (user?.email) {
        await executeWithLoading("getUserWishlist", () =>
          dispatch(getUserWishlistThunk({ email: user.email }))
        );
      }
    }, 200),
    [dispatch, user?.email]
  );

  return {
    isLoading,
    userWishlistState,
    getUserWishlist,
  };
}
