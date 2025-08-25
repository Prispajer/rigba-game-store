"use client";
import React from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectLocalStorageCartState } from "../../redux/slices/localStorageCart/localStorageCart.selectors";
import { setLocalStorageCart } from "../../redux/slices/localStorageCart/localStorageCartSlice";

export default function useLocalStorageCart(key: string) {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const localStorageCartState = useSelector(selectLocalStorageCartState);

  React.useEffect(() => {
    const getLocalArray = localStorage.getItem(key);
    if (getLocalArray) {
      if (key === "localStorageCart") {
        const parsedArray = JSON.parse(getLocalArray);
        dispatch(setLocalStorageCart(parsedArray));
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
        localStorage.setItem(
          key,
          JSON.stringify(localStorageCartState.localStorageCart)
        );
      }
    }
  }, [key, localStorageCartState, isLoaded]);

  return localStorageCartState;
}
