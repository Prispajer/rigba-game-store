"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  addLocalStorageProductToWishlist,
  deleteLocalStorageProductFromWishlist,
  setLocalStorageWishlistOrdering,
} from "../../redux/slices/localStorageWishlist/localStorageWishlistSlice";
import LocalStorageWishlistProduct from "../../types/localStorageWishlistProduct";

export default function useLocalStorageWishlistActions() {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddLocalStorageProductToWishlist = (
    product: LocalStorageWishlistProduct
  ): void => {
    dispatch(addLocalStorageProductToWishlist(product));
  };

  const handleDeleteLocalStorageProductFromWishlist = (
    externalProductId: number
  ): void => {
    dispatch(deleteLocalStorageProductFromWishlist(externalProductId));
  };

  const handleSetLocalStorageWishlistOrdering = (ordering: string): void => {
    dispatch(setLocalStorageWishlistOrdering(ordering));
  };

  return {
    handleAddLocalStorageProductToWishlist,
    handleDeleteLocalStorageProductFromWishlist,
    handleSetLocalStorageWishlistOrdering,
  };
}
