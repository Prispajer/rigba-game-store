import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { postgres } from "@/data/database/publicSQL/postgres";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-10-28.acacia",
  typescript: true,
});

export async function POST(request: NextRequest) {
  const { email, amount, cart } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const orderExpirationDate = 20 * 60 * 1000;
  const currentTime = new Date().getTime();

  const user = await postgres.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const pendingOrder = await postgres.order.findFirst({
    where: {
      userId: user.id,
      status: "Pending",
      cartId: cart[0]?.cartId,
    },
    orderBy: { createdAt: "desc" },
  });

  if (pendingOrder) {
    const orderCreationTime = new Date(pendingOrder.createdAt).getTime();
    const paymentIntent = await stripe.paymentIntents.retrieve(
      pendingOrder.paymentIntentId
    );

    if (
      currentTime - orderCreationTime < orderExpirationDate &&
      paymentIntent?.status === "requires_payment_method"
    ) {
      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        existingOrder: pendingOrder,
      });
    }

    await postgres.order.update({
      where: { id: pendingOrder.id },
      data: { status: "Canceled" },
    });
  }

  const newOrder = await postgres.order.create({
    data: {
      userId: user.id,
      status: "Pending",
      title: cart[0]?.productsInformations?.name || "Order",
      paymentMethod: "Card",
      paymentIntentId: "",
      total: amount,
      cartId: cart[0].cartId,
    },
  });

  const paymentIntent = await stripe.paymentIntents.create(
    {
      currency: "USD",
      amount: Math.round(amount * 100),
      metadata: {
        userId: user.id,
        cartId: cart[0].cartId,
        orderId: newOrder.id,
      },
    },
    { idempotencyKey: `order_${newOrder.id}_user_${user.id}` }
  );

  if (!paymentIntent.client_secret) {
    throw new Error("Failed to create payment intent");
  }

  await postgres.order.update({
    where: { id: newOrder.id },
    data: { paymentIntentId: paymentIntent.id },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    newOrder,
  });
}
