import React from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function TwoFactorModalContainer() {
  const { twoFactorModalState, handleClose } = useWindowVisibility();

  const handleOutsideClick = () => {
    if (twoFactorModalState) {
      handleClose("twoFactorModal");
    }
  };

  return (
    <>
      {twoFactorModalState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="absolute top-0 left-0 w-full h-full mx-auto z-10">
            <div className="flex justify-between items-center text-white border-b-[1px] border-[#ffffff1a] p-[20px]">
              <strong className="text-[20px] cursor-default">
                XDDDDDDDDDDDDD
              </strong>
              <button onClick={() => handleClose("twoFactorModal")}>
                <IoCloseSharp className="hover:text-modalHover" size="25px" />
              </button>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
