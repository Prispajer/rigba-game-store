"use client";

import React from "react";
import { FaCartPlus } from "react-icons/fa";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserCart from "@/hooks/useUserCart";
import { generateRandomValue } from "@/utils/prices";
import { Product } from "@/utils/helpers/types";

export default function ProductBuyOrAdd({ product }: { product: Product }) {
  const { handleAddUserProductToCart } = useUserCart();
  const { handleAddLocalProductToCart } = useLocalStorage("localCart");
  const { user } = useCurrentUser();

  return (
    <>
      <div className="flex flex-col sm:mx-[20px] my-[20px] py-[15px] px-[20px] bg-[#387CBD] shadow-md">
        <div className="max-w-[350px]">
          <div className="flex w-[70px]">
            <div className="absolute top-[100px]"></div>
            <div className="flex min-w-[200px] mb-[10px]">
              <span className="w-full font-[700] text-[18px] text-[#ffffff]">
                {`${generateRandomValue()} zł`}
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 pr-[20px] bg-transparent">
              <button className="w-full min-h-[35px] bg-buttonBackground text-buttonTextColor">
                Kup Teraz
              </button>
            </div>
            <div
              className="flex items-center min-h-[35px] px-[10px] bg-transparent border-[2px] cursor-pointer"
              onClick={
                user
                  ? () =>
                      handleAddUserProductToCart(
                        product.id as string,
                        product?.name,
                        product?.description_raw as string,
                        product?.background_image,
                        product?.rating as number,
                        product?.slug as string,
                        product?.released as string,
                        product?.added as number
                      )
                  : () =>
                      handleAddLocalProductToCart({
                        externalProductId: product.id,
                        name: product.name,
                        description: product.description_raw,
                        price: generateRandomValue(),
                        background_image: product.background_image,
                        rating: product?.rating,
                        slug: product?.slug,
                        released: product?.released,
                        added: product?.added,
                        quantity: 1,
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
