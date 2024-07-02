"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FilterByPrice from "./FilterByPrice";
import FilterByType from "./FilterByType";
import FilterByGenre from "./FilterByGenre";
import FilterByPlatform from "./FilterByPlatform";
import FilterByRegion from "./FilterByRegion";
import SelectedFilters from "./SelectedFilters";
import SortBy from "./SortBy";
import FilterProductList from "./FilterProductList";
import ChangePage from "./ChangePage";
import fetchService from "@/utils/classes/fetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function FiltersContainer() {
  const [games, setGames] = React.useState<GameAPIResponse[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const router = useRouter();

  React.useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchService.getGames(page);
        if (data) {
          setGames(data);
        }
      } catch (error) {
        console.error("A problem has occurred while fetching data!", error);
      }
    };
    getGames();
  }, [page]);

  const nextPage = React.useCallback(() => {
    setPage((prevState: number) => prevState + 1);
  }, []);

  const previousPage = React.useCallback(() => {
    setPage((prevState: number) => (prevState > 1 ? prevState - 1 : 1));
  }, []);

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
            <form className="bg-[#5389b7]">
              <FilterByPrice />
              <FilterByType />
              <FilterByPlatform />
              <FilterByGenre />
              <FilterByRegion />
            </form>
          </aside>
          <section className="w-full lg:w-[calc(100%-220px)]">
            <SelectedFilters />
            <SortBy />
            <FilterProductList
              games={games}
              handleClickGame={handleClickGame}
            />
            <ChangePage
              nextPage={nextPage}
              previousPage={previousPage}
              games={games}
            />
          </section>
        </div>
      </section>
    </main>
  );
}
