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
  isCartLoading,
  handleAddUserProductToCart,
  handleAddLocalProductToCart,
  redirectToCheckout,
}: {
  product: GameAPIProduct;
  user: User | null;
  isCartLoading: boolean;
  handleAddUserProductToCart: (product: AddUserProductToCartDTO) => void;
  handleAddLocalProductToCart: (product: LocalCartProductDTO) => void;
  redirectToCheckout: () => void;
}) {
  const handleAddProduct = () => {
    if (user) {
      handleAddUserProductToCart({
        ...product,
        email: user.email as string,
        externalProductId: product.id,
        description: product.description_raw as string,
        rating: product.rating as number,
        released: product.released as string,
        added: product.added as number,
        price: generateRandomValue(),
        quantity: null,
      });
    } else {
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
      });
    }
  };

  return (
    <div className="flex flex-col sm:mx-[20px] my-[20px] py-[15px] px-[20px] bg-[#387CBD] shadow-md">
      <div className="max-w-[350px]">
        <div className="flex w-[70px]">
          <div className="flex min-w-[200px] mb-[10px]">
            <span className="w-full font-[700] text-[18px] text-[#ffffff]">
              {`$${generateRandomValue()}`}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-[20px] bg-transparent">
            <button
              onClick={() => {
                handleAddProduct();
                redirectToCheckout();
              }}
              className="w-full min-h-[35px] bg-buttonBackground text-buttonTextColor"
            >
              Buy now
            </button>
          </div>
          <button
            className="flex items-center min-h-[35px] px-[10px] bg-transparent border-[2px] cursor-pointer"
            disabled={isCartLoading}
            onClick={handleAddProduct}
          >
            <FaCartPlus size="20px" color="#ffffff" />
          </button>
        </div>
      </div>
    </div>
  );
}
