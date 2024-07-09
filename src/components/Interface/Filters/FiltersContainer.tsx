"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useFetchGameData from "@/hooks/useFetchGameData";
import FilterByPrice from "./FilterByPrice";
import FilterByType from "./FilterByType";
import FilterByGenre from "./FilterByGenre";
import FilterByPlatform from "./FilterByPlatform";
import FilterByStore from "./FilterByStore";
import SelectedFilters from "./SelectedFilters";
import SortBy from "./SortBy";
import FilterProductList from "./FilterProductList";
import ChangePage from "./ChangePage";

export default function FiltersContainer() {
  const params = useSearchParams();
  const {
    productFetchAndFilterState,
    handleFetchGamesByGenresId,
    handleSetStoresId,
    handleSetPublishersId,
    handleSetPlatformsId,
    handleSetTagsId,
  } = useFetchGameData();
  const initialGenresId = params.get("genres")?.split(",").map(Number) || [];
  const [genresId, setGenresId] = React.useState<number[]>(initialGenresId);

  console.log(productFetchAndFilterState);

  const router = useRouter();

  React.useEffect(() => {
    if (genresId.length > 0) {
      handleSetStoresId([1]);
      handleSetPublishersId([354]);
      handleSetPlatformsId([4]);
      handleSetTagsId(genresId);
      handleFetchGamesByGenresId(productFetchAndFilterState.page);
    }
  }, [genresId, productFetchAndFilterState.page]);

  const handleTagChange = (genreId: number) => {
    setGenresId((prevTags) =>
      prevTags.includes(genreId)
        ? prevTags.filter((id) => id !== genreId)
        : [...prevTags, genreId]
    );
  };

  const handleClickGame = (gameId: string) => {
    router.push(`/product/${gameId}`);
  };

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
            <form className="bg-[#387CBD]">
              <FilterByPrice />
              <FilterByType handleTagChange={handleTagChange} />
              <FilterByPlatform handleTagChange={handleTagChange} />
              <FilterByGenre handleTagChange={handleTagChange} />
              <FilterByStore handleTagChange={handleTagChange} />
            </form>
          </aside>
          <section className="w-full lg:w-[calc(100%-220px)]">
            <SelectedFilters />
            <SortBy />
            {productFetchAndFilterState.isLoading ? (
              <p>Loading...</p>
            ) : productFetchAndFilterState.error ? (
              <p>Error: {productFetchAndFilterState.error}</p>
            ) : (
              <FilterProductList handleClickGame={handleClickGame} />
            )}
            <ChangePage />
          </section>
        </div>
      </section>
    </main>
  );
}
