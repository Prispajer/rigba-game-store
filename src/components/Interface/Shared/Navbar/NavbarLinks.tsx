import React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import { navLinks } from "@/utils/helpers/links";
import useSharedGeneralActions from "@/redux/actions/useSharedGeneralActions";

export default function NavbarLinks({
  selectedTitle,
  selectedNavIndex,
  setSelectedNavIndex,
}) {
  const { handleClose } = useSharedGeneralActions();
  const foundObject = navLinks.find((option) => option.title === selectedTitle);

  const handleBackClick = () => {
    setSelectedNavIndex(-1);
  };

  return (
    foundObject && (
      <div className="bg-primaryColor fixed h-full w-[300px] z-10 left-0 top-0">
        {foundObject.links.map((link, linkIndex) => (
          <>
            <div className="flex items-center justify-between w-full pl-[10px] border-b-2 border-secondaryColor">
              <div className="flex items-center h-[50px]">
                <MdKeyboardArrowLeft
                  onClick={handleBackClick}
                  size="25px"
                  color="white"
                  className="cursor-pointer"
                />
                <span className="pl-[4px] text-[16px] font-[600] text-white ">
                  {link.category}
                </span>
              </div>
              <button className="pr-[20px]">
                <IoCloseSharp
                  onClick={() => handleClose("navSidebarOptionState")}
                  size="25px"
                  color="white"
                />
              </button>
            </div>
            (
            <nav className="bg-primaryColor">
              <ul className="flex flex-col w-full text-[18px] text-[white] bg-primaryColor">
                {link.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="sidebar-li">
                    <Link className="sidebar-li" href={item.url}>
                      {item.name}
                    </Link>
                    <MdKeyboardArrowRight size="25px" color="white" />
                  </li>
                ))}
              </ul>
            </nav>
            )
          </>
        ))}
      </div>
    )
  );
}
