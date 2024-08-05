import React from "react";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { IoCloseSharp } from "react-icons/io5";

export default function GameImageModalContainer({
  currentImageId,
  screenshots,
}) {
  const { gameImageModalState, handleClose } = useWindowVisibility();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const index = screenshots?.findIndex(
      (image) => image.id === currentImageId
    );
    if (index !== -1) {
      setCurrentImageIndex(index);
    }
  }, [currentImageId, screenshots]);

  const handleOutsideClick = () => {
    if (gameImageModalState) {
      handleClose("gameImageModal");
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <>
      {gameImageModalState && screenshots && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="fixed top-[50%] left-[50%] w-full p-[10px] xxl:w-[80%] translate-y-[-50%] translate-x-[-50%] z-20">
            <div className="relative w-full flex justify-center items-center">
              <button
                className="text-[#FFFFFF] absolute top-2 right-2"
                onClick={() => handleClose("gameImageModal")}
              >
                <IoCloseSharp
                  className="transition duration-300 ease-in-out hover:text-modalHover"
                  size="30"
                />
              </button>
              <div className="flex items-center justify-center w-full">
                <button
                  className={`absolute left-0 transition duration-300 ease-in-out z-[20] text-[#FFFFFF] hover:bg-[#FFFFFF20]  ${
                    currentImageIndex === 0
                      ? "bg-[#FFFFFF20]"
                      : "bg-[#FFFFFF44]"
                  }`}
                  onClick={handlePreviousImage}
                  disabled={currentImageIndex === 0}
                >
                  <MdKeyboardArrowLeft size="60" />
                </button>
                <Image
                  src={screenshots[currentImageIndex]?.image}
                  alt={screenshots[currentImageIndex]?.image}
                  width={1800}
                  height={1800}
                />
                <button
                  className={`absolute right-0 transition duration-300 ease-in-out z-[20] text-[#FFFFFF] hover:bg-[#FFFFFF20]  ${
                    currentImageIndex === screenshots.length - 1
                      ? "bg-[#FFFFFF20]"
                      : "bg-[#FFFFFF44]"
                  }`}
                  onClick={handleNextImage}
                  disabled={currentImageIndex === screenshots.length - 1}
                >
                  <MdKeyboardArrowRight size="60" />
                </button>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
