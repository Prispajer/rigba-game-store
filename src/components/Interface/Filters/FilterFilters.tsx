import {
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
  setPublishersIdArray,
} from "@/redux/slices/gamesFilterSlice";
import FilterByPrice from "./FilterByPrice";
import FilterByCategory from "./FilterByCategory";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useFetchGameData from "@/hooks/useFetchGameData";
import useSearchText from "@/hooks/useSearchText";

export default function FilterFilters({ position }: { position: string }) {
  const {
    publishersMenuState,
    platformsMenuState,
    genresMenuState,
    storesMenuState,
  } = useWindowVisibility();
  const {
    gamesFilterState,
    gamesGenresState,
    gamesPlatformsState,
    gamesStoresState,
    gamesPublishersState,
    handleFetchPublishers,
    handleFetchPlatforms,
    handleFetchGenres,
    handleFetchStores,
  } = useFetchGameData();
  const {
    searchGenreTextState,
    searchPlatformTextState,
    searchPublisherTextState,
    searchStoreTextState,
  } = useSearchText();

  return (
    <aside className={position}>
      <form>
        <FilterByPrice />
        <FilterByCategory
          menuElement="publishersMenu"
          menuElementState={publishersMenuState as boolean}
          borderStyle="border-b-2 border-secondaryColor"
          filterLabel="Publishers"
          searchText="searchPublisherText"
          searchTextState={searchPublisherTextState as string}
          apiFiltersArray={gamesPublishersState.publishersArray}
          selectedFiltersId={gamesFilterState.publishersIdArray}
          setSelectedFiltersId={setPublishersIdArray}
          handleFetchApiFilters={handleFetchPublishers}
        />
        <FilterByCategory
          menuElement="platformsMenu"
          menuElementState={platformsMenuState as boolean}
          borderStyle="border-b-2 border-secondaryColor"
          filterLabel="Platforms"
          searchText="searchPlatformText"
          searchTextState={searchPlatformTextState as string}
          apiFiltersArray={gamesPlatformsState.platformsArray}
          selectedFiltersId={gamesFilterState.platformsIdArray}
          setSelectedFiltersId={setPlatformsIdArray}
          handleFetchApiFilters={handleFetchPlatforms}
        />
        <FilterByCategory
          menuElement="genresMenu"
          menuElementState={genresMenuState as boolean}
          borderStyle="border-b-2 border-secondaryColor"
          filterLabel="Genres"
          searchText="searchGenreText"
          searchTextState={searchGenreTextState as string}
          apiFiltersArray={gamesGenresState.genresArray}
          selectedFiltersId={gamesFilterState.genresIdArray}
          setSelectedFiltersId={setGenresIdArray}
          handleFetchApiFilters={handleFetchGenres}
        />
        <FilterByCategory
          menuElement="storesMenu"
          menuElementState={storesMenuState as boolean}
          borderStyle=""
          filterLabel="Stores"
          searchText="searchStoreText"
          searchTextState={searchStoreTextState as string}
          apiFiltersArray={gamesStoresState.storesArray}
          selectedFiltersId={gamesFilterState.storesIdArray}
          setSelectedFiltersId={setStoresIdArray}
          handleFetchApiFilters={handleFetchStores}
        />
      </form>
    </aside>
  );
}
