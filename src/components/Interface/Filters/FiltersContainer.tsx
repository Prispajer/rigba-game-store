"use client";
import React from "react";
import FilterByCategory from "./FilterByCategory";
import FilterSelectedFilters from "./FilterSelectedFilters";
import FilterSortBy from "./FilterSortBy";
import FilterProductList from "./FilterProductList";
import FilterChangePage from "./FilterChangePage";
import FilterByPrice from "./FilterByPrice";
import useFetchGameData from "@/hooks/useFetchGameData";
import {
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
  setPublishersIdArray,
} from "@/redux/slices/gamesFilterSlice";
import useSearchText from "@/hooks/useSearchText";
import { MoonLoader } from "react-spinners";
import useCustomRouter from "@/hooks/useCustomRouter";

export default function FiltersContainer() {
  const { getUrlParams } = useCustomRouter();
  const {
    gamesFilterState,
    gamesGenresState,
    gamesPlatformsState,
    gamesStoresState,
    gamesPublishersState,
    handleFetchGamesWithFilters,
    handleFetchPublishers,
    handleFetchPlatforms,
    handleFetchGenres,
    handleFetchStores,
    handleSetGenresIdArray,
    handleSetPlatformsIdArray,
    handleSetPublishersIdArray,
    handleSetStoresIdArray,
  } = useFetchGameData();

  const {
    searchGenreTextState,
    searchPlatformTextState,
    searchPublisherTextState,
    searchStoreTextState,
  } = useSearchText();

  React.useEffect(() => {
    handleSetGenresIdArray(getUrlParams("genres"));
    handleSetPlatformsIdArray(getUrlParams("platforms"));
    handleSetStoresIdArray(getUrlParams("stores"));
    handleSetPublishersIdArray(getUrlParams("publishers"));
    handleFetchGamesWithFilters(gamesFilterState.page);
  }, []);

  return (
    <main className="flex items-center w-full h-full bg-primaryColor mx-auto">
      <section className="flex flex-col w-full max-w-[1240px] mx-auto my-[30px] px-2">
        <div>
          <h2 className="text-[34px] font-bold text-[#ffffff] cursor-default">
            Store
          </h2>
        </div>
        <div className="flex w-full my-[20px] gap-x-[20px]">
          <aside className="hidden lg:block lg:h-auto lg:max-w-[220px]">
            <form className="bg-filtersBackgroundColor">
              <FilterByPrice />
              <FilterByCategory
                filterLabel="Publisher"
                searchText="searchPublisherText"
                searchTextState={searchPublisherTextState as string}
                apiFiltersArray={gamesPublishersState.publishersArray}
                selectedFiltersId={gamesFilterState.publishersIdArray}
                setSelectedFiltersId={setPublishersIdArray}
                handleFetchApiFilters={handleFetchPublishers}
              />
              <FilterByCategory
                filterLabel="Platform"
                searchText="searchPlatformText"
                searchTextState={searchPlatformTextState as string}
                apiFiltersArray={gamesPlatformsState.platformsArray}
                selectedFiltersId={gamesFilterState.platformsIdArray}
                setSelectedFiltersId={setPlatformsIdArray}
                handleFetchApiFilters={handleFetchPlatforms}
              />
              <FilterByCategory
                filterLabel="Genre"
                searchText="searchGenreText"
                searchTextState={searchGenreTextState as string}
                apiFiltersArray={gamesGenresState.genresArray}
                selectedFiltersId={gamesFilterState.genresIdArray}
                setSelectedFiltersId={setGenresIdArray}
                handleFetchApiFilters={handleFetchGenres}
              />
              <FilterByCategory
                filterLabel="Store"
                searchText="searchStoreText"
                searchTextState={searchStoreTextState as string}
                apiFiltersArray={gamesStoresState.storesArray}
                selectedFiltersId={gamesFilterState.storesIdArray}
                setSelectedFiltersId={setStoresIdArray}
                handleFetchApiFilters={handleFetchStores}
              />
            </form>
          </aside>
          <section className="w-full lg:w-[calc(100%-220px)]">
            <FilterSelectedFilters />
            <FilterSortBy />
            {gamesFilterState.isLoading ? (
              <div className="flex items-center justify-center">
                <MoonLoader color="pink" />
              </div>
            ) : gamesFilterState.error ? (
              <div className="flex items-center justify-center">
                Error: {gamesFilterState.error}
              </div>
            ) : (
              <FilterProductList />
            )}
            <FilterChangePage />
          </section>
        </div>
      </section>
    </main>
  );
}
