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
  const { params, getUrlParams, pushDataToUrl } = useCustomRouter();
  const {
    productFilterState,
    handleFetchProductsWithFilters,
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
  }, [params]);

  React.useEffect(() => {
    pushDataToUrl({
      ordering: productFilterState.ordering,
      stores: productFilterState.storesIdArray,
      genres: productFilterState.genresIdArray,
      platforms: productFilterState.platformsIdArray,
      publishers: productFilterState.publishersIdArray,
    });
    handleFetchProductsWithFilters(productFilterState.page);
  }, [
    productFilterState.genresIdArray,
    productFilterState.platformsIdArray,
    productFilterState.publishersIdArray,
    productFilterState.storesIdArray,
    productFilterState.ordering,
    productFilterState.page,
  ]);

  return (
    <section className="flex items-start w-full min-h-[calc(100vh-60px)] md:h-auto bg-primaryColor mx-auto">
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
              sortedGamesCount={productFilterState.gamesCount}
              position="hidden md:flex relative"
              display="flex-1"
            />
            {productFilterState.isLoading ? (
              <div className="flex items-center justify-center">
                <MoonLoader color="pink" />
              </div>
            ) : productFilterState.error ? (
              <div
                className="flex items-center justify-center text-[18px]
              cursor-default"
              >
                We couldn't find any games in this category. Please check your
                filters or try searching in other categories.
              </div>
            ) : (
              <FilterProductList />
            )}
            {productFilterState.productsWithFilters.length > 0 &&
            !productFilterState.error ? (
              <FilterChangePage />
            ) : (
              <div></div>
            )}
          </section>
        </div>
      </section>
    </section>
  );
}
