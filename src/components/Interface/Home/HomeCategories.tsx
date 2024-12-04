"use client";
import React from "react";
import Image from "next/image";
import ShowMoreButton from "../Shared/Buttons/ShowMoreButton";
import useFetchGameData from "@/hooks/useFetchGameData";
import useCustomRouter from "@/hooks/useCustomRouter";

export default function HomeCategories() {
  const { productGenresState, handleFetchGenres, handleLoadMore } =
    useFetchGameData();
  const { redirectToFilters } = useCustomRouter();

  React.useEffect(() => {
    handleFetchGenres(productGenresState.page_size);
  }, [productGenresState.page_size]);

  return (
    <section className="bg-secondaryColor py-[15px]">
      <div className="flex max-w-[1240px] mx-auto px-[20px] py-6">
        <div className="flex flex-col w-full">
          <h1 className="text-[30px] text-white font-bold">Categories</h1>
          {productGenresState && (
            <div className="grid grid-cols-2 ty:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 max-w-[1240px] my-6 gap-[20px]">
              {productGenresState.genresArray.map((genre) => (
                <div
                  key={genre.id}
                  onClick={() => redirectToFilters([genre.id as number])}
                  className="flex h-[140px] flex-col items-center bg-[#5389b7] text-[#ffffff] hover:bg-categoryGenresHover transition ease-in-out delay-70  px-[5px] shadow-lg cursor-pointer"
                >
                  <div className="flex flex-1 items-center font-medium text-[14px] ">
                    <p>{genre.games_count}</p>
                  </div>
                  <div className="relative min-w-[80px] min-h-[80px] flex flex-1 items-center">
                    <Image
                      fetchPriority="low"
                      loading="lazy"
                      alt={genre.slug as string}
                      src={genre.image_background as string}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center px-[4px] font-medium text-[14px] text-center leading-3">
                    <p>{genre.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {productGenresState.page_size <= 2 && (
            <ShowMoreButton method={handleLoadMore} text="Load more" />
          )}
        </div>
      </div>
    </section>
  );
}
