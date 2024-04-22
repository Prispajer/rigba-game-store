"use client";
import React from "react";
import { IoMdDoneAll } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { FaSteam } from "react-icons/fa";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import GameImageModal from "../Shared/GameImageModal/GameImageModal";
import Image from "next/image";
export default function ProductImages() {
  const { handleOpen } = useWindowVisibility();
  const screenshots = useFetchGameDataByLink(
    "https://api.rawg.io/api/games/417/screenshots"
  );

  const [currentImageId, setCurrentImageId] = React.useState(null);

  const handleImageClick = (id) => {
    setCurrentImageId(id);
    handleOpen("gameImageModal");
  };

  return (
    <section className="flex max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-primaryColor">
      <div className="flex w-full overflow-x-auto">
        {screenshots?.results ? (
          screenshots.results.map((screenshot) => (
            <div
              onClick={() => handleImageClick(screenshot.id)}
              className="mr-[10px]"
              key={screenshot.image}
            >
              <button
                onClick={() => handleOpen("gameImageModal")}
                className="relative w-[176px] h-[100px]"
              >
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
      <GameImageModal currentImageId={currentImageId} />
    </section>
  );
}
