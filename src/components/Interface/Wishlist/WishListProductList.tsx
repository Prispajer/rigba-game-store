"use client";
import React from "react";
import Image from "next/image";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import useCustomRouter from "@/hooks/useCustomRouter";
import { CiHeart } from "react-icons/ci";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserWishList from "@/hooks/useUserWishList";
import { UserWishList, Product } from "@/utils/helpers/types";

export default function WishListProductList() {
  const { user } = useCurrentUser();
  const { userWishListState } = useUserWishList();
  const { localWishListState } = useLocalStorage("localWishList");
  const { redirectToGame } = useCustomRouter();

  const displayByCondition: UserWishList[] | Product[] = user
    ? userWishListState.products
    : localWishListState;

  const isUserProduct = (
    product: UserWishList | Product
  ): product is UserWishList => {
    return (product as UserWishList).productsInformations.slug !== undefined;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-product-list-auto-fit gap-x-[10px]">
      {displayByCondition && displayByCondition.length > 0 ? (
        displayByCondition.map((game) => (
          <div
            key={game.externalProductId}
            onClick={() =>
              redirectToGame(
                isUserProduct(game)
                  ? (game.productsInformations?.slug as string)
                  : (game.slug as string)
              )
            }
            className={`relative my-[10px] flex sm:flex-col bg-tertiaryColor 
             cursor-pointer`}
          >
            <div className="relative min-w-[95px] sm:h-[250px]">
              <Image
                src={
                  isUserProduct(game)
                    ? (game.productsInformations?.background_image as string)
                    : (game.background_image as string)
                }
                layout="fill"
                alt="game"
              />
            </div>
            <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
              <div className="flex flex-col justify-between min-h-[60px]">
                <div className="leading-none line-clamp-1 text-[#ffffff]">
                  <span className="font-bold text-[14px]">
                    {isUserProduct(game)
                      ? game.productsInformations?.name
                      : game.name}
                  </span>
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
                  {isUserProduct(game)
                    ? game.productsInformations?.price
                    : game.price}{" "}
                  zł
                </div>
                <div className="flex items-center">
                  <CiHeart className="ml-[-3px] mr-[3px]" size="20px" />
                  <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[14px] text-[#ffffff80]">
                    {isUserProduct(game)
                      ? game.productsInformations?.rating
                      : game.rating}
                  </span>
                </div>
              </div>
            </div>
            <AddToWishList
              game={game}
              position="absolute right-[10px] top-0"
              added="border-[#FFFA84] bg-[#FFFA84]"
              deleted="bg-[##d3d3d3]"
            />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-white">
          No games found.
        </div>
      )}
    </div>
  );
}
