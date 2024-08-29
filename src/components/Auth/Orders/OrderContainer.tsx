import Image from "next/image";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function OrderContainer() {
  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default ">
        ORDER O-YPM7SAY
      </h1>
      <div className="grid grid-cols-1 max-w-[1840px] mt-[20px]">
        <div className="grid grid-cols-account-orders-auto-fit py-[10px] px-[20px] gap-x-[20px] bg-[#d3dfe9]">
          <div className="text-[12px] font-bold">ORDERED PRODUCT</div>
          <div className="text-[12px] font-bold">SHIPMENT STATUS</div>
          <div className="text-[12px] font-bold"></div>
          <div className="text-[12px] font-bold"></div>
        </div>
        <div className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] bg-[#FFFFFF]">
          <div className="flex text-[12px] font-bold cursor-default">
            <div className="relative min-w-[64px] mr-[20px]">
              <Image src="/icons/logo.png" layout="fill" alt="GAME"></Image>
            </div>
            <div>
              <div className="">
                <span className="text-[14px]">
                  Little Nightmares II Deluxe Edition (PC) Steam Key EUROPE
                </span>
              </div>
              <div>
                <span>30,92 zł</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-[14px] text-[#00cf9f] font-bold cursor-default">
            <IoCheckmarkCircleSharp className="min-w-[15px] min-h-[15px] mr-[10px] " />
            ORDER FULFILLED
          </div>
          <div className="text-[12px] font-bold cursor-default">
            <button className="w-full min-h-[36px] text-[16px] text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover">
              Show key
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[10px] p-[20px] bg-[#FFFFFF]">
          <div className="flex justify-between w-full text-[12px] font-bold cursor-default">
            <span>PAYMENT DETAILS</span>
            <span className="flex items-center justify-center">
              <IoCheckmarkCircleSharp className="min-w-[30px] min-h-[30px] text-[#00cf9f]" />
            </span>
          </div>
          <h2 className="w-full pb-[10px] text-[24px] font-bold text-[#00cf9f]">
            ORDER FULFILLED
          </h2>
          <p className="w-full mb-[20px] text-[18px] text-[#797189]">
            Payment was successful
          </p>
          <p className="w-full text-[14px] text-[#797189]">
            Payment method:{" "}
            <span className="font-[600] text-[#000000]">Blik</span>
          </p>
          <p className="w-full text-[14px] text-[#797189]">
            Date of payment:{" "}
            <span className="font-[600] text-[#000000]">14.02.2023, 16:37</span>
          </p>
        </div>
        <div className="flex flex-col items-center mt-[10px] p-[20px] bg-[#FFFFFF]">
          <div className="w-full pb-[40px] text-[12px] font-bold cursor-default">
            ORDER SUMMARY
          </div>
          <div className="flex justify-between w-full text-[16px] text-[#000000] font-bold cursor-default">
            <span>Total amount:</span>
            <span>35,16 zł</span>
          </div>
        </div>
      </div>
    </div>
  );
}
