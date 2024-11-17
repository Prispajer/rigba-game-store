import Image from "next/image";
import Link from "next/link";
import LoadingAnimation from "@/components/Interface/Shared/Animations/LoadingAnimation";
import useUserProductHistory from "@/hooks/useUserProductHistory";
import React from "react";
import useCustomRouter from "@/hooks/useCustomRouter";

export default function KeysContainer() {
  const { userProductHistoryState } = useUserProductHistory();
  const { redirectToKey } = useCustomRouter();

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default">
        KEYS
      </h1>
      <div className="grid grid-cols-1 max-w-[1840px] mt-[20px]">
        <div className="hidden lg:grid grid-cols-account-orders-auto-fit items-center py-[10px] gap-x-[20px] bg-[#d3dfe9]">
          <div className="text-[12px] font-bold"></div>
          <div className="text-[12px] font-bold">DATE</div>
          <div className="text-[12px] font-bold">ORDER ID</div>
          <div className="text-[12px] font-bold">NAME OF PRODUCT</div>
          <div className="text-[12px] font-bold">PRICE</div>
          <div></div>
        </div>
        {userProductHistoryState.isLoading ? (
          <div className="grid grid-cols-1 items-center w-full h-full py-[20px] text-[#1A396E]">
            <LoadingAnimation />
          </div>
        ) : userProductHistoryState.productHistoryArray?.length > 0 ? (
          userProductHistoryState.productHistoryArray?.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[1fr_4fr] lg:grid-cols-account-orders-auto-fit items-center p-[15px] lg:p-[0px] gap-x-[20px] border border-b-[3px] border-[#d3dfe9] bg-[#FFFFFF]"
            >
              <div>
                <Image
                  src={
                    product.productsInformations?.background_image ||
                    "/icons/logo.png"
                  }
                  width="40"
                  height="50"
                  alt={product.productsInformations?.name || "Product Image"}
                  className="min-w-[50px] w-full h-[100px] lg:w-[40px] lg:h-[50px] "
                />
              </div>
              <div className="grid lg:hidden">
                <div className="grid grid-cols-[1fr_2fr] gap-[20px] items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default">
                  <div className="block lg:hidden text-[10px] lg:text-[12px] text-[#a09aac]">
                    DATE
                  </div>
                  <div className="text-[12px] font-[600] text-ellipsis line-clamp-1 cursor-default ">
                    {product.keys?.[0]?.createdAt
                      ? new Date(product.keys[0].createdAt).toLocaleDateString(
                          navigator.language
                        )
                      : "N/A"}
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-[20px] items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default">
                  <div className="grid content-center lg:hidden text-[10px] text-[#a09aac]">
                    ORDER ID
                  </div>
                  <div className="text-[12px] font-[600] text-ellipsis line-clamp-1 cursor-default ">
                    {product.keys?.[0]?.orderHistoryId || "N/A"}
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-[20px] items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default">
                  <div className="grid lg:hidden lg:text-[12px] text-[10px] text-[#a09aac]">
                    NAME
                  </div>
                  <div className="text-[12px] font-[600] text-ellipsis line-clamp-1 cursor-default ">
                    {product.productsInformations?.name || "Product Name"}
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-[20px] items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default">
                  <div className="grid lg:hidden lg:text-[12px] text-[10px]  text-[#a09aac]">
                    PRICE
                  </div>
                  <div className="text-[12px] font-[600] text-ellipsis line-clamp-1 cursor-default ">
                    $
                    {product.productsInformations?.price ||
                      "Price not available"}
                  </div>
                </div>
                <div className="grid justify-end text-[12px] pt-[5px] font-bold text-[#658fb2] hover:underline cursor-pointer">
                  Show key
                </div>
              </div>
              <div className="hidden lg:block text-[12px] font-[600] text-ellipsis line-clamp-1 cursor-default ">
                {product.keys?.[0]?.createdAt
                  ? new Date(product.keys[0].createdAt).toLocaleDateString(
                      navigator.language
                    )
                  : "N/A"}
              </div>
              <div className="hidden lg:block text-[12px] font-[600] text-ellipsis line-clamp-1 cursor-default ">
                {product.keys?.[0]?.orderHistoryId || "N/A"}
              </div>
              <div className="hidden lg:block text-[12px] font-[600] text-ellipsis line-clamp-1 cursor-default ">
                {product.productsInformations?.name || "Product Name"}
              </div>
              <div className="hidden lg:block text-[16px] font-[600] text-ellipsis line-clamp-1 cursor-default ">
                ${product.productsInformations?.price || "Price not available"}
              </div>
              <div
                onClick={() => redirectToKey(product.id)}
                className="hidden lg:block text-[14px] font-bold text-[#658fb2] hover:underline cursor-pointer"
              >
                Show key
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-[20px] text-[#1A396E] font-bold">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
