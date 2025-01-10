"use client";
import React from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { CiHeart } from "react-icons/ci";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import LoadingAnimation from "../Shared/Animations/LoadingAnimation";
import ShowMoreButton from "../Shared/Buttons/ShowMoreButton";
import useCustomRouter from "@/hooks/useCustomRouter";
import fetchService from "@/services/FetchService";
import { GameAPIResponse } from "@/utils/helpers/types";
import { assignPricesToExternalGames } from "@/utils/prices";

export default function ProductList() {
  const [productsArray, setProductsArray] = React.useState<GameAPIResponse[]>(
    []
  );
  const [productsQuantity, setProductsQuantity] = React.useState(1);
  const [loadingProductsArray, setLoadingProductsArray] = React.useState<
    boolean[]
  >([]);

  const { redirectToGame } = useCustomRouter();

  React.useEffect(() => {
    (async () => {
      const response = await fetchService.getProductsByOrdering(
        "-rating",
        productsQuantity
      );
      const gamesWithRandomPrices = await assignPricesToExternalGames(
        response,
        productsArray
      );
      setProductsArray(gamesWithRandomPrices);
      setLoadingProductsArray(new Array(5 * productsQuantity).fill(false));
    })();
    setLoadingProductsArray(new Array(5 * productsQuantity).fill(true));
  }, [productsQuantity]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-product-list-auto-fit gap-x-[10px]">
        {loadingProductsArray.map((_, index) => (
          <div
            key={productsArray[index]?.id ?? index}
            onClick={() => {
              if (productsArray[index]) {
                redirectToGame(productsArray[index].slug as string);
              }
            }}
            className={`relative min-w-[200px] min-h-[150px] sm:min-h-[360px] my-[10px] flex sm:flex-col bg-tertiaryColor 
             cursor-pointer`}
          >
            {loadingProductsArray[index] ? (
              <LoadingAnimation />
            ) : (
              <>
                <div className="relative min-w-[95px] sm:min-h-[250px] m-[5px] sm:m-[0px]">
                  <Image
                    fetchPriority="high"
                    loading="eager"
                    fill={true}
                    src={productsArray[index].background_image || ""}
                    alt={productsArray[index].background_image || ""}
                    sizes="(max-width: 576px) 95px, 200px"
                  />
                </div>
                <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                  <div className="flex flex-col justify-between min-h-[60px]">
                    <div className="leading-none line-clamp-1 text-[#ffffff]">
                      <span className="font-bold text-[14px]">
                        {productsArray[index].name || ""}
                      </span>
                    </div>
                    <div>
                      <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[12px] text-[#fffa84] font-bold">
                        GLOBAL
                      </span>
                    </div>
                  </div>
                  <div className="h-[50%] md:h-[75px]">
                    <div className="text-[14px] text-[#ffffff80] font-medium">
                      From
                    </div>
                    <div className="overflow-hidden overflow-ellipsis line-clamp-1 text-[20px] text-[#ffffff] font-bold">
                      ${productsArray[index].price || ""}
                    </div>
                    <div className="flex items-center">
                      <CiHeart
                        className="ml-[-3px] mr-[3px]"
                        size="20px"
                        color="#ffffff80"
                      />
                      <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[14px] text-[#ffffff80]">
                        {productsArray[index].rating || ""}
                      </span>
                    </div>
                  </div>
                </div>
                <AddToWishList
                  game={productsArray[index]}
                  position="absolute right-[10px] top-0"
                  added="border-[#FFFA84] bg-[#FFFA84]"
                  deleted="bg-[##d3d3d3]"
                />
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <ShowMoreButton
          text="Load More"
          method={() => setProductsQuantity((prevQuantity) => prevQuantity + 1)}
        />
      </div>
    </>
  );
}
