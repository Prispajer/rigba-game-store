import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import useFetchGameData from "@/hooks/useFetchGameData";
import FilterModal from "./FilterModal";
import useSearchText from "@/hooks/useSearchText";
import {
  setPublishersIdArray,
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
} from "@/redux/slices/gamesFilterSlice";

export default function FilterSelectedFilters() {
  const {
    gamesFilterState,
    gamesPublishersState,
    gamesPlatformsState,
    gamesGenresState,
    gamesStoresState,
    handleRemoveAllFilters,
  } = useFetchGameData();
  const {
    searchGenreTextState,
    searchPlatformTextState,
    searchPublisherTextState,
    searchStoreTextState,
  } = useSearchText();

  const hasFilters =
    gamesFilterState.genresIdArray.length > 0 ||
    gamesFilterState.platformsIdArray.length > 0 ||
    gamesFilterState.publishersIdArray.length > 0 ||
    gamesFilterState.storesIdArray.length > 0;

  if (!hasFilters) {
    return null;
  }

  return (
    <div>
      <ul className="relative flex items-center gap-[10px] pb-[25px]">
        {gamesFilterState.publishersIdArray.length > 0 && (
          <li>
            <button className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]">
              <span className="mr-[2px]">
                Publishers ({gamesFilterState.publishersIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            <FilterModal
              searchText="searchPublisherText"
              searchState={searchPublisherTextState}
              apiFiltersArray={gamesPublishersState.data}
              selectedFiltersId={gamesFilterState.publishersIdArray}
              setSelectedFiltersId={setPublishersIdArray}
            />
          </li>
        )}
        {gamesFilterState.platformsIdArray.length > 0 && (
          <li>
            <button className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]">
              <span className="mr-[2px]">
                Platforms ({gamesFilterState.platformsIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            <FilterModal
              searchText="searchPlatformText"
              searchState={searchPlatformTextState}
              apiFiltersArray={gamesPlatformsState.data}
              selectedFiltersId={gamesFilterState.platformsIdArray}
              setSelectedFiltersId={setPlatformsIdArray}
            />
          </li>
        )}
        {gamesFilterState.genresIdArray.length > 0 && (
          <li>
            <button className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]">
              <span className="mr-[2px]">
                Genres ({gamesFilterState.genresIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            <FilterModal
              searchText="searchGenreText"
              searchState={searchGenreTextState}
              apiFiltersArray={gamesGenresState.data}
              selectedFiltersId={gamesFilterState.genresIdArray}
              setSelectedFiltersId={setGenresIdArray}
            />
          </li>
        )}
        {gamesFilterState.storesIdArray.length > 0 && (
          <li>
            <button className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]">
              <span className="mr-[2px]">
                Stores ({gamesFilterState.storesIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            <FilterModal
              searchText="searchStoreText"
              searchState={searchStoreTextState}
              apiFiltersArray={gamesStoresState.data}
              selectedFiltersId={gamesFilterState.storesIdArray}
              setSelectedFiltersId={setStoresIdArray}
            />
          </li>
        )}
        <li>
          <button
            onClick={handleRemoveAllFilters}
            className="text-[18px] text-modalHover"
          >
            Wyczyść wszystko
          </button>
        </li>
      </ul>
    </div>
  );
}
