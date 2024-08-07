"use client";
import React from "react";
import { MoonLoader } from "react-spinners";
import FilterFilters from "./FilterFilters";
import FilterSelectedFilters from "./FilterSelectedFilters";
import FilterProductList from "./FilterProductList";
import FilterChangePage from "./FilterChangePage";
import SortBy from "../Shared/ReusableComponents/SortBy";
import useCustomRouter from "@/hooks/useCustomRouter";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function FiltersContainer() {
  const { getUrlParams } = useCustomRouter();
  const {
    gamesFilterState,
    handleFetchGamesWithFilters,
    handleSetGenresIdArray,
    handleSetPlatformsIdArray,
    handleSetPublishersIdArray,
    handleSetStoresIdArray,
    handleFilterSortChange,
  } = useFetchGameData();

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
          <FilterFilters position="hidden md:flex flex-col md:max-w-[220px] min-w-[220px]" />
          <section className="w-full lg:w-[calc(100%-220px)]">
            <FilterSelectedFilters />
            <SortBy
              handleSortChange={handleFilterSortChange}
              sortedGamesCount={gamesFilterState.gamesCount}
              position="hidden md:flex relative"
              display="flex-1"
            />
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
