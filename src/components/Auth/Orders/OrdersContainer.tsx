export default function OrdersContainer() {
  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#F1FDFF]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default ">
        Orders
      </h1>
      <div className="grid grid-cols-1 max-w-[1840px] mt-[30px]">
        <div className="grid grid-cols-account-orders-auto-fit py-[10px] px-[20px] gap-x-[20px] bg-[#d8f9ff]">
          <div className="text-[12px] font-bold">DATE</div>
          <div className="text-[12px] font-bold">STATUS</div>
          <div className="text-[12px] font-bold">ORDER TITLE</div>
          <div className="text-[12px] font-bold">ORDER ID</div>
          <div className="text-[12px] font-bold">PAYMENT METHOD</div>
          <div className="text-[12px] font-bold">TOTAL AMOUNT</div>
          <div></div>
        </div>
        <div className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] border border-b-[3px] border-[#d8f9ff] bg-[#FFFFFF]">
          <div className="text-[12px] font-bold cursor-default">
            4.06.2024, 13:45
          </div>
          <div className="text-[12px] text-[#00cf9f]  font-bold cursor-default">
            ORDER FULFILLED
          </div>
          <div className="text-[12px] font-bold cursor-default">
            Little Nightmares II Deluxe Edition (PC) Steam Key EUROPE
          </div>
          <div className="text-[12px] font-bold cursor-default">o-yx6ssoo</div>
          <div className="text-[12px] font-bold cursor-default">BLIK</div>
          <div className="text-[14px] font-bold cursor-default">59,69 zł</div>
          <div className="text-[14px] font-bold text-[#daabb3] hover:underline cursor-pointer">
            Details
          </div>
        </div>
        <div className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] border border-b-[3px] border-[#d8f9ff] bg-[#FFFFFF]">
          <div className="text-[12px] font-bold cursor-default">
            4.06.2024, 13:45
          </div>
          <div className="text-[12px] text-[#ff0000] font-bold cursor-default">
            ORDER CANCELED
          </div>
          <div className="text-[12px] font-bold cursor-default">
            Little Nightmares II Deluxe Edition (PC) Steam Key EUROPE
          </div>
          <div className="text-[12px] font-bold cursor-default">o-yx6ssoo</div>
          <div className="text-[12px] font-bold cursor-default">BLIK</div>
          <div className="text-[14px] font-bold cursor-default">59,69 zł</div>
          <div className="text-[14px] font-bold text-[#daabb3] hover:underline cursor-pointer">
            Details
          </div>
        </div>
      </div>
    </div>
  );
}
