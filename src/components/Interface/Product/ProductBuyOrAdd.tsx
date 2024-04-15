"use client";
import React from "react";
import AddToWishListGame from "../Shared/Products/AddToWishListGame";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";

export default function ProductBuyOrAdd() {
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
    <div className="flex flex-col w-full ">
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
  );
}
