"use client";
import React from "react";
import Image from "next/image";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import DigitalProductDetails from "./ProductDigitalProductDetails";
import { Product } from "@/utils/helpers/types";

export default function ProductInformations({ product }: { product: Product }) {
  return (
    <>
      {product && (
        <div className="flex flex-0 py-[20px] ">
          <div className="relative min-w-[72px] lg:min-w-[150px] lg:h-[225px] xl:min-w-[200px] xl:h-[300px] xxl:min-w-[225px] xxl:min-h-[315px] ">
            <Image
              src={product.background_image ?? "/icons/logo.png"}
              layout="fill"
              alt={product.background_image}
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
                    deleted="border-[#487CBD] bg-[#487CBD]"
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
            <DigitalProductDetails display="hidden xl:flex flex-col xxl:mt-[50px]" />
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
