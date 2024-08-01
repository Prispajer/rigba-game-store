import React from "react";
import useCurrentUser from "./useCurrentUser";
import {
  setProducts,
  fetchAddUserProductToWishList,
  fetchDeleteUserProductFromWishList,
} from "@/redux/slices/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { generateRandomValue } from "@/utils/prices";

export default function useUserWishList() {
  const { user, update } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();
  const userWishListState = useSelector(
    (state: RootState) => state.userWishList
  );

  const handleSetUserWishList = React.useCallback(() => {
    if (user?.wishlist?.products) {
      dispatch(setProducts(user?.wishlist?.products));
    }
  }, [dispatch, user?.wishlist?.products]);

  const handleAddUserProductToWishList = React.useCallback(
    (
      productId: string,
      productName: string,
      productDescription: string,
      image: string,
      rating: number,
      slug: string
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
  }, [handleSetUserWishList]);

  return {
    userWishListState,
    handleAddUserProductToWishList,
    handleRemoveUserProductFromWishList,
  };
}
