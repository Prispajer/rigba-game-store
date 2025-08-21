"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  addLocalStorageProductToWishList,
  deleteLocalStorageProductFromWishList,
  setLocalStorageWishlistOrdering,
} from "../../redux/slices/localStorageWishlist/localStorageWishlistSlice";
import LocalStorageWishlistProduct from "../../types/localStorageWishlistProduct";

export default function useLocalStorageWishlistActions() {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddLocalProductToWishList = (
    product: LocalStorageWishlistProduct
  ): void => {
    dispatch(addLocalStorageProductToWishList(product));
  };

  const handleDeleteLocalProductFromWishList = (
    externalProductId: number
  ): void => {
    dispatch(deleteLocalStorageProductFromWishList(externalProductId));
  };

  const handleSetLocalWishlistOrdering = (ordering: string): void => {
    dispatch(setLocalStorageWishlistOrdering(ordering));
  };

  return {
    handleAddLocalProductToWishList,
    handleDeleteLocalProductFromWishList,
    handleSetLocalWishlistOrdering,
  };
}
