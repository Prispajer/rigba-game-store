"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { setElement } from "@/redux/slices/ui/uiSlice";
import { CheckoutStep } from "@/redux/slices/ui/ui.types";

export default function CheckoutStepSetter({ step }: { step: CheckoutStep }) {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setElement({key: "checkoutStep", value: step}))
    }, [dispatch, step]);

    return null;
}