import React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import useSharedGeneralActions from "@/hooks/useWindowVisibility";

export default function InnerNavbarLinks({
  handleBack,
  handleElementClick,
  link,
}: {
  handleBack: () => void;
  handleElementClick: (title: string) => void;
  link: {
    category: string;
    items: {
      name: string;
      url: string;
    }[];
  };
}) {
  const { handleClose } = useSharedGeneralActions();
  return (
    <>
      {link.category && (
        <div className="bg-primaryColor fixed h-full w-[300px] z-10 left-0 top-0">
          <div>
            <div className="flex items-center justify-between w-full pl-[10px] border-b-2 border-secondaryColor">
              <div className="flex items-center h-[50px]">
                <MdKeyboardArrowLeft
                  onClick={handleBack}
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
                  onClick={() => handleClose("navSidebar")}
                  size="25px"
                  color="white"
                />
              </button>
            </div>
            <nav className="bg-primaryColor">
              <ul className="flex flex-col w-full text-[18px] text-[white] bg-primaryColor">
                {link.items.map((item, itemIndex) => (
                  <li
                    onClick={() => handleElementClick(item.name)}
                    key={itemIndex}
                    className="sidebar-li"
                  >
                    <Link
                      className="flex items-center w-full h-full"
                      href={item.url}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
