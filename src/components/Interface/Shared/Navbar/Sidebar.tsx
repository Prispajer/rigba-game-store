import React from "react";
import Link from "next/link";
import { navLinks, NavLinks } from "@/data/links";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import Backdrop from "../Backdrop/Backdrop";
import useSharedGeneralActions from "@/redux/actions/useSharedGeneralActions";

export default function Sidebar() {
  const { navSidebarState, handleCloseSidebar } = useSharedGeneralActions();

  return (
    navSidebarState && (
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
            <span className="text-white text-[30px] md:text-[35px]">RIGBA</span>
          </div>
          <button>
            <IoCloseSharp
              onClick={() => handleCloseSidebar("navSidebar")}
              size="25px"
              color="white"
            />
          </button>
        </div>
        <nav className="bg-primaryColor">
          <ul className="flex flex-col  w-full  text-[18px] text-[white] bg-primaryColor">
            {navLinks.map((element: NavLinks, index: number) => (
              <Link key={index} href="/" passHref>
                <li className="sidebar-li">Sklep</li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    )
  );
}
