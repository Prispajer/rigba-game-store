"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  addUserProductToWishlistThunk,
  deleteUserProductFromWishlistThunk,
} from "./../../redux/slices/userWishlist/userWishlist.thunk";
import useCurrentUser from "../../../user/hooks/useCurrentUser";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import debounce from "@/utils/debounce";
import AddUserWishlistItemDTO from "../../dto/AddUserWishlistItemDTO";
import { setUserWishlistOrdering } from "../../redux/slices/userWishlist/userWishlistSlice";

export default function useUserWishlistActions(onRefresh?: () => void) {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useCurrentUser();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();

  const handleAddUserProductToWishlist = React.useCallback(debounce(
    async (addUserProductToWishlistDTO: AddUserWishlistItemDTO) => {
      if (user?.email) {
        await executeWithLoading("addUserProductToWishlist", () =>
          dispatch(addUserProductToWishlistThunk(addUserProductToWishlistDTO))
        );
      }
      onRefresh?.();
    },
    200
  ), [dispatch, user?.email]);

  const handleDeleteUserProductFromWishlist = React.useCallback(debounce(
    async (email: string, externalProductId: number) => {
      if (user?.email) {
        await executeWithLoading("deleteUserProductFromWishlist", () =>
          dispatch(
            deleteUserProductFromWishlistThunk({
              email,
              externalProductId,
            })
          )
        );
      }
      onRefresh?.();
    },
    200
  ), [dispatch, user?.email]);

  const handleSetUserWishlistOrdering = React.useCallback((ordering: string) => {
    dispatch(setUserWishlistOrdering(ordering));
    onRefresh?.();
  }, [dispatch, onRefresh]);

  return {
    isLoading,
    handleAddUserProductToWishlist,
    handleDeleteUserProductFromWishlist,
    handleSetUserWishlistOrdering,
  };
}
