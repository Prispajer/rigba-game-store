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
    debounce(
      async (
        productId: string,
        name: string,
        description: string,
        background_image: string,
        rating: number,
        slug: string,
        released: string,
        added: number
      ) => {
        if (user?.email) {
          await dispatch(
            fetchAddUserProductToCart({
              email: user.email,
              externalProductId: productId,
              name: name,
              description: description,
              price: generateRandomValue(),
              background_image: background_image,
              rating,
              slug,
              released,
              added,
            })
          );
        }
        update();
      },
      1000
    ),
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
  }, [handleFetchUserCart]);

  return {
    userCartState,
    handleFetchUserCart,
    handleAddUserProductToCart,
    handleDeleteUserProductFromCart,
    handleIncreaseQuantityUserProductFromCart,
    handleDecreaseQuantityUserProductFromCart,
  };
}
