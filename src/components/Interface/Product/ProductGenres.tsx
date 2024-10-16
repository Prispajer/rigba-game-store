"use client";
import React from "react";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ProductGenres({
  product,
  redirectToFilters,
}: {
  product: GameAPIResponse;
  redirectToFilters: (genresId: number[]) => void;
}) {
  return (
    <section className="flex flex-col max-w-[1240px] md:mx-auto pb-[15px] bg-primaryColor">
      <ul className="flex overflow-x-auto">
        {product ? (
          product.genres?.map((genre) => (
            <li
              onClick={() => redirectToFilters([genre.id])}
              key={genre.id ?? ""}
              className="inline-block mr-[5px] mb-[5px] rounded-full hover:bg-tertiaryColor bg-secondaryColor transition-animation cursor-pointer"
            >
              <a className="py-[5px] px-[10px] text-[#C3DAC9] hover:text-[#A3CBA1]">
                {genre.name ?? ""}
              </a>
            </li>
          ))
        ) : (
          <p>Genres not found!</p>
        )}
      </ul>
    </section>
  );
}
