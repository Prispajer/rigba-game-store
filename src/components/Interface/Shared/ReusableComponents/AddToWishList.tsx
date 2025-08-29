"use client";
import React from "react";
import { CiHeart } from "react-icons/ci";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useUserWishlist from "@/features/wishlist/hooks/userWishlist/useUserWishlist";
import { generateRandomPrice } from "@/utils/prices";
import { ProductInformations } from "@/types/types";
import useUserWishlistActions from "@/features/wishlist/hooks/userWishlist/useUserWishlistActions";
import useLocalStorageWishlistActions from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlistActions";
import useLocalStorageWishlist from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlist";

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
  const { isLoading, userWishlistState, getUserWishlist } = useUserWishlist();
  const {
    handleAddUserProductToWishlist,
    handleDeleteUserProductFromWishlist,
  } = useUserWishlistActions(getUserWishlist);
  const localWishlistState = useLocalStorageWishlist("localStorageWishlist");
  const {
    handleAddLocalStorageProductToWishList,
    handleDeleteLocalStorageProductFromWishList,
  } = useLocalStorageWishlistActions();

  const isInLocalWishlist = localWishlistState.localStorageWishlist.some(
    (product) =>
      product.externalProductId === game?.id || game?.externalProductId
  );

  const isInUserWishlist = userWishlistState.products.some(
    (product) =>
      product.externalProductId === game?.id || game?.externalProductId
  );

  const isInCurrentWishlist = user ? isInUserWishlist : isInLocalWishlist;

  const handleWishListAction = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (user) {
      if (isInCurrentWishlist) {
        handleDeleteUserProductFromWishlist(
          user.email,
          (game.externalProductId as number) || (game.id as number)
        );
      } else {
        handleAddUserProductToWishlist({
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
      if (isInCurrentWishlist) {
        handleDeleteLocalStorageProductFromWishList(
          (game.externalProductId as number) || (game.id as number)
        );
      } else {
        handleAddLocalStorageProductToWishList({
          externalProductId: parseInt(game.id as string),
          name: game.name as string,
          description: game.description_raw,
          price: generateRandomPrice(),
          background_image: game.background_image as string,
          rating: game.rating as number,
          slug: game.slug as string,
          released: game.released as string,
          added: game.added as number,
        });
      }
    }
  };

  return (
    <button
      onClick={(event: React.MouseEvent) => handleWishListAction(event)}
      disabled={isLoading["userWishlist"]}
      className={`${position} p-[6px] md:p-[10px] border transition duration-300 cursor-pointer hover:bg-[#ffffff80] hover:border-[#ffffff] ${
        isInCurrentWishlist ? `${added}` : `${deleted}`
      }`}
    >
      <CiHeart size="30px" color={"white"} />
    </button>
  );
}
