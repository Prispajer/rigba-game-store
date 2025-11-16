"use client";

import React from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectLocalStorageCartState } from "../../redux/slices/localStorageCart/localStorageCart.selectors";
import { setLocalStorageCart } from "../../redux/slices/localStorageCart/localStorageCartSlice";

export default function useLocalStorageCart(key: string) {
    const [isHydrated, setIsHydrated] = React.useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const localStorageCartState = useSelector(selectLocalStorageCartState);

    React.useEffect(() => {
        if (key === "localStorageCart") {
            const storedLocalStorageCart = localStorage.getItem(key);

            if (storedLocalStorageCart) {
                const parsedCart = JSON.parse(storedLocalStorageCart);
                dispatch(setLocalStorageCart(parsedCart));
            } else {
                dispatch(setLocalStorageCart([]));
            }

            setIsHydrated(true);
        }
    }, [key, dispatch]);

    React.useEffect(() => {
        if (isHydrated && key === "localStorageCart") {
            localStorage.setItem(
                key,
                JSON.stringify(localStorageCartState.localStorageCart)
            );
        }
    }, [key, localStorageCartState, isHydrated]);

    return { localStorageCartState };
}