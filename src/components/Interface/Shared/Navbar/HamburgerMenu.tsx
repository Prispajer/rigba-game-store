import React from "react";
import Image from "next/image";
import { navLinks } from "@/utils/helpers/links";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useSharedGeneralActions from "@/hooks/useWindowVisibility";
import InnerNavbarOptions from "./InnerNavbarOptions";

export default function HamburgerMenu() {
  const [selectedTitle, setSelectedTitle] = React.useState<string>("");
  const { navSidebarState, handleClose } = useSharedGeneralActions();
  const foundObject = navLinks.find((option) => option.title === selectedTitle);

  const handleElementClick = (title: string) => {
    setSelectedTitle(title);
  };

  const handleOutsideClick = () => {
    handleClose("navSidebar");
    setSelectedTitle("");
  };

  const handleBack = () => {
    setSelectedTitle("");
  };

  return (
    navSidebarState && (
      <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
        <div className="bg-primaryColor fixed h-full w-[300px] z-10">
          <div className="flex items-center justify-between w-full px-[10px] border-b-2 border-secondaryColor">
            <div className="flex items-center">
              <Image
                src="/icons/logo.png"
                width="60"
                height={90}
                alt="logo"
                priority={true}
              />
              <span className="text-white text-[30px] md:text-[35px]">
                RIGBA
              </span>
            </div>
            <button className="mr-[10px]">
              <IoCloseSharp
                onClick={handleOutsideClick}
                size="25px"
                color="white"
              />
            </button>
          </div>
          <nav className="bg-primaryColor">
            <ul className="flex flex-col w-full text-[18px] text-[white] bg-primaryColor">
              {navLinks.map((element, index) => (
                <li key={index} className="sidebar-li">
                  <div
                    className="flex items-center justify-between w-full"
                    onClick={() => handleElementClick(element.title)}
                  >
                    <div className="flex items-center h-[50px]">
                      <span className="pl-[4px] text-[16px] font-[600] text-white">
                        {element.title}
                      </span>
                    </div>
                    <MdKeyboardArrowRight size="25px" color="white" />
                  </div>
                  {selectedTitle === element.title && (
                    <InnerNavbarOptions
                      selectedTitle={selectedTitle}
                      handleBack={handleBack}
                      foundObject={foundObject}
                      handleElementClick={handleElementClick}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </OutsideClickHandler>
    )
  );
}
