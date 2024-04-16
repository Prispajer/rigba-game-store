import React from "react";
import ProductInformations from "./ProductInformations";
import ProductBuyOrAdd from "./ProductBuyOrAdd";
import PaymentWays from "./PaymentWays";
import DigitalProductDetails from "./DigitalProductDetails";
import ProductImages from "./ProductImages";
import ProductInformationsCol from "../Shared/Products/ProductInformationsCol";
import ShowMoreButton from "../Shared/ShowMoreButton/ShowMoreButton";
import ProductReview from "./ProductReview";
import ProductUsersReview from "./ProductUsersReview";
import ProductGenres from "./ProductGenres";

export default function ProductsContainer() {
  return (
    <main className="py-[15px] bg-primaryColor">
      <section className="flex max-w-[1240px] md:mx-auto px-[20px] pb-[15px] bg-primaryColor shadow-md">
        <>
          <ProductInformations />
        </>
      </section>
      <section className="flex max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-secondaryColor shadow-md">
        <>
          <ProductBuyOrAdd />
        </>
      </section>
      <section className="flex max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-primaryColor shadow-md">
        <PaymentWays />
      </section>
      <section className="flex max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-secondaryColor shadow-md">
        <DigitalProductDetails />
      </section>
      <section className="flex max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-secondaryColor shadow-md">
        <ProductImages />
      </section>
      <section className="flex items-center justify-center z max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-primaryColor shadow-md">
        <ProductInformationsCol />
      </section>
      <ShowMoreButton buttonText="Wczytaj więcej" />
      <div className="mb-[15px] ml-[20px]">
        <h2 className="text-[18px] font-[700] text-[#ffffff] bg-primaryColor">
          Opinie: 26
        </h2>
      </div>
      <ProductReview />
      <ProductUsersReview />
      <ShowMoreButton buttonText="Załaduj więcej recenzji" />
      <ProductGenres />
    </main>
  );
}
