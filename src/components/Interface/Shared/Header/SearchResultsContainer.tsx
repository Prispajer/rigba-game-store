import React from "react";
import Image from "next/image";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useCustomRouter from "@/hooks/useCustomRouter";
import { FaCartPlus } from "react-icons/fa";
import { SearchData } from "@/utils/helpers/types";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

export default function SearchResultsContainer({
  filteredGames,
  isLoading,
}: {
  filteredGames: SearchData[];
  isLoading: boolean;
}) {
  const { redirectToGame } = useCustomRouter();
  const { handleClose } = useWindowVisibility();

  return (
    <div className="absolute top-[67px] left-0 w-full bg-primaryColor ">
      {isLoading ? (
        <LoadingAnimation />
      ) : filteredGames && filteredGames.length > 0 ? (
        filteredGames.map((game) => (
          <ul key={game.id}>
            <li
              className="my-[10px] py-[5px] cursor-pointer hover:bg-secondaryColor"
              onClick={() =>
                redirectToGame(
                  game?.slug as string,
                  handleClose,
                  "searchBarModal"
                )
              }
            >
              <div className="flex justify-between px-[15px]">
                <div className="flex">
                  <div className="relative min-w-[72px] min-h-[100px]">
                    <Image
                      src={game?.background_image ?? ""}
                      layout="fill"
                      alt={game?.name}
                    />
                  </div>
                  <div className="ml-[10px]">
                    <span className="py-[2px] px-[8px] text-[12px] text-[#e5e176] border-[2px] border-[#e5e176] rounded-full">
                      Produkt cyfrowy
                    </span>
                    <div className="mt-[6px]">
                      <span className="text-[#FFFFFF] font-bold">
                        {game?.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] text-right font-bold text-[#FFFFFF96]">
                    Od
                  </span>
                  <span className="mt-[-2px] text-buttonBackground font-bold">
                    21,41zł
                  </span>
                  <button className="flex items-center justify-center w-[100%] h-[35px] mt-[10px] border-2 border-[#FFFFFFF] hover:bg-buttonTextColor">
                    <FaCartPlus size="20px" color="#ffffff" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        ))
      ) : (
        <div className="px-[15px] py-[10px] text-white">
          <span>Brak wyników wyszukiwania</span>
        </div>
      )}
    </div>
  );
}
