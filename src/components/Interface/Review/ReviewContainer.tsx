"use client";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AddToWishList from "../Shared/ReusableComponents/AddToWishList";
import ProductHeaders from "../Shared/ReusableComponents/ProductHeaders";
import ProductList from "../Product/ProductList";
import requestService from "@/utils/services/RequestService";
import useCustomRouter from "@/hooks/useCustomRouter";
import useCurrentUser from "@/hooks/useCurrentUser";
import { generateRandomValue } from "@/utils/prices";
import { GameAPIResponse } from "@/utils/helpers/types";
import { ReviewSchema } from "@/utils/schemas/product";
import { RatingTitle } from "@prisma/client";

export default function ReviewContainer({
  product,
}: {
  product: GameAPIResponse;
}) {
  const { user } = useCurrentUser();
  const { redirectToGame } = useCustomRouter();
  const reviewObject = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      review: "",
      rating: null,
    },
  });

  const ratingTitles = {
    5: "Exceptional",
    4: "Recommended",
    3: "Meh",
    2: "Skip",
    1: "Skip",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = reviewObject;

  const handleReviewSubmit = async (data: z.infer<typeof ReviewSchema>) => {
    const { review, rating } = data;
    const title = ratingTitles[rating as keyof typeof ratingTitles];

    try {
      const response = await requestService.postMethod(
        "products/endpoints/productManagement/addReviewToProduct",
        {
          email: user?.email as string,
          externalProductId: product.id,
          name: product.name,
          description: review,
          background_image: product.background_image,
          price: generateRandomValue(),
          rating: parseInt(rating),
          title: title as RatingTitle,
          slug: product.slug,
          released: product.released,
          added: product.added,
          likes: 0,
        }
      );
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <section className="sm:py-[20px] sm:px-[15px] bg-primaryColor">
      <div className="flex flex-col w-full max-w-[1240px] mx-auto sm:px-[20px]">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,200px] mt-[15px] md:mt-[40px] sm:mb-[60px] px-[20px] sm:px-0 gap-x-[20px]">
          <form
            onSubmit={handleSubmit(handleReviewSubmit)}
            className="grid grid-cols-1 md:grid-cols-[180px,1fr] md:gap-x-[40px] mx-[-20px] sm:mx-[0px] p-[20px] lg:py-[30px] lg:px-[40px] bg-secondaryColor"
          >
            <div className="sm:mb-[55px] mb-[20px]">
              <h2 className="mb-[20px] text-[26px] text-[#FFFFFF] font-bold leading-[30px]">
                Detailed review
              </h2>
              <div className="text-[14px] text-[#FFFFFF]">Overall rating</div>
              <div className="rating-container">
                {["5", "4", "3", "2", "1"].map((value) => (
                  <React.Fragment key={value}>
                    <input
                      {...register("rating", { required: true })}
                      type="radio"
                      id={`rating-${value}`}
                      value={value}
                    />
                    <label htmlFor={`rating-${value}`} className="rating-label">
                      &#9733;
                    </label>
                  </React.Fragment>
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.message as React.ReactNode}
                </p>
              )}
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
            <div className="grid row-start-2 col-start-1 col-end-3 md:row-start-auto md:col-start-auto md:col-end-auto">
              <h2 className="mb-[20px] text-[26px] text-[#FFFFFF] font-bold leading-[30px]">
                Review
              </h2>
              <p className="mb-[15px] text-[#ffffff80] text-[15px] text-justify">
                Help other players make a choice! This review should include
                your opinion on the gameplay, graphics, soundtrack and story. If
                you would like to express your opinion on Eneba, consider
                leaving a review on Trustpilot. If you need help from support,
                select create a ticket
              </p>
              <p className="mb-[15px] text-[#ffffff80] text-[15px] text-justify">
                Your review must be at least 150 characters long.
              </p>
              <textarea
                {...register("review", { required: true })}
                className="w-full min-h-[250px] mb-[20px] p-[20px] text-[15px] text-[#FFFFFF] outline-none resize-none bg-tertiaryColor"
                name="review"
                id="review"
              ></textarea>
              {errors.review && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.review.message as React.ReactNode}
                </p>
              )}
              <div className="flex justify-end">
                <button className="min-w-[200px] min-h-[35px] bg-buttonBackground text-buttonTextColor">
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </form>
          <div className="grid row-start-1 sm:row-start-auto mb-[15px]">
            <div
              key={product.id}
              onClick={() => redirectToGame(product.slug as string)}
              className={`relative min-w-[200px] max-h-[400px] min-h-[150px] sm:min-h-[360px] flex sm:flex-col bg-tertiaryColor cursor-pointer`}
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
                        Global
                      </span>
                    </div>
                  </div>
                  <div className="h-[50%] md:h-[75px]">
                    <div className="text-[14px] text-[#ffffff80] font-medium">
                      From
                    </div>
                    <div className="overflow-hidden overflow-ellipsis line-clamp-1 text-[20px] text-[#ffffff] font-bold">
                      ${generateRandomValue()}
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
                      <AddToWishList
                        game={product}
                        position="absolute right-[10px] top-0"
                        added="border-[#FFFA84] bg-[#FFFA84]"
                        deleted="bg-[#d3d3d3]"
                      />
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start w-full px-[20px] pb-[20px] bg-secondaryColor ">
          <ProductHeaders headerText="You may like" />
          <ProductList />
        </div>
      </div>
    </section>
  );
}
