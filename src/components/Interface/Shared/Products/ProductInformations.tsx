import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import generateRandomValue from "@/utils/prices";

export default function ProductInformations() {
  const [data, setData] = React.useState<Games>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.rawg.io/api/games?key=b3c85b14e19f4d618df8debc3d5b01b6",
          {
            headers: {
              "User-Agent": "Mozilla/5.0",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-x-[10px]">
      {data.results &&
        data.results.map((game) => (
          <div key={game.id} className="relative bg-tertiaryColor my-[10px]">
            <Link href="/">
              <div className="relative w-full h-[250px] overflow-hidden">
                <Image src={game.background_image} layout="fill" alt="game" />
              </div>
              <div className="px-[15px] pt-[10px]">
                <div>
                  <span className="font-bold text-[14px]">{game.external}</span>
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
              </div>
            </Link>
            <div className="absolute top-0 right-[10%] p-[10px] border-[1px] border-[#e5e176] hover:border-[1px] hover:border-[#ffffff] transition duration-300 bg-[#e5e176] hover:bg-[#ffffff80] cursor-pointer">
              <CiHeart size="30px" color="white" />
            </div>
          </div>
        ))}
    </div>
  );
}
