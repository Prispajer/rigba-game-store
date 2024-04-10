"use client";

import Link from "next/link";
import Image from "next/image";
import ProfileModalContainer from "@/components/Interface/Shared/ProfileModal/ProfileModalContainer";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function AccountNavbar() {
  const { handleOpen } = useWindowVisibility();
  return (
    <header className="flex justify-between items-center py-2 px-4 bg-secondaryColor">
      <div>
        <Link className="flex items-center max-w-[200px]" href="/">
          <Image
            src="/icons/logo.png"
            width={60}
            height={60}
            alt="logo"
            priority={true}
          />
          <span className="text-[30px] text-white">RIGBA</span>
        </Link>
      </div>
      <div>
        <button
          onClick={() => handleOpen("profileModal")}
          className="flex items-center"
        >
          <ProfileModalContainer />
          <span className="hidden md:flex pr-3 text-[#ffffff] font-[600]">
            duzykox123@gmail.com
          </span>
          <Image
            src="/icons/logo.png"
            width={40}
            height={40}
            alt="user"
          ></Image>
        </button>
      </div>
    </header>
  );
}
