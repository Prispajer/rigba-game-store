"use client";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { Product } from "@/utils/helpers/types";
import { generateRandomValue } from "@/utils/prices";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import requestService from "@/utils/classes/requestService";
import useUserWishList from "@/hooks/useUserWishList";

export default function AddToWishList({ game }: { game: Product }) {
  const [wishList, setWishList] = React.useState([]);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const user = useCurrentUser();
  const userWishList = useUserWishList();

  const {
    localWishListState,
    handleAddLocalWishList,
    handleRemoveLocalWishList,
  } = useLocalStorage("localWishList");

  const isInWishList = localWishListState.some(
    (product) =>
      product.externalProductId === game?.id || game?.externalProductId
  );

  const isInWishListDataBase = userWishList.some(
    (product) =>
      product.externalProductId === game?.id || game?.externalProductId
  );

  React.useEffect(() => {
    setWishList(isInWishListDataBase);
    console.log(`wishlist: ${wishList}`);
  }, [user, isInWishListDataBase]);

  const displayByCondition = user ? isInWishListDataBase : isInWishList;

  const handleAddToWishList = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      if (user) {
        const response = await requestService.postMethod(
          "products/endpoints/productManagement/addProductToWishList",
          {
            email: user.email,
            externalProductId: game.id,
            name: game.name,
            price: generateRandomValue(),
            description: game.description_raw,
            background_image: game.background_image,
            rating: game.rating,
            slug: game.slug,
          }
        );
        if (response.success) {
          setSuccess(response.message);
        } else {
          setError(response.message);
        }
      } else {
        const localProduct: LocalStorageProduct = {
          externalProductId: game.id,
          name: game.name,
          price: generateRandomValue(),
          description: game.description_raw,
          background_image: game.background_image,
          rating: game.rating,
          slug: game.slug,
        };
        handleAddLocalWishList(localProduct);
      }
    } catch (error) {
      console.error("Failed to add to wish list", error);
    }
  };

  const handleRemoveFromWishList = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      if (user) {
        const response = await requestService.deleteMethod(
          "products/endpoints/productManagement/deleteProductFromWishList",
          {
            email: user.email,
            externalProductId: game.externalProductId || game?.id,
          }
        );
        if (response.success) {
          setSuccess(response.message);
        } else {
          setError(response.message);
        }
      } else {
        handleRemoveLocalWishList({
          externalProductId: game.id || game?.externalProductId,
        });
      }
    } catch (error) {
      console.error("Failed to fetch to wish list", error);
    }
  };

  return (
    <>
      {success}
      {error}
      <button
        onClick={(event) =>
          displayByCondition
            ? handleRemoveFromWishList(event)
            : handleAddToWishList(event)
        }
        className={`absolute top-0 right-[10px] p-[6px] md:p-[10px] border-[1px] transition duration-300 cursor-pointer hover:bg-[#ffffff80] hover:border-[#ffffff] ${
          displayByCondition ? "border-[#FFFA84] bg-[#FFFA84]" : ""
        }`}
      >
        <CiHeart size="30px" color={"white"} />
      </button>
    </>
  );
}
