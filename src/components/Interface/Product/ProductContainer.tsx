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
import ProductDescription from "./ProductDescription";
import ProductSystemRequirements from "./ProductSystemRequirements";
import ProductHeaders from "./ProductHeaders";
import ProductRemainingDetails from "./ProductRemainingDetails";

export default function ProductsContainer() {
  return (
    <main className="pb-[100px] bg-primaryColor">
      <ProductInformations />
      <ProductBuyOrAdd />
      <PaymentWays />
      <DigitalProductDetails />
      <ProductImages />
      <ProductHeaders headerText="Podobne tytuły" />
      <section className="flex items-center justify-center z max-w-[1240px] md:mx-auto  px-[20px] bg-primaryColor shadow-md">
        <ProductInformationsCol />
      </section>
      <ShowMoreButton buttonText="Wczytaj więcej" />
      <ProductHeaders headerText="Opinie: 26" />
      <ProductReview />
      <ProductUsersReview />
      <ShowMoreButton buttonText="Załaduj więcej recenzji" />
      <ProductHeaders headerText="Opis produktu" />
      <ProductGenres />
      <ProductDescription />
      <ProductHeaders headerText="Wymagania systemowe" />
      <ProductSystemRequirements />
      <ProductHeaders headerText="Pozostałe szczegóły" />
      <ProductRemainingDetails />
    </main>
  );
}
