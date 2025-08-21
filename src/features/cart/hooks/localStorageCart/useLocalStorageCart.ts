"use client";
import React from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectLocalStorageCart } from "../../redux/slices/localStorageCart/localStorageCart.selectors";
import { setLocalStorageCart } from "../../redux/slices/localStorageCart/localStorageCartSlice";

export default function useLocalStorageCart(key: string) {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const localStorageCartState = useSelector(selectLocalStorageCart);

  React.useEffect(() => {
    const getLocalArray = JSON.parse(localStorage.getItem(key) ?? "");
    if (getLocalArray) {
      if (key === "localStorageCart") {
        dispatch(setLocalStorageCart(getLocalArray));
      }
    } else {
      if (key === "localStorageCart") {
        dispatch(setLocalStorageCart([]));
      }
    }
    setIsLoaded(true);
  }, [key, dispatch]);

  React.useEffect(() => {
    if (isLoaded) {
      if (key === "localStorageCart") {
        localStorage.setItem(key, JSON.stringify(localStorageCartState));
      }
    }
  }, [key, localStorageCartState, isLoaded]);

  return localStorageCartState;
}
