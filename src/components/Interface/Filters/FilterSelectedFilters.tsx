import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import {
  setPublishersIdArray,
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
} from "@/redux/slices/gamesFilterSlice";
import FilterModalContainer from "../Shared/Modals/FilterModalContainer";
import useFetchGameData from "@/hooks/useFetchGameData";
import useSearchText from "@/hooks/useSearchText";
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
    handleOpen,
  } = useWindowVisibility();

  const hasFilters =
    gamesFilterState.genresIdArray.length > 0 ||
    gamesFilterState.platformsIdArray.length > 0 ||
    gamesFilterState.publishersIdArray.length > 0 ||
    gamesFilterState.storesIdArray.length > 0;

  const genreMatch = gamesFilterState.genresIdArray.includes(
    gamesGenresState.genresArray.find((id) => id)
  );
  const publishersMatch = gamesFilterState.genresIdArray.includes(
    gamesPublishersState.publishersArray.find((id) => id)
  );
  const platformsMatch = gamesFilterState.genresIdArray.includes(
    gamesPlatformsState.platformsArray.find((id) => id)
  );
  const storesMatch = gamesFilterState.genresIdArray.includes(
    gamesStoresState.storesArray.find((id) => id)
  );

  const includesId = genreMatch
    ? 1
    : hasFilters
    ? publishersMatch
      ? 2
      : platformsMatch
      ? 3
      : storesMatch
      ? 4
      : 0
    : 0;

  if (!hasFilters) {
    return null;
  }
  return (
    <div className="relative overflow-x-auto md:overflow-visible">
      <ul className="relative flex items-center flex-nowrap  gap-[10px] pb-[25px]">
        <li className="shrink-0">
          <button
            onClick={() => handleOpen("storesModal")}
            className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
          >
            <span className="flex items-center gap-x-[5px] mr-[2px]">
              <IoFilterSharp /> Sort and filter ({includesId})
            </span>
            <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
          </button>
          {storesModalState && (
            <FilterModalContainer
              filterLabel="Stores"
              searchText="searchStoreText"
              searchState={searchStoreTextState as string}
              apiFiltersArray={gamesStoresState.storesArray}
              selectedFiltersId={gamesFilterState.storesIdArray}
              setSelectedFiltersId={setStoresIdArray}
              clickedModal="storesModal"
            />
          )}
        </li>
        <div className="h-[30px] mx-[6px]">
          <span className="h-[30px] text-[#FFFFFF]">|</span>
        </div>
        {gamesFilterState.publishersIdArray.length > 0 && (
          <li className="shrink-0">
            <button
              onClick={() => handleOpen("publishersModal")}
              className="flex items-center  py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
            >
              <span className=" mr-[2px]">
                Publishers ({gamesFilterState.publishersIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            {publishersModalState && (
              <FilterModalContainer
                filterLabel="Publisher"
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
          <li className="shrink-0">
            <button
              onClick={() => handleOpen("platformsModal")}
              className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
            >
              <span className="mr-[2px]">
                Platforms ({gamesFilterState.platformsIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            {platformsModalState && (
              <FilterModalContainer
                filterLabel="Platforms"
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
          <li className="shrink-0">
            <button
              onClick={() => handleOpen("genresModal")}
              className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
            >
              <span className="mr-[2px]">
                Genres ({gamesFilterState.genresIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            {genresModalState && (
              <FilterModalContainer
                filterLabel="Genres"
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
          <li className="shrink-0">
            <button
              onClick={() => handleOpen("storesModal")}
              className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
            >
              <span className="mr-[2px]">
                Stores ({gamesFilterState.storesIdArray.length})
              </span>
              <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
            </button>
            {storesModalState && (
              <FilterModalContainer
                filterLabel="Stores"
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
        <li className="shrink-0 mx-[6px]">
          <button
            onClick={handleClearAllFilters}
            className="text-[18px] text-modalHover"
          >
            Clear all
          </button>
        </li>
      </ul>
    </div>
  );
}
