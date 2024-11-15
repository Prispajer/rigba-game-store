import useUserOrderHistory from "@/hooks/useUserOrderHistory";
import LoadingAnimation from "@/components/Interface/Shared/Animations/LoadingAnimation";

export default function OrdersContainer() {
  const { userOrderHistoryState } = useUserOrderHistory();

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default">
        ORDERS
      </h1>
      <div className="grid grid-cols-1 max-w-[1840px] mt-[20px]">
        <div className="hidden lg:grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] bg-[#d3dfe9]">
          <div className="text-[12px] font-bold">DATE</div>
          <div className="text-[12px] font-bold">STATUS</div>
          <div className="text-[12px] font-bold">ORDER TITLE</div>
          <div className="text-[12px] font-bold">ORDER ID</div>
          <div className="text-[12px] font-bold">PAYMENT METHOD</div>
          <div className="text-[12px] font-bold">TOTAL AMOUNT</div>
          <div></div>
        </div>
        {userOrderHistoryState.isLoading ? (
          <div className="grid grid-cols-1 items-center w-full h-full py-[20px] text-[#1A396E]">
            <LoadingAnimation />
          </div>
        ) : userOrderHistoryState.orderHistoryArray &&
          userOrderHistoryState.orderHistoryArray.length > 0 ? (
          userOrderHistoryState.orderHistoryArray.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-1 lg:grid-cols-account-orders-auto-fit items-center p-[20px] lg:py-[10px] lg:px-[20px] gap-x-[20px] border border-b-[3px] border-[#d3dfe9] bg-[#FFFFFF]"
            >
              <div className="grid grid-cols-[1fr_3fr] gap-[20px] lg:grid-cols-1 items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default">
                <div className="block lg:hidden text-[10px] lg:text-[12px] text-[#a09aac]">
                  DATE
                </div>
                <div className="text-[12px] font-[600] text-ellipsis line-clamp-1 cursor-default ">
                  {new Date(order.createdAt).toLocaleString(
                    navigator.language,
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_3fr] gap-[20px] lg:grid-cols-1 items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default ">
                <div className="block lg:hidden text-[10px] lg:text-[12px] text-[#a09aac]">
                  STATUS
                </div>
                <div
                  className={`text-[12px] font-[600]text-ellipsis line-clamp-1 cursor-default  ${
                    order.status.toUpperCase() === "ORDER CANCELED"
                      ? "text-[#ff0000]"
                      : "text-[#00cf9f]"
                  }`}
                >
                  {order.status.toUpperCase()}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_3fr] gap-[20px] lg:grid-cols-1 items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default ">
                <div className="block lg:hidden lg:text-[12px] text-[10px]  text-[#a09aac]">
                  ORDER TITLE
                </div>
                <div className="text-[12px] text-ellipsis line-clamp-1 font-[600] cursor-default">
                  {order.title}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_3fr] gap-[20px] lg:grid-cols-1 items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default ">
                <div className="grid content-center lg:hidden text-[10px] text-[#a09aac]">
                  ORDER ID
                </div>
                <div className="text-[12px] text-ellipsis line-clamp-1 font-[600] cursor-default">
                  {order.id}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_3fr] gap-[20px] lg:grid-cols-1 items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default ">
                <div className="grid content-center lg:hidden lg:text-[12px] text-[10px] text-[#a09aac]">
                  PAYMENT METHOD
                </div>
                <div className="text-[12px] text-ellipsis line-clamp-1 font-[600] cursor-default ">
                  {order.paymentMethod}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_3fr] gap-[20px] lg:grid-cols-1 items-center py-[3px] lg:p-[0px] text-[12px] border-b-[1px] border-[#e9e8f7] lg:border-none cursor-default ">
                <div className="grid lg:hidden lg:text-[12px] text-[10px]  text-[#a09aac]">
                  TOTAL AMOUNT
                </div>
                <div className="text-[16px] text-ellipsis line-clamp-1 font-[600] cursor-default ">
                  ${order.total}
                </div>
              </div>
              <div className="flex justify-end pt-[5px] lg:pt-[0px] text-[12px] lg:text-[14px] font-bold text-[#658fb2] hover:underline cursor-pointer">
                Details
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-[20px] text-[#1A396E] font-bold">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}
