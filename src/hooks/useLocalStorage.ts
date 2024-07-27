"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  addProductWishList,
  addSelectedItem,
  removeProductWishList,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  setLocalCart,
  setWishList,
  setSelectedItems,
} from "@/redux/slices/localStorageSlice";
import { RootState } from "@/redux/store";
import { Product } from "@/utils/helpers/types";
import { setSearchText } from "@/redux/slices/utilitySlice";

export default function useLocalStorage(key: string) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const localCartState = useSelector(
    (state: RootState) => state.localStorage.localCart
  );
  const localWishListState = useSelector(
    (state: RootState) => state.localStorage.wishList
  );
  const dispatch = useDispatch();

  const handleAddLocalProduct = (product: Product): void => {
    dispatch(addProduct(product));
  };

  const handleAddLocalWishList = (product: Product): void => {
    dispatch(addProductWishList(product));
  };

  const handleAddSelectedItem = (product: Product): void => {
    dispatch(addSelectedItem(product));
  };

  const handleRemoveLocalWishList = (product: Product): void => {
    dispatch(removeProductWishList(product));
  };

  const handleRemoveLocalProduct = (productId: number): void => {
    dispatch(removeProduct(productId));
  };

  const handleIncreaseLocalQuantity = (productId: number): void => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseLocalQuantity = (productId: number): void => {
    dispatch(decreaseQuantity(productId));
  };

  React.useEffect(() => {
    const getLocalArray = localStorage.getItem(key);
    if (getLocalArray) {
      const parsedArray = JSON.parse(getLocalArray);
      if (key === "localCart") {
        dispatch(setLocalCart(parsedArray));
      } else if (key === "localWishList") {
        dispatch(setWishList(parsedArray));
      }
    } else {
      if (key === "localCart") {
        dispatch(setLocalCart([]));
      } else if (key === "localWishList") {
        dispatch(setWishList([]));
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
    handleAddLocalProduct,
    handleAddLocalWishList,
    handleAddSelectedItem,
    handleRemoveLocalWishList,
    handleRemoveLocalProduct,
    handleIncreaseLocalQuantity,
    handleDecreaseLocalQuantity,
  };
}
