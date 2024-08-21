"use client";
import React from "react";
import { CiShare1 } from "react-icons/ci";
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
import ProductHeaders from "../Shared/ReusableComponents/ProductHeaders";
import ProductRemainingDetails from "./ProductRemainingDetails";
import ShowMoreButton from "../Shared/Buttons/ShowMoreButton";
import useCustomRouter from "@/hooks/useCustomRouter";
import useCurrentUser from "@/hooks/useCurrentUser";
import { GameAPIResponse } from "@/utils/helpers/types";
import ProductList from "./ProductList";

export default function ProductContainer({
  product,
  screenshots,
}: {
  product: GameAPIResponse;
  screenshots: GameAPIResponse["screenshots"];
}) {
  const { user } = useCurrentUser();
  const { redirectToGame, redirectToReview } = useCustomRouter();

  return (
    <main className="pb-[100px] bg-primaryColor">
      <div className="grid grid-cols-1 lg:grid-cols-[calc(100%-380px),380px] max-w-[1600px] mx-auto px-[20px]">
        <div>
          <ProductInformations product={product} />
          <div className="mx-[-20px] lg:hidden">
            <ProductBuyOrAdd product={product} />
            <ProductPaymentWays />
          </div>
          <ProductDigitalProductDetails display="xl:hidden w-full" />
          <ProductScreenshots screenshots={screenshots} />
          <ProductHeaders headerText="Gamers also viewed" />
          <ProductList />
          <ProductHeaders headerText="Reviews: 26" />
          <ProductReview
            product={product}
            redirectToReview={redirectToReview}
          />
          <ProductUsersReview product={product} user={user} />
          <ShowMoreButton text="Load more reviews" />
          <ProductHeaders headerText="Product description" />
          <ProductGenres product={product} />
          <ProductDescription product={product} />
          <ProductHeaders headerText="System requirements" />
          <ProductRequirements product={product} />
          <ProductHeaders headerText="Other details" />
          <ProductRemainingDetails product={product} />
        </div>
        <div className="hidden lg:flex flex-col">
          <div className="lg:sticky top-[20px]">
            <div className="flex items-center justify-between my-[15px] px-[20px]">
              <span className="text-[#FFFFFF] font-[700] text-[13px]">
                Udostępnij komuś, komu się podoba!
              </span>
              <button className="flex items-center p-[6px] bg-[#487CBD]">
                <span className="text-[14px] text-[#FFFFFF]">Udostępnij</span>
                <span className="text-[14px] text-[#FFFFFF] ml-[6px]">
                  <CiShare1 />
                </span>
              </button>
            </div>
            <ProductBuyOrAdd product={product} />
            <ProductPaymentWays />
          </div>
        </div>
      </div>
    </main>
  );
}
