import React from "react";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { IoCloseSharp } from "react-icons/io5";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ProductScreenshotModalContainer({
  currentImageId,
  screenshots,
}: {
  currentImageId: number | null;
  screenshots: GameAPIResponse["screenshots"];
}) {
  const { gameScreenshotModalState, handleClose } = useWindowVisibility();
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const screenshotIndex = screenshots?.findIndex(
      (image) => image.id === currentImageId
    );
    if (screenshotIndex !== -1) {
      setCurrentImageIndex(screenshotIndex);
    } else {
      setCurrentImageIndex(0);
    }
  }, [currentImageId, screenshots]);

  const handleOutsideClick = () => {
    if (gameScreenshotModalState) {
      handleClose("gameScreenshotModal");
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex < screenshots.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  return (
    <>
      {gameScreenshotModalState && screenshots && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="fixed top-[50%] left-[50%] w-[95%] md:w-[90%] xxl:w-[70%] xxxl:w-[60%] mx-auto translate-y-[-50%] translate-x-[-50%] z-20">
            <div className="relative w-full flex justify-center items-center">
              <button
                className="absolute top-2 right-2 text-[#FFFFFF] z-10"
                onClick={() => handleClose("gameScreenshotModal")}
              >
                <IoCloseSharp
                  className="transition duration-300 ease-in-out hover:text-modalHover"
                  size="30"
                />
              </button>
              <div className="flex items-center justify-center h-[400px] md:h-[600px]">
                <button
                  className={`absolute left-0 h-[45px] sm:h-[60px] md:h-[80px] transition duration-300 ease-in-out z-[20] text-[#FFFFFF] hover:bg-[#FFFFFF20]  ${
                    currentImageIndex === 0
                      ? "bg-[#FFFFFF20]"
                      : "bg-[#FFFFFF44]"
                  }`}
                  onClick={handlePreviousImage}
                  disabled={currentImageIndex === 0}
                >
                  <MdKeyboardArrowLeft
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
                <Image
                  loading="eager"
                  layout="fill"
                  src={screenshots[currentImageIndex]?.image}
                  alt={screenshots[currentImageIndex]?.image}
                />
                <button
                  className={`absolute right-0 h-[45px] sm:h-[60px] md:h-[80px] transition duration-300 ease-in-out z-[20] text-[#FFFFFF] hover:bg-[#FFFFFF20]  ${
                    currentImageIndex === screenshots.length - 1
                      ? "bg-[#FFFFFF20]"
                      : "bg-[#FFFFFF44]"
                  }`}
                  onClick={handleNextImage}
                  disabled={currentImageIndex === screenshots.length - 1}
                >
                  <MdKeyboardArrowRight
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
