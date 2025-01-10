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
import debounce from "@/utils/debounce";
import { AppDispatch, RootState } from "@/redux/store";
import {
  AddUserProductToCartDTO,
  DeleteUserProductFromCartDTO,
  IncreaseQuantityUserProductFromCartDTO,
  DecreaseQuantityUserProductFromCartDTO,
} from "@/utils/helpers/frontendDTO";

export default function useUserCart() {
  const [isCartLoading, setIsCartLoading] = React.useState<boolean>(false);

  const { user } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();
  const userCartState = useSelector((state: RootState) => state.userCart);

  const handleFetchUserCart = React.useMemo(
    () =>
      debounce(async () => {
        if (user?.email) {
          await dispatch(fetchUserCart({ email: user.email }));
        }
      }, 700),
    [dispatch, user?.email]
  );

  const handleAddUserProductToCart = React.useCallback(
    async (addUserProductToCartDTO: AddUserProductToCartDTO) => {
      if (user?.email) {
        setIsCartLoading(true);
        await dispatch(fetchAddUserProductToCart(addUserProductToCartDTO));
        handleFetchUserCart();
        setIsCartLoading(false);
      }
    },
    [dispatch, user?.email, handleFetchUserCart]
  );

  const handleDeleteUserProductFromCart = React.useCallback(
    async (deleteUserProductFromCartDTO: DeleteUserProductFromCartDTO) => {
      if (user?.email) {
        setIsCartLoading(true);
        await dispatch(
          fetchDeleteUserProductFromCart(deleteUserProductFromCartDTO)
        );
        awahandleFetchUserCart();
        setIsCartLoading(false);
      }
    },
    [dispatch, user?.email, handleFetchUserCart]
  );

  const handleIncreaseQuantityUserProductFromCart = React.useCallback(
    async (
      increaseQuantityUserProductFromCartDTO: IncreaseQuantityUserProductFromCartDTO
    ) => {
      if (user?.email) {
        setIsCartLoading(true);
        await dispatch(
          fetchIncreaseQuantityUserProductFromCart(
            increaseQuantityUserProductFromCartDTO
          )
        );
        handleFetchUserCart();
        setIsCartLoading(false);
      }
    },
    [dispatch, user?.email, handleFetchUserCart]
  );

  const handleDecreaseQuantityUserProductFromCart = React.useCallback(
    async (
      decreaseQuantityUserProductFromCartDTO: DecreaseQuantityUserProductFromCartDTO
    ) => {
      if (user?.email) {
        setIsCartLoading(true);
        await dispatch(
          fetchDecreaseQuantityUserProductFromCart(
            decreaseQuantityUserProductFromCartDTO
          )
        );
        handleFetchUserCart();
        setIsCartLoading(false);
      }
    },
    [dispatch, user?.email, handleFetchUserCart]
  );

  React.useEffect(() => {
    if (user?.email) {
      handleFetchUserCart();
    }
  }, [user?.email, handleFetchUserCart]);

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
