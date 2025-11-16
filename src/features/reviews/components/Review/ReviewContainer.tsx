"use client";

import { z } from "zod";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AddToWishlist from "../../../../components/Interface/Shared/ReusableComponents/AddToWishlist";
import ProductHeaders from "../../../../components/Interface/Shared/ReusableComponents/ProductHeaders";
import ProductList from "../../../products/components/Product/ProductList";
import { FormSuccess } from "@/components/Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "@/components/Interface/Shared/FormsNotifications/FormError";
import useReviewHandlers from "../../hooks/useUserReviewHandlers";
import useCustomRouter from "@/hooks/useCustomRouter";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotification";
import {generateRandomPrice} from "@/features/products/utils/prices";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";
import { ReviewSchema } from "@/utils/schemas/product";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";

export default function ReviewContainer({
  product,
}: {
  product: ApiProductDetails;
}) {
  const { user } = useCurrentUser();
  const { redirectToProduct } = useCustomRouter();
  const { handleReviewSubmit } = useReviewHandlers();
  const { successState, messageState, originState, handleShowErrorNotification } = useNotification();
  const reviewObject = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      reviewDescription: "",
      rating: "",
    },
  });

  const ratingKeys = {
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

  return (
    <section className="sm:py-[20px] sm:px-[15px] bg-primaryColor">
      <div className="flex flex-col w-full max-w-[1240px] mx-auto sm:px-[20px]">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,200px] mt-[15px] md:mt-[40px] sm:mb-[60px] px-[20px] sm:px-0 gap-x-[20px]">
          <form
            onSubmit={handleSubmit(async (payload) => {
              if (!user) {
                  handleShowErrorNotification(
                  "User must be logged in to submit a review!",
                  NotificationOrigin.AddReviewToProduct
                );
                return;
              }
              await handleReviewSubmit(
                payload,
                product,
                ratingKeys,
                user.email
              );
            })}
            className="grid grid-cols-1 md:grid-cols-[180px,1fr] md:gap-x-[40px] mx-[-20px] sm:mx-[0px] p-[20px] lg:py-[30px] lg:px-[40px] bg-secondaryColor"
          >
            <div className="sm:mb-[55px] mb-[20px]">
              <h2 className="mb-[20px] text-[26px] text-[#FFFFFF] font-bold leading-[30px] cursor-default">
                Detailed review
              </h2>
              <div className="text-[14px] text-[#FFFFFF] cursor-default">
                Overall rating
              </div>
              <div className="rating-container">
                {["5", "4", "3", "2", "1"].map((value) => (
                  <React.Fragment key={value}>
                    <input
                      {...register("rating", { required: true })}
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
                  {(errors.rating.message as React.ReactNode)
                    ? "You must choose one at least on option!"
                    : ""}
                </p>
              )}
            </div>
            <div className="grid row-start-2 col-start-1 col-end-3 md:row-start-auto md:col-start-auto md:col-end-auto">
              <h2 className="mb-[20px] text-[26px] text-[#FFFFFF] font-bold leading-[30px] cursor-default">
                Review
              </h2>
              <p className="mb-[15px] text-[#ffffff80] text-[15px] text-justify cursor-default">
                Help other players make a choice! This review should include
                your opinion on the gameplay, graphics, soundtrack and story. If
                you would like to express your opinion on Eneba, consider
                leaving a review on Trustpilot. If you need help from support,
                select create a ticket
              </p>
              <p className="mb-[15px] text-[#ffffff80] text-[15px] text-justify cursor-default">
                Your review must be at least 150 characters long.
              </p>
              <textarea
                {...register("reviewDescription", { required: true })}
                className="w-full min-h-[250px] mb-[20px] p-[20px] text-[15px] text-[#FFFFFF] outline-none resize-none bg-tertiaryColor"
                name="reviewDescription"
                id="reviewDescription"
              ></textarea>
              {errors.reviewDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reviewDescription.message as React.ReactNode}
                </p>
              )}
              <div className="mb-[10px] flex justify-end">
                <FormSuccess
                  message={
                    successState &&
                    originState ===
                      NotificationOrigin.AddReviewToProduct
                      ? (messageState as string)
                      : ""
                  }
                />
                <FormError
                  message={
                    !successState&&
                    originState ===
                      NotificationOrigin.AddReviewToProduct
                      ? (messageState as string)
                      : ""
                  }
                />
              </div>
              <div className="flex justify-end">
                <button className="min-w-[200px] min-h-[35px] transition duration-300 font-medium text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover">
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </form>
          <div className="grid row-start-1 sm:row-start-auto mb-[15px]">
            <div
              key={product.id}
              onClick={() => redirectToProduct(product.slug as string)}
              className={`relative min-w-[200px] max-h-[400px] min-h-[150px] sm:min-h-[360px] flex sm:flex-col bg-tertiaryColor cursor-pointer`}
            >
              <>
                <div className="relative m-[5px] sm:m-[0px] min-w-[95px] sm:min-h-[250px]">
                  <Image
                    fetchPriority="high"
                    loading="eager"
                    fill={true}
                    src={product.background_image || ""}
                    alt={product.background_image || ""}
                    sizes="(max-width: 576px) 95px, 200px"
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
                      ${generateRandomPrice()}
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
                      <AddToWishlist
                        product={product}
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
        <div className="grid grid-cols-1 items-start w-full px-[20px] pb-[20px]  ">
          <ProductHeaders headerText="You may like" />
          <ProductList />
        </div>
      </div>
    </section>
  );
}
