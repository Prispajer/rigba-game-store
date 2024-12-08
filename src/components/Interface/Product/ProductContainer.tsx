"use client";
import React from "react";
import ProductInformations from "./ProductInformations";
import ProductBuyOrAdd from "./ProductBuyOrAdd";
import ProductPaymentWays from "./ProductPaymentWays";
import ProductDigitalProductDetails from "./ProductDigitalProductDetails";
import ProductScreenshots from "./ProductScreenshots";
import ProductReview from "./ProductReview";
import ProductUsersReview from "./ProductUsersReview";
import ProductGenres from "./ProductGenres";
import ProductDescription from "./ProductDescription";
import ProductRequirements from "./ProductRequirements";
import ProductShareButton from "./ProductShareButton";
import ProductHeaders from "../Shared/ReusableComponents/ProductHeaders";
import ProductRemainingDetails from "./ProductRemainingDetails";
import ShowMoreButton from "../Shared/Buttons/ShowMoreButton";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useCustomRouter from "@/hooks/useCustomRouter";
import useUserCart from "@/hooks/useUserCart";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserReviews from "@/hooks/useUserReviews";
import { GameAPIResponse } from "@/utils/helpers/types";
import ProductList from "./ProductList";

export default function ProductContainer({
  product,
  screenshots,
}: {
  product: GameAPIResponse;
  screenshots: GameAPIResponse["screenshots"];
}) {
  const { handleOpen } = useWindowVisibility();
  const { redirectToReview, redirectToFilters, redirectToCheckout } =
    useCustomRouter();
  const { handleAddUserProductToCart, isCartLoading } = useUserCart();
  const { handleAddLocalProductToCart } = useLocalStorage("localCart");
  const { user } = useCurrentUser();
  const {
    userReviewsState,
    isReviewLoading,
    handleFetchUserReviews,
    handleFetchLikeUserReview,
    handleFetchUnLikeUserReview,
  } = useUserReviews();

  return (
    <section className="pb-[100px] bg-primaryColor">
      <div className="grid grid-cols-1 lg:grid-cols-[calc(100%-380px),380px] max-w-[1600px] mx-auto px-[20px]">
        <div>
          <ProductInformations
            product={product}
            userReviewsState={userReviewsState}
          />
          <div className="mx-[-20px] lg:hidden">
            <ProductBuyOrAdd
              product={product}
              user={user}
              isCartLoading={isCartLoading}
              handleAddUserProductToCart={handleAddUserProductToCart}
              handleAddLocalProductToCart={handleAddLocalProductToCart}
              redirectToCheckout={redirectToCheckout}
            />
            <ProductPaymentWays />
          </div>
          <ProductDigitalProductDetails display="xl:hidden w-full" />
          <ProductScreenshots
            screenshots={screenshots}
            handleOpen={handleOpen}
          />
          <ProductHeaders headerText="Gamers also viewed" />
          <ProductList />
          <ProductHeaders headerText="Reviews" />
          <ProductReview
            product={product}
            isReviewLoading={isReviewLoading}
            redirectToReview={redirectToReview}
            userReviewsState={userReviewsState}
          />
          <ProductUsersReview
            product={product}
            isReviewLoading={isReviewLoading}
            user={user}
            userReviewsState={userReviewsState}
            handleFetchUserReviews={handleFetchUserReviews}
            handleFetchLikeUserReview={handleFetchLikeUserReview}
            handleFetchUnLikeUserReview={handleFetchUnLikeUserReview}
          />
          {userReviewsState.reviews.length > 5 ? (
            <ShowMoreButton text="Load more reviews" />
          ) : (
            ""
          )}
          <ProductHeaders headerText="Product description" />
          <ProductGenres
            product={product}
            redirectToFilters={redirectToFilters}
          />
          <ProductDescription product={product} />
          <ProductHeaders headerText="System requirements" />
          <ProductRequirements product={product} />
          <ProductHeaders headerText="Other details" />
          <ProductRemainingDetails product={product} />
        </div>
        <div className="hidden lg:flex flex-col">
          <div className="lg:sticky top-[20px]">
            <ProductShareButton />
            <ProductBuyOrAdd
              product={product}
              user={user}
              isCartLoading={isCartLoading}
              handleAddUserProductToCart={handleAddUserProductToCart}
              handleAddLocalProductToCart={handleAddLocalProductToCart}
              redirectToCheckout={redirectToCheckout}
            />
            <ProductPaymentWays />
          </div>
        </div>
      </div>
    </section>
  );
}
