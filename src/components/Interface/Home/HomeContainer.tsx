"use client";

import React from "react";
import Image from "next/image";

export default function HomeContainer() {
  const [userData, setUserData] = React.useState([]);

  type Users = {
    userId: number;
    userLogin: string;
    userPassword: string;
    userRegisterDate: Date;
    userLastLogin: Date;
  };

  React.useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/route");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="bg-[#296CA6] w-full h-full">
        <div className="flex items-center justify-center">
          {userData.map((user: Users, index: number) => (
            <li key={index}>{user.userId}</li>
          ))}
        </div>
      </main>
    </>
  );
}
