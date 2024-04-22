"use client";
import React from "react";
import AddToWishListGame from "../Shared/Products/AddToWishListGame";
import Image from "next/image";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import { CiHeart } from "react-icons/ci";

import DigitalProductDetails from "./DigitalProductDetails";
import { CiShare1 } from "react-icons/ci";
import { IoMdDoneAll } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { FaSteam } from "react-icons/fa";

export default function ProductInformations() {
  const gameDetails = useFetchGameDataByLink(
    "https://api.rawg.io/api/games/417"
  );
  return (
    <>
      {gameDetails && (
        <div className="flex flex-0 w-full py-[20px] px-[20px]">
          <div className="relative min-w-[72px] lg:min-w-[150px] lg:h-[225px] xl:min-w-[200px] xl:h-[300px] xxl:min-w-[225px] xxl:min-h-[315px]">
            <Image
              src={gameDetails.background_image}
              layout="fill"
              alt="game-image"
            />
          </div>
          <div className="flex flex-1 flex-col pl-[15px] lg:pl-[30px] leading-[28px]">
            <div className="flex justify-between">
              <div className="pr-[20px]">
                <h1 className="text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] text-[#FFFFFF] font-[600]">
                  {gameDetails.name}
                </h1>
              </div>
              <div className="">
                <button className="p-[6px] md:p-[10px] border-[1px] transition duration-300  cursor-pointer bg-[#487CBD] hover:bg-[#ffffff80] border-[#3A83D4] hover:border-[1px] hover:border-[#ffffff]">
                  <CiHeart size="30px" color="white" />
                </button>
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
            <div className="hidden xl:flex flex-col">
              <ul className="grid grid-cols-2 xxl:grid-cols-3">
                <li className="flex items-center pb-[15px] pr-[15px] leading-[18px]">
                  <div className="w-[35px] h-[35px]">
                    <IoMdDoneAll size="35px" color="#ffffff" />
                  </div>
                  <div className="flex flex-col ml-[15px]">
                    <strong className="mb-[5px] text-[18px] text-[#ffffff]">
                      Cały świat
                    </strong>
                    <span className=" text-[#FFFFFF96] text-[14px]">
                      Może być aktywowany na całym świecie
                    </span>
                    <span className="text-buttonTextColor text-[14px]">
                      Sprawdź ograniczenia regionalne
                    </span>
                  </div>
                </li>
                <li className="flex  items-center pb-[15px] pr-[15px] leading-[18px]">
                  <div className="w-[35px] h-[35px]">
                    <FaSteam size="35px" color="#ffffff" />
                  </div>
                  <div className="flex flex-col ml-[15px]">
                    <strong className="mb-[5px] text-[18px] text-[#ffffff]">
                      Steam
                    </strong>
                    <span className="text-[#FFFFFF96] text-[14px]">
                      Może być aktywowany na platformie Steam
                    </span>
                    <span className="text-buttonTextColor text-[14px]">
                      Przewodnik do aktywacji
                    </span>
                  </div>
                </li>
                <li className="flex items-center pb-[15px] pr-[15px] leading-[18px]">
                  <div className="flex-0 w-[35px] h-[35px]">
                    <IoKeyOutline size="35px" color="#ffffff" />
                  </div>
                  <div className="flex  flex-col ml-[15px]">
                    <strong className="mb-[5px] text-[18px] text-[#ffffff]">
                      Klucz cyfrowy
                    </strong>
                    <span className="text-[#FFFFFF96] text-[14px]">
                      To jest cyfrowa wersja produktu (CD-KEY)
                    </span>
                    <span className="text-buttonTextColor text-[14px]">
                      Natychmiastowa dostawa
                    </span>
                  </div>
                </li>
              </ul>
              <div>
                <span className="text-[#FFFFFF96] text-[14px]">
                  Działa na: <span className="text-[#ffffff]">Windows</span>
                </span>
              </div>
            </div>
            <div className="lg:hidden">
              <button className="flex items-center p-[6px] bg-[#487CBD] ">
                <span className="text-[14px] text-[#FFFFFF]">Udostępnij</span>
                <span className="text-[14px] text-[#FFFFFF] ml-[6px]">
                  <CiShare1 />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
