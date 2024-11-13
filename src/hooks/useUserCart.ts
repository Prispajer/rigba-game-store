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
  const { user, update } = useCurrentUser();

  const dispatch = useDispatch<AppDispatch>();
  const userCartState = useSelector((state: RootState) => state.userCart);

  const handleFetchUserCart = React.useCallback(async () => {
    if (user?.email) {
      await dispatch(fetchUserCart({ email: user.email }));
    }
  }, [dispatch, user?.email]);

  const handleAddUserProductToCart = React.useCallback(
    debounce(async (addUserProductToCartDTO: AddUserProductToCartDTO) => {
      if (user?.email) {
        await dispatch(fetchAddUserProductToCart(addUserProductToCartDTO));
      }
      update();
    }, 1000),
    [dispatch, user?.email, update]
  );

  const handleDeleteUserProductFromCart = React.useCallback(
    debounce(
      async (deleteUserProductFromCartDTO: DeleteUserProductFromCartDTO) => {
        if (user?.email) {
          await dispatch(
            fetchDeleteUserProductFromCart(deleteUserProductFromCartDTO)
          );
        }
        update();
      },
      1000
    ),
    [dispatch, user?.email, update]
  );

  const handleIncreaseQuantityUserProductFromCart = React.useCallback(
    debounce(
      async (
        increaseQuantityUserProductFromCartDTO: IncreaseQuantityUserProductFromCartDTO
      ) => {
        if (user?.email) {
          await dispatch(
            fetchIncreaseQuantityUserProductFromCart(
              increaseQuantityUserProductFromCartDTO
            )
          );
        }
        update();
      },
      1000
    ),
    [dispatch, user?.email, update]
  );

  const handleDecreaseQuantityUserProductFromCart = React.useCallback(
    debounce(
      async (
        decreaseQuantityUserProductFromCartDTO: DecreaseQuantityUserProductFromCartDTO
      ) => {
        if (user?.email) {
          await dispatch(
            fetchDecreaseQuantityUserProductFromCart(
              decreaseQuantityUserProductFromCartDTO
            )
          );
        }
        update();
      },
      1000
    ),
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
