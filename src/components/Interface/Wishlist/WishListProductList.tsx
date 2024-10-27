"use client";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { MdOutlineSignalCellularNodata } from "react-icons/md";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import { UserWishList, LocalWishList } from "@/utils/helpers/types";
import { LocalStorageSlice } from "@/redux/slices/localStorageSlice";
import { UserWishListSlice } from "@/redux/slices/userWishListSlice";
import { ExtendedUser } from "@/auth";

export default function WishListProductList({
  user,
  localWishListState,
  userWishListState,
  redirectToGame,
}: {
  user: ExtendedUser | null;
  localWishListState: LocalStorageSlice["localWishList"];
  userWishListState: UserWishListSlice;
  redirectToGame: (
    name: string,
    callback?: (element: string) => void,
    element?: string
  ) => void;
}) {
  const displayByCondition = user
    ? userWishListState.products
    : localWishListState;

  const isUserProduct = (
    product: UserWishList | LocalWishList
  ): product is UserWishList => {
    return (product as UserWishList).productsInformations !== undefined;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-x-[10px]">
      {displayByCondition && displayByCondition.length > 0 ? (
        displayByCondition.map((game) => (
          <div
            key={
              isUserProduct(game) ? game.productsInformations.slug : game.slug
            }
            onClick={() =>
              redirectToGame(
                isUserProduct(game)
                  ? (game.productsInformations?.slug as string)
                  : (game.slug as string)
              )
            }
            className={`relative my-[10px] flex sm:flex-col bg-tertiaryColor cursor-pointer`}
          >
            <div className="relative min-w-[95px] sm:h-[250px]">
              {isUserProduct(game) ? (
                <Image
                  src={game.productsInformations.background_image}
                  layout="fill"
                  alt="game"
                />
              ) : (
                game.background_image && (
                  <Image src={game.background_image} layout="fill" alt="game" />
                )
              )}
            </div>
            <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
              <div className="flex flex-col">
                <div className="leading-none line-clamp-1 text-[#ffffff]">
                  <span className="font-bold text-[14px]">
                    {isUserProduct(game)
                      ? game.productsInformations?.name
                      : game.name}
                  </span>
                </div>
                <div>
                  <span className="pt-[5px] overflow-hidden overflow-ellipsis line-clamp-1 text-[12px] text-[#fffa84] font-bold">
                    GLOBAL
                  </span>
                </div>
              </div>
              <div className="h-[50%] md:h-[75px]">
                <div className="text-[14px] text-[#ffffff80] font-medium">
                  From
                </div>
                <div className="overflow-hidden overflow-ellipsis line-clamp-1 text-[20px] text-[#ffffff] font-bold">
                  $
                  {isUserProduct(game)
                    ? game.productsInformations?.price
                    : game.price}
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
