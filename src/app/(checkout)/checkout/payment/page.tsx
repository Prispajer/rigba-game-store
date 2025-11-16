"use client";

import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutHeaderTemplate from "@/components/Interface/Checkout/CheckoutHeaderTemplate";
import PaymentContainer from "@/components/Interface/Checkout/Payment/PaymentContainer";
import LoadingAnimation from "@/components/Interface/Shared/Animations/LoadingAnimation";
import useUserCart from "@/features/cart/hooks/userCart/useUserCart";
import useLocalStorageCart from "@/features/cart/hooks/localStorageCart/useLocalStorageCart";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import {calculateTotalPrice} from "@/features/products/utils/prices";
import { Order } from "@prisma/client";

export default function PaymentPage() {
  const [stripePromise, setStripePromise] = React.useState<any>(null);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [newOrder, setNewOrder] = React.useState<Order | null>(null);
  const [isPaymentIntentCreated, setIsPaymentIntentCreated] =
    React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { userCartState } = useUserCart();
  const { localStorageCartState } = useLocalStorageCart("localStorageCart");
  const { user } = useCurrentUser();

  const cartProducts = user ? userCartState.products : localStorageCartState.localStorageCart;

  const loadStripeConfig = React.useCallback(async () => {
    try {
      const response = await fetch("/api/stripe/config");
      const { publishableKey } = await response.json();
      setStripePromise(await loadStripe(publishableKey));
    } catch (error) {
      console.error("Failed to load Stripe config:", error);
    }
  }, []);

  const createPaymentIntent = React.useCallback(async () => {
    if (cartProducts.length > 0) {
      try {
        const amount = parseFloat(calculateTotalPrice(cartProducts));
        const response = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user?.email || null,
            cart: cartProducts,
            amount: amount,
          }),
        });
        const { clientSecret, newOrder } = await response.json();
        setClientSecret(clientSecret);
        setNewOrder(newOrder);
      } catch (error) {
        console.error("Failed to create payment intent:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [user?.email, cartProducts]);

  React.useEffect(() => {
    if (!stripePromise) {
      loadStripeConfig();
    }
  }, [stripePromise, loadStripeConfig]);

  React.useEffect(() => {
    if (cartProducts.length > 0 && !clientSecret && !isPaymentIntentCreated) {
      setLoading(true);
      createPaymentIntent();
      setIsPaymentIntentCreated(true);
    }
  }, [
      cartProducts,
    clientSecret,
    isPaymentIntentCreated,
    createPaymentIntent,
  ]);

  if (loading || !clientSecret || !stripePromise) {
    return (
      <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] mx-auto bg-primaryColor">
        <LoadingAnimation />
      </div>
    );
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
      <CheckoutHeaderTemplate
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
        <PaymentContainer newOrder={newOrder} />
      </Elements>
    </>
  );
}
