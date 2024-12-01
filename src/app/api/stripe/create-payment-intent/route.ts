import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { postgres } from "@/data/database/publicSQL/postgres";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function POST(request: NextRequest) {
  const { email, amount, cart } = await request.json();
  const orderExpirationDate = 20 * 60 * 1000;
  const currentTime = new Date().getTime();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await postgres.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingPendingOrder = await postgres.order.findFirst({
    where: {
      userId: user.id,
      status: "Pending",
      cartId: cart[0]?.cartId,
    },
    orderBy: { createdAt: "desc" },
  });

  if (existingPendingOrder) {
    const orderCreationTime = new Date(
      existingPendingOrder.createdAt
    ).getTime();

    if (currentTime - orderCreationTime > orderExpirationDate) {
      await postgres.orderHistory.create({
        data: {
          id: existingPendingOrder.id,
          userId: existingPendingOrder.userId,
          cartId: existingPendingOrder.cartId,
          status: "Canceled",
          title: existingPendingOrder.title,
          paymentMethod: existingPendingOrder.paymentMethod,
          paymentIntentId: existingPendingOrder.paymentIntentId,
          total: existingPendingOrder.total,
        },
      });

      await postgres.order.delete({
        where: { id: existingPendingOrder.id },
      });
    } else {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          existingPendingOrder.paymentIntentId
        );
        return NextResponse.json({
          clientSecret: paymentIntent.client_secret,
          newOrder: existingPendingOrder,
        });
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to retrieve payment intent" },
          { status: 500 }
        );
      }
    }
  }

  const newOrder = await postgres.order.create({
    data: {
      userId: user.id,
      status: "Pending",
      title: cart[0].productsInformations?.name,
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
    data: {
      paymentIntentId: paymentIntent.id,
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    newOrder,
  });
}
