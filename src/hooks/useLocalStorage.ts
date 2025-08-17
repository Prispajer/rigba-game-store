"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocalCart,
  setLocalWishlist,
  addLocalProductToCart,
  addLocalProductToWishList,
  deleteLocalProductFromCart,
  deleteLocalProductFromWishList,
  increaseQuantityLocalProductFromCart,
  decreaseQuantityLocalProductFromCart,
  setLocalWishlistOrdering,
} from "@/redux/slices/localStorage/localStorageSlice";
import { RootState } from "@/redux/store";
import {
  selectlocalCart,
  selectlocalWishlist,
} from "./../redux/slices/localStorage/localStorage.selectors";
import { LocalCart, LocalWishlist } from "@/types/types";

export default function useLocalStorage(key: string) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const dispatch = useDispatch();

  const localCartState = useSelector(selectlocalCart);
  const localWishlistState = useSelector(selectlocalWishlist);

  const handleAddLocalProductToCart = (product: LocalCart): void => {
    dispatch(addLocalProductToCart(product));
  };

  const handleAddLocalProductToWishList = (product: LocalWishlist): void => {
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
    dispatch(setLocalWishlistOrdering(ordering));
  };

  React.useEffect(() => {
    const getLocalArray = localStorage.getItem(key);
    if (getLocalArray) {
      const parsedArray = JSON.parse(getLocalArray);
      if (key === "localCart") {
        dispatch(setLocalCart(parsedArray));
      } else if (key === "localWishlist") {
        dispatch(setLocalWishlist(parsedArray));
      }
    } else {
      if (key === "localCart") {
        dispatch(setLocalCart([]));
      } else if (key === "localWishlist") {
        dispatch(setLocalWishlist([]));
      }
    }
    setIsLoaded(true);
  }, [key, dispatch]);

  React.useEffect(() => {
    if (isLoaded) {
      if (key === "localCart") {
        localStorage.setItem(key, JSON.stringify(localCartState));
      } else if (key === "localWishlist") {
        localStorage.setItem(key, JSON.stringify(localWishlistState));
      }
    }
  }, [key, localCartState, localWishlistState, isLoaded]);

  return {
    localCartState,
    localWishlistState,
    handleAddLocalProductToCart,
    handleAddLocalProductToWishList,
    handleDeleteLocalProductFromCart,
    handleDeleteLocalProductFromWishList,
    handleIncreaseQuantityLocalProductFromCart,
    handleDecreaseQuantityLocalProductFromCart,
    handleSetLocalOrdering,
  };
}
