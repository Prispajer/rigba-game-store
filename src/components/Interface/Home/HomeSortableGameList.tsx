"use client";
import React from "react";
import HomeProductList from "./HomeProductList";
import ShowMoreButton from "../Shared/Buttons/ShowMoreButton";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function HomeSortableGameList({
  header,
  ordering,
  background,
}: {
  header: string;
  ordering: string;
  background: string;
}) {
  const { handleSetOrdering } = useFetchGameData();

  const handleShowAll = () => {
    handleSetOrdering(ordering);
  };

  return (
    <section className={`${background} py-[15px]`}>
      <div className="flex max-w-[1240px] mx-auto px-[20px] py-6">
        <div className="flex flex-col w-full">
          <h1 className="text-[24px] sm:text-[30px] text-white font-bold cursor-default">
            {header}
          </h1>
          <div className="flex flex-col sm:flex-row max-w-[1240px] gap-x-[20px] scrollbar overflow-auto">
            <HomeProductList ordering={ordering} />
          </div>
          <div className="flex items-center justify-center pt-[20px]">
            <ShowMoreButton text="Show all" method={handleShowAll} />
          </div>
        </div>
      </div>
    </section>
  );
}
