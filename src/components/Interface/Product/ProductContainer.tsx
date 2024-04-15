import React from "react";
import ProductInformations from "./ProductInformations";
import ProductBuyOrAdd from "./ProductBuyOrAdd";
import PaymentWays from "./PaymentWays";
import DigitalProductDetails from "./DigitalProductDetails";

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
    </main>
  );
}
