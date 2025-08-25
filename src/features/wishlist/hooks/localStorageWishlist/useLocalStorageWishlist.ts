"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocalStorageWishlist } from "../../redux/slices/localStorageWishlist/localStorageWishlistSlice";
import { selectLocalStorageWishlistState } from "./../../redux/slices/localStorageWishlist/localStorageWishlist.selectors";
import { AppDispatch } from "@/redux/store";

export default function useLocalStorageWishlist(key: string) {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const localStorageWishlistState = useSelector(
    selectLocalStorageWishlistState
  );

  React.useEffect(() => {
    const getLocalArray = localStorage.getItem(key);
    if (getLocalArray) {
      const parsedArray = JSON.parse(getLocalArray);
      if (key === "localStorageWishlist") {
        dispatch(setLocalStorageWishlist(parsedArray));
      }
    } else {
      if (key === "localStorageWishlist") {
        dispatch(setLocalStorageWishlist([]));
      }
    }
    setIsLoaded(true);
  }, [key, dispatch]);

  React.useEffect(() => {
    if (isLoaded) {
      if (key === "localStorageWishlist") {
        localStorage.setItem(
          key,
          JSON.stringify(localStorageWishlistState.localStorageWishlist)
        );
      }
    }
  }, [key, localStorageWishlistState, isLoaded]);

  return localStorageWishlistState;
}
