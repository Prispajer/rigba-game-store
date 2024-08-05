import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Shared/Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { navLinks } from "@/utils/helpers/links";

export default function NavbarSidebar() {
  const [currentLevel, setCurrentLevel] = React.useState<
    "main" | "category" | "item"
  >("main");
  const [selectedLink, setSelectedLink] = React.useState<string | null>(null);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const { navSidebarState, handleClose } = useWindowVisibility();

  const foundLink = selectedLink
    ? navLinks.find((option) => option.title === selectedLink)
    : null;
  const currentLink = foundLink?.links.find(
    (link) => link.category === selectedOption
  );

  const handleElementClick = (title: string) => {
    setSelectedLink(title);
    setSelectedOption(null);
    setCurrentLevel("category");
  };

  const handleOptionClick = (category: string) => {
    setSelectedOption(category);
    setCurrentLevel("item");
  };

  const handleBack = () => {
    if (currentLevel === "item") {
      setSelectedOption(null);
      setCurrentLevel("category");
    } else if (currentLevel === "category") {
      setSelectedLink(null);
      setCurrentLevel("main");
    }
  };

  const handleOutsideClick = () => {
    handleClose("navSidebar");
    setSelectedLink(null);
    setSelectedOption(null);
    setCurrentLevel("main");
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
                priority
              />
              <span className="text-white text-[30px] md:text-[35px]">
                RIGBA
              </span>
            </div>
            <button className="mr-[10px]" onClick={handleOutsideClick}>
              <IoCloseSharp size="25px" color="white" />
            </button>
          </div>
          {currentLevel === "main" && (
            <nav className="bg-primaryColor">
              <ul className="flex flex-col w-full text-[18px] text-[white]">
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
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {currentLevel === "category" && selectedLink && (
            <div className="bg-primaryColor fixed h-full w-[300px] z-10 left-0 top-0">
              <div className="flex items-center justify-between w-full pl-[10px] border-b-2 border-secondaryColor">
                <div className="flex items-center h-[50px]">
                  <MdKeyboardArrowLeft
                    onClick={handleBack}
                    size="25px"
                    color="white"
                    className="cursor-pointer"
                  />
                  <span className="pl-[4px] text-[16px] font-[600] text-white">
                    {foundLink?.title}
                  </span>
                </div>
                <button
                  className="pr-[20px]"
                  onClick={() => handleClose("navSidebar")}
                >
                  <IoCloseSharp size="25px" color="white" />
                </button>
              </div>
              <nav className="bg-primaryColor">
                <ul className="flex flex-col w-full text-[18px] text-[white]">
                  {foundLink?.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className="sidebar-li"
                      onClick={() => handleOptionClick(link.category)}
                    >
                      {link.category}
                      <MdKeyboardArrowRight size="25px" color="white" />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
          {currentLevel === "item" && selectedOption && currentLink && (
            <div className="bg-primaryColor fixed h-full w-[300px] z-10 left-0 top-0">
              <div className="flex items-center justify-between w-full pl-[10px] border-b-2 border-secondaryColor">
                <div className="flex items-center h-[50px]">
                  <MdKeyboardArrowLeft
                    onClick={handleBack}
                    size="25px"
                    color="white"
                    className="cursor-pointer"
                  />
                  <span className="pl-[4px] text-[16px] font-[600] text-white">
                    {currentLink.category}
                  </span>
                </div>
                <button
                  className="pr-[20px]"
                  onClick={() => handleClose("navSidebar")}
                >
                  <IoCloseSharp size="25px" color="white" />
                </button>
              </div>
              <nav className="bg-primaryColor">
                <ul className="flex flex-col w-full text-[18px] text-[white]">
                  {currentLink.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="sidebar-li">
                      <Link
                        href={item.url}
                        className="flex items-center w-full h-full"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    )
  );
}
