"use client";

import React from "react";
import Image from "next/image";
import { GET } from "@/api/route";

export default function HomeContainer() {
  const [userData, setUserData] = React.useState([]);

  type Users = {
    userId: number;
    userLogin: string;
    userPassword: string;
    userRegisterDate: Date;
    userLastLogin: Date;
  };

  return (
    <>
      <main className="bg-primaryColor">
        <section className="flex w-full max-w-[1240px] mx-auto px-2 py-6">
          <div className=" flex items-center">
            <div className="">
              <h1 className="text-[35px] text-[#ffffff]">Popularne gry</h1>
            </div>
            <div className="grid grid-cols-4 gap-x-[10px]"></div>
          </div>
        </section>
      </main>
    </>
  );
}
