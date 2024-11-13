import useUserOrderHistory from "@/hooks/useUserOrderHistory";

export default function OrdersContainer() {
  const { userOrderHistoryState } = useUserOrderHistory();

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default ">
        ORDERS
      </h1>
      <div className="grid grid-cols-1 max-w-[1840px] mt-[20px]">
        <div className="grid grid-cols-account-orders-auto-fit py-[10px] px-[20px] gap-x-[20px] bg-[#d3dfe9]">
          <div className="text-[12px] font-bold">DATE</div>
          <div className="text-[12px] font-bold">STATUS</div>
          <div className="text-[12px] font-bold">ORDER TITLE</div>
          <div className="text-[12px] font-bold">ORDER ID</div>
          <div className="text-[12px] font-bold">PAYMENT METHOD</div>
          <div className="text-[12px] font-bold">TOTAL AMOUNT</div>
          <div></div>
        </div>
        {userOrderHistoryState.orderHistoryArray.map((order) => (
          <>
            <div className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] border border-b-[3px] border-[#d3dfe9] bg-[#FFFFFF]">
              <div className="text-[12px] font-bold cursor-default">
                {new Date(order.createdAt).toLocaleString(navigator.language, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-[12px] text-[#00cf9f]  font-bold cursor-default">
                {order.status.toUpperCase()}
              </div>
              <div className="text-[12px] font-bold cursor-default">
                {order.title}
              </div>
              <div className="text-[12px] font-bold cursor-default">
                {order.id}
              </div>
              <div className="text-[12px] font-bold cursor-default">
                {order.paymentMethod}
              </div>
              <div className="text-[14px] font-bold cursor-default">
                ${order.total}
              </div>
              <div className="text-[14px] font-bold text-[#658fb2] hover:underline cursor-pointer">
                Details
              </div>
            </div>
            {/* <div className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] border border-b-[3px] border-[#d3dfe9] bg-[#FFFFFF]">
              <div className="text-[12px] font-bold cursor-default">
                4.06.2024, 13:45
              </div>
              <div className="text-[12px] text-[#ff0000] font-bold cursor-default">
                ORDER CANCELED
              </div>
              <div className="text-[12px] font-bold cursor-default">
                Little Nightmares II Deluxe Edition (PC) Steam Key EUROPE
              </div>
              <div className="text-[12px] font-bold cursor-default">
                o-yx6ssoo
              </div>
              <div className="text-[12px] font-bold cursor-default">BLIK</div>
              <div className="text-[14px] font-bold cursor-default">
                59,69 zł
              </div>
              <div className="text-[14px] font-bold text-[#658fb2] hover:underline cursor-pointer">
                Details
              </div>
            </div> */}
          </>
        ))}
      </div>
    </div>
  );
}
