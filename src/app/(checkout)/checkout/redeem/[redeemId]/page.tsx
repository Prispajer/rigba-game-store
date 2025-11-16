import { Metadata } from "next";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import CheckoutHeaderTemplate from "@/components/Interface/Checkout/CheckoutHeaderTemplate";
import RedeemContainer from "@/components/Interface/Checkout/Redeem/RedeemContainer";

export const generateMetadata = async (data: {
  params: Promise<{ redeemId: string }>;
}): Promise<Metadata> => {
  const params = await data.params;
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${params.redeemId}`);
    }, 100);
  });

  return {
    title: `Order ${title}`,
  };
};

export default async function RedeemPage(data: {
  params: Promise<{ redeemId: string }>;
}) {
  const params = await data.params;

  return (
    <>
      <CheckoutHeaderTemplate
        mobileLogoTitle="Redeem your product"
        stepOneElementStyles="font-[500] text-[16px] text-[#FFFFFF] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#00cf9f]"
        stepTwoElementStyles="font-[500] text-[16px] text-[#FFFFFF] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#00cf9f]"
        stepThreeElementStyles="font-[500] text-[16px] text-[#00cf9f] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#ffffff66]"
        stepOneContent={
          <IoCheckmarkCircleSharp className="text-[24px] mr-[8px] text-secondaryColor" />
        }
        stepTwoContent={
          <IoCheckmarkCircleSharp className="text-[24px] mr-[8px] text-secondaryColor" />
        }
        stepThreeContent="3"
        stepOneContentStyles="text-[#FFFFFF] bg-[#00cf9f]"
        stepTwoContentStyles="text-secondaryColor bg-[#00cf9f]"
        stepThreeContentStyles="text-[#FFFFFF] bg-[#00cf9f]"
      />
      <RedeemContainer params={params} />
    </>
  );
}
