import { IoCloseSharp } from "react-icons/io5";
import FilterFilters from "../../Filters/FilterFilters";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useSharedGeneralActions from "@/hooks/useWindowVisibility";

export default function SortAndFilterSidebar() {
  const { sortAndFilterModalState, handleClose } = useSharedGeneralActions();

  const handleOutsideClick = () => {
    if (sortAndFilterModalState) {
      handleClose("sortAndFilterModal");
    }
  };

  return (
    <>
      {sortAndFilterModalState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="fixed top-0 left-0 bottom-0 h-full w-[300px] z-10 bg-primaryColor flex flex-col">
            <div className="flex items-center justify-between py-[15px] px-[20px] border-b-2 border-secondaryColor">
              <span className="text-[18px] text-[#FFFFFF] font-bold">
                Sort and filter
              </span>
              <IoCloseSharp
                onClick={() => handleClose("sortAndFilterModal")}
                size="25"
                className="text-[#ffffff] cursor-pointer"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterFilters position="w-full h-full bg-transparent" />
            </div>
            <div className="py-[15px] px-[20px] border-t-2 border-secondaryColor">
              <button
                onClick={() => handleClose("sortAndFilterModal")}
                className="min-h-[40px] w-full text-[18px] border-[1px] border-buttonBackground hover:bg-buttonBackgroundHover bg-buttonBackground text-buttonTextColor font-bold "
              >
                Show results
              </button>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
