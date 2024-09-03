"use client";
import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutHeader from "@/components/Interface/Checkout/CheckoutHeader";
import PaymentContainer from "@/components/Interface/Checkout/Payment/PaymentContainer";

export default function PaymentPage() {
  const [stripePromise, setStripePromise] = React.useState<any>(null);
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    fetch("/config").then(async (response) => {
      const { publishableKey } = await response.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  React.useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (response) => {
      const { clientSecret } = await response.json();

      setClientSecret(clientSecret);
    });
  }, []);

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
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentContainer />
      </Elements>
    </>
  );
}
