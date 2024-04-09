import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import useSharedGeneralActions from "@/hooks/useWindowVisibility";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";

export default function ProfileSidebar() {
  const { userSidebarState, handleClose } = useSharedGeneralActions();

  const handleOutsideClick = () => {
    if (userSidebarState) {
      handleClose("userSidebar");
    }
  };

  return (
    <>
      {userSidebarState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="fixed top-0 right-0 bottom-0 h-full w-[300px] z-10 bg-primaryColor">
            <div className="relative flex flex-col items-center justify-center gap-y-[10px] py-[20px] bg-secondaryColor font-medium">
              <Link
                className="flex items-center justify-center w-[200px] h-[35px] bg-transparent text-[#ffffff] border border-[#ffffff]"
                href="/login"
              >
                Zaloguj
              </Link>
              <Link
                className="flex items-center justify-center w-[200px] h-[35px] bg-headerHover text-buttonTextColor"
                href="/register"
              >
                Zarejestruj
              </Link>
              <IoCloseSharp
                onClick={() => handleClose("userSidebar")}
                size="25px"
                className="absolute right-4 top-4 text-[#ffffff] cursor-pointer"
              />
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
