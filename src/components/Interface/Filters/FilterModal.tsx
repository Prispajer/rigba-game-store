import React from "react";
import useFetchGameData from "@/hooks/useFetchGameData";
import { FaSearch } from "react-icons/fa";
import UtilsService from "@/utils/classes/utilsService";
import IUtilsService from "@/utils/interfaces/iUtilsService";
import useSearchText from "@/hooks/useSearchText";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function FilterModal({
  searchText,
  searchState,
  apiFiltersArray,
  selectedFiltersId,
  setSelectedFiltersId,
  clickedModal,
}: {
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
  const { handleClose } = useWindowVisibility();
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

  return (
    <div
      ref={modalRef}
      className="absolute top-10 w-[320px] pt-[20px] pr-[12px] pb-[5px] pl-[15px] bg-filtersBackgroundColor text-[#FFFFFF] z-10 "
    >
      <div className="flex items-center flex-1 p-[8px] mb-[10px] border-[white] bg-secondaryColor ">
        <FaSearch size="25px" color="white" className="mr-3" />
        <input
          className="text-[white] border-none outline-none bg-transparent w-[100%]"
          onChange={(event) => handleSetSearchText(searchText, event)}
          placeholder="Wyszukaj"
          type="text"
          name="text"
          autoComplete="off"
        />
      </div>
      <ul className="scrollbar-filters max-h-[210px] pr-[8px] overflow-y-auto">
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
          Wyczyść wszystko
        </button>
      </div>
    </div>
  );
}
