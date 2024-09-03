"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { StripePaymentElement } from "@stripe/stripe-js";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserCart from "@/hooks/useUserCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCustomRouter from "@/hooks/useCustomRouter";
import CheckoutContainer from "./CheckoutContainer";

export default function CheckoutSummary() {
  const { resolutionState } = useWindowVisibility();
  const { user } = useCurrentUser();
  const { userCartState } = useUserCart();
  const { localCartState } = useLocalStorage("localCart");

  const productsByRole = user ? userCartState.products : localCartState;

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: productsByRole,
        }),
      });
      if (response) {
        return response.json();
      }
    } catch (error: any) {
      console.error(error.error);
    }
  };

  return (
    <>
      <div
        className={`w-full h-min bg-primaryColor md:bg-secondaryColor ${
          resolutionState ? "sticky" : "fixed bottom-0 left-0 z-[1]"
        }`}
      >
        <div className="flex flex-col w-full py-[20px] px-[30px]">
          <div className="mb-[15px]">
            <h2 className="font-[700] text-[18px] text-[#FFFFFF]">Summary</h2>
          </div>
          <ul className="flex flex-col mb-[20px]">
            <li className="flex justify-between gap-x-[10px]">
              <span className="text-[#ffffffb3] text-[14px]">
                {productsByRole.reduce(
                  (total: number, product) => total + (product.quantity || 1),
                  0
                )}{" "}
                {"products"}
              </span>
              <strong className="text-[14px] text-[#FFFFFF]">
                {" "}
                {productsByRole
                  .reduce(
                    (total: number, product) =>
                      total +
                      (product.productsInformations?.price || product.price) *
                        (product.quantity || 1),
                    0
                  )
                  .toFixed(2)}{" "}
                zł
              </strong>
            </li>
          </ul>
          <div className="flex items-center justify-between mb-[10px]">
            <span className="font-[700] text-[18px] text-[#FFFFFF]">
              Summary:
            </span>
            <span className="font-[700] text-[24px] text-[#FFFFFF]">
              {productsByRole
                .reduce(
                  (total: number, product) =>
                    total +
                    (product.productsInformations?.price || product.price) *
                      (product.quantity || 1),
                  0
                )
                .toFixed(2)}{" "}
              zł
            </span>
          </div>
          <div className="flex justify-center items-center mb-[15px] bg-buttonBackground">
            <button
              onClick={() => handleCheckout}
              className="p-[5px] text-buttonTextColor text-[16px] font-[700] "
            >
              Go to the payment
            </button>
          </div>
        </div>
      </div>
      <div>
        <CheckoutContainer />
      </div>
    </>
  );
}
