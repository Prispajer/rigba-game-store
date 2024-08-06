import {
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
  setPublishersIdArray,
} from "@/redux/slices/gamesFilterSlice";
import FilterByPrice from "./FilterByPrice";
import FilterByCategory from "./FilterByCategory";
import useFetchGameData from "@/hooks/useFetchGameData";
import useSearchText from "@/hooks/useSearchText";

export default function FilterFilters({ position }: { position: string }) {
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
          filterLabel="Publishers"
          searchText="searchPublisherText"
          searchTextState={searchPublisherTextState as string}
          apiFiltersArray={gamesPublishersState.publishersArray}
          selectedFiltersId={gamesFilterState.publishersIdArray}
          setSelectedFiltersId={setPublishersIdArray}
          handleFetchApiFilters={handleFetchPublishers}
        />
        <FilterByCategory
          filterLabel="Platforms"
          searchText="searchPlatformText"
          searchTextState={searchPlatformTextState as string}
          apiFiltersArray={gamesPlatformsState.platformsArray}
          selectedFiltersId={gamesFilterState.platformsIdArray}
          setSelectedFiltersId={setPlatformsIdArray}
          handleFetchApiFilters={handleFetchPlatforms}
        />
        <FilterByCategory
          filterLabel="Genres"
          searchText="searchGenreText"
          searchTextState={searchGenreTextState as string}
          apiFiltersArray={gamesGenresState.genresArray}
          selectedFiltersId={gamesFilterState.genresIdArray}
          setSelectedFiltersId={setGenresIdArray}
          handleFetchApiFilters={handleFetchGenres}
        />
        <FilterByCategory
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
