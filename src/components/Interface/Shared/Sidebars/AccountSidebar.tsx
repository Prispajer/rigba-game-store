"use client";

import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BiCartDownload } from "react-icons/bi";
import { IoKeySharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function AccountSidebar() {
  const { accountSidebarState, handleClose } = useWindowVisibility();

  const handleOutsideClick = () => {
    if (accountSidebarState) {
      handleClose("accountSidebar");
    }
  };

  return (
    <>
      {accountSidebarState && (
        <aside className="flex flex-col w-[240px] bg-primaryColor">
          <nav className="relative flex flex-col items-center justify-center gap-y-[10px] py-[20px]  font-medium">
            <ul className="w-full">
              <li className="flex w-full">
                <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] tracking-wide hover:bg-secondaryColor">
                  <MdOutlineSupervisorAccount
                    className="mr-[8px] text-[16px] text-[#F4F4F6]"
                    size="25"
                  />

                  <Link
                    className="flex-1 mr-[20px] text-left text-[16px] text-[#F4F4F6]"
                    href="/login"
                  >
                    My account
                  </Link>
                  <MdKeyboardArrowDown
                    size="25"
                    className="text-[16px] text-[#F4F4F6]"
                  />
                </button>
              </li>
              <li className="flex w-full">
                <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] tracking-wide hover:bg-secondaryColor">
                  <BiCartDownload
                    className="mr-[8px] text-[16px] text-[#F4F4F6]"
                    size="25"
                  />

                  <Link
                    className="flex-1 mr-[20px] text-left text-[16px] text-[#F4F4F6]"
                    href="/orders"
                  >
                    Orders
                  </Link>
                </button>
              </li>
              <li className="flex w-full">
                <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] tracking-wide hover:bg-secondaryColor">
                  <IoKeySharp
                    className="mr-[8px] text-[16px] text-[#F4F4F6]"
                    size="25"
                  />

                  <Link
                    className="flex-1 mr-[20px] text-left text-[16px] text-[#F4F4F6]"
                    href="/keys"
                  >
                    Keys library
                  </Link>
                </button>
              </li>
              <li className="flex w-full">
                <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] tracking-wide hover:bg-secondaryColor">
                  <IoMdSettings
                    className="mr-[8px] text-[16px] text-[#F4F4F6]"
                    size="25"
                  />

                  <Link
                    className="flex-1 mr-[20px] text-left text-[16px] text-[#F4F4F6]"
                    href="/login"
                  >
                    Settings
                  </Link>
                  <MdKeyboardArrowDown
                    size="25"
                    className="text-[16px] text-[#F4F4F6]"
                  />
                </button>
              </li>
            </ul>
            {/* <IoCloseSharp
              onClick={() => handleClose("accountSidebar")}
              size="25"
              className="absolute right-4 top-4 text-[#ffffff] cursor-pointer"
            /> */}
          </nav>
        </aside>
      )}
    </>
  );
}
