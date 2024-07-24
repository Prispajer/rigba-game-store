"use client";
import React from "react";
import Image from "next/image";
import { generateRandomValue } from "@/utils/prices";
import { CiHeart } from "react-icons/ci";
import AddToWishList from "../Shared/Products/AddToWishList";
import LoadingAnimation from "../Shared/LoadingAnimation/LoadingAnimation";
import fetchService from "@/utils/classes/fetchService";
import useCustomRouter from "@/hooks/useCustomRouter";
import { MdOutlineSignalCellularNodata } from "react-icons/md";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function HomeProductList({ ordering }: { ordering: string }) {
  const { redirectToGame } = useCustomRouter();
  const [gamesWithOrdering, setGamesWithOrdering] = React.useState<
    GameAPIResponse[]
  >([]);
  const [newLoadingArray, setNewLoadingArray] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    (async () => {
      const gamesWithOrdering = await fetchService.getGameByOrdering(ordering);
      setGamesWithOrdering(gamesWithOrdering);
      setNewLoadingArray(new Array(gamesWithOrdering.length).fill(false));
    })();
    setNewLoadingArray(new Array(20).fill(true));
  }, [ordering]);

  console.log(newLoadingArray);

  return (
    <>
      {newLoadingArray.map((value, index) => (
        <div
          key={gamesWithOrdering[index]?.id}
          onClick={() => {
            if (gamesWithOrdering[index]) {
              redirectToGame(gamesWithOrdering[index].slug as string);
            }
          }}
          className="relative min-w-[200px] min-h-[360px] mt-[20px] mb-[10px] bg-tertiaryColor cursor-pointer"
        >
          {newLoadingArray[index] ? (
            <LoadingAnimation />
          ) : (
            <>
              <div className="relative w-full min-h-[220px]">
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
              <div className="flex flex-col justify-between h-[70px] px-[15px] pt-[10px]">
                <div className="leading-none overflow-hidden overflow-ellipsis line-clamp-2 text-[#ffffff]">
                  <span className="font-bold text-[13px] text-[#ffffff]">
                    {gamesWithOrdering[index]?.name}
                  </span>
                </div>
                <div>
                  <span className="text-[12px] text-[#fffa84] font-bold">
                    {gamesWithOrdering[index]?.added}
                  </span>
                </div>
              </div>
              <div className="h-[80px] px-[15px]">
                <div className="text-[14px] text-[#ffffff80] font-medium">
                  Od
                </div>
                <div className="text-[20px] text-[#ffffff] font-bold">
                  {generateRandomValue()}
                </div>
                <div className="flex items-center">
                  <CiHeart
                    className="ml-[-3px] mr-[3px]"
                    size="20px"
                    color="#ffffff80"
                  />
                  <span className="text-[14px] text-[#ffffff80]">
                    {gamesWithOrdering[index]?.rating}
                  </span>
                </div>
              </div>
            </>
          )}
          <AddToWishList game={gamesWithOrdering[index]} />
        </div>
      ))}
    </>
  );
}
