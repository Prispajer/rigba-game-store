"use client";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { LocalStorageProduct, GameAPIResponse } from "@/utils/helpers/types";
import { generateRandomValue } from "@/utils/prices";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import requestService from "@/utils/classes/requestService";

export default function AddToWishList({ game }: { game: GameAPIResponse }) {
  const [error, setError] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<string | undefined>();
  const {
    localWishListState,
    handleAddLocalWishList,
    handleRemoveLocalProduct,
  } = useLocalStorage("localWishList");
  const user = useCurrentUser();

  const isInWishList = localWishListState.some(
    (product) => product.externalProductId === game?.id
  );

  const handleAddToWishList = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (user) {
        const response = await requestService.postMethod(
          "products/endpoints/productManagement/addProductToWishList",
          {
            email: user.email,
            externalProductId: game.id,
            name: game.name,
            price: generateRandomValue(),
            imageUrl: game.background_image,
            rating: game.rating,
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
          imageUrl: game.background_image,
          rating: game.rating,
        };
        handleAddLocalWishList(localProduct);
      }
    } catch (error) {
      console.error("Failed to add to wish list", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button
        onClick={handleAddToWishList}
        className={`absolute top-0 right-[10px] p-[6px] md:p-[10px] border-[1px] transition duration-300 cursor-pointer hover:bg-[#ffffff80] hover:border-[#ffffff] ${
          isInWishList ? "border-[#FFFA84] bg-[#FFFA84]" : ""
        }`}
      >
        <CiHeart size="30px" color="white" />
      </button>
    </>
  );
}
