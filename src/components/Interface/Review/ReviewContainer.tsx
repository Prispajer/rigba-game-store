"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import useCustomRouter from "@/hooks/useCustomRouter";
import { generateRandomValue } from "@/utils/prices";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ReviewContainer({
  product,
}: {
  product: GameAPIResponse;
}) {
  const { redirectToGame } = useCustomRouter();
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  return (
    <main className="pt-[10px] bg-primaryColor">
      <div className="flex flex-col w-full max-w-[1240px] mx-auto px-[20px]">
        <div className="grid grid-cols-[1fr,200px] mt-[40px] mb-[60px] gap-x-[20px]">
          <form className="grid grid-cols-[180px,1fr] gap-x-[40px] p-[20px] lg:py-[30px] lg:px-[40px] bg-secondaryColor">
            <div className="mb-[55px]">
              <h2 className="mb-[20px] text-[26px] text-[#FFFFFF] font-bold leading-[30px]">
                Detailed review
              </h2>
              <div className="text-[14px] text-[#FFFFFF]">Overall rating</div>
              <div className="rating-container">
                <input
                  type="radio"
                  name="rating"
                  id="rating-5"
                  value="5"
                  className="hidden"
                />
                <label htmlFor="rating-5" className="rating-label">
                  &#9733;
                </label>
                <input
                  type="radio"
                  name="rating"
                  id="rating-4"
                  value="4"
                  className="hidden"
                />
                <label htmlFor="rating-4" className="rating-label">
                  &#9733;
                </label>
                <input
                  type="radio"
                  name="rating"
                  id="rating-3"
                  value="3"
                  className="hidden"
                />
                <label htmlFor="rating-3" className="rating-label">
                  &#9733;
                </label>
                <input
                  type="radio"
                  name="rating"
                  id="rating-2"
                  value="2"
                  className="hidden"
                />
                <label htmlFor="rating-2" className="rating-label">
                  &#9733;
                </label>
                <input
                  type="radio"
                  name="rating"
                  id="rating-1"
                  value="1"
                  className="hidden"
                />
                <label htmlFor="rating-1" className="rating-label">
                  &#9733;
                </label>
              </div>
              <div className="flex flex-col mt-[10px] mb-[20px]">
                <div>
                  <span className="pb-[5x] text-[14px] text-[#FFFFFF]">
                    Nickname
                  </span>
                </div>
                <div>
                  <input
                    className="min-h-[40px] px-[10px] text-[16px] text-[white] border-none outline-none bg-tertiaryColor w-[100%]"
                    type="text"
                    id="nickname"
                    placeholder="Optional"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-[20px] text-[26px] text-[#FFFFFF] font-bold leading-[30px]">
                Review
              </h2>
              <p className="mb-[15px] text-[#ffffff80] text-[15px]">
                Help other players make a choice! This review should include
                your opinion on the gameplay, graphics, soundtrack and story. If
                you would like to express your opinion on Eneba, consider
                leaving a review on Trustpilot. If you need help from support,
                select create a ticket
              </p>
              <p className="mb-[15px] text-[#ffffff80] text-[15px]">
                Your review must be at least 150 characters long.
              </p>
              <textarea
                className="w-full min-h-[250px] mb-[20px] p-[20px] text-[15px] text-[#FFFFFF] outline-none resize-none bg-tertiaryColor"
                name="review"
                required
                id="review"
              ></textarea>
              <div className="flex justify-end">
                <button className="min-w-[200px] min-h-[35px] bg-buttonBackground text-buttonTextColor">
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </form>
          <div
            key={product.id}
            onClick={() => redirectToGame(product.slug as string)}
            className={`relative min-w-[200px] min-h-[150px] sm:min-h-[360px] flex sm:flex-col bg-tertiaryColor cursor-pointer`}
          >
            <>
              <div className="relative m-[5px] sm:m-[0px] min-w-[95px] sm:min-h-[250px]">
                <Image
                  src={product.background_image}
                  layout="fill"
                  alt="game"
                />
              </div>
              <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
                <div className="flex flex-col justify-between min-h-[60px]">
                  <div className="leading-none line-clamp-1 text-[#ffffff]">
                    <span className="font-bold text-[14px]">
                      {product.name}
                    </span>
                  </div>
                  <div>
                    <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[12px] text-[#fffa84] font-bold">
                      CAŁY ŚWIAT
                    </span>
                  </div>
                </div>
                <div className="h-[50%] md:h-[75px]">
                  <div className="text-[14px] text-[#ffffff80] font-medium">
                    Od
                  </div>
                  <div className="overflow-hidden overflow-ellipsis line-clamp-1 text-[20px] text-[#ffffff] font-bold">
                    {generateRandomValue()}
                  </div>
                  <div className="flex items-center">
                    <CiHeart
                      className="ml-[-3px] mr-[3px]"
                      size="20px"
                      color="#ffffff80"
                    />
                    <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[14px] text-[#ffffff80]">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
              <AddToWishList
                game={product}
                position="absolute right-[10px] top-0"
                added="border-[#FFFA84] bg-[#FFFA84]"
                deleted="bg-[#d3d3d3]"
              />
            </>
          </div>
        </div>
      </div>
    </main>
  );
}
