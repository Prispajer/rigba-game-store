import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useFetchGameData from "@/hooks/useFetchGameData";
import useSearchText from "@/hooks/useSearchText";
import UtilsService from "@/services/UtilsService";
import IUtilsService from "@/utils/serverInterfaces/IUtilsService";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function FilterByCategory({
  menuElement,
  menuElementState,
  borderStyle,
  filterLabel,
  searchText,
  searchTextState,
  apiFiltersArray,
  selectedFiltersId,
  setSelectedFiltersId,
  handleFetchApiFilters,
}: {
  menuElement: string;
  menuElementState: boolean;
  borderStyle: string;
  filterLabel: string;
  searchText: string;
  searchTextState: string | boolean;
  apiFiltersArray: GameAPIResponse[];
  selectedFiltersId: number[];
  setSelectedFiltersId: ActionCreatorWithPayload<number[]>;
  handleFetchApiFilters: (quantity: number) => void;
}) {
  const [visibleItemsCount, setVisibleItemsCount] = React.useState<number>(10);
  const { handleToggle } = useWindowVisibility();
  const { handleFilterChange } = useFetchGameData();
  const { handleSetSearchText } = useSearchText();

  const utilsService: IUtilsService = new UtilsService(
    searchTextState as string
  );

  React.useEffect(() => {
    handleFetchApiFilters(7);
  }, []);

  const toggleVisibleItems = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setVisibleItemsCount((prevCount) =>
      prevCount === apiFiltersArray.length ? 10 : apiFiltersArray.length
    );
  };

  return (
    <>
      <div
        className={`py-[15px] px-[20px] text-[#ffffff] text-[16px] ${borderStyle} bg-filtersBackgroundColor`}
      >
        <div
          className="relative flex items-center max-w-[300px] cursor-pointer"
          onClick={() => handleToggle(menuElement)}
        >
          <span className="flex-1 text-[18px] text-[#FFFFFF] font-bold">
            {filterLabel}
          </span>
          {selectedFiltersId.length ? (
            <span className="flex justify-center items-center min-w-[18px] h-[18px] mr-[4px] py-[10px] px-[6px] text-[14px] font-[700] rounded-full text-[#464343] bg-[#e2999b]">
              {selectedFiltersId.length}
            </span>
          ) : (
            ""
          )}
          {menuElementState ? (
            <MdKeyboardArrowUp size="25px" />
          ) : (
            <MdKeyboardArrowDown size="25px" />
          )}
        </div>
        {menuElementState && (
          <>
            <div className="flex items-center flex-1 p-[8px] my-[10px] border-[white] bg-secondaryColor">
              <FaSearch size="25px" color="white" className="mr-3" />
              <input
                className="text-[white] border-none outline-none bg-transparent w-[100%]"
                onChange={(event) => handleSetSearchText(searchText, event)}
                type="text"
                name="text"
                autoComplete="off"
              />
            </div>
            <div className="flex items-center">
              <ul className="w-full">
                {utilsService
                  .searchByString(apiFiltersArray)
                  .slice(0, visibleItemsCount)
                  .map((filterItem) => (
                    <li
                      key={filterItem.id}
                      className="flex justify-between items-center mb-[10px]"
                    >
                      <input
                        className="flex-0"
                        type="checkbox"
                        checked={selectedFiltersId.includes(filterItem.id)}
                        onClick={() =>
                          handleFilterChange(
                            filterItem.id,
                            selectedFiltersId,
                            setSelectedFiltersId
                          )
                        }
                      />
                      <span className="flex-1 px-[10px] font-[600]">
                        {filterItem.name}
                      </span>
                      <span className="flex-0 text-[#ffffffB3] text-end">
                        {filterItem.games_count}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <button
              type="button"
              className="flex items-center w-full text-[#dc8588] hover:text-[#d77174]"
              onClick={toggleVisibleItems}
            >
              {visibleItemsCount === apiFiltersArray.length ? (
                <>
                  <span className="font-[700]">Show less</span>
                  <MdKeyboardArrowUp className="mt-[2px]" size="25px" />
                </>
              ) : (
                <>
                  <span className="font-[700]">Show more</span>
                  <MdKeyboardArrowDown className="mt-[2px]" size="25px" />
                </>
              )}
            </button>
          </>
        )}
      </div>
    </>
  );
}
