"use client";

import Image from "next/image";
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
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import { CiShare1 } from "react-icons/ci";

export default function ProductsContainer({ product, screenshots }) {
  const data = useFetchGameDataByLink("https://api.rawg.io/api/games");

  return (
    <main className=" pb-[100px] bg-primaryColor">
      <section className="grid grid-cols-1 lg:grid-cols-[calc(100%-380px),380px] max-w-[1600px] mx-auto">
        <div>
          <ProductInformations />
          <div className="lg:hidden">
            <p>{product}</p>
            {screenshots.map((screenshot) => (
              <Image
                width={50}
                height={50}
                alt={screenshot.image}
                src={screenshot.image}
              ></Image>
            ))}

            <ProductBuyOrAdd />
            <PaymentWays />
          </div>
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
            <ProductBuyOrAdd />
            <PaymentWays />
          </div>
        </div>
      </section>
    </main>
  );
}
