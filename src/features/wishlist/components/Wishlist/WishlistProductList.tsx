"use client";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import AddToWishlist from "../../../../components/Interface/Shared/ReusableComponents/AddToWishlist";
import Pagination from "../../../../components/Interface/Shared/ReusableComponents/Pagination";
import { UserWishlistState } from "@/features/wishlist/redux/slices/userWishlist/userWishlist.types";
import { LocalStorageWishlistState } from "@/features/wishlist/redux/slices/localStorageWishlist/localStorageWishlist.types";
import usePagination from "@/hooks/usePagination";
import { ExtendedUser } from "@/auth";

export default function WishlistProductList({
  user,
  localStorageWishlistState,
  userWishlistState,
  redirectToGame,
  searchWistListTextState,
}: {
  user: ExtendedUser | null;
  localStorageWishlistState: LocalStorageWishlistState;
  userWishlistState: UserWishlistState;
  redirectToGame: (
    name: string,
    callback?: (element: string) => void,
    element?: string
  ) => void;
  searchWistListTextState: string;
}) {
  const currentWishlist = user
    ? userWishlistState.products
    : localStorageWishlistState.localStorageWishlist;

  const {
    pages,
    pagination,
    handleSetCurrentPage,
    handleNextPage,
    handlePreviousPage,
  } = usePagination(currentWishlist);

  const searchWishlistByText = (
    array:
      | LocalStorageWishlistState["localStorageWishlist"]
      | UserWishlistState["products"]
  ) => {
    return array.filter((product) => {
      const name =
        "productsInformations" in product
          ? product.productsInformations.name
          : product.name;

      return name
        ?.toLowerCase()
        .trim()
        .includes(searchWistListTextState.toLowerCase());
    });
  };

  const paginatedWishlistState = usePagination(
    searchWishlistByText(currentWishlist)
  ).pages[pagination.currentPage];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-x-[10px]">
        {paginatedWishlistState &&
        Array.isArray(paginatedWishlistState) &&
        paginatedWishlistState.length > 0 ? (
          paginatedWishlistState.map((game) => {
            if ("productsInformations" in game) {
              return (
                <div
                  key={game.productsInformations.slug}
                  onClick={() =>
                    redirectToGame(game.productsInformations.slug as string)
                  }
                  className={`relative flex sm:flex-col my-[10px] bg-tertiaryColor cursor-pointer`}
                >
                  <div className="relative min-w-[95px] sm:h-[250px]">
                    <Image
                      loading="eager"
                      fill={true}
                      src={
                        game.productsInformations.background_image ??
                        "/icons/logo.png"
                      }
                      alt={
                        game.productsInformations.background_image ??
                        "/icons/logo.png"
                      }
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
                  <AddToWishlist
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
                  className={`relative flex sm:flex-col my-[10px] bg-tertiaryColor cursor-pointer`}
                >
                  <div className="relative min-w-[95px] sm:h-[250px]">
                    <Image
                      loading="eager"
                      fill={true}
                      src={game.background_image ?? "/icons/logo.png"}
                      alt={game.background_image ?? "/icons/logo.png"}
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
                  <AddToWishlist
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
      {searchWishlistByText(currentWishlist).length > 10 && (
        <Pagination
          loadingState={userWishlistState.isLoading}
          currentPage={pagination.currentPage}
          pages={pages}
          handleNextPage={handleNextPage}
          handleCurrentSetPage={handleSetCurrentPage}
          handlePreviousPage={handlePreviousPage}
        />
      )}
    </>
  );
}
