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

export default function useUserWishList() {
  const { user, update } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();
  const userWishListState = useSelector(
    (state: RootState) => state.userWishList
  );

  const handleSetUserWishListOrdering = React.useCallback(
    (ordering: string) => {
      dispatch(setOrdering(ordering));
      dispatch(fetchUserWishList(user as User));
    },
    [dispatch, user]
  );

  const handleAddUserProductToWishList = React.useCallback(
    async (
      productId: string,
      productName: string,
      productDescription: string,
      image: string,
      rating: number,
      slug: string,
      released: string,
      added: number
    ) => {
      if (user?.email) {
        await dispatch(
          fetchAddUserProductToWishList({
            email: user.email,
            externalProductId: productId,
            name: productName,
            description: productDescription,
            price: generateRandomValue(),
            background_image: image,
            rating,
            slug,
            released,
            added,
          })
        );
        await dispatch(fetchUserWishList(user as User));
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
        await dispatch(fetchUserWishList(user as User));
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
