import React from "react";
import Image from "next/image";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import useUserReviews from "@/hooks/useUserReviews";
import { generateStars } from "./ProductInformations";
import { processReviews, mergeReviewData } from "@/utils/prices";
import { GameAPIResponse, User } from "@/utils/helpers/types";

export default function ProductUsersReview({
  product,
  user,
}: {
  product: GameAPIResponse;
  user: User;
}) {
  const {
    userReviewsState,
    handleFetchUserReviews,
    handleFetchLikeUserReview,
    handleFetchUnLikeUserReview,
  } = useUserReviews();

  React.useEffect(() => {
    handleFetchUserReviews(product.id as number);
  }, [product.id, handleFetchUserReviews]);

  const processedReviews = processReviews(userReviewsState.reviews);

  const mergedData = mergeReviewData(
    processedReviews,
    product.ratings.reduce((acc, rating) => {
      acc[rating.id.toString()] = rating;
      return acc;
    }, {} as Record<string, { id: number; title: string; count: number; percent: number }>)
  );

  console.log("Processed Reviews:", processedReviews);
  console.log("Merged Data:", mergedData);

  return (
    <div className="flex flex-col max-w-[1240px] md:mx-auto mx-[-20px]  border-t-[2px] border-primaryColor bg-secondaryColor ">
      <div className="flex flex-col justify-center">
        {userReviewsState.reviews.length > 0 ? (
          userReviewsState.reviews.map((review) => (
            <div
              key={review.id}
              className="px-[20px] py-[15px] border-primaryColor border-b-[2px]"
            >
              <div className="flex justify-between items-center mb-[10px]">
                <ul>
                  <li>{generateStars([mergedData.id])}</li>
                </ul>
                <div className="flex">
                  <button
                    onClick={() =>
                      handleFetchLikeUserReview(
                        user.email as string,
                        product.id as number
                      )
                    }
                    className="ml-[10px]"
                  >
                    <AiFillLike size="22px" color="#FFFFFF" />
                  </button>
                  <button
                    onClick={() =>
                      handleFetchUnLikeUserReview(
                        user.email as string,
                        product.id as number
                      )
                    }
                    className="ml-[10px] mt-[2px]"
                  >
                    <AiFillDislike size="22px" color="#FFFFFF" />
                  </button>
                  <span className="ml-[10px] text-[green] text-[14px]">
                    {review?.likes === 0
                      ? `${review?.likes}`
                      : review?.likes > 0
                      ? `+${review?.likes}`
                      : `-${review?.likes}`}
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
          <p className="px-[20px] py-[15px] text-[19px] text-[#FFFFFF] font-[500]">
            No reviews available for this product.
          </p>
        )}
      </div>
    </div>
  );
}
