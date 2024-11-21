import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { navLinks } from "@/utils/helpers/links";
import { NavCurrentElement } from "@/utils/helpers/types";

export default function NavbarSidebar() {
  const [currentElement, setCurrentElement] = React.useState<
    | NavCurrentElement.Category
    | NavCurrentElement.SubCategory
    | NavCurrentElement.Link
  >(NavCurrentElement.Category);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<
    string | null
  >(null);
  const { navSidebarState, handleClose } = useWindowVisibility();

  const foundCategory = selectedCategory
    ? navLinks.find((element) => element.title === selectedCategory)
    : null;

  const foundSubCategory = selectedSubCategory
    ? foundCategory?.links.find((link) => link.category === selectedSubCategory)
    : null;

  const handleCategoryClick = (title: string) => {
    setSelectedCategory(title);
    setCurrentElement(NavCurrentElement.SubCategory);
  };

  const handleSubCategoryClick = (category: string) => {
    setSelectedSubCategory(category);
    setCurrentElement(NavCurrentElement.Link);
  };

  const handleBack = () => {
    if (currentElement === NavCurrentElement.Link) {
      setCurrentElement(NavCurrentElement.SubCategory);
    } else if (currentElement === NavCurrentElement.SubCategory) {
      setCurrentElement(NavCurrentElement.Category);
    }
  };

  const handleOutsideClick = () => {
    handleClose("navSidebar");
    setCurrentElement(NavCurrentElement.Category);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  return (
    navSidebarState && (
      <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
        <div className="bg-primaryColor fixed h-full w-[300px] z-10">
          <div className="flex items-center justify-between w-full px-[10px] border-b-2 border-secondaryColor">
            <Link onClick={() => handleClose("navSidebar")} href="/">
              <div className="flex items-center">
                <Image
                  src="/icons/logo.png"
                  width="60"
                  height="90"
                  alt="logo"
                  priority
                />
                <span className="text-white text-[30px] md:text-[35px]">
                  RIGBA
                </span>
              </div>
            </Link>
            <button className="mr-[10px]" onClick={handleOutsideClick}>
              <IoCloseSharp size="25px" color="white" />
            </button>
          </div>
          {currentElement === NavCurrentElement.Category && (
            <nav className="bg-primaryColor">
              <ul className="flex flex-col w-full text-[18px] text-[white]">
                {navLinks.map((element) => (
                  <li key={element.title} className="sidebar-li">
                    <div
                      className="flex items-center justify-between w-full"
                      onClick={() => handleCategoryClick(element.title)}
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
          {currentElement === NavCurrentElement.SubCategory &&
            selectedCategory && (
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
                      {foundCategory?.title}
                    </span>
                  </div>
                  <button
                    className="pr-[20px]"
                    onClick={() => {
                      handleClose("navSidebar"),
                        setCurrentElement(NavCurrentElement.Category);
                    }}
                  >
                    <IoCloseSharp size="25px" color="white" />
                  </button>
                </div>
                <nav className="bg-primaryColor">
                  <ul className="flex flex-col w-full text-[18px] text-[white]">
                    {foundCategory?.links.map((category) => (
                      <li
                        key={category.category}
                        className="sidebar-li"
                        onClick={() =>
                          handleSubCategoryClick(category.category)
                        }
                      >
                        {category.category}
                        <MdKeyboardArrowRight size="25px" color="white" />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          {currentElement === NavCurrentElement.Link &&
            selectedSubCategory &&
            currentElement && (
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
                      {foundSubCategory?.category}
                    </span>
                  </div>
                  <button
                    className="pr-[20px]"
                    onClick={() => {
                      handleClose("navSidebar"),
                        setCurrentElement(NavCurrentElement.Category);
                    }}
                  >
                    <IoCloseSharp size="25px" color="white" />
                  </button>
                </div>
                <nav className="bg-primaryColor">
                  <ul className="flex flex-col w-full text-[18px] text-[white]">
                    {foundSubCategory?.items.map((link) => (
                      <li key={link.name} className="sidebar-li">
                        <Link
                          onClick={() => handleClose("navSidebar")}
                          href={link.url}
                          className="flex items-center w-full h-full"
                        >
                          {link.name}
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
