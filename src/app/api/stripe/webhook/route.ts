import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { postgres } from "@/data/database/publicSQL/postgres";
import { generateGameKey } from "@/utils/keys";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  let event: Stripe.Event;
  let order;
  try {
    const stripeBody = await request.text();
    const signature = await request.headers.get("stripe-signature");
    event = await stripe.webhooks.constructEvent(
      stripeBody,
      signature as string,
      process.env.WEBHOOK_SECRET_KEY as string
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const userId = paymentIntent.metadata.userId;
      const cartId = paymentIntent.metadata.cartId;
      const orderId = paymentIntent.metadata.orderId;

      order = await postgres.order.findFirst({
        where: { id: orderId, userId: userId },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      const cart = await postgres.cart.findUnique({
        where: { id: cartId, userId: userId },
        include: { products: { include: { productsInformations: true } } },
      });

      if (!cart) {
        return NextResponse.json({ error: "Cart not found" }, { status: 404 });
      }

      order = await postgres.order.update({
        where: { id: orderId, userId: userId },
        data: {
          status: "Completed",
        },
      });

      const cartHistory = await postgres.cartHistory.create({
        data: {
          userId: userId,
          products: {
            create: cart.products.map((product) => ({
              id: product.id,
              externalProductId: product.externalProductId,
              userId: product.userId as string,
              quantity: product.quantity as number,
              productsInformations: {
                create: {
                  name: product.productsInformations?.name ?? "",
                  slug: product.productsInformations?.slug ?? "",
                  description:
                    product.productsInformations?.description ?? null,
                  rating: product.productsInformations?.rating ?? null,
                  released: product.productsInformations?.released ?? null,
                  price: product.productsInformations?.price ?? 0,
                  background_image:
                    product.productsInformations?.background_image ?? "",
                },
              },
            })),
          },
        },
      });

      await postgres.orderHistory.create({
        data: {
          id: order.id,
          userId: order.userId,
          cartHistoryId: cartHistory.id,
          status: order.status,
          title: order.title,
          paymentMethod: order.paymentMethod,
          paymentIntentId: order.paymentIntentId,
          total: order.total,
        },
      });

      for (const product of cart.products) {
        for (let i = 0; i < (product.quantity as number); i++) {
          const key = generateGameKey();
          await postgres.key.create({
            data: {
              orderHistoryId: order.id,
              productHistoryId: product.id,
              key: key,
            },
          });
        }
      }

      await postgres.cart.delete({ where: { id: cartId } });
    } else if (
      event.type === "charge.expired" ||
      event.type === "charge.failed" ||
      event.type === "payment_intent.canceled"
    ) {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const userId = paymentIntent.metadata.userId;
      const orderId = paymentIntent.metadata.orderId;

      await postgres.order.update({
        where: { id: orderId, userId: userId },
        data: {
          status: "Failed",
        },
      });

      const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/redeem/${orderId}`;

      return NextResponse.json({ redirectUrl });
    } else {
      return NextResponse.json(
        { error: "Unhandled event type" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
