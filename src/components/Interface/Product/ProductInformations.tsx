"use client";
import React from "react";
import Image from "next/image";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import DigitalProductDetails from "./ProductDigitalProductDetails";
import useUserReviews from "@/hooks/useUserReviews";
import { processReviews, mergeReviewData } from "@/utils/prices";
import { GameAPIResponse } from "@/utils/helpers/types";

export const generateStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating % 1;

  const fullStar = Array(fullStars)
    .fill(0)
    .map((_, index) => (
      <div key={`full-${index}`} className="rating-star filled"></div>
    ));

  const partialStar =
    decimalPart > 0 ? (
      <div
        className="rating-star"
        style={{
          background: `linear-gradient(to right, gold ${
            decimalPart * 100
          }%, transparent ${decimalPart * 100}%)`,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      ></div>
    ) : null;

  const emptyStar = Array(5 - fullStars - (decimalPart > 0 ? 1 : 0))
    .fill(0)
    .map((_, index) => (
      <div key={`empty-${index}`} className="rating-star empty"></div>
    ));

  return (
    <div className="flex items-center">
      {fullStar}
      {partialStar}
      {emptyStar}
    </div>
  );
};

export default function ProductInformations({
  product,
}: {
  product: GameAPIResponse;
}) {
  const { userReviewsState } = useUserReviews();
  const processedReviews = processReviews(userReviewsState.reviews);
  const mergedData = mergeReviewData(processedReviews, product.ratings);

  console.log(mergedData);

  const averageRating = mergedData.reduce(
    (acc, review) => acc + review.percent * (review.count / 100),
    0
  );

  console.log(averageRating);

  let mergedRatingsCount =
    userReviewsState.reviews.length + (product.ratings_count || 0);

  return (
    <>
      {product && (
        <div className="flex flex-0 py-[20px] ">
          <div className="relative min-w-[72px] lg:min-w-[150px] lg:h-[225px] xl:min-w-[200px] xl:h-[300px] xxl:min-w-[225px] xxl:min-h-[315px] ">
            <Image
              src={product.background_image ?? "/icons/logo.png"}
              layout="fill"
              alt={product.background_image}
            />
          </div>
          <div className="flex flex-1 flex-col pl-[15px] lg:pl-[30px] leading-[28px]">
            <div className="flex justify-between mb-[20px]">
              <div className="pr-[20px]">
                <h1 className="text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] text-[#FFFFFF] font-[600]">
                  {product.name}
                </h1>
              </div>
              <div className="relative">
                <button className="p-[6px] md:p-[10px] transition duration-300 cursor-pointer ">
                  <AddToWishList
                    game={product}
                    position="absolute top-0 right-0"
                    added="border-[#FFFA84] bg-[#FFFA84]"
                    deleted="border-[#487CBD] bg-[#487CBD]"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-x-[5px] mb-[15px] cursor-default">
              <div>
                <span className="">{generateStars(averageRating)}</span>
              </div>
              <div className="flex-wrap mt-[5px]">
                <span className="text-[15px] text-buttonBackground font-[800]">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-[14px] text-[#FFFFFF]">/ 5</span>
                <span className="text-[14px] text-[#FFFFFF]"> z </span>
                <span className="text-[14px] text-[#FFFFFF]">
                  {mergedRatingsCount} ocen
                </span>
              </div>
            </div>
            <DigitalProductDetails display="hidden xl:flex flex-col" />
            <div className="lg:hidden">
              <button className="flex items-center p-[6px] bg-[#487CBD]">
                <span className="text-[14px] text-[#FFFFFF]">Udostępnij</span>
                <span className="text-[14px] text-[#FFFFFF] ml-[6px]"></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
