"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchGamesByTagsId } from "@/redux/slices/fetchSlice";
import FilterByPrice from "./FilterByPrice";
import FilterByType from "./FilterByType";
import FilterByGenre from "./FilterByGenre";
import FilterByPlatform from "./FilterByPlatform";
import FilterByRegion from "./FilterByRegion";
import SelectedFilters from "./SelectedFilters";
import SortBy from "./SortBy";
import FilterProductList from "./FilterProductList";
import ChangePage from "./ChangePage";

export default function FiltersContainer() {
  const params = useSearchParams();
  const tagId = params.get("tagId");
  const fetchSlice = useSelector((state: RootState) => state.fetch);
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = React.useState<number>(1);
  const router = useRouter();

  React.useEffect(() => {
    if (tagId) {
      dispatch(fetchGamesByTagsId({ tagId, page }));
    }
  }, [tagId, page, dispatch]);

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
            {fetchSlice.isLoading ? (
              <p>Loading...</p>
            ) : fetchSlice.error ? (
              <p>Error: {fetchSlice.error}</p>
            ) : (
              <FilterProductList
                games={fetchSlice.data}
                handleClickGame={handleClickGame}
              />
            )}
            <ChangePage nextPage={nextPage} previousPage={previousPage} />
          </section>
        </div>
      </section>
    </main>
  );
}
