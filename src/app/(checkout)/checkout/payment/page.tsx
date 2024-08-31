import { IoCheckmarkCircleSharp } from "react-icons/io5";
import CheckoutHeader from "@/components/Interface/Checkout/CheckoutHeader";
import CheckoutContainer from "@/components/Interface/Checkout/CheckoutContainer";

export default function PaymentPage() {
  return (
    <>
      <CheckoutHeader
        mobileLogoTitle="Payment"
        stepOneElementStyles="font-[500] text-[16px] text-[#FFFFFF] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#00cf9f]"
        stepTwoElementStyles="font-[500] text-[16px] text-[#00cf9f] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#ffffff66]"
        stepThreeElementStyles="font-[500] text-[16px] text-[#ffffff66] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#ffffff66]"
        stepOneContent={
          <IoCheckmarkCircleSharp className="text-[24px] mr-[8px] text-secondaryColor" />
        }
        stepTwoContent="2"
        stepThreeContent="3"
        stepOneContentStyles="text-[#FFFFFF] bg-[#00cf9f]"
        stepTwoContentStyles="text-[#FFFFFF] bg-[#00cf9f]"
        stepThreeContentStyles="text-secondaryColor bg-[#ffffff66]"
      />
      <CheckoutContainer />
    </>
  );
}
