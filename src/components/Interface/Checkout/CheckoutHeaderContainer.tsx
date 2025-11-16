"use client";

import React from "react";
import { useDispatch } from "react-redux";
import CheckoutHeaderTemplate from "@/components/Interface/Checkout/CheckoutHeaderTemplate";
import useUiVisibility from "@/hooks/useUiVisibility";

export default function CheckoutHeaderContainer() {
    const { resolutionState, handleSetResolution } = useUiVisibility();
    const dispatch = useDispatch();

    React.useEffect(() => {
        handleSetResolution();
        window.addEventListener("resize", handleSetResolution);
        return () => {
            window.removeEventListener("resize", handleSetResolution);
        };
    }, [dispatch, handleSetResolution]);

    return (
        <CheckoutHeaderTemplate
            headerClassName={`px-[8px] border-secondaryColor bg-primaryColor md:bg-secondaryColor z-[1] ${
                !resolutionState ? "sticky top-0" : "flex"
            }`}
            mobileLogoTitle="Cart"
            stepElementClasses={{
                step1: "font-[500] text-[16px] text-[#00cf9f] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#00cf9f]",
                step2: "font-[500] text-[16px] text-[#ffffff66] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#ffffff66]",
                step3: "font-[500] text-[16px] text-[#ffffff66] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#ffffff66]",
            }}
            stepContent={{
                step1: "1",
                step2: "2",
                step3: "3",
            }}
            stepContentClasses={{
                step1: "text-[#FFFFFF] bg-[#00cf9f]",
                step2: "text-secondaryColor bg-[#ffffff66]",
                step3: "text-secondaryColor bg-[#ffffff66]",
            }}
        />
    );
}