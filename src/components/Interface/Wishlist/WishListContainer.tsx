import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { LuMenuSquare } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

export default function WishListContainer() {
  return (
    <main className="flex items-center justify-center w-full h-full bg-primaryColor">
      <section className="flex flex-col items-center w-full max-w-[1240px] mx-auto mt-[40px] mb-[100px] px-2 ">
        <div className="flex items-center w-full mb-[40px]">
          {/* Pierwszy osobny div */}
          <div className="relative h-[64px] w-[64px]">
            <Image
              className="rounded-full"
              src="/images/RE4.jpg"
              objectFit="cover"
              layout="fill"
              alt="avatar"
            />
          </div>
          <div className="flex flex-1 items-center h-[64px] ml-[20px] text-white">
            <span className="font-medium text-[28px] cursor-default">
              Prispajer
            </span>
            <Link href="/login">
              <button className="mt-3 ml-[10px]">
                <LuPencil size={20} />
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center w-full bg-[#2a5286]">
          <div className="flex justify-center items-center py-[10px] px-[30px] gap-x-2 bg-secondaryColor cursor-default">
            <span className="font-medium text-white">Lista życzeń</span>
            <span className="font-normal text-[14px] text-white opacity-50">
              2
            </span>
          </div>
        </div>
        <div className="w-full mt-[40px] grid grid-cols-[220px,calc(100%-220px)]">
          <aside className="bg-[#5389b7] text-white max-h-[120px]">
            <form className="pb-[20px]">
              <div className="pt-[15px] px-[20px] pb-[10px]">
                <span className="font-bold">Nazwa produktu</span>
              </div>
              <div className="flex items-center mx-[20px] px-[10px] bg-[#2a5286] focus:bg-secondaryColor hover:bg-secondaryColor ">
                <FiSearch className="" size="25px" color="white" />
                <input
                  className="w-full max-h-[50px] p-[8px] bg-transparent outline-none"
                  type="text"
                />
              </div>
            </form>
          </aside>
          <div className="flex flex-col w-full px-[15px] text-white">
            <div className="flex justify-between w-full min-h-[50px] ">
              <div>
                <span>Znalezione wyniki: 2</span>
              </div>
              <div>
                <button className="flex items-center hover:text-headerHover">
                  <LuMenuSquare />
                  <span className="ml-[8px] mr-[4px] font-bold">
                    Cena: Od wysokich do niskich
                  </span>
                  <MdOutlineKeyboardArrowDown />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-[10px]">
              <div className="relative bg-tertiaryColor my-[10px]">
                <Link href="/">
                  <div className="relative w-full h-[250px] overflow-hidden">
                    <Image
                      src="/images/RE4.jpg"
                      layout="fill"
                      alt="game"
                    ></Image>
                  </div>
                  <div className="px-[15px] pt-[10px]">
                    <div>
                      <span className="font-bold text-[14px]">
                        Fortnite - Rebirth Harley Quinn Skin
                      </span>
                    </div>
                    <div>
                      <span className="text-[12px] text-[#fffa84] font-bold">
                        CAŁY ŚWIAT
                      </span>
                    </div>
                  </div>
                  <div className="px-[15px] py-[10px]">
                    <div className="text-[14px] text-[#ffffff80] font-medium ">
                      Od
                    </div>
                    <div className="text-[20px] text-[#ffffff] font-bold">
                      20,68 zł
                    </div>
                    <div className="flex items-center">
                      <CiHeart
                        className="ml-[-3px] mr-[3px]"
                        size="20px"
                        color="#ffffff80"
                      />
                      <span className="text-[14px] text-[#ffffff80]">
                        37468
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="absolute top-0 right-[10%] p-[10px] border-[1px] border-[#e5e176] hover:border-[1px] hover:border-[#ffffff] transition duration-300 bg-[#e5e176] hover:bg-[#ffffff80] cursor-pointer">
                  <CiHeart size="30px" color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
