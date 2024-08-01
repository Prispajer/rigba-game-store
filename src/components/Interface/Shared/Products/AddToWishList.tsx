"use client";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { Product } from "@/utils/helpers/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserWishList from "@/hooks/useUserWishList";
import { generateRandomValue } from "@/utils/prices";

export default function AddToWishList({ game }: { game: Product }) {
  const { user } = useCurrentUser();
  const {
    userWishListState,
    handleAddUserProductToWishList,
    handleRemoveUserProductFromWishList,
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

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (user) {
      if (isInWishList) {
        handleRemoveUserProductFromWishList(
          (game.externalProductId as number) || (game.id as number)
        );
      } else {
        handleAddUserProductToWishList(
          game.id as string,
          game.name,
          game.description_raw as string,
          game.background_image,
          game.rating as number,
          game.slug as string
        );
      }
    } else {
      if (isInWishList) {
        handleDeleteLocalProductFromWishList(
          (game.externalProductId as number) || (game.id as number)
        );
      } else {
        handleAddLocalProductToWishList({
          externalProductId: game.id,
          name: game.name,
          description_raw: game.description_raw,
          price: generateRandomValue(),
          background_image: game.background_image,
          rating: game.rating,
          slug: game.slug,
        });
      }
    }
  };

  return (
    <button
      onClick={(event) => handleClick(event)}
      className={`absolute top-0 right-[10px] p-[6px] md:p-[10px] border transition duration-300 cursor-pointer hover:bg-[#ffffff80] hover:border-[#ffffff] ${
        isInWishList ? "border-[#FFFA84] bg-[#FFFA84]" : ""
      }`}
    >
      <CiHeart size="30px" color={"white"} />
    </button>
  );
}
