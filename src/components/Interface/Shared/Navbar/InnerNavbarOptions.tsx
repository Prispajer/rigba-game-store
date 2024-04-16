import React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import useSharedGeneralActions from "@/hooks/useWindowVisibility";
import InnerNavbarLinks from "./InnerNavbarLinks";

export default function InnerNavbarOptions({
  foundObject,
  handleElementClick,
  handleBack,
}: {
  foundObject: {
    title: string;
    links: {
      category: string;
      items: {
        name: string;
        url: string;
      }[];
    }[];
  };
  handleElementClick: (title: string) => void;
  handleBack: () => void;
}) {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const { handleClose } = useSharedGeneralActions();

  const handleOptionClick = (title: string) => {
    setSelectedOption(title);
  };

  return (
    foundObject && (
      <div className="bg-primaryColor fixed h-full w-[300px] z-10 left-0 top-0">
        <div className="flex items-center justify-between w-full pl-[10px] border-b-2 border-secondaryColor">
          <div className="flex items-center h-[50px]">
            <MdKeyboardArrowLeft
              onClick={handleBack}
              size="25px"
              color="white"
              className="cursor-pointer"
            />
            <span className="pl-[4px] text-[16px] font-[600] text-white ">
              {foundObject.title}
            </span>
          </div>
          <button className="pr-[20px]">
            <IoCloseSharp
              onClick={() => handleClose("navSidebar")}
              size="25px"
              color="white"
            />
          </button>
        </div>
        <nav className="bg-primaryColor">
          <ul className="flex flex-col w-full text-[18px] text-[white] bg-primaryColor">
            {foundObject.links.map((link, linkIndex) => (
              <li
                onClick={() => handleOptionClick(link.category)}
                key={linkIndex}
                className="sidebar-li"
              >
                {link.category}
                <MdKeyboardArrowRight size="25px" color="white" />
                {selectedOption === link.category && (
                  <InnerNavbarLinks
                    link={link}
                    handleBack={handleBack}
                    handleElementClick={handleElementClick}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  );
}
