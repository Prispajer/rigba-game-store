"use client";

import React from "react";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function CheckoutSummary() {
  const { resolutionState } = useWindowVisibility();

  return (
    <div
      className={`w-full bg-primaryColor md:bg-secondaryColor ${
        resolutionState ? "flex" : "fixed bottom-0 left-0 z-[1]"
      }`}
    >
      <div className="flex flex-col w-full py-[15px] px-[30px] md:px-[10px]">
        <div className="mb-[15px]">
          <h2 className="font-[700] text-[18px] text-[#FFFFFF]">
            Podsumowanie
          </h2>
        </div>
        <ul className="flex flex-col mb-[20px]">
          <li className="flex justify-between gap-x-[10px]">
            <span className="text-[#ffffffb3] text-[14px]">2 produkty</span>
            <strong className="text-[14px] text-[#FFFFFF]">71,11zł</strong>
          </li>
        </ul>
        <div className="flex justify-between mb-[10px]">
          <span className="font-[700] text-[18px] text-[#FFFFFF]">
            Łącznie:
          </span>
          <span className="font-[700] text-[24px] text-[#FFFFFF]">71,11zł</span>
        </div>
        <div className="flex justify-center items-center mb-[15px] bg-buttonBackground">
          <button className="p-[5px] text-buttonTextColor text-[16px] font-[700] ">
            Przejdź do płatności
          </button>
        </div>
      </div>
    </div>
  );
}
