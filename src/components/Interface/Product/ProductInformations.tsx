"use client";
import React from "react";
import Image from "next/image";
import { CiShare1 } from "react-icons/ci";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import DigitalProductDetails from "./ProductDigitalProductDetails";
import ProductShareButton from "./ProductShareButton";
import { groupReviewsByRating, mergeReviews } from "@/utils/reviews";
import { generateStars, calculateAverageRating } from "@/utils/ratings";
import { GameAPIResponse } from "@/utils/helpers/types";
import { UserReviewsSlice } from "@/redux/slices/userReviewsSlice";

export default function ProductInformations({
  product,
  userReviewsState,
}: {
  product: GameAPIResponse;
  userReviewsState: UserReviewsSlice;
}) {
  const groupedReviewsByRating = React.useMemo(
    () => groupReviewsByRating(userReviewsState.reviews),
    [userReviewsState.reviews]
  );
  const mergedReviews = React.useMemo(
    () => mergeReviews(groupedReviewsByRating, product.ratings),
    [userReviewsState.reviews, product.ratings]
  );
  const mergedRatingsCount = React.useMemo(
    () => mergedReviews.reduce((acc, review) => acc + review.count, 0) || 0,
    [mergedReviews]
  );

  return (
    <>
      {product && (
        <div className="flex flex-0 py-[20px] ">
          <div className="relative min-w-[72px] lg:min-w-[150px] lg:h-[225px] xl:min-w-[200px] xl:h-[300px] xxl:min-w-[225px] xxl:min-h-[315px] ">
            <Image
              loading="lazy"
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
                <div className="p-[6px] md:p-[10px] transition duration-300 cursor-pointer ">
                  <AddToWishList
                    game={product}
                    position="absolute top-0 right-0"
                    added="border-[#FFFA84] bg-[#FFFA84]"
                    deleted="border-[#487CBD] bg-[#487CBD]"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-x-[5px] mb-[15px] cursor-default">
              <div>
                <span className="">
                  {generateStars(calculateAverageRating(mergedReviews))}
                </span>
              </div>
              <div className="flex-wrap mt-[5px]">
                <span className="text-[15px] text-buttonBackground font-[800]">
                  {calculateAverageRating(mergedReviews)}
                </span>
                <span className="text-[14px] text-[#FFFFFF]">/ 5</span>
                <span className="text-[14px] text-[#FFFFFF]"> from </span>
                <span className="text-[14px] text-[#FFFFFF]">
                  {mergedRatingsCount} ratings
                </span>
              </div>
            </div>
            <DigitalProductDetails display="hidden xl:flex flex-col" />
            <div className="lg:hidden">
              <ProductShareButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
