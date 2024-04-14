"use client";
import React from "react";
import AddToWishListGame from "../Shared/Products/AddToWishListGame";
import Image from "next/image";
import { CiShare1 } from "react-icons/ci";

export default function ProductInformations() {
  const [gameDetails, setGameDetails] = React.useState(null);

  React.useEffect(() => {
    const fetchGameDetails = async () => {
      const response = await fetch(
        "https://api.rawg.io/api/games/123?key=b3c85b14e19f4d618df8debc3d5b01b6",
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const gameId = await response.json();
      setGameDetails(gameId);
      console.log(gameId);
    };
    fetchGameDetails();
  }, []);

  return (
    <div className="flex w-full pb-[10px]">
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
          <div className="flex flex-col flex-1 pl-[15px]">
            <div className="flex w-full justify-between">
              <div className="flex-1 mb-[20px]">
                <h1 className="text-[18px] text-[#FFFFFF] font-[600]">
                  {gameDetails.name}
                </h1>
              </div>
              <div className="relative">
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
              <button className="flex items-center p-[6px] bg-[#3A83D4]">
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
  );
}
