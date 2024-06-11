"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import generateRandomValue from "@/utils/classes/prices";
import AddToWishList from "./AddToWishList";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";

export type Game = {
  id: number;
  background_image: string;
  name: string;
  rating: number;
};

export default function ProductInformations() {
  const games = useFetchGameDataByLink("https://api.rawg.io/api/games");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 xxl:grid-cols-5 w-full gap-x-[10px]">
      {games?.results &&
        games?.results.map((game: Game) => (
          <div
            key={game.id}
            className="relative max-h-[150px] sm:max-h-full my-[10px]"
          >
            <Link
              className="flex flex-row sm:flex-col  bg-tertiaryColor"
              href="/"
            >
              <div className="relative min-w-[75px] ty:min-w-[95px] h-[150px] sm:h-[250px]">
                <Image
                  className="p-1"
                  src={game.background_image}
                  layout="fill"
                  alt="game"
                />
              </div>
              <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                <div className="flex flex-col justify-between h-[50%] md:h-[70px]">
                  <div className="leading-none overflow-hidden overflow-ellipsis line-clamp-2 text-[#ffffff]">
                    <span className="font-bold text-[14px]">{game.name}</span>
                  </div>
                  <div>
                    <span className=" overflow-hidden overflow-ellipsis line-clamp-1 text-[12px] text-[#fffa84] font-bold ">
                      CAŁY ŚWIAT
                    </span>
                  </div>
                </div>
                <div className="h-[50%] md:h-[75px]">
                  <div className="text-[14px] text-[#ffffff80] font-medium ">
                    Od
                  </div>
                  <div className="overflow-hidden overflow-ellipsis line-clamp-1 text-[20px] text-[#ffffff] font-bold">
                    {generateRandomValue()}
                  </div>
                  <div className="flex items-center">
                    <CiHeart
                      className="ml-[-3px] mr-[3px]"
                      size="20px"
                      color="#ffffff80"
                    />
                    <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[14px] text-[#ffffff80]">
                      {game.rating}
                    </span>
                  </div>
                </div>
              </div>
              <AddToWishList />
            </Link>
          </div>
        ))}
    </div>
  );
}
