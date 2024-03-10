"use client";

import React from "react";
import Profile from "./Profile";
import WishListCounter from "./WishListCounter";
import ProductInformations from "../Shared/Products/ProductInformationsCol";
import SearchBar from "./SearchBar";
import SortBy from "./SortBy";

export default function WishListContainer() {
  return (
    <main className="flex items-center justify-center w-full h-full bg-primaryColor">
      <section className="flex flex-col items-center w-full max-w-[1240px] mx-auto mt-[40px] mb-[100px] px-4 md:px-2">
        <Profile />
        <WishListCounter />
        <div className="w-full mt-[40px] md:grid grid-cols-[220px,calc(100%-220px)]">
          <aside className="max-h-[120px] bg-[#5389b7] text-white ">
            <SearchBar />
          </aside>
          <div className="flex flex-col w-full px-[15px] text-white">
            <SortBy />
            <ProductInformations />
          </div>
        </div>
      </section>
    </main>
  );
}
