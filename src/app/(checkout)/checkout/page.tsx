"use client";

import CheckoutContainer from "@/components/Interface/Checkout/CheckoutContainer";
import CheckoutStepSetter from "@/components/Interface/Checkout/CheckoutStepSetter";
import { CheckoutStep } from "@/redux/slices/ui/ui.types";

export default function CheckoutPage() {
    return (
        <>
            <CheckoutStepSetter step={CheckoutStep.Checkout} />
            <CheckoutContainer />
        </>
    );
}