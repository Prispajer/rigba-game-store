import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  setLocalCart,
} from "@/redux/slices/productSlice";
import { RootState } from "../redux/store";
import { LocalStorageProduct } from "@/utils/helpers/types";

export default function useLocalStorage(key: string) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const localCartState = useSelector(
    (state: RootState) => state.product.localCart
  );
  const dispatch = useDispatch();

  const handleAddLocalProduct = (product: LocalStorageProduct): void => {
    dispatch(addProduct(product));
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
    const savedCart = localStorage.getItem(key);
    if (savedCart) {
      dispatch(setLocalCart(JSON.parse(savedCart)));
    } else {
      dispatch(setLocalCart([]));
    }
    setIsLoaded(true);
  }, [key, dispatch]);

  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(key, JSON.stringify(localCartState));
    }
  }, [key, localCartState, isLoaded]);

  return {
    localCartState,
    handleAddLocalProduct,
    handleRemoveLocalProduct,
    handleIncreaseLocalQuantity,
    handleDecreaseLocalQuantity,
  };
}
