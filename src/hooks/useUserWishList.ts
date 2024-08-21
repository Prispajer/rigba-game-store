import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setOrdering,
  fetchAddUserProductToWishList,
  fetchDeleteUserProductFromWishList,
} from "@/redux/slices/userWishListSlice";
import useCurrentUser from "./useCurrentUser";
import { generateRandomValue } from "@/utils/prices";
import { AppDispatch, RootState } from "@/redux/store";

export default function useUserWishList() {
  const { user, update } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();
  const userWishListState = useSelector(
    (state: RootState) => state.userWishList
  );
  const userWishListStateProducts = useSelector(
    (state: RootState) => state.userWishList.products
  );

  const handleSetUserWishList = React.useCallback(() => {
    if (user?.wishlist?.products) {
      dispatch(setProducts(user.wishlist.products));
    }
  }, [dispatch, user?.wishlist?.products]);

  const handleSetUserWishListOrdering = React.useCallback(
    (ordering: string) => {
      dispatch(setOrdering(ordering));
    },
    [dispatch]
  );

  const handleAddUserProductToWishList = React.useCallback(
    (
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
        dispatch(
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
        update();
      }
    },
    [dispatch, user?.email, update]
  );

  const handleRemoveUserProductFromWishList = React.useCallback(
    (externalProductId: number) => {
      if (user?.email) {
        dispatch(
          fetchDeleteUserProductFromWishList({
            email: user.email,
            externalProductId,
          })
        );
        update();
      }
    },
    [dispatch, user?.email, update]
  );

  React.useEffect(() => {
    handleSetUserWishList();
  }, [handleSetUserWishList, userWishListState.ordering]);

  return {
    userWishListState,
    userWishListStateProducts,
    handleSetUserWishListOrdering,
    handleAddUserProductToWishList,
    handleRemoveUserProductFromWishList,
  };
}
