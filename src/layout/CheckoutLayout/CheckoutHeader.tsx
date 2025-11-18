"use client";

import React from "react";
import { useDispatch }  from "react-redux";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import CheckoutHeaderTemplate from "@/components/Interface/Checkout/CheckoutHeaderTemplate";
import useUiVisibility from "@/hooks/useUiVisibility";
import { CheckoutStep } from "@/redux/slices/ui/ui.types";

export default function CheckoutHeader() {
    const { resolutionState, checkoutStepState, handleSetResolution } = useUiVisibility();
    const dispatch = useDispatch();

    React.useEffect(() => {
        handleSetResolution();
        window.addEventListener("resize", handleSetResolution);
        return () => {
            window.removeEventListener("resize", handleSetResolution);
        };
    }, [dispatch, handleSetResolution]);

    const stepsBase = [
        { label: "Cart", index: 0 },
        { label: "Payment", index: 1 },
        { label: "Redeem your product", index: 2 },
    ];

    function getStepConfig(step: { label: string; index: number }, checkoutStepState: CheckoutStep) {
        const activeContentStyle = "text-[#FFFFFF] bg-[#00cf9f]";
        const unActiveContentStyle = "text-secondaryColor bg-[#ffffff66]";
        const completedContentStyle = "text-[#FFFFFF] bg-[#00cf9f]";
        const activeStep = "font-[500] text-[16px] text-[#00cf9f]";
        const unActiveStep = "font-[500] text-[16px] text-[#ffffff66]";
        const activeElementStyle = "after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#00cf9f]";
        const unActiveElementStyle = "after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#ffffff66]";
        const stepNumber = step.index + 1;
        const completedIcon = <IoCheckmarkCircleSharp className="text-[24px] mr-[8px] text-secondaryColor" />;

        switch (checkoutStepState) {
            case CheckoutStep.Checkout:
                return {
                    ...step,
                    stepNumber,
                    contentClass: step.index === 0 ? activeContentStyle : unActiveContentStyle,
                    elementClass: step.index === 0 ? activeElementStyle : unActiveElementStyle,
                    activeStep: step.index === 0 ? activeStep : unActiveStep,
                };
            case CheckoutStep.Payment:
                return {
                    ...step,
                    stepNumber: step.index === 0 ? completedIcon : step.index === 1 ? stepNumber : stepNumber,
                    contentClass: step.index === 1 ? activeContentStyle : step.index === 0 ? completedContentStyle : unActiveContentStyle,
                    elementClass: step.index === 1 ? unActiveElementStyle : activeElementStyle,
                    activeStep: step.index === 1 ? activeStep : unActiveStep,
                };
            case CheckoutStep.Redeem:
                return {
                    ...step,
                    stepNumber: step.index < 2 ? completedIcon : stepNumber,
                    contentClass: step.index === 2 ? activeContentStyle : completedContentStyle,
                    elementClass: activeElementStyle,
                    activeStep: step.index === 2 ? activeStep : unActiveStep,
                };
            default:
                return {
                    ...step,
                    stepNumber,
                    contentClass: unActiveContentStyle,
                    elementClass: unActiveElementStyle,
                    activeStep: unActiveStep,
                };
        }
    }

    const steps = stepsBase.map((step) => getStepConfig(step, checkoutStepState as CheckoutStep));

    return (
        <CheckoutHeaderTemplate
            headerClassName={`px-[8px] border-secondaryColor bg-primaryColor md:bg-secondaryColor z-[1] ${
                !resolutionState ? "sticky top-0" : "flex"
            }`}
            mobileLogoTitle={
                checkoutStepState === CheckoutStep.Checkout
                    ? "Cart"
                    : checkoutStepState === CheckoutStep.Payment
                        ? "Payment"
                        : checkoutStepState === CheckoutStep.Redeem
                            ? "Redeem"
                            : ""
            }            steps={steps}
            resolutionState={resolutionState as boolean}
        />
    );
}