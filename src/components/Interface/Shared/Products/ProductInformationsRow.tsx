"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import generateRandomValue from "@/utils/classes/prices";
import AddToWishList from "./AddToWishList";

export default function ProductInformations() {
  const router = useRouter();
  const [data, setData] = React.useState<Games>([]);

  function handleClick(name: string) {
    router.push(`/product/${name}`);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.rawg.io/api/games?ordering=-rating&key=b3c85b14e19f4d618df8debc3d5b01b6",
          {
            headers: {
              "User-Agent": "Mozilla/5.0",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      {data &&
        data.map((game) => (
          <div
            key={game.id}
            onClick={() => handleClick(game.slug)}
            className="relative min-w-[200px] min-h-[360px] mt-[20px] mb-[10px] bg-tertiaryColor"
          >
            <Link href="/">
              <div className="relative w-full min-h-[220px]">
                <Image src={game.background_image} layout="fill" alt="game" />
              </div>
              <div className="flex flex-col justify-between h-[70px] px-[15px] pt-[10px]">
                <div className="leading-none overflow-hidden overflow-ellipsis line-clamp-2 text-[#ffffff]">
                  <span className="font-bold text-[13px] text-[#ffffff]">
                    {game.name}
                  </span>
                </div>
                <div>
                  <span className="text-[12px] text-[#fffa84] font-bold">
                    {game.added}
                  </span>
                </div>
              </div>
              <div className="h-[80px] px-[15px] ">
                <div className="text-[14px] text-[#ffffff80] font-medium ">
                  Od
                </div>
                <div className="text-[20px] text-[#ffffff] font-bold">
                  {generateRandomValue()}
                </div>
                <div className="flex items-center">
                  <CiHeart
                    className="ml-[-3px] mr-[3px]"
                    size="20px"
                    color="#ffffff80"
                  />
                  <span className="text-[14px] text-[#ffffff80]">
                    {game.rating}
                  </span>
                </div>
                <AddToWishList />
              </div>
            </Link>
          </div>
        ))}
    </>
  );
}
