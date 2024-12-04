"use client";

import Image from "next/image";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import useUserOrderHistory from "@/hooks/useUserOrderHistory";
import useUserProductHistory from "@/hooks/useUserProductHistory";
import useCustomRouter from "@/hooks/useCustomRouter";

export default function OrderContainer({
  params,
}: {
  params: { orderId: string };
}) {
  const { redirectToKey } = useCustomRouter();
  const { userOrderHistoryState } = useUserOrderHistory();
  const { userProductHistoryState } = useUserProductHistory();

  const orderHistory = userOrderHistoryState.orderHistoryArray.find((order) =>
    order ? order.id === params.orderId : "Could not find order with that ID!"
  );

  const productImage = userProductHistoryState.productHistoryArray.find(
    (product) => {
      return product.keys.some((key) => key.orderHistoryId === params.orderId);
    }
  );

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[20px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] text-ellipsis line-clamp-1 cursor-default ">
        {`Order ${orderHistory?.id}`}
      </h1>
      <div className="grid grid-cols-1 max-w-[1840px] mt-[20px]">
        <div className="hidden lg:grid grid-cols-account-orders-auto-fit py-[10px] px-[20px] gap-x-[20px] bg-[#d3dfe9]">
          <div className="text-[12px] font-bold">ORDERED PRODUCT</div>
          <div className="text-[12px] font-bold">SHIPMENT STATUS</div>
          <div className="text-[12px] font-bold"></div>
          <div className="text-[12px] font-bold"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-account-orders-auto-fit items-center w-full py-[10px] px-[20px] gap-x-[20px] bg-[#FFFFFF]">
          <div className="grid grid-cols- grid-cols-[1fr_4fr] lg:grid-cols-1 w-full gap-[20px] py-[5px] lg:gap-0  text-[12px]  cursor-default">
            <div className="flex items-center lg:hidden text-[#a09aac] font-[600]">
              ORDERED PRODUCTS
            </div>
            <div className="grid grid-cols-[1fr_4fr] font-bold ">
              <div className="relative w-[64px] h-[90px] mr-[20px]">
                <Image
                  loading="lazy"
                  src={
                    productImage?.productsInformations.background_image
                      ? productImage?.productsInformations.background_image
                      : "/icons/logo.png"
                  }
                  layout="fill"
                  alt={productImage?.productsInformations.name as string}
                ></Image>
              </div>
              <div className="">
                <div className="">
                  <span className="text-[14px]">{orderHistory?.title}</span>
                </div>
                <div>
                  <span>{`$${orderHistory?.total}`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_4fr] items-center gap-[20px] py-[5px] lg:gap-0  font-bold cursor-default">
            <div className="flex items-center lg:hidden text-[12px] text-[#a09aac] font-[600]">
              DELIVERY STATUS
            </div>
            <div
              className={`flex items-center text-[14px] text-[#00cf9f] font-bold ${
                orderHistory?.status === "Completed"
                  ? "text-[#00cf9f]"
                  : "text-[#E44D4D]"
              }`}
            >
              {orderHistory?.status === "Completed" ? (
                <IoCheckmarkCircleSharp className="min-w-[15px] min-h-[15px] mr-[10px]" />
              ) : (
                <IoCloseCircleSharp className="min-w-[15px] min-h-[15px] mr-[10px] " />
              )}
              {(() => {
                switch (orderHistory?.status) {
                  case "Completed":
                    return "ORDER FULFILLED";
                  case "Canceled":
                    return "ORDER CANCELED";
                  default:
                    return "ORDER FAILED";
                }
              })()}
            </div>
          </div>
          <div className="text-[12px] font-bold cursor-default py-[5px] lg:gap-0">
            {orderHistory?.status === "Completed" && (
              <button
                onClick={() => redirectToKey(orderHistory?.id as string)}
                className="w-full min-h-[36px] text-[16px] text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover"
              >
                Show key
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center mt-[10px] p-[20px] bg-[#FFFFFF]">
          <div className="flex justify-between w-full text-[12px] font-bold cursor-default">
            <span>PAYMENT DETAILS</span>
            <span className="flex items-center justify-center">
              {orderHistory?.status === "Completed" ? (
                <IoCheckmarkCircleSharp className="min-w-[30px] min-h-[30px] text-[#00cf9f]" />
              ) : (
                <IoCloseCircleSharp className="min-w-[30px] min-h-[30px] text-[#E44D4D]" />
              )}
            </span>
          </div>
          <h2
            className={`w-full pb-[10px] text-[24px] font-bold ${
              orderHistory?.status === "Completed"
                ? "text-[#00cf9f]"
                : "text-[#E44D4D]"
            } `}
          >
            {orderHistory?.status === "Completed"
              ? "ORDER FULFILLED"
              : "ORDER FAILED"}
          </h2>
          <p className="w-full mb-[20px] text-[18px] text-[#797189]">
            {(() => {
              switch (orderHistory?.status) {
                case "Completed":
                  return "Payment was successful";
                case "Canceled":
                  return "Payment processing time has expired";
                default:
                  return "There was problem with payment";
              }
            })()}
          </p>
          <p className="w-full text-[14px] text-[#797189]">
            Payment method:
            <span className="font-[600] text-[#000000]">
              {" "}
              {orderHistory?.paymentMethod}
            </span>
          </p>
          <p className="w-full text-[14px] text-[#797189]">
            Date of payment:{" "}
            <span className="font-[600] text-[#000000]">
              {" "}
              {orderHistory?.createdAt
                ? new Date(orderHistory.createdAt).toLocaleDateString(
                    navigator.language
                  )
                : "N/A"}
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center mt-[10px] p-[20px] bg-[#FFFFFF]">
          <div className="w-full pb-[40px] text-[12px] font-bold cursor-default">
            ORDER SUMMARY
          </div>
          <div className="flex justify-between w-full text-[16px] text-[#000000] font-bold cursor-default">
            <span>Total amount:</span>
            <span>
              $
              {orderHistory?.status === "Completed" ? orderHistory?.total : "0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
