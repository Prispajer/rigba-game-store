"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/utils/helpers/types";
import { IoMdDoneAll } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { FaSteam } from "react-icons/fa";
import AddToWishList from "../Shared/Products/AddToWishList";

export default function ProductInformations({ product }: { product: Product }) {
  return (
    <>
      {product && (
        <div className=" flex flex-0 w-full py-[20px] ">
          <div className="relative min-w-[72px] lg:min-w-[150px] lg:h-[225px] xl:min-w-[200px] xl:h-[300px] xxl:min-w-[225px] xxl:min-h-[315px] ">
            <Image
              src={product.background_image ?? "/icons/logo.png"}
              layout="fill"
              alt={product.image}
            />
          </div>
          <div className="flex flex-1 flex-col pl-[15px] lg:pl-[30px] leading-[28px]">
            <div className="flex justify-between">
              <div className="pr-[20px]">
                <h1 className="text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] text-[#FFFFFF] font-[600]">
                  {product.name}
                </h1>
              </div>
              <div className="relative">
                <button className="p-[6px] md:p-[10px] transition duration-300 cursor-pointer ">
                  <AddToWishList
                    game={product}
                    position="absolute top-0 right-0"
                    added="border-[#FFFA84] bg-[#FFFA84]"
                  />
                </button>
              </div>
            </div>
            <div className="mb-[10px]">
              <span className="text-[16px] text-buttonBackground font-[800] ">
                {product.rating}
              </span>
              <span className="text-[14px] text-[#FFFFFF]"> z </span>
              <span className="text-[14px] text-[#FFFFFF]">
                {product.ratings_count} ocen
              </span>
            </div>
            <div className="hidden xl:flex flex-col xxl:mt-[50px]">
              <ul className="grid w-[100%] grid-cols-auto-fit pb-[15px] gap-y-[16px] gap-x-[24px] border-b-[1px] border-[#1c4c74]">
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
                <span className="text-[14px] text-[#FFFFFF] ml-[6px]"></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
