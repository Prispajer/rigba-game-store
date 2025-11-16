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

export default function AddToWishlist({
                                          product,
                                          position,
                                          added,
                                          deleted,
                                      }: {
    product?: ApiProductDetails;
    position: string;
    added: string;
    deleted: string;
}) {
    const { user } = useCurrentUser();
    const { isLoading, getUserWishlist } = useUserWishlist();
    const { userWishlistState } = useUserWishlist();
    const {
        handleAddUserProductToWishlist,
        handleDeleteUserProductFromWishlist,
    } = useUserWishlistActions(getUserWishlist);
    const { localStorageWishlistState } = useLocalStorageWishlist(
        "localStorageWishlist"
    );
    const {
        handleAddLocalStorageProductToWishlist,
        handleDeleteLocalStorageProductFromWishlist,
    } = useLocalStorageWishlistActions();

    const isInLocalWishlist = localStorageWishlistState && localStorageWishlistState.localStorageWishlist.some(
        (localWishlistProduct) =>
            localWishlistProduct.externalProductId === (product && product.id)
    );

    const isInUserWishlist = userWishlistState && userWishlistState.products.some(
        (userWishlistProduct) =>
            userWishlistProduct.externalProductId === (product && product.id)
    );

    const isInWishlist = user ? isInUserWishlist : isInLocalWishlist;

    const handleWishlistAction = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!product) return;

        if (user) {
            if (isInWishlist) {
                handleDeleteUserProductFromWishlist(user.email, product.id);
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
                handleDeleteLocalStorageProductFromWishlist(product.id);
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
    };

    return (
        <button
            onClick={handleWishlistAction}
            disabled={isLoading["userWishlist"]}
            className={`${position} p-[6px] md:p-[10px] border transition duration-300 cursor-pointer hover:bg-[#ffffff80] hover:border-[#ffffff] ${
                isInWishlist ? added : deleted
            }`}
        >
            <CiHeart size="30px" color="white" />
        </button>
    );
}