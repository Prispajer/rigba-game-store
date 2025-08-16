import React from "react";
import LoadingAnimation from "../Shared/Animations/LoadingAnimation";
import { generateStars } from "@/utils/ratings";
import { groupReviewsByRating, mergeReviews } from "@/utils/reviews";
import { GameAPIResponse } from "@/types/types";
import { UserReviewsSlice } from "@/features/reviews/redux/slices/reviews/reviewsSlice";

export default function ProductReview({
  product,
  redirectToReview,
  userReviewsState,
}: {
  product: GameAPIResponse;
  redirectToReview: (name: string) => void;
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

  return (
    <div className="md:mx-auto mx-[-20px] pt-[20px] px-[20px] pb-[15px] md:px-0 lg:px-[20px] xxl:px-0 bg-secondaryColor md:bg-transparent lg:bg-secondaryColor xxl:bg-transparent">
      <div className="sm:flex sm:flex-row w-full gap-4">
        <div className="flex flex-wrap justify-between items-center w-full">
          <ul className="flex flex-col md:flex-row lg:flex-col xxl:flex-row cursor-default">
            {mergedReviews.length > 0 ? (
              mergedReviews
                .sort((a, b) => a.percent - b.percent)
                .map((rating) => (
                  <li
                    key={rating.id}
                    className="flex md:flex-col flex-row-reverse justify-between items-center md:items-start mx-[20px] md:ml-[0px] lg:mx-[20px] xxl:ml-[0px] lg:flex-row-reverse lg:items-center xxl:mx-[20px] xxl:flex-col xxl:items-start text-buttonTextColor"
                  >
                    <span className="flex grow mt-[4px] lg:mt-[4px] mx-[20px] md:m-0 lg:mx-[20px] xxl:m-0 text-[15px] text-[#DCD8D6] capitalize">
                      {rating.title}
                    </span>
                    {generateStars((5 * rating.percent) / 100)}
                  </li>
                ))
            ) : (
              <div className="">
                <span className="text-[19px] font-[500] text-[#FFFFFF]">
                  This product has no reviews!
                </span>
              </div>
            )}
          </ul>
        </div>
        <div className="flex items-end justify-end">
          <button
            onClick={() => redirectToReview(product.slug as string)}
            className="w-full sm:w-[130px] min-w-[130px] min-h-[35px] max-h-[35px] my-[5px] px-[10px] text-[15px] text-[#FFFFFF] font-bold border border-white hover:bg-tertiaryColor hover:border-headerHover transition ease-in-out"
          >
            Review now
          </button>
        </div>
      </div>
    </div>
  );
}
