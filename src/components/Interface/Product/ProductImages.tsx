"use client";
import React from "react";
import Image from "next/image";
import GameImageModalContainer from "../Shared/Modals/GameImageModalContainer";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function ProductImages({ screenshots }) {
  const { handleOpen } = useWindowVisibility();
  const [currentImageId, setCurrentImageId] = React.useState(null);

  const handleImageClick = (id) => {
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
                onClick={() => handleOpen("gameImageModal")}
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
      <GameImageModalContainer
        screenshots={screenshots}
        currentImageId={currentImageId}
      />
    </section>
  );
}
