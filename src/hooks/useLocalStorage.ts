"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocalCart,
  setLocalWishList,
  addLocalProductToCart,
  addLocalProductToWishList,
  deleteLocalProductFromCart,
  deleteLocalProductFromWishList,
  increaseQuantityLocalProductFromCart,
  decreaseQuantityLocalProductFromCart,
  setLocalOrdering,
} from "@/redux/slices/localStorageSlice";
import { RootState } from "@/redux/store";
import { LocalCart, LocalWishList } from "@/utils/helpers/types";

export default function useLocalStorage(key: string) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const dispatch = useDispatch();

  const localCartState = useSelector(
    (state: RootState) => state.localStorage.localCart
  );
  const localWishListState = useSelector(
    (state: RootState) => state.localStorage.localWishList
  );

  const handleAddLocalProductToCart = (product: LocalCart): void => {
    dispatch(addLocalProductToCart(product));
  };

  const handleAddLocalProductToWishList = (product: LocalWishList): void => {
    dispatch(addLocalProductToWishList(product));
  };

  const handleDeleteLocalProductFromCart = (
    externalProductId: number
  ): void => {
    dispatch(deleteLocalProductFromCart(externalProductId));
  };

  const handleDeleteLocalProductFromWishList = (
    externalProductId: number
  ): void => {
    dispatch(deleteLocalProductFromWishList(externalProductId));
  };

  const handleIncreaseQuantityLocalProductFromCart = (
    externalProductId: number
  ): void => {
    dispatch(increaseQuantityLocalProductFromCart(externalProductId));
  };

  const handleDecreaseQuantityLocalProductFromCart = (
    externalProductId: number
  ): void => {
    dispatch(decreaseQuantityLocalProductFromCart(externalProductId));
  };

  const handleSetLocalOrdering = (ordering: string): void => {
    dispatch(setLocalOrdering(ordering));
  };

  React.useEffect(() => {
    const getLocalArray = localStorage.getItem(key);
    if (getLocalArray) {
      const parsedArray = JSON.parse(getLocalArray);
      if (key === "localCart") {
        dispatch(setLocalCart(parsedArray));
      } else if (key === "localWishList") {
        dispatch(setLocalWishList(parsedArray));
      }
    } else {
      if (key === "localCart") {
        dispatch(setLocalCart([]));
      } else if (key === "localWishList") {
        dispatch(setLocalWishList([]));
      }
    }
    setIsLoaded(true);
  }, [key, dispatch]);

  React.useEffect(() => {
    if (isLoaded) {
      if (key === "localCart") {
        localStorage.setItem(key, JSON.stringify(localCartState));
      } else if (key === "localWishList") {
        localStorage.setItem(key, JSON.stringify(localWishListState));
      }
    }
  }, [key, localCartState, localWishListState, isLoaded]);

  return {
    localCartState,
    localWishListState,
    handleAddLocalProductToCart,
    handleAddLocalProductToWishList,
    handleDeleteLocalProductFromCart,
    handleDeleteLocalProductFromWishList,
    handleIncreaseQuantityLocalProductFromCart,
    handleDecreaseQuantityLocalProductFromCart,
    handleSetLocalOrdering,
  };
}
