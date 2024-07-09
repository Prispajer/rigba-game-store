import React from "react";
import ProductList from "./HomeProductList";
import HomeShowMoreButton from "./HomeShowMoreButton";

export default function HomeTheLongestGames() {
  return (
    <main className="bg-secondaryColor py-[15px]">
      <section className="flex max-w-[1240px] mx-auto px-2 py-6">
        <div className="flex flex-col w-full">
          <h1 className="text-[30px] text-white font-bold">Najdłuższe gry</h1>
          <div className="flex max-w-[1240px] gap-x-[20px]  scrollbar overflow-x-auto ">
            <ProductList ordering="-rating" />
          </div>
          <HomeShowMoreButton text="Pokaż wszystko" />
        </div>
      </section>
    </main>
  );
}
