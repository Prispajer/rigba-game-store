"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import fetchService from "@/utils/classes/fetchService";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function HomeCategories() {
  const router = useRouter();
  const [categories, setCategories] = React.useState<any[]>([]);
  const [quantity, setQuantity] = React.useState<number>(1);

  const { fetchSlice } = useFetchGameData();

  console.log(fetchSlice);

  React.useEffect(() => {
    handleGetGamesByTags();
  }, [quantity]);

  const handleGetGamesByTags = async (): Promise<void> => {
    try {
      const fetchServiceResponse = await fetchService.getGamesByTags(
        10,
        quantity
      );
      setCategories(fetchServiceResponse);
    } catch (error) {
      console.error("Error fetching games by tags:", error);
    }
  };

  const loadMore = (): void => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleGetGamesByTagId = async (tagId: number): Promise<void> => {
    try {
      const data = await fetchService.getGamesByTagsId([tagId], 1);
      router.push(`/filters?tagsId=${[tagId]}`);
    } catch (error) {
      console.error("Error fetching games by tag ID:", error);
    }
  };

  return (
    <main className="bg-primaryColor py-[15px]">
      <section className="flex max-w-[1240px] mx-auto px-2 py-6">
        <div className="flex flex-col w-full">
          <h1 className="text-[30px] text-white font-bold">Categories</h1>
          {categories && (
            <div className="grid grid-cols-2 ty:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 max-w-[1240px] my-6 gap-[20px]">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleGetGamesByTagId(category.id)}
                  className="flex h-[140px] flex-col items-center bg-[#5389b7] text-[#ffffff] px-[5px] shadow-lg cursor-pointer"
                >
                  <div className="flex flex-1 items-center font-medium text-[14px] ">
                    <p>{category.games_count}</p>
                  </div>
                  <div className="relative min-w-[80px] min-h-[80px] flex flex-1 items-center">
                    <Image
                      alt={category.slug}
                      src={category.image_background}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center px-[4px] font-medium text-[14px] text-center leading-3">
                    <p>{category.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {quantity <= 5 && (
            <div className="flex items-center justify-center">
              <button
                onClick={loadMore}
                className="py-[10px] px-[40px] text-[#ffffff] text-[16px] font-bold border border-white"
              >
                Wczytaj więcej
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
