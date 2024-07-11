import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import generateRandomValue from "@/utils/prices";
import AddToWishList from "../Shared/Products/AddToWishList";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function FilterProductList({
  handleClickGame,
}: {
  handleClickGame: (gameId: string) => void;
}) {
  const { gamesFilterState } = useFetchGameData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 w-full gap-x-[10px]">
      {gamesFilterState.gamesWithFilters &&
      gamesFilterState.gamesWithFilters.length > 0 ? (
        gamesFilterState.gamesWithFilters.map((game) => (
          <div
            key={game.slug}
            onClick={() => handleClickGame(game.slug as string)}
            className="relative h-full my-[10px]"
          >
            <Link
              className="flex flex-row sm:flex-col bg-tertiaryColor"
              href="/"
            >
              <div className="relative min-w-[95px] sm:h-[250px]">
                <Image
                  className=""
                  src={game.background_image}
                  layout="fill"
                  alt="game"
                />
              </div>
              <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                <div className="flex flex-col justify-between min-h-[60px]">
                  <div className="leading-none  line-clamp-1 text-[#ffffff]">
                    <span className="font-bold text-[14px]">{game.name}</span>
                  </div>
                  <div>
                    <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[12px] text-[#fffa84] font-bold">
                      CAŁY ŚWIAT
                    </span>
                  </div>
                </div>
                <div className="h-[50%] md:h-[75px]">
                  <div className="text-[14px] text-[#ffffff80] font-medium">
                    Od
                  </div>
                  <div className="overflow-hidden overflow-ellipsis line-clamp-1 text-[20px] text-[#ffffff] font-bold">
                    {generateRandomValue()} zł
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
        ))
      ) : (
        <div className="text-center text-white">Loading...</div>
      )}
    </div>
  );
}
