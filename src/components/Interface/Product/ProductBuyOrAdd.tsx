"use client";
import React from "react";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import { FaCartPlus } from "react-icons/fa";

export default function ProductBuyOrAdd() {
  const gameDetails = useFetchGameDataByLink(
    "https://api.rawg.io/api/games/123"
  );

  const handleAddToCart = async () => {
    if (!gameDetails) {
      alert("Game details are not available");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000//api/products/breakpoints/productManagement/addProductToCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: gameDetails.id,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.success);
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart");
    }
  };

  return (
    <div className="flex flex-col sm:mx-[20px] my-[20px] py-[15px] px-[20px] bg-[#387CBD] shadow-md">
      {gameDetails && (
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
              <button
                className="w-full min-h-[35px] bg-buttonBackground text-buttonTextColor"
                onClick={handleAddToCart}
              >
                Kup Teraz
              </button>
            </div>
            <div className="flex items-center min-h-[35px] px-[10px] bg-transparent border-[2px]">
              <FaCartPlus size="20px" color="#ffffff" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
