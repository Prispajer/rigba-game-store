"use client";

import React from "react";
import FilterByPrice from "./FilterByPrice";
import FilterByType from "./FilterByType";
import FilterByGenre from "./FilterByGenre";
import FilterByPlatform from "./FilterByPlatform";
import FilterByRegion from "./FilterByRegion";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function WishListContainer() {
  return (
    <main className="flex items-center  w-full h-full bg-primaryColor mx-auto">
      <section className="flex flex-col  w-full max-w-[1240px] mx-auto my-[30px] px-2">
        <div>
          <h2 className="text-[34px] font-bold text-[#ffffff] cursor-default">
            Store
          </h2>
        </div>
        <div>
          <aside className="max-w-[220px] my-[20px]">
            <form className="bg-[#5389b7]">
              <FilterByPrice />
              <FilterByType />
              <FilterByPlatform />
              <FilterByGenre />
              <FilterByRegion />
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}
