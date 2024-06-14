"use client";
import React from "react";
import { NextResponse } from "next/server";
import { FaCartPlus } from "react-icons/fa";

export default function ProductBuyOrAdd({ product }) {
  const handleAddToCart = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000//api/products/breakpoints/productManagement/addProductToCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: product?.id,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        return NextResponse.json({ message: "Pomyślnie dodano produkt!" });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart");
    }
  };

  return (
    <div className="flex flex-col sm:mx-[20px] my-[20px] py-[15px] px-[20px] bg-[#387CBD] shadow-md">
      <div className="max-w-[350px]">
        <div className="flex w-[70px]">
          <div>
            <span className="font-[700] text-[18px] text-[#ffffff]">
              47,43zł
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-[20px] bg-transparent">
            <button className="w-full min-h-[35px] bg-buttonBackground text-buttonTextColor">
              Kup Teraz
            </button>
          </div>
          <div
            className="flex items-center min-h-[35px] px-[10px] bg-transparent border-[2px] cursor-pointer"
            onClick={handleAddToCart}
          >
            <FaCartPlus size="20px" color="#ffffff" />
          </div>
        </div>
      </div>
    </div>
  );
}
