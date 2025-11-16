"use client";

import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import AddToWishlist from "../../../../components/Interface/Shared/ReusableComponents/AddToWishlist";
import Pagination from "../../../../components/Interface/Shared/ReusableComponents/Pagination";
import { UserWishlistState } from "@/features/wishlist/redux/slices/userWishlist/userWishlist.types";
import { LocalStorageWishlistState } from "@/features/wishlist/redux/slices/localStorageWishlist/localStorageWishlist.types";
import usePagination from "@/hooks/usePagination";
import useCustomRouter from "@/hooks/useCustomRouter";
import { ExtendedUser } from "@/auth";
import LocalStorageWishlistItem from "@/features/wishlist/types/localStorageWishlist/localStorageWishlistItem";
import UserWishlistItem from "@/features/wishlist/types/userWishlist/userWishlistItem";

export default function WishlistProductList({
                                                user,
                                                localStorageWishlistState,
                                                userWishlistState,
                                                searchWistListTextState,
                                            }: {
    user: ExtendedUser | null;
    localStorageWishlistState: LocalStorageWishlistState;
    userWishlistState: UserWishlistState;
    searchWistListTextState: string;
}) {
    const currentWishlist = user
        ? userWishlistState.products
        : localStorageWishlistState.localStorageWishlist;

    const searchWishlistByText = (
        array: LocalStorageWishlistState["localStorageWishlist"] | UserWishlistState["products"]
    ) => {
        return array.filter((product) => {
            const name =
                "productsInformations" in product
                    ? product.productsInformations.name
                    : product.name;

            return name?.toLowerCase().trim().includes(searchWistListTextState.toLowerCase());
        });
    };

    const filteredWishlist = searchWishlistByText(currentWishlist);

    const {
        paginatedPages,
        currentPageState,
        handleSetCurrentPage,
        handleNextPage,
        handlePreviousPage,
    } = usePagination<LocalStorageWishlistItem | UserWishlistItem>(filteredWishlist);

    const { redirectToProduct } = useCustomRouter();


    const paginatedWishlistState = paginatedPages[currentPageState];

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-x-[10px]">
                {paginatedWishlistState &&
                Array.isArray(paginatedWishlistState) &&
                paginatedWishlistState.length > 0 ? (
                    paginatedWishlistState.map((wishlistItem) => {
                        if ("productsInformations" in wishlistItem) {
                            return (
                                <div
                                    key={wishlistItem.productsInformations.slug}
                                    onClick={() =>
                                        redirectToProduct(wishlistItem.productsInformations.slug as string)
                                    }
                                    className="relative flex sm:flex-col my-[10px] bg-tertiaryColor cursor-pointer"
                                >
                                    <div className="relative min-w-[95px] sm:h-[250px]">
                                        <Image
                                            loading="eager"
                                            fill
                                            src={wishlistItem.productsInformations.background_image ?? "/icons/logo.png"}
                                            alt={wishlistItem.productsInformations.background_image ?? "/icons/logo.png"}
                                        />
                                    </div>
                                    <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                                        <div className="flex flex-col">
                      <span className="font-bold text-[14px] text-white line-clamp-1">
                        {wishlistItem.productsInformations.name}
                      </span>
                                            <span className="pt-[5px] text-[12px] text-[#fffa84] font-bold line-clamp-1">
                        GLOBAL
                      </span>
                                        </div>
                                        <div className="h-[50%] md:h-[75px]">
                                            <div className="text-[14px] text-[#ffffff80] font-medium">From</div>
                                            <div className="text-[20px] text-white font-bold line-clamp-1">
                                                ${wishlistItem.productsInformations.price}
                                            </div>
                                            <div className="flex items-center">
                                                <CiHeart className="ml-[-3px] mr-[3px]" size="20px" />
                                                <span className="text-[14px] text-[#ffffff80] line-clamp-1">
                          {wishlistItem.productsInformations.rating}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <AddToWishlist
                                        wishlistItem={wishlistItem}
                                        position="absolute right-[10px] top-0"
                                        added="border-[#FFFA84] bg-[#FFFA84]"
                                        deleted="bg-[##d3d3d3]"
                                    />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={wishlistItem.slug}
                                    onClick={() => redirectToProduct(wishlistItem.slug as string)}
                                    className="relative flex sm:flex-col my-[10px] bg-tertiaryColor cursor-pointer"
                                >
                                    <div className="relative min-w-[95px] sm:h-[250px]">
                                        <Image
                                            loading="eager"
                                            fill
                                            src={wishlistItem.background_image ?? "/icons/logo.png"}
                                            alt={wishlistItem.background_image ?? "/icons/logo.png"}
                                        />
                                    </div>
                                    <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                                        <div className="flex flex-col">
                      <span className="font-bold text-[14px] text-white line-clamp-1">
                        {wishlistItem.name}
                      </span>
                                            <span className="pt-[5px] text-[12px] text-[#fffa84] font-bold line-clamp-1">
                        GLOBAL
                      </span>
                                        </div>
                                        <div className="h-[50%] md:h-[75px]">
                                            <div className="text-[14px] text-[#ffffff80] font-medium">From</div>
                                            <div className="text-[20px] text-white font-bold line-clamp-1">
                                                ${wishlistItem.price}
                                            </div>
                                            <div className="flex items-center">
                                                <CiHeart className="ml-[-3px] mr-[3px]" size="20px" />
                                                <span className="text-[14px] text-[#ffffff80] line-clamp-1">
                          {wishlistItem.rating}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <AddToWishlist
                                        wishlistItem={wishlistItem}
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
                        No products found.
                    </div>
                )}
            </div>

            {filteredWishlist.length > 10 && (
                <Pagination
                    loadingState={userWishlistState.isLoading}
                    currentPage={currentPageState}
                    pages={paginatedPages}
                    handleNextPage={handleNextPage}
                    handleCurrentSetPage={handleSetCurrentPage}
                    handlePreviousPage={handlePreviousPage}
                />
            )}
        </>
    );
}