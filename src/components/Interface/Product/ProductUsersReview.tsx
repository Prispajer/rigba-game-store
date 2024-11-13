import React from "react";
import Image from "next/image";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { generateStars } from "@/utils/ratings";
import { GameAPIResponse } from "@/utils/helpers/types";
import { UserReviewsSlice } from "@/redux/slices/userReviewsSlice";
import {
  LikeUserReviewDTO,
  UnLikeUserReviewDTO,
} from "@/utils/helpers/frontendDTO";
import { User } from "next-auth";

export default function ProductUsersReview({
  product,
  user,
  userReviewsState,
  handleFetchUserReviews,
  handleFetchLikeUserReview,
  handleFetchUnLikeUserReview,
}: {
  product: GameAPIResponse;
  user: User | null;
  userReviewsState: UserReviewsSlice;
  handleFetchUserReviews: (externalProductId: number) => void;
  handleFetchLikeUserReview: (likeUserReviewDTO: LikeUserReviewDTO) => void;
  handleFetchUnLikeUserReview: (
    unLikeUserReviewDTO: UnLikeUserReviewDTO
  ) => void;
}) {
  React.useEffect(() => {
    handleFetchUserReviews(product.id as number);
  }, [
    product,
    handleFetchUserReviews,
    handleFetchLikeUserReview,
    handleFetchUnLikeUserReview,
  ]);

  return (
    <div className="flex flex-col max-w-[1240px] md:mx-auto mx-[-20px] border-t-[2px] border-primaryColor bg-secondaryColor">
      <div className="flex flex-col justify-center">
        {userReviewsState.reviews.length > 0 ? (
          userReviewsState.reviews.map((review) => (
            <div
              key={review.id}
              className="px-[20px] py-[15px] border-primaryColor border-b-[2px]"
            >
              <div className="flex justify-between items-center mb-[10px]">
                <ul>
                  <li>{generateStars(review.rating.rating)}</li>
                </ul>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      handleFetchLikeUserReview({
                        email: user?.email as string,
                        externalProductId: product.id as number,
                        reviewId: review.id as string,
                      });
                    }}
                    className="ml-[10px]"
                  >
                    <AiFillLike size="22px" color="#FFFFFF" />
                  </button>
                  <button
                    onClick={() => {
                      handleFetchUnLikeUserReview({
                        email: user?.email as string,
                        externalProductId: product.id as number,
                        reviewId: review.id as string,
                      });
                    }}
                    className="ml-[10px] mt-[2px]"
                  >
                    <AiFillDislike size="22px" color="#FFFFFF" />
                  </button>
                  <span className="ml-[10px] text-[green] text-[14px]">
                    {review.likes === 0
                      ? `${review.likes}`
                      : review.likes > 0
                      ? `+${review.likes}`
                      : `${review.likes}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center mb-[10px]">
                <Image
                  className="flex-0 mr-[10px] rounded-full"
                  src={review.user.image || "/icons/logo.png"}
                  width="22"
                  height="22"
                  alt="user-avatar"
                />
                <strong className="flex-0 mr-[10px] text-[16px] text-[#FFFFFF]">
                  {review.user.name || review.user.email}
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
