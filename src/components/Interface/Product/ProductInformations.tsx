"use client";
import React from "react";
import AddToWishListGame from "../Shared/Products/AddToWishListGame";
import Image from "next/image";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import { CiShare1 } from "react-icons/ci";

export default function ProductInformations() {
  const gameDetails = useFetchGameDataByLink(
    "https://api.rawg.io/api/games/17"
  );
  return (
    <section className="flex max-w-[1240px] md:mx-auto px-[20px] py-[15px] bg-primaryColor ">
      <div className="flex w-full relative ">
        {gameDetails && (
          <>
            <div className="flex relative flex-0 w-[70px]">
              <Image
                className="flex flex-0 max-w-[150px]"
                src={gameDetails.background_image}
                layout="fill"
                alt="gameImage"
              />
            </div>
            <div className="flex flex-col pl-[15px]">
              <div className="flex w-full justify-between">
                <div className="flex-1 mb-[20px]">
                  <h1 className="text-[18px] md:text-[26px] text-[#FFFFFF] font-[600]">
                    {gameDetails.name}
                  </h1>
                </div>
                <div className="">
                  <AddToWishListGame />
                </div>
              </div>
              <div className="mb-[10px]">
                <span className="text-[16px] text-buttonBackground font-[800] ">
                  {gameDetails.rating}
                </span>
                <span className="text-[14px] text-[#FFFFFF]"> z </span>
                <span className="text-[14px] text-[#FFFFFF]">
                  {gameDetails.ratings_count} ocen
                </span>
              </div>
              <div>
                <button className="flex items-center p-[6px] bg-[#487CBD] ">
                  <span className="text-[14px] text-[#FFFFFF]">Udostępnij</span>
                  <span className="text-[14px] text-[#FFFFFF] ml-[6px]">
                    <CiShare1 />
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
