// Komponent Sidebar.js
import React, { useState } from "react";
import Image from "next/image";
import { navLinks } from "@/utils/helpers/links";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useSharedGeneralActions from "@/redux/actions/useSharedGeneralActions";
import NavbarOptions from "./NavbarOptions";
import NavbarLinks from "./NavbarLinks";

export default function NavbarSidebar() {
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedNavIndex, setSelectedNavIndex] = useState<number>(-1);
  const { navSidebarCategoryState, handleClose } = useSharedGeneralActions();

  const handleSetClick = (title: any, index: number) => {
    if (selectedNavIndex === index) {
      handleClose("navSidebarCategory");
    } else {
      setSelectedTitle(title);
      setSelectedNavIndex(index);
    }
  };

  console.log(selectedTitle);

  const handleOutsideClick = () => {
    setSelectedNavIndex(selectedNavIndex - 1);
    handleClose("navSidebarCategory");
  };

  return (
    navSidebarCategoryState && (
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
                    onClick={() => handleSetClick(element.title, index)}
                  >
                    <div className="flex items-center h-[50px]">
                      <span className="pl-[4px] text-[16px] font-[600] text-white">
                        {element.title}
                      </span>
                    </div>
                    <MdKeyboardArrowRight size="25px" color="white" />
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          {/* {selectedNavIndex !== -1 && (
            <NavbarOptions
              selectedTitle={selectedTitle}
              selectedNavIndex={selectedNavIndex}
              setSelectedNavIndex={setSelectedNavIndex}
            />
          )} */}
          {selectedNavIndex !== -1 && (
            <NavbarLinks
              selectedTitle={selectedTitle}
              selectedNavIndex={selectedNavIndex}
              setSelectedNavIndex={setSelectedNavIndex}
            />
          )}
        </div>
      </OutsideClickHandler>
    )
  );
}
