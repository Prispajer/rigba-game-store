import { IoCloseSharp } from "react-icons/io5";
import FilterPanel from "../../../../features/products/components/Filters/FilterPanel";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import SortBy from "../ReusableComponents/SortBy";
import useUiVisibility from "@/hooks/useUiVisibility";
import useFetchGameData from "@/features/products/hooks/useFetchGameData";

export default function SortAndFilterSidebar() {
  const { productFilterState, handleFilterSortChange } = useFetchGameData();
  const { sortAndFilterModalState, handleHideElement } = useUiVisibility();

  return (
    <>
      {sortAndFilterModalState && (
        <OutsideClickHandler handleOutsideClick={() => sortAndFilterModalState && handleHideElement("sortAndFilterModal")}>
          <div className="fixed top-0 left-0 bottom-0 flex flex-col h-full w-full max-w-[300px] z-10 bg-filtersBackgroundColor">
            <div className="flex items-center justify-between py-[15px] px-[20px] border-b-2 border-secondaryColor">
              <span className="text-[18px] text-[#FFFFFF] font-bold">
                Sort and filter
              </span>
              <IoCloseSharp
                onClick={() => sortAndFilterModalState && handleHideElement("sortAndFilterModal")}
                size="25"
                className="text-[#ffffff] cursor-pointer"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              <SortBy
                handleSortChange={handleFilterSortChange}
                sortedGamesCount={productFilterState.gamesCount}
                position="flex flex-col flex-1 py-[15px] px-[20px] md:hidden relative border-b-2 border-secondaryColor"
                display="hidden"
              />
              <FilterPanel position="w-full bg-transparent" />
            </div>
            <div className="py-[15px] px-[20px] border-t-2 border-secondaryColor">
              <button
                onClick={() => handleHideElement("sortAndFilterModal")}
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
