import React, { ReactNode } from "react";

export default function CheckoutStatus({
                                           stepElementClasses,
                                           stepContent,
                                           stepContentClasses,
                                       }: {
    stepElementClasses: { step1: string; step2: string; step3: string };
    stepContent: { step1: ReactNode | string; step2: ReactNode | string; step3: ReactNode | string };
    stepContentClasses: { step1: string; step2: string; step3: string };
}) {
    return (
        <ul className="flex flex-wrap items-center justify-between flex-1 ml-[40px]">
            <li className={`checkout-status ${stepElementClasses.step1}`}>
                <button className="flex">
          <span className={`checkout-status-step ${stepContentClasses.step1}`}>
            {stepContent.step1}
          </span>
                    <span>Cart</span>
                </button>
            </li>
            <li className={`checkout-status ${stepElementClasses.step2}`}>
                <button className="flex">
          <span className={`checkout-status-step ${stepContentClasses.step2}`}>
            {stepContent.step2}
          </span>
                    <span>Payment</span>
                </button>
            </li>
            <li className={`checkout-status ${stepElementClasses.step3}`}>
                <button className="flex">
          <span className={`checkout-status-step ${stepContentClasses.step3}`}>
            {stepContent.step3}
          </span>
                    <span>Redeem your product</span>
                </button>
            </li>
        </ul>
    );
}