import React from "react";
import { CiShare1 } from "react-icons/ci";
import ProductInformations from "./ProductInformations";
import ProductBuyOrAdd from "./ProductBuyOrAdd";
import ProductPaymentWays from "./ProductPaymentWays";
import ProductDigitalProductDetails from "./ProductDigitalProductDetails";
import ProductImages from "./ProductImages";
import ProductReview from "./ProductReview";
import ProductUsersReview from "./ProductUsersReview";
import ProductGenres from "./ProductGenres";
import ProductDescription from "./ProductDescription";
import ProductSystemRequirements from "./ProductSystemRequirements";
import ProductHeaders from "../Shared/ReusableComponents/ProductHeaders";
import ProductRemainingDetails from "./ProductRemainingDetails";
import ShowMoreButton from "../Shared/Buttons/ShowMoreButton";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ProductContainer({
  product,
  screenshots,
  genres,
  requirements,
  gameGenres,
}: {
  product: any;
  screenshots: string[];
  genres: string[];
  requirements: any;
  gameGenres: GameAPIResponse;
}) {
  return (
    <main className="pb-[100px] bg-primaryColor">
      <section className="grid grid-cols-1 lg:grid-cols-[calc(100%-380px),380px] max-w-[1600px] mx-auto px-[20px]">
        <div>
          <ProductInformations product={product} />
          <div className="mx-[-20px] lg:hidden">
            <ProductBuyOrAdd product={product} />
            <ProductPaymentWays />
          </div>
          <ProductDigitalProductDetails display="xl:hidden w-full" />
          <ProductImages screenshots={screenshots} />
          <ProductHeaders headerText="Gamers also viewed" />
          <ProductHeaders headerText="Reviews: 26" />
          <ProductReview product={product} />
          <ProductUsersReview />
          <ShowMoreButton text="Load more reviews" />
          <ProductHeaders headerText="Product description" />
          <ProductGenres genres={gameGenres} />
          <ProductDescription product={product} />
          <ProductHeaders headerText="Wymagania systemowe" />
          <ProductSystemRequirements requirements={requirements} />
          <ProductHeaders headerText="Pozostałe szczegóły" />
          <ProductRemainingDetails />
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
      </section>
    </main>
  );
}
