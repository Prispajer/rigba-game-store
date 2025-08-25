"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlistThunk } from "../../redux/slices/userWishlist/userWishlist.thunk";
import debounce from "@/utils/debounce";
import useCurrentUser from "../../../user/hooks/useCurrentUser";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import { AppDispatch, RootState } from "@/redux/store";

export default function useUserWishlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCurrentUser();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();
  const userWishlistState = useSelector(
    (state: RootState) => state.userWishlist
  );

  const getUserWishlist = React.useCallback(
    () =>
      debounce(() => {
        if (user?.email) {
          executeWithLoading("getUserWishlist", () =>
            dispatch(getUserWishlistThunk({ email: user.email }))
          );
        }
      }, 200),
    [dispatch, user?.email]
  );

  React.useEffect(() => {
    getUserWishlist();
  }, [userWishlistState]);

  return {
    isLoading,
    userWishlistState,
    getUserWishlist,
  };
}
