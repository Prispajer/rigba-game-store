"use client";

import React from "react";
import CheckoutLogo from "./CheckoutLogo";
import CheckoutStatus from "./CheckoutStatus";

export default function CheckoutHeaderTemplate({
                                                   headerClassName,
                                                   mobileLogoTitle,
                                                   stepElementClasses = { step1: "", step2: "", step3: "" },
                                                   stepContent = { step1: "", step2: "", step3: "" },
                                                   stepContentClasses = { step1: "", step2: "", step3: "" },

                                               }: {
    headerClassName: string;
    mobileLogoTitle: string;
    stepElementClasses: { step1: string; step2: string; step3: string };
    stepContent: { step1: React.ReactNode | string; step2: React.ReactNode | string; step3: React.ReactNode | string };
    stepContentClasses: { step1: string; step2: string; step3: string };
}) {
    return (
        <header className={headerClassName}>
            <div className="flex items-center max-w-[1240px] w-full mx-auto md:py-2">
                <CheckoutLogo mobileLogoTitle={mobileLogoTitle} />
                <CheckoutStatus
                    stepElementClasses={stepElementClasses}
                    stepContent={stepContent}
                    stepContentClasses={stepContentClasses}
                />

                <div className="hidden xl:flex md:flex-0 w-[100px]" />
            </div>
        </header>
    );
}