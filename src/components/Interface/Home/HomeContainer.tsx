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
      <main className="bg-[#296CA6] w-full h-full">
        <div className="flex items-center justify-center"></div>
      </main>
    </>
  );
}
