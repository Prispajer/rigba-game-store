import Image from "next/image";
import Link from "next/link";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function ProfileModalContainer() {
  const { profileModalState, handleClose } = useWindowVisibility();
  const user = useCurrentUser();

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
            <div className="flex items-center justify-between py-[15px] px-[20px] border-b-[1px]">
              <div>
                <Image
                  src="/icons/logo.png"
                  width={40}
                  height={40}
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col flex-1 ml-2 leading-[18px]">
                <span className="text-[#544d60] font-[650]">
                  enebian_7272846621715321
                </span>
                <span className="text-[#544d60]">duzykox123@gmail.com</span>
              </div>
            </div>
            <div>
              <Link className="text-[#544D60] border-b-[1px]" href="/wishlist">
                Lista życzeń
              </Link>
            </div>
            <div>
              <Link className="text-[#544D60] border-b-[1px]" href="/wishlist">
                Powrót do sklepu
              </Link>
            </div>
            <div>
              <Link className="text-[#544D60] border-b-[1px]" href="/wishlist">
                Wyloguj
              </Link>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
