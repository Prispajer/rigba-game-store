import React from "react";

export default function CheckoutStatus({
                                           steps,
                                       }: {
    steps: {
        label: string;
        index: number;
        stepNumber: React.ReactNode | string;
        elementClass: string;
        contentClass: string;
        activeStep: string;
    }[];
}) {
    return (
        <ul className="flex flex-wrap items-center justify-between flex-1 ml-[40px]">
            {steps.map((step) => (
                <li
                    key={step.label}
                    className={`checkout-status ${step.elementClass} ${step.activeStep}`}
                >
                    <button className="flex">
            <span className={`checkout-status-step ${step.contentClass}`}>
              {step.stepNumber}
            </span>
                        <span>{step.label}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}