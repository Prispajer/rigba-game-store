"use client";

import React from "react";
import Image from "next/image";
export default function HomeContainer() {
  const [userData, setUserData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function getProducts() {
    const getData = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const fetchData = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users`,
        getData
      );
      const response = await fetchData.json();
      setUserData(response);
      setIsLoading(false);
    } catch (error) {
      console.log("Coś poszło nie tak!", error);
    }
  }

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="bg-primaryColor">
      <section className="flex w-full max-w-[1240px] mx-auto px-2 py-6">
        <div className="flex items-center w-full h-full">
          {isLoading ? ( //
            <div>Ładowanie...</div>
          ) : (
            userData.map((user: User) => (
              <div key={user.Id}>
                <h1 className="text-[35px] text-[#ffffff]">{user.Email}</h1>
                <h2 className="text-[35px] text-[#ffffff]">{user.Password}</h2>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
