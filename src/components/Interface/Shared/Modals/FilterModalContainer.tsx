import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useFetchGameData from "@/hooks/useFetchGameData";
import useSearchText from "@/hooks/useSearchText";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import UtilsService from "@/services/UtilsService";
import IUtilsService from "@/interfaces/IUtilsService";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function FilterModalContainer({
  filterLabel,
  searchText,
  searchState,
  apiFiltersArray,
  selectedFiltersId,
  setSelectedFiltersId,
  clickedModal,
}: {
  filterLabel: string;
  searchText: string;
  searchState: string | boolean;
  apiFiltersArray: GameAPIResponse[];
  selectedFiltersId: number[];
  setSelectedFiltersId: ActionCreatorWithPayload<number[]>;
  clickedModal: string;
}) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { handleFilterChange, handleClearSelectedFilter } = useFetchGameData();
  const { handleSetSearchText } = useSearchText();
  const { resolutionState, handleClose } = useWindowVisibility();
  const utilsService: IUtilsService = new UtilsService(searchState as string);

  React.useEffect(() => {
    const handleRef = (event: MouseEvent) => {
      if (!modalRef.current?.contains(event.target as Node)) {
        handleClose(clickedModal);
      }
    };

    document.addEventListener("click", handleRef);

    return () => {
      document.removeEventListener("click", handleRef);
    };
  }, [handleClose, clickedModal]);

  const handleOutsideCLick = () => {
    handleClose(clickedModal);
  };

  return resolutionState ? (
    <div
      ref={modalRef}
      className="absolute top-10 w-[320px] pt-[20px] pr-[12px] pb-[5px] pl-[15px] bg-filtersBackgroundColor text-[#FFFFFF] z-10"
    >
      <div className="flex items-center flex-1 p-[8px] mb-[10px] border-[white] bg-secondaryColor shadow-md">
        <FaSearch size="25px" color="white" className="mr-3" />
        <input
          className="w-[100%] text-[white] border-none outline-none bg-transparent"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSetSearchText(searchText, event)
          }
          placeholder="Search..."
          type="text"
          name="text"
          autoComplete="off"
        />
      </div>
      <ul className="scrollbar-filters-modal md:max-h-[210px] pr-[8px] overflow-y-auto">
        {utilsService.searchByString(apiFiltersArray).map((filter) => (
          <li
            key={filter.id}
            className="flex justify-between items-center mb-[10px]"
          >
            <input
              className="flex-0"
              type="checkbox"
              checked={selectedFiltersId.includes(filter.id)}
              onClick={() =>
                handleFilterChange(
                  filter.id,
                  selectedFiltersId,
                  setSelectedFiltersId
                )
              }
            />
            <span className="flex-1 px-[10px] font-[600]">{filter.name}</span>
            <span className="flex-0 text-[#ffffffB3] text-end">
              {filter.games_count}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center py-[10px] border-t-[2px] border-[#ffffff1a]">
        <button
          onClick={() => handleClearSelectedFilter(setSelectedFiltersId)}
          className="text-[18px] text-modalHover"
        >
          Clear all
        </button>
      </div>
    </div>
  ) : (
    <OutsideClickHandler handleOutsideClick={handleOutsideCLick}>
      <div
        ref={modalRef}
        className="fixed bottom-0 left-0 w-full sm:min-h-min max-h-[calc(100%-60px)] p-[10px] bg-filtersBackgroundColor text-[#FFFFFF] z-10"
      >
        <div className="relative flex items-center justify-center w-full h-[55px]">
          <span className="text-[19px] font-[700]">{filterLabel}</span>
          <div className="absolute flex items-center h-full w-[55px] right-0 top-0">
            <IoCloseSharp
              onClick={() => handleClose(clickedModal)}
              className="w-full"
              size="25"
            />
          </div>
        </div>
        <div className="flex items-center flex-1 p-[8px] mt-[10px] mb-[20px] border-[white] bg-secondaryColor shadow-md">
          <FaSearch size="25px" color="white" className="mr-3" />
          <input
            className="text-[white] border-none outline-none bg-transparent"
            onChange={(event) => handleSetSearchText(searchText, event)}
            placeholder="Search..."
            type="text"
            name="text"
            autoComplete="off"
          />
        </div>
        <ul className="scrollbar-filters-modal max-h-[500px] sm:max-h-[210px] pr-[8px] overflow-y-auto">
          {utilsService.searchByString(apiFiltersArray).map((filter) => (
            <li
              key={filter.id}
              className="flex justify-between items-center mb-[10px]"
            >
              <input
                className="flex-0"
                type="checkbox"
                checked={selectedFiltersId.includes(filter.id)}
                onClick={() =>
                  handleFilterChange(
                    filter.id,
                    selectedFiltersId,
                    setSelectedFiltersId
                  )
                }
              />
              <span className="flex-1 px-[10px] font-[600]">{filter.name}</span>
              <span className="flex-0 text-[#ffffffB3] text-end">
                {filter.games_count}
              </span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 py-[10px] gap-x-[10px] border-t-[2px] border-[#ffffff1a]">
          <button
            onClick={() => handleClearSelectedFilter(setSelectedFiltersId)}
            className="min-h-[35px] text-[16px] border-[1px] border-[#FFFFFF] bg-transparent text-[#FFFFFF] font-[700]"
          >
            Clear all
          </button>
          <button
            onClick={() => handleClose(clickedModal)}
            className="min-h-[35px] text-[16px] border-[1px] border-buttonBackground hover:bg-buttonBackgroundHover bg-buttonBackground text-buttonTextColor font-[700]"
          >
            Show results
          </button>
        </div>
      </div>
    </OutsideClickHandler>
  );
}
