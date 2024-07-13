"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import fetchService from "@/utils/classes/fetchService";
import HomeShowMoreButton from "./HomeShowMoreButton";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function HomeCategories() {
  const router = useRouter();
  const [categories, setCategories] = React.useState<any[]>([]);
  const [quantity, setQuantity] = React.useState<number>(1);

  React.useEffect(() => {
    handleGetGameGenres();
  }, [quantity]);

  const handleGetGameGenres = async (): Promise<void> => {
    try {
      const fetchServiceResponse = await fetchService.getGamesGenres(quantity);
      setCategories(fetchServiceResponse);
    } catch (error) {
      console.error("Error fetching games by tags:", error);
    }
  };

  const loadMore = (): void => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleGetGamesByGenresId = async (genreId: number): Promise<void> => {
    try {
      const data = await fetchService.getGamesWithFilters([genreId], 1);
      console.log(data);
      router.push(`/filters?genres=${[genreId]}`);
    } catch (error) {
      console.error("Error fetching games by tag ID:", error);
    }
  };

  return (
    <main className="bg-secondaryColor py-[15px]">
      <section className="flex max-w-[1240px] mx-auto px-2 py-6">
        <div className="flex flex-col w-full">
          <h1 className="text-[30px] text-white font-bold">Categories</h1>
          {categories && (
            <div className="grid grid-cols-2 ty:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 max-w-[1240px] my-6 gap-[20px]">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleGetGamesByGenresId(category.id)}
                  className="flex h-[140px] flex-col items-center bg-[#5389b7] text-[#ffffff] hover:bg-categoryGenresHover transition ease-in-out delay-70  px-[5px] shadow-lg cursor-pointer"
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
          {quantity <= 2 && (
            <HomeShowMoreButton method={loadMore} text="Wczytaj więcej" />
          )}
        </div>
      </section>
    </main>
  );
}
