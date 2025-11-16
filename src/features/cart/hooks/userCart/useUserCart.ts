"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartThunk } from "../../redux/slices/userCart/userCart.thunk";
import useCurrentUser from "../../../user/hooks/useCurrentUser";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import { AppDispatch } from "@/redux/store";
import { selectUserCartState } from "../../redux/slices/userCart/userCart.selectors";

export default function useUserCart() {
    const dispatch = useDispatch<AppDispatch>();

    const { user } = useCurrentUser();
    const { isLoading, executeWithLoading } = useAsyncActionWithLoading();

    const userCartState = useSelector(selectUserCartState);

    const getUserCart = React.useCallback(
        async () => {
            if (user?.email) {
                await executeWithLoading("getUserCart", () =>
                    dispatch(getUserCartThunk({ email: user.email }))
                );
            }
        },
        [dispatch, user?.email, executeWithLoading]
    );

    return {
        isLoading,
        userCartState,
        getUserCart,
    };
}