"use client";

import React from "react";
import CheckoutLogo from "./CheckoutLogo";
import CheckoutStatus from "./CheckoutStatus";

export default function CheckoutHeaderTemplate({
                                                   headerClassName,
                                                   mobileLogoTitle,
                                                   steps,
                                                   resolutionState
                                               }: {
    headerClassName: string;
    mobileLogoTitle: string;
    steps: {
        label: string;
        index: number;
        stepNumber: React.ReactNode | string;
        elementClass: string;
        contentClass: string;
        activeStep: string;
    }[];
    resolutionState: boolean;
}) {
    return (
        <header className={headerClassName}>
            <div className="flex items-center max-w-[1240px] w-full mx-auto md:py-2">
                <CheckoutLogo mobileLogoTitle={mobileLogoTitle} />
                {resolutionState ? (
                    <>
                <CheckoutStatus steps={steps} />
                <div className="hidden xl:flex md:flex-0 w-[100px]" />
                    </>
                ) : (
                    ""
                    )}
            </div>
        </header>
    );
}