import Image from "next/image";

export default function KeysContainer() {
  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#F1FDFF]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default ">
        Keys
      </h1>
      <div className="grid grid-cols-1 max-w-[1840px] mt-[30px]">
        <div className="grid grid-cols-account-orders-auto-fit py-[10px] px-[20px] gap-x-[20px] bg-[#d8f9ff]">
          <div className="text-[12px] font-bold"></div>
          <div className="text-[12px] font-bold">DATE</div>
          <div className="text-[12px] font-bold">ORDER ID</div>
          <div className="text-[12px] font-bold">NAME OF PRODUCT</div>
          <div className="text-[12px] font-bold">PRICE OF PRODUCT</div>
          <div></div>
        </div>
        <div className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] border border-b-[3px] border-[#d8f9ff] bg-[#FFFFFF]">
          <div className="text-[12px] font-bold cursor-default">
            <Image
              src="/icons/logo.png"
              width="42"
              height="42"
              alt="GAME"
            ></Image>
          </div>
          <div className="text-[12px] font-bold cursor-default">4.06.2024</div>
          <div className="text-[12px] font-bold cursor-default">o-yx6ssoo</div>
          <div className="text-[12px] font-bold cursor-default">
            Little Nightmares II Deluxe Edition (PC) Steam Key EUROPE
          </div>
          <div className="text-[14px] font-bold cursor-default">59,69 zł</div>
          <div className="text-[14px] font-bold text-[#daabb3] hover:underline cursor-pointer">
            Show key
          </div>
        </div>
        <div className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] border border-b-[3px] border-[#d8f9ff] bg-[#FFFFFF]">
          <div className="text-[12px] font-bold cursor-default">
            <Image
              src="/icons/logo.png"
              width="42"
              height="42"
              alt="GAME"
            ></Image>
          </div>
          <div className="text-[12px] font-bold cursor-default">4.06.2024</div>
          <div className="text-[12px] font-bold cursor-default">o-yx6ssoo</div>
          <div className="text-[12px] font-bold cursor-default">
            Little Nightmares II Deluxe Edition (PC) Steam Key EUROPE
          </div>
          <div className="text-[14px] font-bold cursor-default">59,69 zł</div>
          <div className="text-[14px] font-bold text-[#daabb3] hover:underline cursor-pointer">
            Show key
          </div>
        </div>
      </div>
    </div>
  );
}
