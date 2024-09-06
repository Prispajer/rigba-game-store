"use client";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { MdOutlineSignalCellularNodata } from "react-icons/md";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import LoadingAnimation from "../Shared/Animations/LoadingAnimation";
import useCustomRouter from "@/hooks/useCustomRouter";
import FetchService from "@/utils/classes/FetchService";
import { generateRandomValue } from "@/utils/prices";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function HomeProductList({ ordering }: { ordering: string }) {
  const { redirectToGame } = useCustomRouter();
  const [gamesWithOrdering, setGamesWithOrdering] = React.useState<
    GameAPIResponse[]
  >([]);
  const [newLoadingArray, setNewLoadingArray] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    (async () => {
      const gamesWithOrdering = await FetchService.getProductsByOrdering(
        ordering
      );
      setGamesWithOrdering(gamesWithOrdering);
      setNewLoadingArray(new Array(gamesWithOrdering.length).fill(false));
    })();
    setNewLoadingArray(new Array(20).fill(true));
  }, [ordering]);

  return (
    <>
      {newLoadingArray.map((_, index) => (
        <div
          key={gamesWithOrdering[index]?.id}
          onClick={() => {
            if (gamesWithOrdering[index]) {
              redirectToGame(gamesWithOrdering[index].slug as string);
            }
          }}
          className="relative flex flex-row sm:flex-col min-w-[200px] min-h-[150px] sm:min-h-[360px] mt-[20px] mb-[10px] bg-tertiaryColor cursor-pointer"
        >
          {newLoadingArray[index] ? (
            <LoadingAnimation />
          ) : (
            <>
              <div className="relative min-w-[95px] sm:h-[250px]">
                {gamesWithOrdering[index]?.background_image ? (
                  <Image
                    src={gamesWithOrdering[index].background_image}
                    layout="fill"
                    alt="game"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span>
                      <MdOutlineSignalCellularNodata
                        size="fill"
                        color="green"
                      />
                    </span>
                    <span className="text-[#F4CD7A] font-[600]">
                      No image data!
                    </span>
                  </div>
                )}
              </div>
              <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                <div className="flex flex-col justify-between min-h-[60px]">
                  <div className="leading-none line-clamp-1 text-[#ffffff]">
                    <span className="font-bold text-[13px] text-[#ffffff]">
                      {gamesWithOrdering[index]?.name}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-[12px] text-[#fffa84] font-bold">
                    {gamesWithOrdering[index]?.added}
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
                      {gamesWithOrdering[index]?.rating}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          <AddToWishList
            game={gamesWithOrdering[index]}
            position="absolute right-[10px] top-0"
            added="border-[#FFFA84] bg-[#FFFA84]"
            deleted="bg-[##d3d3d3]"
          />
        </div>
      ))}
    </>
  );
}
