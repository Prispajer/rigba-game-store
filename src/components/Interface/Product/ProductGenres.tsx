import React from "react";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ProductGenres({ genres }: { genres: GameAPIResponse }) {
  return (
    <section className="flex flex-col max-w-[1240px] md:mx-auto pb-[15px] bg-primaryColor">
      {genres ? (
        <ul className="flex overflow-x-auto">
          <li
            key={genres.id}
            className="inline-block mr-[5px] mb-[5px] text-[#C3DAC9] rounded-full bg-secondaryColor"
          >
            <a className="py-[5px] px-[10px] text-[#C3DAC9] rounded-full bg-secondaryColor cursor-default">
              {genres.name}
            </a>
          </li>
        </ul>
      ) : (
        <p>Nie znaleziono tagów</p>
      )}
    </section>
  );
}
