import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { postgres } from "@/data/database/publicSQL/postgres";
import { generateGameKey } from "@/utils/prices";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await request.text(),
    request.headers.get("stripe-signature") as string,
    process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET_KEY as string
  );

  try {
    if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      const userId = charge.metadata.userId;
      const cartId = charge.metadata.cartId;
      const orderId = charge.metadata.orderId;
      const email = charge.billing_details.email;
      const amount = charge.amount;

      let order = await postgres.order.findFirst({
        where: {
          id: orderId,
          userId: userId,
        },
      });

      if (order) {
        order = await postgres.order.update({
          where: { id: orderId, userId: userId },
          data: { status: "Completed" },
        });
      } else {
        console.error(`Order with ID ${orderId} not found for user ${userId}`);
      }

      const cart = await postgres.cart.findUnique({
        where: { id: cartId, userId: userId },
        include: {
          products: true,
        },
      });

      if (order && order.status === "Completed") {
        if (cart) {
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
      }
    }
  } catch (error) {
    console.error("Invalid signature!", error);
  }

  return new NextResponse();
}
