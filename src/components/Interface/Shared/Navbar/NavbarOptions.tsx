import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, NavLinks } from "@/utils/helpers/links";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useSharedGeneralActions from "@/redux/actions/useSharedGeneralActions";

export default function NavbarOptions() {
  const { navSidebarState, handleCloseSidebar } = useSharedGeneralActions();

  const handleOutsideClick = () => {
    if (navSidebarState) {
      handleCloseSidebar("navSidebar");
    }
  };

  return (
    navSidebarState && (
      <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
        {navLinks.map((element: NavLinks, index: number) => (
          <div
            key={index}
            className="bg-primaryColor fixed h-full w-[300px] z-10"
          >
            <div className="flex items-center justify-between w-full pl-[10px] border-b-2 border-secondaryColor">
              <div className="flex items-center h-[50px]">
                <MdKeyboardArrowLeft size="25px" color="white" />
                <span className="pl-[4px] text-[16px] font-[600] text-white ">
                  {element.title}
                </span>
              </div>
              <button className="pr-[20px]">
                <IoCloseSharp
                  onClick={() => handleCloseSidebar("navSidebar")}
                  size="25px"
                  color="white"
                />
              </button>
            </div>
            <nav className="bg-primaryColor">
              <ul className="flex flex-col w-full text-[18px] text-[white] bg-primaryColor">
                {element.links.map((link: any, linkIndex: number) => (
                  <li key={linkIndex} className="sidebar-li">
                    <Link
                      className="flex justify-between items-center w-full"
                      href={link.category}
                    >
                      {link.category}
                      <MdKeyboardArrowRight size="25px" color="white" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ))}
      </OutsideClickHandler>
    )
  );
}
