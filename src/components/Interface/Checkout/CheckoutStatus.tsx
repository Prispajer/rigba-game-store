import React, { ReactNode } from "react";

export default function CheckoutStatus({
  stepOneElementStyles,
  stepTwoElementStyles,
  stepThreeElementStyles,
  stepOneContent,
  stepTwoContent,
  stepThreeContent,
  stepOneContentStyles,
  stepTwoContentStyles,
  stepThreeContentStyles,
}: {
  stepOneElementStyles: string;
  stepTwoElementStyles: string;
  stepThreeElementStyles: string;
  stepOneContent: ReactNode | string;
  stepTwoContent: ReactNode | string;
  stepThreeContent: ReactNode | string;
  stepOneContentStyles: string;
  stepTwoContentStyles: string;
  stepThreeContentStyles: string;
}) {
  return (
    <ul className="flex flex-wrap items-center justify-between flex-1 ml-[40px]">
      <li className={`checkout-status ${stepOneElementStyles}`}>
        <button className="flex">
          <span className={`checkout-status-step ${stepOneContentStyles}`}>
            {stepOneContent}
          </span>
          <span>Cart</span>
        </button>
      </li>
      <li className={`checkout-status ${stepTwoElementStyles}`}>
        <button className="flex">
          <span className={`checkout-status-step ${stepTwoContentStyles}`}>
            {stepTwoContent}
          </span>
          <span>Payment</span>
        </button>
      </li>
      <li className={`checkout-status ${stepThreeElementStyles}`}>
        <button className="flex">
          <span className={`checkout-status-step ${stepThreeContentStyles}`}>
            {stepThreeContent}
          </span>
          <span>Redeem your product</span>
        </button>
      </li>
    </ul>
  );
}
