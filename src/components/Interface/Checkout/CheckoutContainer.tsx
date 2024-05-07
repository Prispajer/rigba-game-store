"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import ProductInformations from "../Shared/Products/ProductInformationsCol";
import ProductHeaders from "../Product/ProductHeaders";
import CheckoutSummary from "./CheckoutSummary";

export default function CheckoutContainer() {
  return (
    <main className="flex items-center w-full  h-full bg-secondaryColor mx-auto">
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full lg:max-w-[1040px] mx-auto  p-[20px]">
        <div className="lg:max-w-[560px] w-full">
          <h2 className="hidden md:flex text-[20px] mb-[20px] font-bold text-[#ffffff] cursor-default">
            Mój koszyk
          </h2>
          <ul className="flex flex-col">
            <li className="bg-tertiaryColor relative flex w-full p-[20px] gap-x-[10px]">
              <div className="flex-0 w-[50px] max-w-[60px] sm:max-w-[90px]">
                <Link href="/">
                  <div className="relative max-h-[70px] h-full w-full">
                    <Image
                      src="/images/RE4.jpg"
                      alt="gameLogo"
                      layout="fill"
                    ></Image>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between">
                  <div className="text-[#FFFFFF] font-[700]">
                    Resident Evil 7
                  </div>
                  <div className="absolute right-[20px] top-[20px] text-[#ffffffb3] ">
                    <FaRegTrashAlt />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center text-[#ffffffb3] text-[16px]">
                    <span className="text-[14px] mr-1 cursor-default">
                      Produkt cyfrowy
                    </span>
                    <span className="mt-1 hover:text-modalHover">
                      <HiMiniQuestionMarkCircle />
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="">
                    <button className="text-[#FFFFFF] mr-2 hover:text-modalHover">
                      -
                    </button>
                    <span className="text-[#FFFFFF] cursor-default">1</span>
                    <button className="text-[#FFFFFF] ml-2 hover:text-modalHover">
                      +
                    </button>
                  </div>
                  <div className="text-[#FFFFFF] font-[700]">
                    <span>32,88zł</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="hidden lg:max-w-[560px] w-full mx-[10px] mb-[40px]">
          <aside className="max-w-[220px]">
            <form className="bg-[#5389b7]"></form>
          </aside>
          <section className="w-[calc(100%-220px)]"></section>
        </div>
        <ProductHeaders headerText="Podobne tytuły" />
        <ProductInformations />
        <CheckoutSummary />
      </section>
    </main>
  );
}
