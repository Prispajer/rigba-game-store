"use client";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import LoadingAnimation from "../Shared/Animations/LoadingAnimation";
import ShowMoreButton from "../Shared/Buttons/ShowMoreButton";
import useCustomRouter from "@/hooks/useCustomRouter";
import FetchService from "@/services/FetchService";
import { getGamesWithRandomPrices } from "@/utils/prices";

export default function ProductList() {
  const [productsByOrdering, setProductsByOrdering] = React.useState<
    GameAPIResponse[]
  >([]);
  const [quantity, setQuantity] = React.useState(1);
  const [newLoadingArray, setNewLoadingArray] = React.useState<boolean[]>([]);
  const { redirectToGame } = useCustomRouter();

  const loadMore = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  React.useEffect(() => {
    (async () => {
      const response = await FetchService.getProductsByOrdering(
        "-rating",
        quantity
      );
      const updatedGames = await getGamesWithRandomPrices(
        response,
        productsByOrdering
      );
      setProductsByOrdering(updatedGames);
      setNewLoadingArray(new Array(5 * quantity).fill(false));
    })();
    setNewLoadingArray(new Array(5 * quantity).fill(true));
  }, [quantity]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-product-list-auto-fit  gap-x-[10px]">
        {newLoadingArray.map((_, index) => (
          <div
            key={productsByOrdering[index]?.id ?? index}
            onClick={() => {
              if (productsByOrdering[index]) {
                redirectToGame(productsByOrdering[index].slug as string);
              }
            }}
            className={`relative min-w-[200px] min-h-[150px] sm:min-h-[360px] my-[10px] flex sm:flex-col bg-tertiaryColor 
             cursor-pointer`}
          >
            {newLoadingArray[index] ? (
              <LoadingAnimation />
            ) : (
              <>
                <div className="relative m-[5px] sm:m-[0px] min-w-[95px] sm:min-h-[250px]">
                  <Image
                    loading="lazy"
                    src={
                      productsByOrdering[index].background_image ||
                      productsByOrdering[index].productsInformations
                        ?.background_image ||
                      ""
                    }
                    layout="fill"
                    alt={
                      productsByOrdering[index].background_image ||
                      productsByOrdering[index].productsInformations
                        ?.background_image ||
                      ""
                    }
                  />
                </div>
                <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                  <div className="flex flex-col justify-between min-h-[60px]">
                    <div className="leading-none line-clamp-1 text-[#ffffff]">
                      <span className="font-bold text-[14px]">
                        {productsByOrdering[index].name ||
                          productsByOrdering[index].productsInformations?.name}
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
                      $
                      {productsByOrdering[index].price ||
                        productsByOrdering[index].productsInformations?.price}
                    </div>
                    <div className="flex items-center">
                      <CiHeart
                        className="ml-[-3px] mr-[3px]"
                        size="20px"
                        color="#ffffff80"
                      />
                      <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[14px] text-[#ffffff80]">
                        {productsByOrdering[index].rating ||
                          productsByOrdering[index].productsInformations
                            ?.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <AddToWishList
                  game={productsByOrdering[index]}
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
        <ShowMoreButton text="Load More" method={loadMore} />
      </div>
    </>
  );
}
