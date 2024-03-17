import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import useSharedGeneralActions from "@/redux/actions/useSharedGeneralActions";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";

export default function SearchSidebar() {
  const { searchSidebarState, handleClose } = useSharedGeneralActions();

  const handleOutsideClick = () => {
    if (searchSidebarState) {
      handleClose("searchSidebar");
    }
  };

  return (
    <>
      {searchSidebarState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="fixed top-0 right-0 bottom-0 h-full w-full z-10 bg-primaryColor">
            <div className="flex  items-center gap-y-[10px] py-[20px] bg-primaryColor font-medium border-b-secondaryColor border-b-2">
              <FaSearch size="30px" color="white" className="mx-2" />
              <input
                className="text-[white] border-none outline-none bg-transparent w-[100%]"
                type="text"
                name="text"
                placeholder="Szukaj"
                autoComplete="off"
              />
              <IoCloseSharp
                size="30px"
                color="white"
                className="mx-2"
                onClick={() => handleClose("searchSidebar")}
              />
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
