import { FaCartPlus } from "react-icons/fa";
import React from "react";
import Image from "next/image";

export default function SearchResultsContainer() {
  return (
    <div className="absolute top-[65px] left-0 w-[100%] pt-[10px] z-[1] bg-primaryColor">
      <ul>
        <li>
          <div className="flex justify-between">
            <div className="flex pl-[15px] py-[5px]">
              <div className="flex-0 relative w-[72px] h-[100px]">
                <Image src="/images/RE4.jpg" layout="fill" />
              </div>
              <div className="flex-1 ml-[10px]">
                <span className="py-[2px] px-[8px] text-[12px] text-[#e5e176] border-[2px] border-[#e5e176] rounded-full">
                  Produkt cyfrowy
                </span>
                <div className="mt-[6px]">
                  <span className="text-[#FFFFFF] font-bold">
                    Arizona Sunshine - Deluxe Edition
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[50px] pr-[10px]">
              <span className="text-[14px] text-right font-bold text-[#FFFFFF96]">
                Od
              </span>
              <span className="mt-[-2px] mr-[10px]  font-bold">21,41zł</span>
              <button className="flex items-center justify-center w-[60px] h-[35px] mt-[10px]  border-2 border-[#FFFFFFF]">
                <FaCartPlus size="20px" color="#ffffff" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
