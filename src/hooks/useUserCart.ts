"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCart,
  fetchAddUserProductToCart,
  fetchDeleteUserProductFromCart,
  fetchDecreaseQuantityUserProductFromCart,
  fetchIncreaseQuantityUserProductFromCart,
} from "@/redux/slices/userCartSlice";
import useCurrentUser from "./useCurrentUser";
import { generateRandomValue } from "@/utils/prices";
import debounce from "@/utils/debounce";
import { AppDispatch, RootState } from "@/redux/store";
import { AddUserProductToCart } from "@/utils/helpers/frontendDTO";

export default function useUserCart() {
  const { user, update } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();
  const userCartState = useSelector((state: RootState) => state.userCart);

  const handleFetchUserCart = React.useCallback(() => {
    if (user?.email) {
      dispatch(fetchUserCart({ email: user.email }));
    }
  }, [dispatch, user?.email]);

  const handleAddUserProductToCart = React.useCallback(
    debounce(async (AddUserProductToCart: AddUserProductToCart) => {
      if (user?.email) {
        await dispatch(
          fetchAddUserProductToCart({
            email: user.email,
            externalProductId: AddUserProductToCart.id,
            name: AddUserProductToCart.name,
            description: AddUserProductToCart.description,
            price: generateRandomValue(),
            background_image: AddUserProductToCart.background_image,
            rating: AddUserProductToCart.rating,
            slug: AddUserProductToCart.slug,
            released: AddUserProductToCart.released,
            added: AddUserProductToCart.added,
          })
        );
      }
      update();
    }, 1000),
    [dispatch, user?.email, update]
  );

  const handleDeleteUserProductFromCart = React.useCallback(
    debounce(async (externalProductId: number) => {
      if (user?.email) {
        await dispatch(
          fetchDeleteUserProductFromCart({
            email: user.email,
            externalProductId,
          })
        );
      }
      update();
    }, 1000),
    [dispatch, user?.email, update]
  );

  const handleIncreaseQuantityUserProductFromCart = React.useCallback(
    debounce(async (externalProductId: number) => {
      if (user?.email) {
        await dispatch(
          fetchIncreaseQuantityUserProductFromCart({
            email: user.email,
            externalProductId,
          })
        );
      }
      update();
    }, 1000),
    [dispatch, user?.email, update]
  );

  const handleDecreaseQuantityUserProductFromCart = React.useCallback(
    debounce(async (externalProductId: number) => {
      if (user?.email) {
        await dispatch(
          fetchDecreaseQuantityUserProductFromCart({
            email: user.email,
            externalProductId,
          })
        );
      }
      update();
    }, 1000),
    [dispatch, user?.email, update]
  );

  React.useEffect(() => {
    handleFetchUserCart();
  }, [
    handleFetchUserCart,
    handleAddUserProductToCart,
    handleDeleteUserProductFromCart,
    handleIncreaseQuantityUserProductFromCart,
    handleDecreaseQuantityUserProductFromCart,
  ]);

  return {
    userCartState,
    handleFetchUserCart,
    handleAddUserProductToCart,
    handleDeleteUserProductFromCart,
    handleIncreaseQuantityUserProductFromCart,
    handleDecreaseQuantityUserProductFromCart,
  };
}
