"use client";

import React from "react";
import Image from "next/image";
import ProductInformationsRow from "../Shared/Products/ProductInformationsRow";

export default function HomeUpComingGames() {
  return (
    <main className="bg-primaryColor py-[15px]">
      <section className="flex max-w-[1240px] mx-auto px-2 py-6">
        <div className="flex flex-col w-full">
          <h1 className="text-[30px] text-white ">Nadchodzące gry</h1>
          <div className="flex max-w-[1240px] overflow-x-auto gap-x-[20px] scrollbar">
            <ProductInformationsRow />
          </div>
        </div>
      </section>
    </main>
  );
}
