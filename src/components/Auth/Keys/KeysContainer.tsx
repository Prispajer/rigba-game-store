import Image from "next/image";

export default function KeysContainer() {
  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default ">
        KEYS
      </h1>
      <div className="grid grid-cols-1 max-w-[1840px] mt-[20px]">
        <div className="grid grid-cols-account-orders-auto-fit py-[10px] px-[20px] gap-x-[20px] bg-[#d3dfe9]">
          <div className="text-[12px] font-bold"></div>
          <div className="text-[12px] font-bold">DATE</div>
          <div className="text-[12px] font-bold">ORDER ID</div>
          <div className="text-[12px] font-bold">NAME OF PRODUCT</div>
          <div className="text-[12px] font-bold">PRICE OF PRODUCT</div>
          <div></div>
        </div>
        <div className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] border border-b-[3px] border-[#d3dfe9] bg-[#FFFFFF]">
          <div className="text-[12px] font-bold cursor-default">
            <Image
              src="/icons/logo.png"
              width="36"
              height="36"
              alt="GAME"
            ></Image>
          </div>
          <div className="text-[12px] font-bold cursor-default">4.06.2024</div>
          <div className="text-[12px] font-bold cursor-default">o-yx6ssoo</div>
          <div className="text-[12px] font-bold cursor-default">
            Little Nightmares II Deluxe Edition (PC) Steam Key EUROPE
          </div>
          <div className="text-[14px] font-bold cursor-default">59,69 zł</div>
          <div className="text-[14px] font-bold text-[#658fb2] hover:underline cursor-pointer">
            Show key
          </div>
        </div>
        <div className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] border border-b-[3px] border-[#d3dfe9] bg-[#FFFFFF]">
          <div className="text-[12px] font-bold cursor-default">
            <Image
              src="/icons/logo.png"
              width="36"
              height="36"
              alt="GAME"
            ></Image>
          </div>
          <div className="text-[12px] font-bold cursor-default">4.06.2024</div>
          <div className="text-[12px] font-bold cursor-default">o-yx6ssoo</div>
          <div className="text-[12px] font-bold cursor-default">
            Little Nightmares II Deluxe Edition (PC) Steam Key EUROPE
          </div>
          <div className="text-[14px] font-bold cursor-default">59,69 zł</div>
          <div className="text-[14px] font-bold text-[#658fb2] hover:underline cursor-pointer">
            Show key
          </div>
        </div>
      </div>
    </div>
  );
}
