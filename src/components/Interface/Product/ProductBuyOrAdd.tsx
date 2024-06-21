import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { ProductMixedInformations } from "@/utils/helpers/types";
import generateRandomValue from "@/utils/prices";
import { LocalProduct } from "@/utils/helpers/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function ProductBuyOrAdd({
  product,
}: {
  product: ProductMixedInformations;
}) {
  const { handleAddProduct } = useLocalStorage("LocalCart");
  const user = useCurrentUser();

  const handleAddToCart = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/breakpoints/productManagement/addProductToCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            externalProductId: product?.id,
            name: product?.name,
            description: product?.description_raw,
            price: generateRandomValue(),
            imageUrl: product?.background_image,
            email: user?.email,
          }),
        }
      );
      const result = await response.json();
      if (user) {
        if (response.ok) {
          alert(result.success);
        } else {
          alert(result.error || "Something went wrong");
        }
      } else {
        const newProduct: LocalProduct = {
          id: product.id,
          name: product.name,
          description: product.description_raw,
          price: generateRandomValue(),
          imageUrl: product.background_image,
          quantity: 1,
        };
        handleAddProduct(newProduct);
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
