import React from "react";
import Image from "next/image";
import LoadingAnimation from "../Shared/Animations/LoadingAnimation";
import { FormError } from "../Shared/FormsNotifications/FormError";
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
  isReviewLoading,
  user,
  userReviewsState,
  handleFetchLikeUserReview,
  handleFetchUnLikeUserReview,
}: {
  product: GameAPIResponse;
  isReviewLoading: boolean;
  user: User | null;
  userReviewsState: UserReviewsSlice;
  handleFetchLikeUserReview: (likeUserReviewDTO: LikeUserReviewDTO) => void;
  handleFetchUnLikeUserReview: (
    unLikeUserReviewDTO: UnLikeUserReviewDTO
  ) => void;
}) {
  const findReviewLiker = (reviewId: string) => {
    return userReviewsState.reviews.some((review) =>
      review.reviewLikers.some(
        (reviewLiker) =>
          reviewLiker.userId === user?.id && review.id === reviewId
      )
    );
  };

  const handleLikeClick = (reviewId: string) => {
    if (!user) return;
    handleFetchLikeUserReview({
      email: user.email as string,
      externalProductId: product.id as number,
      reviewId,
    });
  };

  const handleDislikeClick = (reviewId: string) => {
    if (!user) return;
    handleFetchUnLikeUserReview({
      email: user.email as string,
      externalProductId: product.id as number,
      reviewId,
    });
  };

  return (
    <div className="flex flex-col max-w-[1240px] md:mx-auto mx-[-20px] border-t-[2px] border-primaryColor bg-secondaryColor">
      <div className="flex flex-col justify-center">
        {isReviewLoading ? (
          <div className="flex justify-center items-center px-[20px] py-[15px]">
            <LoadingAnimation />
          </div>
        ) : userReviewsState.reviews.length > 0 ? (
          userReviewsState.reviews.map((review) => {
            return (
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
                      onClick={() => handleLikeClick(review.id)}
                      className="ml-[10px]"
                      disabled={
                        isReviewLoading || findReviewLiker(review.id) || !user
                      }
                    >
                      <AiFillLike size="22px" color="#FFFFFF" />
                    </button>
                    <button
                      onClick={() => handleDislikeClick(review.id)}
                      className="ml-[10px] mt-[2px]"
                      disabled={
                        isReviewLoading || !findReviewLiker(review.id) || !user
                      }
                    >
                      <AiFillDislike size="22px" color="#FFFFFF" />
                    </button>
                    <span className="ml-[10px] text-[green] text-[14px] cursor-default">
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
                    loading="eager"
                    className="flex-0 min-w-[22px] min-h-[22px] mr-[10px] rounded-full"
                    src={review.user.image || "/icons/logo.png"}
                    alt={review.user.image || "/icons/logo.png"}
                    width="22"
                    height="22"
                  />
                  <strong className="flex-0 mr-[10px] text-[16px] text-[#FFFFFF] cursor-default">
                    {review.user.name || review.user.email}
                  </strong>
                  <span className="flex-1 text-[#C3DAC9] text-[12px] cursor-default">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="break-words text-[15px] text-[#DCD8E6] text-justify cursor-default">
                  {review.rating.description || "No review content provided."}
                </div>
              </div>
            );
          })
        ) : (
          <p className="px-[20px] py-[15px] text-[19px] text-[#FFFFFF] font-[500] cursor-default">
            No reviews available for this product.
          </p>
        )}
        {!user && (
          <FormError message="You must be logged in to like or dislike reviews!" />
        )}
      </div>
    </div>
  );
}
