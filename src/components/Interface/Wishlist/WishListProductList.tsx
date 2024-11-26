"use client";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import Pagination from "../Shared/ReusableComponents/Pagination";
import { LocalStorageState } from "@/redux/slices/localStorageSlice";
import { UserWishListState } from "@/redux/slices/userWishListSlice";
import usePagination from "@/hooks/usePagination";
import { ExtendedUser } from "@/auth";

export default function WishListProductList({
  user,
  localWishListState,
  userWishListState,
  redirectToGame,
  searchWistListTextState,
}: {
  user: ExtendedUser | null;
  localWishListState: LocalStorageState["localWishList"];
  userWishListState: UserWishListState;
  redirectToGame: (
    name: string,
    callback?: (element: string) => void,
    element?: string
  ) => void;
  searchWistListTextState: string;
}) {
  const displayByCondition = user
    ? userWishListState.products
    : localWishListState;

  const {
    pages,
    paginationState,
    handleSetCurrentPage,
    handleNextPage,
    handlePreviousPage,
  } = usePagination(displayByCondition);

  const searchWishListByText = (
    wishListState:
      | LocalStorageState["localWishList"]
      | UserWishListState["products"]
  ): any => {
    if ("productsInformations" in wishListState) {
      return userWishListState.products.filter((product) => {
        return product.productsInformations.name
          ?.toLowerCase()
          .trim()
          .includes(searchWistListTextState);
      });
    } else {
      return localWishListState.filter((product) => {
        return product.name
          ?.toLowerCase()
          .trim()
          .includes(searchWistListTextState);
      });
    }
  };

  const filteredProducts = searchWishListByText(displayByCondition);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-x-[10px]">
        {filteredProducts && filteredProducts.length > 0 ? (
          pages &&
          pages[paginationState.currentPage].map((game) => {
            if ("productsInformations" in game) {
              return (
                <div
                  key={game.productsInformations.slug}
                  onClick={() =>
                    redirectToGame(game.productsInformations.slug as string)
                  }
                  className={`relative my-[10px] flex sm:flex-col bg-tertiaryColor cursor-pointer`}
                >
                  <div className="relative min-w-[95px] sm:h-[250px]">
                    <Image
                      src={
                        game.productsInformations.background_image ??
                        "/icons/logo.png"
                      }
                      layout="fill"
                      alt="game"
                    />
                  </div>
                  <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                    <div className="flex flex-col">
                      <div className="leading-none line-clamp-1 text-[#ffffff]">
                        <span className="font-bold text-[14px]">
                          {game.productsInformations.name}
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
                        ${game.productsInformations.price}
                      </div>
                      <div className="flex items-center">
                        <CiHeart className="ml-[-3px] mr-[3px]" size="20px" />
                        <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[14px] text-[#ffffff80]">
                          {game.productsInformations.rating}
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
              );
            } else {
              return (
                <div
                  key={game.slug}
                  onClick={() => redirectToGame(game.slug as string)}
                  className={`relative my-[10px] flex sm:flex-col bg-tertiaryColor cursor-pointer`}
                >
                  <div className="relative min-w-[95px] sm:h-[250px]">
                    <Image
                      src={game.background_image ?? "/icons/logo.png"}
                      layout="fill"
                      alt="game"
                    />
                  </div>
                  <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                    <div className="flex flex-col">
                      <div className="leading-none line-clamp-1 text-[#ffffff]">
                        <span className="font-bold text-[14px]">
                          {game.name}
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
                        ${game.price}
                      </div>
                      <div className="flex items-center">
                        <CiHeart className="ml-[-3px] mr-[3px]" size="20px" />
                        <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[14px] text-[#ffffff80]">
                          {game.rating}
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
              );
            }
          })
        ) : (
          <div className="col-span-full text-center text-white">
            No games found.
          </div>
        )}
      </div>
      {displayByCondition.length >= 11 && (
        <Pagination
          loadingState={userWishListState.isLoading}
          currentPage={paginationState.currentPage}
          pages={pages}
          handleNextPage={handleNextPage}
          handleCurrentSetPage={handleSetCurrentPage}
          handlePreviousPage={handlePreviousPage}
        />
      )}
    </>
  );
}
