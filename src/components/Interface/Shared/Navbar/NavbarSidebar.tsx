import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, NavLinks } from "@/utils/helpers/links";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useSharedGeneralActions from "@/redux/actions/useSharedGeneralActions";

export default function Sidebar() {
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const { navSidebarState, handleCloseSidebar } = useSharedGeneralActions();

  const handleSetClick = (title: string) => {
    setSelectedTitle(title);
  };

  const handleOutsideClick = () => {
    if (navSidebarState) {
      handleCloseSidebar("navSidebar");
    }
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
                onClick={() => handleCloseSidebar("navSidebar")}
                size="25px"
                color="white"
              />
            </button>
          </div>
          <nav className="bg-primaryColor">
            <ul className="flex flex-col w-full text-[18px] text-[white] bg-primaryColor">
              {navLinks.map((element: NavLinks, index: number) => (
                <li key={index} className="sidebar-li">
                  <div
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSetClick(element.title)}
                  >
                    <div className="flex items-center h-[50px]">
                      <MdKeyboardArrowLeft size="25px" color="white" />
                      <span className="pl-[4px] text-[16px] font-[600] text-white">
                        {element.title}
                      </span>
                    </div>
                    <MdKeyboardArrowRight size="25px" color="white" />
                  </div>
                  {selectedTitle === element.title && (
                    <div className="bg-primaryColor">
                      <ul className="flex flex-col w-full text-[18px] text-[white] bg-primaryColor">
                        {element.links.map((link: any, linkIndex: number) => (
                          <li key={linkIndex} className="sidebar-li">
                            <Link href={link.category}>
                              <div className="flex items-center justify-between w-full">
                                {link.category}
                                <MdKeyboardArrowRight
                                  size="25px"
                                  color="white"
                                />
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
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
