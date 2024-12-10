"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingAnimation from "../../Shared/Animations/LoadingAnimation";
import useUserProductHistory from "@/hooks/useUserProductHistory";

export default function RedeemContainer({
  params,
}: {
  params?: { redeemId: string };
}) {
  const { userProductHistoryState, isLoading } = useUserProductHistory();

  const findMultipleProducts = (redeemId: string) => {
    const isProductHistoryId = userProductHistoryState.productHistoryArray.some(
      (productHistory) =>
        productHistory.keys.some((key) => key.productHistoryId === redeemId)
    );

    return isProductHistoryId
      ? userProductHistoryState.productHistoryArray.filter((productHistory) =>
          productHistory.keys.some((key) => key.productHistoryId === redeemId)
        )
      : userProductHistoryState.productHistoryArray.filter((productHistory) =>
          productHistory.keys.some((key) => key.orderHistoryId === redeemId)
        );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-55px)] md:min-h-[calc(100vh-96px)] bg-primaryColor">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center w-full h-full min-h-[calc(100vh-55px)] md:min-h-[calc(100vh-96px)] md:py-[20px] bg-primaryColor mx-auto">
      <h1 className="hidden md:flex mt-[10px] mb-[30px] text-[30px] text-[#FFFFFF] font-bold">
        Redeem your product
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-[100px,1fr] w-full lg:max-w-[1040px] mx-auto p-[20px]">
        {params &&
          findMultipleProducts(params.redeemId).map((product) => (
            <React.Fragment key={product.id}>
              <ul className="flex flex-col">
                <li className="flex flex-col items-center jusftify-center  md:mb-[10px] gap-x-[10px] bg-secondaryColor">
                  <div className="w-[200px] sm:w-[100px] h-[100px] py-[10px] sm:p-[0px]">
                    <div className="relative h-full w-full">
                      <Image
                        loading="eager"
                        layout="fill"
                        src={
                          product.productsInformations?.background_image || ""
                        }
                        alt={product.productsInformations?.name || ""}
                        sizes="(max-width: 576px) 200px, 100px"
                      />
                    </div>
                  </div>
                  <div className="flex p-[10px]">
                    <h3 className="text-[14px] text-[#FFFFFF] font-bold break-words line-clamp-2">
                      {product.productsInformations?.name}
                    </h3>
                  </div>
                </li>
              </ul>
              <div className="p-[30px] bg-secondaryColor">
                <div className="mx-auto mb-[20px] p-[20px] bg-tertiaryColor">
                  {product.keys.map((key) => (
                    <div
                      key={key.key}
                      className="flex items-center justify-center py-[10px] text-[30px] text-[#FFFFFF] border-b-[2px] border-[#658FB2]"
                    >
                      <strong>{key.key}</strong>
                    </div>
                  ))}
                  <div className="flex flex-col lg:flex-row items-center justify-between mt-[20px] gap-[20px]">
                    <span className="text-[#FFFFFF] text-justify">
                      Don't want to use it now? No problem. You can always find
                      the code in your library!
                    </span>
                    <Link href="/keys">
                      <button className="min-h-[35px] p-[10px] text-[16px] text-[#FFFFFF] border-[1px] border-[#FFFFFF] hover:border-buttonBackground transition duration-300 font-bold bg-transparent">
                        My library
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
    </section>
  );
}
