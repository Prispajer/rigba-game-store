"use client";

import Link from "next/link";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import ProfileModalContainer from "@/components/Interface/Shared/Modals/ProfileModalContainer";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function AccountHeader() {
  const { handleOpen } = useWindowVisibility();
  const { user } = useCurrentUser();

  return (
    <header className="flex justify-between items-center py-2 px-4 bg-primaryColor">
      <div className="flex items-center">
        <RxHamburgerMenu
          onClick={() => handleOpen("accountSidebar")}
          size="30px"
          className="flex md:hidden mx-[6px] text-[#ffffff] cursor-pointer"
        />
        <Link className="flex items-center max-w-[200px]" href="/">
          <Image
            src="/icons/logo.png"
            width="60"
            height="60"
            alt="logo"
            priority
          />
          <span className="text-[30px] text-white">RIGBA</span>
        </Link>
      </div>
      <div>
        <button
          onClick={() => handleOpen("profileModal")}
          className="flex items-center"
        >
          <span className="hidden md:flex pr-3 text-[#ffffff] font-[600]">
            {user?.email}
          </span>
          <div className="relative min-w-[40px] min-h-[40px] rounded-full overflow-hidden">
            <Image
              src={user?.image || "/icons/logo.png"}
              alt={(user?.image as string) || "image"}
              loading="eager"
              fill={true}
              className="min-w-[40px] min-h-[40px]"
            />
          </div>
        </button>
        <ProfileModalContainer />
      </div>
    </header>
  );
}
