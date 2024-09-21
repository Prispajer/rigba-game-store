"use server";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function RedeemContainer() {
  return (
    <section className="flex flex-col items-center w-full  h-[calc(100vh-96px)] md:py-[20px] bg-primaryColor mx-auto">
      <h1 className="mt-[10px] mb-[30px] text-[30px] text-[#FFFFFF] font-bold">
        Redeem your product
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-[100px,1fr] w-full lg:max-w-[1040px] mx-auto p-[20px] ">
        <ul className="flex flex-col">
          <li className="relative flex p-[20px] md:mb-[10px] gap-x-[10px] bg-secondaryColor ">
            <div className="flex-0 h-[70px] w-[50px] md:h-[80px] max-w-[60px] md:w-[90px] md:max-w-[90px]">
              <Link href="/">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/RE4.jpg"
                    alt="gameLogo"
                    layout="fill"
                  ></Image>
                </div>
              </Link>
            </div>
          </li>
        </ul>
        <div className="p-[30px] bg-secondaryColor">
          <h3 className="mb-[15px] text-[18px] text-[#FFFFFF] font-bold">
            Resident Evil 4: Separate Ways (DLC) (PC) Steam Key GLOBAL
          </h3>
          <div className="mb-[10px] text-[16px] text-[#658fb2]">
            Digital product key:
          </div>
          <div className="mx-auto mb-[20px] p-[20px] bg-tertiaryColor">
            <div className="flex items-center justify-center text-[30px] text-[#FFFFFF]">
              <strong>VQEVP-VPH4D-YWRCR</strong>
            </div>
            <div className="flex justify-between mt-[20px] pt-[20px] border-t-[2px] border-[#658FB2]">
              <span className="text-[#FFFFFF]">
                Don't want to use it now? No problem. You can always find the
                code in your library!
              </span>
              <Link href="/keys">
                <button className="min-h-[35px] px-[10px] text-[16px] text-[#FFFFFF] border-[1px] border-[#FFFFFF] hover:border-buttonBackground transition duration-300 font-bold bg-transparent">
                  My library
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
