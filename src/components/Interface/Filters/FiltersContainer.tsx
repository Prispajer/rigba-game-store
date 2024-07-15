"use client";
import React from "react";
import useFetchGameData from "@/hooks/useFetchGameData";
import useCustomRouter from "@/hooks/useCustomRouter";
import FilterByPrice from "./FilterByPrice";
import FilterByPublisher from "./FilterByPublisher";
import FilterByGenre from "./FilterByGenre";
import FilterByPlatform from "./FilterByPlatform";
import FilterByStore from "./FilterByStore";
import FilterSelectedFilters from "./FilterSelectedFilters";
import FilterSortBy from "./FilterSortBy";
import FilterProductList from "./FilterProductList";
import FilterChangePage from "./FilterChangePage";
import { MoonLoader } from "react-spinners";

export default function FiltersContainer() {
  const {
    gamesFilterState,
    handleFetchGamesWithFilters,
    handleSetGenresIdArray,
    handleSetPlatformsIdArray,
    handleSetPublishersIdArray,
    handleSetStoresIdArray,
  } = useFetchGameData();
  const { getUrlParams } = useCustomRouter();

  React.useEffect(() => {
    handleSetGenresIdArray(getUrlParams("genres"));
    handleSetPlatformsIdArray(getUrlParams("platforms"));
    handleSetPublishersIdArray(getUrlParams("publishers"));
    handleSetStoresIdArray(getUrlParams("stores"));
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
              <FilterByPublisher />
              <FilterByPlatform />
              <FilterByGenre />
              <FilterByStore />
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
