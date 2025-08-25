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

  const handleAddLocalStorageProductToWishList = (
    product: LocalStorageWishlistProduct
  ): void => {
    dispatch(addLocalStorageProductToWishList(product));
  };

  const handleDeleteLocalStorageProductFromWishList = (
    externalProductId: number
  ): void => {
    dispatch(deleteLocalStorageProductFromWishList(externalProductId));
  };

  const handleSetLocalStorageWishlistOrdering = (ordering: string): void => {
    dispatch(setLocalStorageWishlistOrdering(ordering));
  };

  return {
    handleAddLocalStorageProductToWishList,
    handleDeleteLocalStorageProductFromWishList,
    handleSetLocalStorageWishlistOrdering,
  };
}
