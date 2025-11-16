"use client";

import React from "react";
import Image from "next/image";
import ProductScreenshotModalContainer from "../../../../components/Interface/Shared/Modals/GameScreenshotModalContainer";
import useUiVisibility from "@/hooks/useUiVisibility";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";


export default function ProductScreenshots({
  screenshots,
}: {
  screenshots: ApiProductDetails["screenshots"];
}) {
    const { handleShowElement } = useUiVisibility();

    const [currentImageId, setCurrentImageId] = React.useState<number | null>(
    null
  );

  return (
    <section className="flex max-w-[1240px] md:mx-auto pb-[15px] pt-4 bg-primaryColor">
      <div className="flex w-full overflow-x-auto scrollbar">
        {screenshots ? (
          screenshots.map((screenshot) => (
            <div
              onClick={() => setCurrentImageId(screenshot.id)}
              className="mr-[10px]"
              key={screenshot.image}
            >
              <button
                onClick={() => handleShowElement("gameScreenshotModal")}
                className="relative w-[176px] h-[100px]"
              >
                <Image
                  loading="eager"
                  src={screenshot.image ?? "/icons/logo.png"}
                  alt={screenshot.image}
                  fill={true}
                />
              </button>
            </div>
          ))
        ) : (
          <div>No screenshoots found</div>
        )}
      </div>
      <ProductScreenshotModalContainer
        screenshots={screenshots}
        currentImageId={currentImageId}
      />
    </section>
  );
}
