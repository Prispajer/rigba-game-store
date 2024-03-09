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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-[10px]">
      {data.results &&
        data.results.map((game) => (
          <div key={game.id} className="relative  bg-tertiaryColor my-[10px]">
            <Link
              className="flex flex-row md:flex-col w-full p-2 md:p-0"
              href="/"
            >
              <div className="relative h-[135px] w-[95px] md:w-full md:h-[250px]">
                <Image src={game.background_image} layout="fill" alt="game" />
              </div>
              <div className="my-[10px] px-[15px]">
                <div>
                  <div className="leading-none overflow-hidden overflow-ellipsis line-clamp-2 text-[#ffffff]">
                    <span className="font-bold text-[14px]">{game.name}</span>
                  </div>
                  <div>
                    <span className="text-[12px] text-[#fffa84] font-bold">
                      CAŁY ŚWIAT
                    </span>
                  </div>
                </div>
                <div>
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
