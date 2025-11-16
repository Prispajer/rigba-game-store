"use client";

import { useDispatch } from "react-redux";
import {
  addLocalStorageProductToCart,
  deleteLocalStorageProductFromCart,
  increaseQuantityLocalStorageProductFromCart,
  decreaseQuantityLocalStorageProductFromCart,
} from "../../redux/slices/localStorageCart/localStorageCartSlice";
import { AppDispatch } from "@/redux/store";
import LocalStorageCartProduct from "../../types/localStorageCart/localStorageCartProduct";

export default function useLocalStorageCartActions() {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddLocalStorageProductToCart = (
    product: LocalStorageCartProduct
  ): void => {
    dispatch(addLocalStorageProductToCart(product));
  };

  const handleDeleteLocalStorageProductFromCart = (
    externalProductId: number
  ): void => {
    dispatch(deleteLocalStorageProductFromCart(externalProductId));
  };

  const handleIncreaseQuantityLocalStorageProductFromCart = (
    externalProductId: number
  ): void => {
    dispatch(increaseQuantityLocalStorageProductFromCart(externalProductId));
  };

  const handleDecreaseQuantityLocalStorageProductFromCart = (
    externalProductId: number
  ): void => {
    dispatch(decreaseQuantityLocalStorageProductFromCart(externalProductId));
  };

  return {
    handleAddLocalStorageProductToCart,
    handleDeleteLocalStorageProductFromCart,
    handleIncreaseQuantityLocalStorageProductFromCart,
    handleDecreaseQuantityLocalStorageProductFromCart,
  };
}
