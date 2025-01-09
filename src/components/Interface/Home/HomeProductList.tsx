import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { MdOutlineSignalCellularNodata } from "react-icons/md";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import LoadingAnimation from "../Shared/Animations/LoadingAnimation";
import useCustomRouter from "@/hooks/useCustomRouter";
import fetchService from "@/services/FetchService";
import { generateRandomValue } from "@/utils/prices";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function HomeProductList({ ordering }: { ordering: string }) {
  const { redirectToGame } = useCustomRouter();
  const [productsArray, setProductsArray] = React.useState<GameAPIResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchProductsByOrdering = async () => {
    setIsLoading(true);
    setProductsArray(await fetchService.getProductsByOrdering(ordering));
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchProductsByOrdering();
  }, [ordering]);

  return (
    <>
      {isLoading ? (
        <div className="w-full">
          <LoadingAnimation />
        </div>
      ) : (
        productsArray.map((game, index) => (
          <div
            rel="preload"
            key={game.id || index}
            onClick={() => redirectToGame(game.slug as string)}
            className="relative flex flex-row sm:flex-col min-w-[200px] min-h-[120px] sm:min-h-[360px] mt-[20px] mb-[10px] bg-tertiaryColor cursor-pointer"
          >
            <div className="relative min-w-[95px] sm:h-[250px]">
              {game.background_image ? (
                <Image
                  fetchPriority="high"
                  loading="eager"
                  layout="fill"
                  src={game.background_image}
                  alt={game.background_image}
                  sizes="(max-width: 576px) 95px, 200px"
                />
              ) : (
                <div className="relative flex flex-col items-center justify-center max-w-[95px] h-full sm:h-[250px] sm:min-w-full">
                  <MdOutlineSignalCellularNodata
                    style={{ width: "100%", height: "100%" }}
                    color="green"
                  />
                </div>
              )}
            </div>
            <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
              <div className="leading-none line-clamp-1 text-[#ffffff]">
                <span className="font-bold text-[13px] text-[#ffffff]">
                  {game.name}
                </span>
              </div>
              <div>
                <span className="text-[12px] text-[#fffa84] font-bold">
                  {game.added}
                </span>
              </div>
              <div className="h-[50%] md:h-[75px]">
                <div className="text-[14px] text-[#ffffff80] font-medium">
                  From
                </div>
                <div className="overflow-hidden overflow-ellipsis line-clamp-1 text-[20px] text-[#ffffff] font-bold">
                  ${generateRandomValue()}
                </div>
                <div className="flex items-center">
                  <CiHeart
                    className="ml-[-3px] mr-[3px]"
                    size="20px"
                    color="white"
                  />
                  <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[14px] text-[#ffffff80]">
                    {game.rating}
                  </span>
                </div>
              </div>
            </div>
            <AddToWishList
              game={game}
              position="absolute right-[10px] top-0"
              added="border-[#FFFA84] bg-[#FFFA84]"
              deleted="bg-[##d3d3d3]"
            />
          </div>
        ))
      )}
    </>
  );
}
