"use client";

import {
  getCart,
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "../redux/slices/cart/cart.thunk";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrentUser from "../../user/hooks/useCurrentUser";
import debounce from "@/utils/debounce";
import { AppDispatch, RootState } from "@/redux/store";
import {
  AddUserProductToCartDTO,
  DeleteUserProductFromCartDTO,
  IncreaseQuantityUserProductFromCartDTO,
  DecreaseQuantityUserProductFromCartDTO,
} from "@/utils/helpers/frontendDTO";

export default function useCart() {
  const [isCartLoading, setIsCartLoading] = React.useState<boolean>(false);

  const { user } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();
  const userCartState = useSelector((state: RootState) => state.cart);

  const handleFetchUserCart = React.useMemo(
    () =>
      debounce(async () => {
        if (user?.email) {
          await dispatch(getCart({ email: user.email }));
        }
      }, 200),
    [dispatch, user?.email]
  );

  const handleAddUserProductToCart = React.useCallback(
    debounce(async (addUserProductToCartDTO: AddUserProductToCartDTO) => {
      if (user?.email) {
        setIsCartLoading(true);
        await dispatch(addToCart(addUserProductToCartDTO));
        handleFetchUserCart();
        setIsCartLoading(false);
      }
    }, 200),
    [dispatch, user?.email, handleFetchUserCart]
  );

  const handleDeleteUserProductFromCart = React.useCallback(
    debounce(
      async (deleteUserProductFromCartDTO: DeleteUserProductFromCartDTO) => {
        if (user?.email) {
          setIsCartLoading(true);
          await dispatch(removeFromCart(deleteUserProductFromCartDTO));
          handleFetchUserCart();
          setIsCartLoading(false);
        }
      },
      200
    ),
    [dispatch, user?.email, handleFetchUserCart]
  );

  const handleIncreaseQuantityUserProductFromCart = React.useCallback(
    debounce(
      async (
        increaseQuantityUserProductFromCartDTO: IncreaseQuantityUserProductFromCartDTO
      ) => {
        if (user?.email) {
          setIsCartLoading(true);
          await dispatch(
            increaseQuantity(increaseQuantityUserProductFromCartDTO)
          );
          handleFetchUserCart();
          setIsCartLoading(false);
        }
      },
      200
    ),
    [dispatch, user?.email, handleFetchUserCart]
  );

  const handleDecreaseQuantityUserProductFromCart = React.useCallback(
    debounce(
      async (
        decreaseQuantityUserProductFromCartDTO: DecreaseQuantityUserProductFromCartDTO
      ) => {
        if (user?.email) {
          setIsCartLoading(true);
          await dispatch(
            decreaseQuantity(decreaseQuantityUserProductFromCartDTO)
          );
          handleFetchUserCart();
          setIsCartLoading(false);
        }
      },
      200
    ),
    [dispatch, user?.email, handleFetchUserCart]
  );

  return {
    userCartState,
    isCartLoading,
    handleFetchUserCart,
    handleAddUserProductToCart,
    handleDeleteUserProductFromCart,
    handleIncreaseQuantityUserProductFromCart,
    handleDecreaseQuantityUserProductFromCart,
  };
}
