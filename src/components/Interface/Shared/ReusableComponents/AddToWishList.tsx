"use client";
import React from "react";
import { CiHeart } from "react-icons/ci";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useUserWishList from "@/features/wishlist/hooks/useUserWishList";
import { generateRandomPrice } from "@/utils/prices";
import { ProductInformations } from "@/types/types";

export default function AddToWishList<
  T extends {
    id: string | number;
    externalProductId: number;
    name: string;
    description: string;
    description_raw: string;
    background_image: string;
    price: number;
    rating: number;
    slug: string;
    released: string;
    added: number;
    cartId: string | null;
    userId: string | null;
    quantity: number | null;
    wishListId: string | null;
    productsInformations: ProductInformations;
  }
>({
  game,
  position,
  added,
  deleted,
}: {
  game: Partial<T>;
  position: string;
  added: string;
  deleted: string;
}) {
  const { user } = useCurrentUser();
  const {
    userWishListState,
    isLoading,
    handleAddUserProductToWishList,
    handleDeleteUserProductFromWishList,
  } = useUserWishList();

  const {
    localWishListState,
    handleAddLocalProductToWishList,
    handleDeleteLocalProductFromWishList,
  } = useLocalStorage("localWishList");

  const isInLocalWishList = localWishListState.some(
    (product) =>
      product.externalProductId === game?.id || game?.externalProductId
  );

  const isInUserWishList = userWishListState.products.some(
    (product) =>
      product.externalProductId === game?.id || game?.externalProductId
  );

  const isInWishList = user ? isInUserWishList : isInLocalWishList;

  const handleWishListAction = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (user) {
      if (isInWishList) {
        handleDeleteUserProductFromWishList({
          externalProductId:
            (game.externalProductId as number) || (game.id as number),
          email: user.email as string,
        });
      } else {
        handleAddUserProductToWishList({
          email: user.email as string,
          externalProductId: game.id as number,
          name: game.name as string,
          description: game.description_raw as string,
          background_image: game.background_image as string,
          price: generateRandomPrice(),
          rating: game.rating as number,
          slug: game.slug as string,
          released: game.released as string,
          added: game.added as number,
        });
      }
    } else {
      if (isInWishList) {
        handleDeleteLocalProductFromWishList(
          (game.externalProductId as number) || (game.id as number)
        );
      } else {
        handleAddLocalProductToWishList({
          externalProductId: parseInt(game.id as string),
          name: game.name as string,
          description: game.description_raw,
          price: generateRandomPrice(),
          background_image: game.background_image as string,
          rating: game.rating,
          slug: game.slug,
          released: game.released,
          added: game.added,
        });
      }
    }
  };

  return (
    <button
      onClick={(event: React.MouseEvent) => handleWishListAction(event)}
      disabled={isLoading}
      className={`${position} p-[6px] md:p-[10px] border transition duration-300 cursor-pointer hover:bg-[#ffffff80] hover:border-[#ffffff] ${
        isInWishList ? `${added}` : `${deleted}`
      }`}
    >
      <CiHeart size="30px" color={"white"} />
    </button>
  );
}
