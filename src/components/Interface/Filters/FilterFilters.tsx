import React from "react";
import {
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
  setPublishersIdArray,
} from "@/features/products/redux/slices/filters/filtersSlice";
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
    productFilterState,
    productGenresState,
    productPlatformsState,
    productStoresState,
    productPublishersState,
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
          apiFiltersArray={productPublishersState.publishersArray}
          selectedFiltersId={productFilterState.publishersIdArray}
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
          apiFiltersArray={productPlatformsState.platformsArray}
          selectedFiltersId={productFilterState.platformsIdArray}
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
          apiFiltersArray={productGenresState.genresArray}
          selectedFiltersId={productFilterState.genresIdArray}
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
          apiFiltersArray={productStoresState.storesArray}
          selectedFiltersId={productFilterState.storesIdArray}
          setSelectedFiltersId={setStoresIdArray}
          handleFetchApiFilters={handleFetchStores}
        />
      </form>
    </aside>
  );
}
