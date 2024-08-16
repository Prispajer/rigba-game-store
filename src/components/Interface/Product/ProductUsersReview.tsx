"use client";

import React from "react";
import Image from "next/image";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import requestService from "@/utils/classes/RequestService";
import { generateStars } from "./ProductInformations";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ProductUsersReview({
  product,
}: {
  product: GameAPIResponse;
}) {
  const [productReviews, setProductReviews] = React.useState<any[]>([]);

  const getReviewsFromDatabase = async () => {
    try {
      const response = await requestService.postMethod(
        "products/endpoints/productManagement/getReviews",
        { externalProductId: product.id }
      );

      if (response.success) {
        setProductReviews(response.data?.reviews || []);
      } else {
        throw new Error(response.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  React.useEffect(() => {
    getReviewsFromDatabase();
  }, []);

  return (
    <div className="flex flex-col max-w-[1240px] md:mx-auto mx-[-20px] px-[20px] py-[15px] border-t-[2px] border-primaryColor bg-secondaryColor ">
      <div className="flex flex-col justify-center">
        {productReviews.length > 0 ? (
          productReviews.map((review) => (
            <div key={review.id} className="mb-[20px]">
              <div className="flex justify-between items-center mb-[10px]">
                <ul>
                  <li>{generateStars(review.rating?.rating)}</li>
                </ul>
                <div className="flex">
                  <button className="ml-[10px]">
                    <AiFillLike size="22px" color="#FFFFFF" />
                  </button>
                  <button className="ml-[10px] mt-[2px]">
                    <AiFillDislike size="22px" color="#FFFFFF" />
                  </button>
                  <span className="ml-[10px] text-[green] text-[14px]">
                    {review?.rating.likes === 0
                      ? `${review?.rating.likes}`
                      : review?.rating.likes > 0
                      ? `+${review?.rating.likes}`
                      : `-${review?.rating.likes}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center mb-[10px]">
                <Image
                  className="flex-0 mr-[10px] rounded-full"
                  src={
                    review?.user.image ? review?.user.image : "/icons/logo.png"
                  }
                  width="22"
                  height="22"
                  alt="user-avatar"
                />
                <strong className="flex-0 mr-[10px] text-[16px] text-[#FFFFFF]">
                  {review?.user.name ? review?.user.name : review?.user.email}
                </strong>
                <span className="flex-1 text-[#C3DAC9] text-[12px]">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="break-words text-[15px] text-[#DCD8E6] text-justify cursor-default">
                {review.rating.description || "No review content provided."}
              </div>
            </div>
          ))
        ) : (
          <p className="text-[19px] text-[#FFFFFF] font-[500]">
            No reviews available for this product.
          </p>
        )}
      </div>
    </div>
  );
}
