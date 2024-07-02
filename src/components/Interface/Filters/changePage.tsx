import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ChangePage({
  nextPage,
  previousPage,
  games,
}: {
  nextPage: () => void;
  previousPage: () => void;
  games: GameAPIResponse[];
}) {
  return (
    <div className="flex items-center justify-center pt-[20px]">
      <ul className="flex items-center text-[#ffffff] font-medium ">
        <li className="flex items-center p-[10px] mr-[10px] text-[20px] border border-[white] ">
          <button onClick={previousPage}>
            <MdKeyboardArrowLeft />
          </button>
        </li>
        <li className="p-[10px] text-[20px]">
          <Link href="/">1</Link>
        </li>
        <li className="p-[10px] text-[20px]">
          <Link href="/">2</Link>
        </li>
        <li className="p-[10px] text-[20px]">
          <Link href="/">3</Link>
        </li>
        <li className="p-[10px] text-[20px]">
          <Link href="/">...</Link>
        </li>
        <li className="p-[10px] text-[20px]">
          <Link href="/">500</Link>
        </li>
        <li className="flex items-center p-[10px] ml-[10px] text-[20px] border border-[white] ">
          <button onClick={nextPage}>
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </div>
  );
}
