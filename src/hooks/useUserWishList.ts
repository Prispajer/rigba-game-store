import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrdering,
  fetchAddUserProductToWishList,
  fetchDeleteUserProductFromWishList,
} from "@/redux/slices/userWishListSlice";
import useCurrentUser from "./useCurrentUser";
import { fetchUserWishList } from "@/redux/slices/userWishListSlice";
import { generateRandomValue } from "@/utils/prices";
import { AppDispatch, RootState } from "@/redux/store";
import { LocalWishList, UserWishList } from "@/utils/helpers/types";

export default function useUserWishList() {
  const { user, update } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();
  const userWishListState = useSelector(
    (state: RootState) => state.userWishList
  );

  const handleSetUserWishListOrdering = React.useCallback(
    (ordering: string) => {
      dispatch(setOrdering(ordering));
      dispatch(fetchUserWishList({ email: user?.email as string }));
    },
    [dispatch, user]
  );

  const handleAddUserProductToWishList = React.useCallback(
    async (dddUserProductToWishListDTO: AddUserProductToWishListDTO) => {
      if (user?.email) {
        await dispatch(
          fetchAddUserProductToWishList(dddUserProductToWishListDTO)
        );
        await dispatch(fetchUserWishList({ email: user?.email as string }));
        await update();
      }
    },
    [dispatch, user?.email, update]
  );

  const handleRemoveUserProductFromWishList = React.useCallback(
    async (externalProductId: number) => {
      if (user?.email) {
        await dispatch(
          fetchDeleteUserProductFromWishList({
            email: user.email,
            externalProductId,
          })
        );
        await dispatch(fetchUserWishList({ email: user?.email as string }));
        await update();
      }
    },
    [dispatch, user?.email, update]
  );

  return {
    userWishListState,
    handleSetUserWishListOrdering,
    handleAddUserProductToWishList,
    handleRemoveUserProductFromWishList,
  };
}
