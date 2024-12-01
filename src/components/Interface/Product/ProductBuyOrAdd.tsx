"use client";

import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { generateRandomValue } from "@/utils/prices";
import { GameAPIProduct } from "@/utils/helpers/types";
import { User } from "next-auth";
import {
  LocalCartProductDTO,
  AddUserProductToCartDTO,
} from "@/utils/helpers/frontendDTO";

export default function ProductBuyOrAdd({
  product,
  user,
  handleAddUserProductToCart,
  handleAddLocalProductToCart,
}: {
  product: GameAPIProduct;
  user: User | null;
  handleAddUserProductToCart: (product: AddUserProductToCartDTO) => void;
  handleAddLocalProductToCart: (product: LocalCartProductDTO) => void;
}) {
  return (
    <>
      <div className="flex flex-col sm:mx-[20px] my-[20px] py-[15px] px-[20px] bg-[#387CBD] shadow-md">
        <div className="max-w-[350px]">
          <div className="flex w-[70px]">
            <div className="absolute top-[100px]"></div>
            <div className="flex min-w-[200px] mb-[10px]">
              <span className="w-full font-[700] text-[18px] text-[#ffffff]">
                {`$${generateRandomValue()}`}
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 pr-[20px] bg-transparent">
              <button className="w-full min-h-[35px] bg-buttonBackground text-buttonTextColor">
                Buy now
              </button>
            </div>
            <div
              className="flex items-center min-h-[35px] px-[10px] bg-transparent border-[2px] cursor-pointer"
              onClick={
                user
                  ? () =>
                      handleAddUserProductToCart({
                        ...product,
                        email: user.email as string,
                        externalProductId: product.id,
                        description: product.description_raw as string,
                        rating: product.rating as number,
                        released: product.released as string,
                        added: product.added as number,
                        price: generateRandomValue(),
                      })
                  : () =>
                      handleAddLocalProductToCart({
                        externalProductId: product.id,
                        description: product.description_raw,
                        price: generateRandomValue(),
                        quantity: 1,
                        name: product.name,
                        background_image: product.background_image,
                        rating: product.rating,
                        released: product.released,
                        slug: product.slug,
                        added: product.added,
                      })
              }
            >
              <FaCartPlus size="20px" color="#ffffff" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center"></div>
      </div>
    </>
  );
}
