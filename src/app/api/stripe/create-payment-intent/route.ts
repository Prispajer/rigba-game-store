import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { postgres } from "@/data/database/publicSQL/postgres";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-10-28.acacia",
  typescript: true,
});

export async function POST(request: NextRequest) {
  const { email, amount, cart, paymentIntentId } = await request.json();

  const user = await postgres.user.findUnique({ where: { email: email } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const pendingOrder = await postgres.order.findFirst({
    where: { userId: user.id, status: "Pending" },
  });

  if (pendingOrder) {
    await postgres.order.delete({
      where: { id: pendingOrder.id },
    });
  }

  const newOrder = await postgres.order.create({
    data: {
      userId: user.id,
      status: "Pending",
      title: cart[0]?.productsInformations?.name || "Order",
      paymentMethod: "Card",
      total: amount,
    },
  });

  try {
    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      if (paymentIntent.status !== "succeeded") {
        return NextResponse.json({ error: "Payment failed" }, { status: 400 });
      }

      await postgres.order.update({
        where: { id: newOrder.id },
        data: { status: "Completed" },
      });

      for (const product of cart) {
        await postgres.key.create({
          data: {
            orderId: newOrder.id,
            productId: product.id,
            quantity: product.quantity,
          },
        });
      }

      await postgres.cart.update({
        where: { userId: newOrder.userId },
        data: { products: undefined },
      });

      return NextResponse.json({ success: true });
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "USD",
        amount: Math.round(amount),
        metadata: {
          userId: user.id,
          cartId: cart[0]?.cartId,
          orderId: newOrder.id,
        },
      });

      if (!paymentIntent.client_secret) {
        throw new Error("Stripe failed to create payment intent");
      }

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        newOrder,
      });
    }
  } catch (err: any) {
    console.error("Error processing payment:", err);

    await postgres.order.update({
      where: { id: newOrder.id },
      data: { status: "Failed" },
    });

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
