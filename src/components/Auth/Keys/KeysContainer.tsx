import Image from "next/image";
import useUserProductHistory from "@/hooks/useUserProductHistory";

export default function KeysContainer() {
  const { userProductHistoryState } = useUserProductHistory();

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default">
        KEYS
      </h1>
      <div className="grid grid-cols-1 max-w-[1840px] mt-[20px]">
        <div className="grid grid-cols-account-orders-auto-fit py-[10px] px-[20px] gap-x-[20px] bg-[#d3dfe9]">
          <div className="text-[12px] font-bold">IMAGE</div>
          <div className="text-[12px] font-bold">DATE</div>
          <div className="text-[12px] font-bold">ORDER ID</div>
          <div className="text-[12px] font-bold">NAME OF PRODUCT</div>
          <div className="text-[12px] font-bold">PRICE</div>
          <div></div>
        </div>
        {userProductHistoryState.productHistoryArray?.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-account-orders-auto-fit items-center py-[10px] px-[20px] gap-x-[20px] border border-b-[3px] border-[#d3dfe9] bg-[#FFFFFF]"
          >
            <div className="text-[12px] font-bold cursor-default">
              <Image
                src={
                  product.productsInformations?.background_image ||
                  "/icons/logo.png"
                }
                width="36"
                height="36"
                alt={product.productsInformations?.name || "Product Image"}
              />
            </div>
            <div className="text-[12px] font-bold cursor-default">
              {product.keys?.[0]?.createdAt
                ? new Date(product.keys[0].createdAt).toLocaleDateString(
                    navigator.language
                  )
                : "N/A"}
            </div>
            <div className="text-[12px] font-bold cursor-default">
              {product.keys?.[0]?.orderHistoryId || "N/A"}
            </div>
            <div className="text-[12px] font-bold cursor-default">
              {product.productsInformations?.name || "Product Name"}
            </div>
            <div className="text-[14px] font-bold cursor-default">
              $
              {product.productsInformations?.price
                ? `${product.productsInformations.price}`
                : "Price not available"}
            </div>
            <div className="text-[14px] font-bold text-[#658fb2] hover:underline cursor-pointer">
              Show key
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
