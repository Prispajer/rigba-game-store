import React from "react";
import ProductInformations from "./ProductInformations";

export default function ProductsContainer() {
  return (
    <main className="bg-primaryColor py-[15px]">
      <section className="flex max-w-[1240px] mx-auto px-2">
        <>
          <ProductInformations />
        </>
      </section>
    </main>
  );
}
