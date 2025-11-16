import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useUIVisibility from "@/hooks/useUiVisibility";

export default function AuthSidebar() {
  const { authSidebarState, handleHideElement } = useUIVisibility();

  const handleOutsideClick = () => {
    if (authSidebarState) {
        handleHideElement("authSidebar");
    }
  };

  return (
    <>
      {authSidebarState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="fixed top-0 right-0 bottom-0 h-full w-[300px] z-10 bg-primaryColor">
            <div className="relative flex flex-col items-center justify-center gap-y-[10px] py-[20px] bg-secondaryColor font-medium">
              <Link
                className="flex items-center justify-center w-[200px] h-[35px] bg-transparent text-[#ffffff] border border-[#ffffff]"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="flex items-center justify-center w-[200px] h-[35px] bg-headerHover text-buttonTextColor"
                href="/register"
              >
                Register
              </Link>
              <IoCloseSharp
                onClick={() => handleHideElement("authSidebar")}
                size="25"
                className="absolute right-4 top-4 text-[#ffffff] cursor-pointer"
              />
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
