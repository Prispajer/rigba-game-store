"use client";
import React from "react";
import AddToWishListGame from "../Shared/Products/AddToWishListGame";
import Image from "next/image";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import { FaCartPlus } from "react-icons/fa";

export default function ProductBuyOrAdd() {
  const gameDetails = useFetchGameDataByLink(
    "https://api.rawg.io/api/games/123"
  );

  return (
    <section className="flex max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-secondaryColor shadow-md">
      <div className="flex flex-col w-full">
        {gameDetails && (
          <>
            <div className="flex w-[70px]">
              <div>
                <span className="font-[700] text-[18px] text-[#ffffff]">
                  47,43zł
                </span>
              </div>
            </div>
            <div className="flex ">
              <div className="flex-1 pr-[20px] bg-transparent ">
                <button className="w-full min-h-[35px] bg-buttonBackground text-buttonTextColor">
                  Kup Teraz
                </button>
              </div>
              <div className="flex items-center min-h-[35px] px-[10px] bg-transparent border-[2px]">
                <FaCartPlus size="20px" color="#ffffff" />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
