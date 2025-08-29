import React from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import debounce from "@/utils/debounce";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import AddUserProductToCartDTO from "../../dto/AddUserProductToCartDTO";
import {
  addUserProductToCartThunk,
  deleteUserProductFromCartThunk,
  increaseUserCartQuantityThunk,
  decreaseUserCartQuantityThunk,
} from "../../redux/slices/userCart/userCart.thunk";

export default function useUserCartActions(onRefresh?: () => void) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCurrentUser();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();

  const handleAddUserProductToCart = React.useCallback(
    debounce(async (addUserProductToCartDTO: AddUserProductToCartDTO) => {
      if (user?.email) {
        await executeWithLoading("addUserProductToCart", () =>
          dispatch(addUserProductToCartThunk(addUserProductToCartDTO))
        );
      }
      onRefresh?.();
    }, 200),
    [dispatch, user?.email]
  );

  const handleDeleteUserProductFromCart = React.useCallback(
    debounce(async (email: string, externalProductId: number) => {
      if (user?.email) {
        await executeWithLoading("deleteUserProductFromCart", () =>
          dispatch(deleteUserProductFromCartThunk({ email, externalProductId }))
        );
      }
      onRefresh?.();
    }, 200),
    [dispatch, user?.email]
  );

  const handleIncreaseQuantityUserProductFromCart = React.useCallback(
    debounce(async (email: string, externalProductId: number) => {
      if (user?.email) {
        await executeWithLoading("increaseQuantityUserProductFromCart", () =>
          dispatch(increaseUserCartQuantityThunk({ email, externalProductId }))
        );
      }
      onRefresh?.();
    }, 200),
    [dispatch, user?.email]
  );

  const handleDecreaseQuantityUserProductFromCart = React.useCallback(
    debounce(async (email: string, externalProductId: number) => {
      if (user?.email) {
        await executeWithLoading("decreaseQuantityUserProductFromCart", () =>
          dispatch(decreaseUserCartQuantityThunk({ email, externalProductId }))
        );
      }
      onRefresh?.();
    }, 200),
    [dispatch, user?.email]
  );

  return {
    isLoading,
    handleAddUserProductToCart,
    handleDeleteUserProductFromCart,
    handleDecreaseQuantityUserProductFromCart,
    handleIncreaseQuantityUserProductFromCart,
  };
}
