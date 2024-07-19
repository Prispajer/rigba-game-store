import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import useFetchGameData from "@/hooks/useFetchGameData";
import useSearchText from "@/hooks/useSearchText";
import UtilsService from "@/utils/classes/utilsService";
import IUtilsService from "@/utils/interfaces/iUtilsService";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function FilterByCategory({
  filterLabel,
  searchText,
  searchTextState,
  apiFiltersArray,
  selectedFiltersId,
  setSelectedFiltersId,
  handleFetchApiFilters,
}: {
  filterLabel: string;
  searchText: string;
  searchTextState: string | boolean;
  apiFiltersArray: GameAPIResponse[];
  selectedFiltersId: number[];
  setSelectedFiltersId: ActionCreatorWithPayload<number[]>;
  handleFetchApiFilters: (quantity: number) => void;
}) {
  const { handleFilterChange } = useFetchGameData();
  const { handleSetSearchText } = useSearchText();

  const utilsService: IUtilsService = new UtilsService(
    searchTextState as string
  );

  React.useEffect(() => {
    handleFetchApiFilters(1);
  }, []);

  return (
    <>
      <div className="py-[15px] px-[20px] text-[#ffffff] text-[16px]  border-b-[2px] border-b-primaryColor">
        <div className="flex items-center justify-between max-w-[300px] pb-[10px] cursor-pointer">
          <span>{filterLabel}</span>
          <MdKeyboardArrowDown size="25px" />
        </div>
        <div className="flex items-center  flex-1 p-[8px] mb-[10px] border-[white]   bg-secondaryColor ">
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
            {utilsService.searchByString(apiFiltersArray).map((filterItem) => (
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
      </div>
    </>
  );
}
