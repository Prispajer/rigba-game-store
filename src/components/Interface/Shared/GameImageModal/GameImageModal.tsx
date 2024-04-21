import React from "react";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Image from "next/image";

export default function GameImageModal() {
  const { gameImageModalState, handleClose } = useWindowVisibility();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const screenshots = useFetchGameDataByLink(
    "https://api.rawg.io/api/games/417/screenshots"
  );

  const handleOutsideClick = () => {
    if (gameImageModalState) {
      handleClose("gameImageModal");
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % screenshots.results.length
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + screenshots.results.length) %
        screenshots.results.length
    );
  };

  return (
    <>
      {gameImageModalState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="game-image-modal">
            <div className="md:mx-[150px]">
              <button
                className="text-[#FFFFFF] absolute top-0 right-0"
                onClick={() => handleClose("gameImageModal")}
              >
                X
              </button>
              {screenshots?.results && (
                <div className="flex items-center justify-center w-full">
                  <div className="relative">
                    <button
                      className="text-[#FFFFFF] absolute left-0 top-[50%]"
                      onClick={handlePreviousImage}
                    >
                      <MdKeyboardArrowLeft size="80" />
                    </button>
                    <Image
                      src={screenshots.results[currentImageIndex].image}
                      alt={screenshots.results[currentImageIndex].image}
                      width={1600}
                      height={1600}
                    />
                    <button
                      className="text-[#FFFFFF] absolute right-0 top-[50%]"
                      onClick={handleNextImage}
                    >
                      <MdKeyboardArrowRight size="80" />
                    </button>
                  </div>
                </div>
              )}
              {!screenshots?.results && <div>No screenshots available</div>}
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
