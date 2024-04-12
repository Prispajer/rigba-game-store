import Image from "next/image";
import Link from "next/link";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import { CiHeart } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { IoReload } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { logout } from "@/utils/tools/logout";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function ProfileModalContainer() {
  const { profileModalState, handleClose } = useWindowVisibility();
  const user = useCurrentUser();

  console.log(profileModalState);

  const handleLogout = () => {
    logout();
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
          <div className="profile-modal">
            <div className="flex md:hidden  items-center py-[10px] relative px-[20px]">
              <div className="flex items-center flex-0">
                <Link className="flex items-center max-w-[200px]" href="/">
                  <Image
                    src="/icons/logo.png"
                    width={40}
                    height={40}
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
            <div className="flex items-center justify-between py-[15px] px-[20px] border-b-[1px]">
              <div>
                <Image
                  src="/icons/logo.png"
                  width={32}
                  height={32}
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col text-left flex-1 ml-2 leading-[18px]">
                <span className="text-[#544d60] text-[14px] font-[650]">
                  {user?.name}
                </span>
                <span className="text-[#544d60] text-[14px]">
                  {user?.email}
                </span>
              </div>
            </div>
            <div className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px]">
              <Link
                className="flex items-center  text-[15px] text-[#544D60]"
                href="/wishlist"
              >
                <CiHeart size="15px" className="mr-[8px]" />
                Lista życzeń
              </Link>
            </div>
            <div className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px]">
              <Link
                className="flex items-center text-[15px] text-[#544D60]"
                href="/"
              >
                <IoReload size="15px" className="mr-[8px]" />
                Powrót do sklepu
              </Link>
            </div>
            <div
              onClick={handleLogout}
              className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px] cursor-pointer"
            >
              <div className="flex items-center text-[15px] text-[#544D60]">
                <CiLogout size="15px" className="mr-[8px]" />
                Wyloguj
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
