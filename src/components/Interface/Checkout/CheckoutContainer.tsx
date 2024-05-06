"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CheckoutContainer() {
  return (
    <main className="flex items-center w-full  h-full bg-secondaryColor mx-auto">
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full lg:max-w-[1040px] mx-auto  p-[20px]">
        <div className="lg:max-w-[560px] w-full ">
          <h2 className="hidden text-[20px] mb-[20px] font-bold text-[#ffffff] cursor-default">
            Mój koszyk
          </h2>
          <ul className="flex flex-col">
            <li className="flex w-full p-[20px]">
              <div className="flex-0 max-w-[60px] sm:max-w-[90px]">
                <Link href="/">
                  <div className="relative h-full w-full">
                    <Image
                      src="/../../../app/icon.png"
                      alt="gameLogo"
                      layout="fill"
                    ></Image>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between">
                  <div>Resident Evil 7</div>
                  <div>
                    <FaRegTrashAlt />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center text-[#ffffffb3] text-[16px]">
                    <span className="mr-1 cursor-default">Produkt cyfrowy</span>
                  </div>
                  <div className="">
                    <button className="mr-2 hover:text-modalHover">-</button>
                    <span className="cursor-default"></span>
                    <button className="ml-2 hover:text-modalHover">+</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="lg:max-w-[560px] w-full mx-[10px] mb-[40px]">
          <aside className="max-w-[220px]">
            <form className="bg-[#5389b7]"></form>
          </aside>
          <section className="w-[calc(100%-220px)]"></section>
        </div>
      </section>
    </main>
  );
}
