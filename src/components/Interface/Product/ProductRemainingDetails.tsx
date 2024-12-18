"use client";
import { GameAPIResponse } from "@/utils/helpers/types";
import React from "react";

export default function ProductRemainingDetails({
  product,
}: {
  product: GameAPIResponse;
}) {
  const getProductPublisher = () => {
    const publisher = product.publishers.find((publisher) => publisher);
    return publisher ?? { name: "No data available" };
  };

  return (
    <section className="flex flex-col z max-w-[1240px] md:mx-auto pb-[15px] mx-[-20px] px-[20px] pt-4 bg-secondaryColor">
      <ul className="flex flex-col gap-y-[8px] cursor-default">
        <li className="flex sm:flex-row flex-col leading-[18px]">
          <div className="text-[15px] text-[#C3DAC9] flex-shrink-0 sm:w-[100px] sm:pr-[20px]">
            Released at
          </div>
          <div className="text-[15px] text-[#DCD8E6] flex-1">
            {product.released ?? "No data available"}
          </div>
        </li>
        <li className="flex sm:flex-row flex-col leading-[18px]">
          <div className="text-[15px] text-[#C3DAC9] flex-shrink-0 sm:w-[100px] sm:pr-[20px]">
            Publisher
          </div>
          <div className="text-[15px] text-[#DCD8E6] flex-1">
            {getProductPublisher().name}
          </div>
        </li>
        <li className="flex sm:flex-row flex-col leading-[18px]">
          <div className="text-[15px] text-[#C3DAC9] flex-shrink-0 sm:w-[100px] sm:pr-[20px]">
            Developers
          </div>
          <div className="text-[15px] text-[#DCD8E6] flex-1">
            {product.developers.length > 0
              ? product.developers.map((developer) => developer.name).join(", ")
              : "No data available"}
          </div>
        </li>
        <li className="flex sm:flex-row flex-col leading-[18px]">
          <div className="text-[15px] text-[#C3DAC9] flex-shrink-0 sm:w-[100px] sm:pr-[20px]">
            Playtime
          </div>
          <div className="text-[15px] text-[#DCD8E6] flex-1">
            {product.playtime ?? "No data available"} hours
          </div>
        </li>
      </ul>
    </section>
  );
}
