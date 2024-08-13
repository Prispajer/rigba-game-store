"use client";
import React from "react";
import Image from "next/image";
import ProductScreenshotModalContainer from "../Shared/Modals/GameScreenshotModalContainer";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ProductScreenshots({
  screenshots,
}: {
  screenshots: GameAPIResponse["screenshots"];
}) {
  const { handleOpen } = useWindowVisibility();
  const [currentImageId, setCurrentImageId] = React.useState<number | null>(
    null
  );

  const handleImageClick = (id: number) => {
    setCurrentImageId(id);
  };

  return (
    <section className="flex max-w-[1240px] md:mx-auto pb-[15px] pt-4 bg-primaryColor">
      <div className="flex w-full overflow-x-auto scrollbar">
        {screenshots ? (
          screenshots.map((screenshot) => (
            <div
              onClick={() => handleImageClick(screenshot.id)}
              className="mr-[10px]"
              key={screenshot.image}
            >
              <button
                onClick={() => handleOpen("gameScreenshotModal")}
                className="relative w-[176px] h-[100px]"
              >
                <Image
                  src={screenshot.image ?? "/icons/logo.png"}
                  alt={screenshot.image}
                  layout="fill"
                />
              </button>
            </div>
          ))
        ) : (
          <div>Brak zrzutów ekranu</div>
        )}
      </div>
      <ProductScreenshotModalContainer
        screenshots={screenshots}
        currentImageId={currentImageId}
      />
    </section>
  );
}
