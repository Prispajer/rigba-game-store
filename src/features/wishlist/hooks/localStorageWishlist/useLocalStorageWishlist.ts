"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocalStorageWishlist } from "../../redux/slices/localStorageWishlist/localStorageWishlistSlice";
import { selectLocalStorageWishlist } from "./../../redux/slices/localStorageWishlist/localStorageWishlist.selectors";
import { AppDispatch } from "@/redux/store";

export default function useLocalStorageWishlist(key: string) {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const localStorageWishlistState = useSelector(selectLocalStorageWishlist);

  React.useEffect(() => {
    const getLocalArray = JSON.parse(localStorage.getItem(key) ?? "");
    if (getLocalArray) {
      if (key === "localStorageWishlist") {
        dispatch(setLocalStorageWishlist(getLocalArray));
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
        localStorage.setItem(key, JSON.stringify(localStorageWishlistState));
      }
    }
  }, [key, localStorageWishlistState, isLoaded]);

  return localStorageWishlistState;
}
