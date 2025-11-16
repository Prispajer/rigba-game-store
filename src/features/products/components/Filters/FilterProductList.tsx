"use client";

import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import AddToWishlist from "../../../../components/Interface/Shared/ReusableComponents/AddToWishlist";
import useFetchGameData from "@/features/products/hooks/useFetchGameData";
import useCustomRouter from "@/hooks/useCustomRouter";
import useSearchText from "@/hooks/useSearchText";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export default function FilterProductList() {
  const { productFilterState, handleComparePrices } = useFetchGameData();
  const { compartmentNumberOneState, compartmentNumberTwoState} =
    useSearchText();
  const { redirectToProduct } = useCustomRouter();

  const displayByCondition: ApiProductDetails[] =
      compartmentNumberOneState && compartmentNumberTwoState
      ? handleComparePrices(
          (compartmentNumberOneState as number) ?? 0,
          (compartmentNumberTwoState as number) ?? 0
        )
      : productFilterState.productsWithFilters;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-product-list-auto-fit gap-x-[10px]">
      {displayByCondition && displayByCondition.length > 0 ? (
        displayByCondition.map((product) => (
          <div
            key={product.slug}
            onClick={() => redirectToProduct(product.slug as string)}
            className="relative my-[10px] flex flex-row sm:flex-col bg-tertiaryColor cursor-pointer"
          >
            <div className="relative min-w-[95px] sm:min-h-[250px] m-[5px] sm:m-[0px]">
              <Image
                loading="eager"
                fill={true}
                src={product.background_image ?? ""}
                alt={product.background_image ?? ""}
                sizes="(max-width: 576px) 95px, 100vw"
              />
            </div>
            <div className="max-w-[50%] sm:max-w-[100%] my-[10px] px-[15px]">
              <div className="flex flex-col justify-between min-h-[60px]">
                <div className="leading-none line-clamp-1 text-[#ffffff]">
                  <span className="font-bold text-[14px]">{product.name}</span>
                </div>
                <div>
                  <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[12px] text-[#fffa84] font-bold">
                    GLOBAL
                  </span>
                </div>
              </div>
              <div className="h-[50%] md:h-[75px]">
                <div className="text-[14px] text-[#ffffff80] font-medium">
                  From
                </div>
                <div className="overflow-hidden overflow-ellipsis line-clamp-1 text-[20px] text-[#ffffff] font-bold">
                  ${product.price}
                </div>
                <div className="flex items-center">
                  <CiHeart
                    className="ml-[-3px] mr-[3px]"
                    size="20px"
                    color="#ffffff80"
                  />
                  <span className="overflow-hidden overflow-ellipsis line-clamp-1 text-[14px] text-[#ffffff80]">
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
            <AddToWishlist
              product={product}
              position="absolute right-[10px] top-0"
              added="border-[#FFFA84] bg-[#FFFA84]"
              deleted="bg-[##d3d3d3]"
            />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-white">
          No games found.
        </div>
      )}
    </div>
  );
}
