import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { postgres } from "@/data/database/publicSQL/postgres";
import { generateGameKey } from "@/utils/keys";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await request.text(),
    (await request.headers.get("stripe-signature")) as string,
    process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET_KEY as string
  );

  try {
    if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      const userId = charge.metadata.userId;
      const cartId = charge.metadata.cartId;
      const orderId = charge.metadata.orderId;

      const order = await postgres.order.findFirst({
        where: {
          id: orderId,
          userId: userId,
        },
      });

      if (order) {
        await postgres.order.update({
          where: { id: orderId },
          data: { status: "Completed" },
        });

        const cart = await postgres.cart.findUnique({
          where: { id: cartId, userId: userId },
          include: {
            products: true,
          },
        });

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
      } else {
        console.error(`Order with ID ${orderId} not found for user ${userId}`);
      }
    }
  } catch (error) {
    console.error("Invalid signature!", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  return NextResponse.json({ received: true });
}
