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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { user, update } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();
  const userCartState = useSelector((state: RootState) => state.userCart);

  const debouncedUpdate = React.useMemo(() => debounce(update, 1000), [update]);

  const handleFetchUserCart = React.useCallback(async () => {
    if (user?.email) {
      await dispatch(fetchUserCart({ email: user.email }));
    }
  }, [dispatch, user?.email]);

  const handleAddUserProductToCart = React.useCallback(
    async (addUserProductToCartDTO: AddUserProductToCartDTO) => {
      if (user?.email) {
        setIsLoading(true);
        await dispatch(fetchAddUserProductToCart(addUserProductToCartDTO));
        debouncedUpdate();
      }
      setIsLoading(false);
    },
    [dispatch, debouncedUpdate, user?.email]
  );

  const handleDeleteUserProductFromCart = React.useCallback(
    async (deleteUserProductFromCartDTO: DeleteUserProductFromCartDTO) => {
      if (user?.email) {
        setIsLoading(true);
        await dispatch(
          fetchDeleteUserProductFromCart(deleteUserProductFromCartDTO)
        );
        debouncedUpdate();
      }
      setIsLoading(false);
    },
    [dispatch, debouncedUpdate, user?.email]
  );

  const handleIncreaseQuantityUserProductFromCart = React.useCallback(
    async (
      increaseQuantityUserProductFromCartDTO: IncreaseQuantityUserProductFromCartDTO
    ) => {
      if (user?.email) {
        setIsLoading(true);
        await dispatch(
          fetchIncreaseQuantityUserProductFromCart(
            increaseQuantityUserProductFromCartDTO
          )
        );
        debouncedUpdate();
      }
      setIsLoading(false);
    },
    [dispatch, debouncedUpdate, user?.email]
  );

  const handleDecreaseQuantityUserProductFromCart = React.useCallback(
    async (
      decreaseQuantityUserProductFromCartDTO: DecreaseQuantityUserProductFromCartDTO
    ) => {
      if (user?.email) {
        setIsLoading(true);
        await dispatch(
          fetchDecreaseQuantityUserProductFromCart(
            decreaseQuantityUserProductFromCartDTO
          )
        );
        debouncedUpdate();
      }
      setIsLoading(false);
    },
    [dispatch, debouncedUpdate, user?.email]
  );

  React.useEffect(() => {
    if (user?.email) {
      handleFetchUserCart();
    }
  }, [
    user?.email,
    handleAddUserProductToCart,
    handleDeleteUserProductFromCart,
    handleIncreaseQuantityUserProductFromCart,
    handleDecreaseQuantityUserProductFromCart,
  ]);

  return {
    userCartState,
    isLoading,
    handleFetchUserCart,
    handleAddUserProductToCart,
    handleDeleteUserProductFromCart,
    handleIncreaseQuantityUserProductFromCart,
    handleDecreaseQuantityUserProductFromCart,
  };
}
