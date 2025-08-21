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

export default function useUserCartActions() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCurrentUser();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();

  const handleAddUserProductToCart = React.useCallback(
    debounce((addUserProductToCartDTO: AddUserProductToCartDTO) => {
      if (user?.email) {
        executeWithLoading("addUserProductToCart", () =>
          dispatch(addUserProductToCartThunk(addUserProductToCartDTO))
        );
      }
    }, 200),
    [dispatch, user?.email]
  );

  const handleDeleteUserProductFromCart = React.useCallback(
    debounce((email: string, externalProductId: number) => {
      if (user?.email) {
        executeWithLoading("deleteUserProductFromCart", () =>
          dispatch(deleteUserProductFromCartThunk({ email, externalProductId }))
        );
      }
    }, 200),
    [dispatch, user?.email]
  );

  const handleIncreaseQuantityUserProductFromCart = React.useCallback(
    debounce((email: string, externalProductId: number) => {
      if (user?.email) {
        executeWithLoading("increaseQuantityUserProductFromCart", () =>
          dispatch(increaseUserCartQuantityThunk({ email, externalProductId }))
        );
      }
    }, 200),
    [dispatch, user?.email]
  );

  const handleDecreaseQuantityUserProductFromCart = React.useCallback(
    debounce((email: string, externalProductId: number) => {
      if (user?.email) {
        executeWithLoading("decreaseQuantityUserProductFromCart", () =>
          dispatch(decreaseUserCartQuantityThunk({ email, externalProductId }))
        );
      }
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
