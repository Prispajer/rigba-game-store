"use client";
import React from "react";
import { CiHeart } from "react-icons/ci";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserWishList from "@/hooks/useUserWishList";
import { generateRandomValue } from "@/utils/prices";
import { GameAPIProduct } from "@/utils/helpers/types";

export default function AddToWishList({
  game,
  position,
  added,
  deleted,
}: {
  game: GameAPIProduct;
  position: string;
  added: string;
  deleted: string;
}) {
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

  console.log(localWishListState);

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
        handleAddUserProductToWishList({
          email: user.email,
          externalProductId: game.id,
          name: game.name,
          description: game.description_raw,
          background_image: game.background_image,
          price: generateRandomValue(),
          rating: game.rating,
          slug: game.slug,
          released: game.released,
          added: game.added,
        });
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
          description: game.description_raw,
          price: generateRandomValue(),
          background_image: game.background_image,
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
      onClick={(event) => handleClick(event)}
      className={`${position} p-[6px] md:p-[10px] border transition duration-300 cursor-pointer hover:bg-[#ffffff80] hover:border-[#ffffff] ${
        isInWishList ? `${added}` : `${deleted}`
      }`}
    >
      <CiHeart size="30px" color={"white"} />
    </button>
  );
}
