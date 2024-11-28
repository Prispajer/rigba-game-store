import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CiHeart, CiLogout } from "react-icons/ci";
import { IoReload, IoCloseSharp, IoPersonOutline } from "react-icons/io5";
import { TbShoppingCartCopy } from "react-icons/tb";
import { LuGamepad2 } from "react-icons/lu";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { ProfileModalContainerProps } from "@/utils/helpers/types";

export const defaultNavItems = [
  { href: "/wishlist", icon: CiHeart, label: "Wishlist" },
  { href: "/", icon: IoReload, label: "Back to shop" },
];

export const extendedNavItems = [
  ...defaultNavItems,
  { href: "/account", icon: IoPersonOutline, label: "My account" },
  { href: "/orders", icon: TbShoppingCartCopy, label: "Orders" },
  { href: "/keys", icon: LuGamepad2, label: "Key library" },
];

export default function ProfileModalContainer({
  navItems = defaultNavItems,
  translateX = "md:translate-x-[-2px]",
  translateY = "md:translate-y-[80px]",
}: ProfileModalContainerProps) {
  const { profileModalState, handleClose } = useWindowVisibility();
  const { user } = useCurrentUser();

  const handleLogout = () => {
    signOut();
  };

  const handleOutsideClick = () => {
    if (profileModalState) {
      handleClose("profileModal");
    }
  };

  return (
    <>
      {profileModalState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div
            className={`profile-modal ${
              profileModalState && `${translateX} ${translateY}`
            }`}
          >
            <div className="flex md:hidden items-center py-[10px] relative  px-[20px]">
              <div className="flex items-center flex-0">
                <Link
                  className="flex items-center max-w-[200px] rounded-full overflow-hidden"
                  href="/"
                >
                  <Image
                    src={user?.image ?? "/icons/logo.png"}
                    width="40"
                    height="40"
                    alt="logo"
                  />
                  <span className="text-[20px] text-black">RIGBA</span>
                </Link>
              </div>
              <div className="flex items-center flex-1 justify-end">
                <button>
                  <IoCloseSharp
                    onClick={() => handleClose("profileModal")}
                    size="26px"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-[15px] px-[20px] rounded-full overflow-hidden border-b-[1px]">
              <div className="rounded-full overflow-hidden">
                <Image
                  src={user?.image ?? "/icons/logo.png"}
                  width={32}
                  height={32}
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col text-left flex-1 ml-2 leading-[18px] cursor-default">
                <span className="text-[#544d60] text-[14px] font-[650]">
                  {user?.name}
                </span>
                <span className="text-[#544d60] text-[14px]">
                  {user?.email}
                </span>
              </div>
            </div>
            {navItems.map((item) => (
              <div
                key={item.href}
                className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px]"
              >
                <Link
                  onClick={() => handleClose("profileModal")}
                  className="flex items-center text-[15px] text-[#544D60]"
                  href={item.href}
                >
                  <item.icon size="15px" className="mr-[8px]" />
                  {item.label}
                </Link>
              </div>
            ))}
            <div
              onClick={handleLogout}
              className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px] cursor-pointer"
            >
              <div className="flex items-center text-[15px] text-[#544D60]">
                <CiLogout size="15px" className="mr-[8px]" />
                Logout
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
