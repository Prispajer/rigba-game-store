import { IoCheckmarkCircleSharp } from "react-icons/io5";
import CheckoutHeader from "@/components/Interface/Checkout/CheckoutHeader";
import RedeemContainer from "@/components/Interface/Checkout/Redeem/RedeemContainer";
import Stripe from "stripe";
import { notFound } from "next/navigation";
import { postgres } from "@/data/database/publicSQL/postgres";
import { generateGameKey } from "@/utils/prices";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

export default async function RedeemPage({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (
    paymentIntent.metadata.cartId == null ||
    paymentIntent.metadata.orderId == null
  )
    return notFound();

  const cart = await postgres.cart.findUnique({
    where: { id: paymentIntent.metadata.cartId },
    include: {
      products: true,
    },
  });
  const order = await postgres.order.findUnique({
    where: { id: paymentIntent.metadata.orderId },
  });
  if (cart == null || order == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";

  if (isSuccess && order) {
    for (const product of cart.products) {
      for (let i = 0; i < product.quantity; i++) {
        await postgres.key.create({
          data: {
            orderId: order.id,
            productId: product.id,
            key: generateGameKey(),
          },
        });
      }
    }
  }

  return (
    <>
      <CheckoutHeader
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
      <RedeemContainer />
    </>
  );
}
