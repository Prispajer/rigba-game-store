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
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function FilterSelectedFilters() {
  const {
    gamesFilterState,
    gamesPublishersState,
    gamesPlatformsState,
    gamesGenresState,
    gamesStoresState,
    handleClearAllFilters,
  } = useFetchGameData();
  const {
    searchGenreTextState,
    searchPlatformTextState,
    searchPublisherTextState,
    searchStoreTextState,
  } = useSearchText();
  const {
    publishersModalState,
    platformsModalState,
    genresModalState,
    storesModalState,
    handleToggle,
  } = useWindowVisibility();

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
            <button
              onClick={() => handleToggle("publishersModal")}
              className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
            >
              <span className="mr-[2px]">
                Publishers ({gamesFilterState.publishersIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            {publishersModalState && (
              <FilterModal
                searchText="searchPublisherText"
                searchState={searchPublisherTextState as string}
                apiFiltersArray={gamesPublishersState.publishersArray}
                selectedFiltersId={gamesFilterState.publishersIdArray}
                setSelectedFiltersId={setPublishersIdArray}
                clickedModal="publishersModal"
              />
            )}
          </li>
        )}
        {gamesFilterState.platformsIdArray.length > 0 && (
          <li>
            <button
              onClick={() => handleToggle("platformsModal")}
              className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
            >
              <span className="mr-[2px]">
                Platforms ({gamesFilterState.platformsIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            {platformsModalState && (
              <FilterModal
                searchText="searchPlatformText"
                searchState={searchPlatformTextState as string}
                apiFiltersArray={gamesPlatformsState.platformsArray}
                selectedFiltersId={gamesFilterState.platformsIdArray}
                setSelectedFiltersId={setPlatformsIdArray}
                clickedModal="platformsModal"
              />
            )}
          </li>
        )}
        {gamesFilterState.genresIdArray.length > 0 && (
          <li>
            <button
              onClick={() => handleToggle("genresModal")}
              className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
            >
              <span className="mr-[2px]">
                Genres ({gamesFilterState.genresIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            {genresModalState && (
              <FilterModal
                searchText="searchGenreText"
                searchState={searchGenreTextState as string}
                apiFiltersArray={gamesGenresState.genresArray}
                selectedFiltersId={gamesFilterState.genresIdArray}
                setSelectedFiltersId={setGenresIdArray}
                clickedModal="genresModal"
              />
            )}
          </li>
        )}
        {gamesFilterState.storesIdArray.length > 0 && (
          <li>
            <button
              onClick={() => handleToggle("storesModal")}
              className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
            >
              <span className="mr-[2px]">
                Stores ({gamesFilterState.storesIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            {storesModalState && (
              <FilterModal
                searchText="searchStoreText"
                searchState={searchStoreTextState as string}
                apiFiltersArray={gamesStoresState.storesArray}
                selectedFiltersId={gamesFilterState.storesIdArray}
                setSelectedFiltersId={setStoresIdArray}
                clickedModal="storesModal"
              />
            )}
          </li>
        )}
        <li>
          <button
            onClick={handleClearAllFilters}
            className="text-[18px] text-modalHover"
          >
            Wyczyść wszystko
          </button>
        </li>
      </ul>
    </div>
  );
}
