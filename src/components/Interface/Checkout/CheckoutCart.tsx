"use client";

import React from "react";
import Link from "next/link";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserCart from "@/features/cart/hooks/useCart";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";

export default function CheckoutCart() {
  const { resolutionState } = useWindowVisibility();
  const { user } = useCurrentUser();
  const { userCartState } = useUserCart();
  const { localCartState } = useLocalStorage("localCart");

  const productsByRole = user ? userCartState.products : localCartState;

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
                $
                {productsByRole
                  .reduce(
                    (total: number, product) =>
                      total +
                      ("productsInformations" in product
                        ? product.productsInformations?.price
                        : product.price) *
                        (product.quantity || 1),
                    0
                  )
                  .toFixed(2)}
              </strong>
            </li>
          </ul>
          <div className="flex items-center justify-between mb-[10px]">
            <span className="font-[700] text-[18px] text-[#FFFFFF]">
              Summary:
            </span>
            <span className="font-[700] text-[24px] text-[#FFFFFF]">
              $
              {productsByRole
                .reduce(
                  (total: number, product) =>
                    total +
                    ("productsInformations" in product
                      ? product.productsInformations?.price
                      : product.price) *
                      (product.quantity || 1),
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-center items-center mb-[15px] bg-buttonBackground">
            <Link
              className="flex items-center justify-center w-full"
              href="/checkout/payment"
            >
              <button className="p-[5px] text-buttonTextColor text-[16px] font-[700] ">
                Go to the payment
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
