"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BiCartDownload } from "react-icons/bi";
import { IoKeySharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { toggleScreen } from "@/redux/slices/utilitySlice";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function AccountSidebar() {
  const {
    accountSidebarState,
    resolutionState,
    handleClose,
    handleToggleScreen,
  } = useWindowVisibility();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const windowScreen = window.innerWidth >= 768;
    dispatch(toggleScreen(windowScreen));

    const handleResize = () => handleToggleScreen(768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleToggleScreen, dispatch]);

  return (
    <>
      {accountSidebarState && !resolutionState && (
        <OutsideClickHandler
          handleOutsideClick={() => handleClose("accountSidebar")}
        >
          <aside className="fixed md:hidden left-0 top-0 w-full max-w-[400px] h-[100vh] z-10 bg-primaryColor">
            <nav className="relative flex flex-col items-center justify-center font-medium">
              <ul className="w-full">
                <div className="flex items-center justify-between px-4 py-2 border-b border-secondaryColor">
                  <Link
                    onClick={() => handleClose("accountSidebar")}
                    href="/"
                    className="flex items-center"
                  >
                    <Image
                      src="/icons/logo.png"
                      width="60"
                      height="90"
                      alt="logo"
                      priority
                    />
                    <span className="text-white text-2xl md:text-3xl ml-2">
                      RIGBA
                    </span>
                  </Link>
                  <button
                    onClick={() => handleClose("accountSidebar")}
                    className="text-white"
                  >
                    <IoCloseSharp size="25px" />
                  </button>
                </div>
                <li className="flex w-full">
                  <Link
                    onClick={() => handleClose("accountSidebar")}
                    className="flex-1 text-left text-[16px] text-[#F4F4F6]"
                    href="/login"
                  >
                    <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] tracking-wide hover:bg-secondaryColor">
                      <MdOutlineSupervisorAccount
                        className="mr-[8px] text-[16px] text-[#F4F4F6]"
                        size="25"
                      />
                      My account
                    </button>
                  </Link>
                </li>
                <li className="flex w-full">
                  <Link
                    onClick={() => handleClose("accountSidebar")}
                    className="flex-1 text-left text-[16px] text-[#F4F4F6]"
                    href="/orders"
                  >
                    <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] tracking-wide hover:bg-secondaryColor">
                      <BiCartDownload
                        className="mr-[8px] text-[16px] text-[#F4F4F6]"
                        size="25"
                      />
                      Orders
                    </button>
                  </Link>
                </li>
                <li className="flex w-full">
                  <Link
                    onClick={() => handleClose("accountSidebar")}
                    className="flex-1 text-left text-[16px] text-[#F4F4F6]"
                    href="/keys"
                  >
                    <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] tracking-wide hover:bg-secondaryColor">
                      <IoKeySharp
                        className="mr-[8px] text-[16px] text-[#F4F4F6]"
                        size="25"
                      />
                      Keys library
                    </button>
                  </Link>
                </li>
                <li className="flex w-full">
                  <Link
                    onClick={() => handleClose("accountSidebar")}
                    className="flex-1 text-left text-[16px] text-[#F4F4F6]"
                    href="/settings"
                  >
                    <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] tracking-wide hover:bg-secondaryColor">
                      <IoMdSettings
                        className="mr-[8px] text-[16px] text-[#F4F4F6]"
                        size="25"
                      />
                      Settings
                    </button>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </OutsideClickHandler>
      )}
    </>
  );
}
