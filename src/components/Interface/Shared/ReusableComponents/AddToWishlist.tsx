"use client";

import React from "react";
import { CiHeart } from "react-icons/ci";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useUserWishlist from "@/features/wishlist/hooks/userWishlist/useUserWishlist";
import { generateRandomPrice } from "@/features/products/utils/prices";
import useUserWishlistActions from "@/features/wishlist/hooks/userWishlist/useUserWishlistActions";
import useLocalStorageWishlistActions from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlistActions";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";
import useLocalStorageWishlist from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlist";
import LocalStorageWishlistItem from "@/features/wishlist/types/localStorageWishlist/localStorageWishlistItem";
import UserWishlistItem from "@/features/wishlist/types/userWishlist/userWishlistItem";

export default function AddToWishlist({
                                          product,
                                          wishlistItem,
                                          position,
                                          added,
                                          deleted,
                                      }: {
    product?: ApiProductDetails;
    wishlistItem?:  LocalStorageWishlistItem |  UserWishlistItem
    position: string;
    added: string;
    deleted: string;
}) {
    const { user } = useCurrentUser();
    const { isLoading, getUserWishlist, userWishlistState } = useUserWishlist();
    const { handleAddUserProductToWishlist, handleDeleteUserProductFromWishlist } =
        useUserWishlistActions(getUserWishlist);

    const { localStorageWishlistState } = useLocalStorageWishlist("localStorageWishlist");
    const {
        handleAddLocalStorageProductToWishlist,
        handleDeleteLocalStorageProductFromWishlist,
    } = useLocalStorageWishlistActions();

    const targetId = wishlistItem?.externalProductId ?? product?.id;

    const isInLocalWishlist = localStorageWishlistState?.localStorageWishlist.some(
        (item) => item.externalProductId === targetId
    );

    const isInUserWishlist = userWishlistState?.products.some(
        (item) => item.externalProductId === targetId
    );

    const isInWishlist = user ? isInUserWishlist : isInLocalWishlist;

    const toggleWishlist = () => {
        if (product) {
            if (user) {
                if (isInWishlist) {
                    handleDeleteUserProductFromWishlist(user.email, targetId!);
                } else {
                    handleAddUserProductToWishlist({
                        email: user.email,
                        externalProductId: product.id,
                        name: product.name,
                        description: product.description_raw,
                        background_image: product.background_image,
                        price: generateRandomPrice(),
                        rating: product.rating,
                        slug: product.slug,
                        released: product.released,
                        added: product.added,
                    });
                }
            } else {
                if (isInWishlist) {
                    handleDeleteLocalStorageProductFromWishlist(targetId!);
                } else {
                    handleAddLocalStorageProductToWishlist({
                        externalProductId: product.id,
                        name: product.name,
                        price: generateRandomPrice(),
                        background_image: product.background_image,
                        rating: product.rating,
                        slug: product.slug,
                        released: product.released,
                        added: product.added,
                    });
                }
            }
        }

        if (!product && wishlistItem) {
            if (user) {
                handleDeleteUserProductFromWishlist(user!.email, wishlistItem.externalProductId);
            } else {
                handleDeleteLocalStorageProductFromWishlist(wishlistItem.externalProductId);
            }
        }
    };

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                toggleWishlist();
            }}
            disabled={isLoading["userWishlist"]}
            className={`${position} p-[6px] md:p-[10px] border transition duration-300 cursor-pointer hover:bg-[#ffffff80] hover:border-[#ffffff] ${
                isInWishlist ? added : deleted
            }`}
        >
            <CiHeart size="30px" color="white" />
        </button>
    );
}