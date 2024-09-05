"use client";
import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutHeader from "@/components/Interface/Checkout/CheckoutHeader";
import PaymentContainer from "@/components/Interface/Checkout/Payment/PaymentContainer";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserCart from "@/hooks/useUserCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import { calculateTotalPrice } from "@/utils/prices";

export default function PaymentPage() {
  const [stripePromise, setStripePromise] = React.useState<any>(null);
  const [clientSecret, setClientSecret] = React.useState("");

  const { userCartState } = useUserCart();
  const { localCartState } = useLocalStorage("localCart");
  const { user } = useCurrentUser();

  const productsByRole = user ? userCartState.products : localCartState;

  React.useEffect(() => {
    fetch("/api/stripe/config").then(async (response) => {
      const { publishableKey } = await response.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  React.useEffect(() => {
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount: calculateTotalPrice(productsByRole) }),
    }).then(async (response) => {
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    });
  }, [productsByRole]);

  if (!clientSecret || !stripePromise) {
    return <div>Loading...</div>;
  }

  const appearance = {
    variables: {
      colorPrimary: "#bc558e",
      colorBackground: "#FFFFFF",
      colorDanger: "#df1b41",
      colorText: "#30313d",
      spacingUnit: "3px",
      borderRadius: "4px",
      gridRowSpacing: "20px",
    },
    rules: {
      ".Label": {
        color: "#FFFFFF",
        fontWeight: "500",
      },
      ".Input": {
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)",
      },
    },
  };

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
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <PaymentContainer />
      </Elements>
    </>
  );
}
