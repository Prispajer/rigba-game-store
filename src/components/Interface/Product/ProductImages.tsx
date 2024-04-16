"use client";
import React from "react";
import { IoMdDoneAll } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { FaSteam } from "react-icons/fa";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import Image from "next/image";
export default function ProductImages() {
  const screenshots = useFetchGameDataByLink(
    "https://api.rawg.io/api/games/17/screenshots"
  );

  return (
    <div className="flex w-full overflow-x-auto ">
      {screenshots?.results ? (
        screenshots.results.map((screenshot) => (
          <div className="mr-[10px]" key={screenshot.image}>
            <button className="relative w-[176px] h-[100px]">
              <Image
                src={screenshot.image}
                alt={screenshot.image}
                layout="fill"
                objectFit="cover"
              />
            </button>
          </div>
        ))
      ) : (
        <div>Brak zrzutów ekranu</div>
      )}
    </div>
  );
}
