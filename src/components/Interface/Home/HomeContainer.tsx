"use client";

import React from "react";
import Image from "next/image";

export default function HomeContainer() {
  const [userData, setUserData] = React.useState([]);

  async function getProducts() {
    const getData = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/registerData`,
      getData
    );
    const response = await fetchData.json();
    console.log(response.users);
  }

  React.useEffect(() => {
    getProducts();
  }, []);

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
