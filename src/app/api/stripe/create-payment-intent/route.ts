import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { postgres } from "@/data/database/publicSQL/postgres";
import { userRepository } from "@/utils/injector";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  const { email, amount, cart } = await request.json();

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    console.error("User not found");
    throw new Error("User not found");
  }

  const order = await postgres.order.create({
    data: {
      userId: user.id,
      status: "Pending",
      title: cart[0]?.productsInformations?.name || "Order",
      paymentMethod: "Card",
      total: amount,
    },
  });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: Math.round(amount),
      metadata: {
        userId: user.id,
        cartId: cart[0].cartId,
        orderId: order.id,
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error("Stripe failed to create payment intent");
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      order,
    });
  } catch (err: any) {
    console.error("Error creating Stripe payment intent:", err);
    await postgres.order.update({
      where: { id: order.id },
      data: { status: "Failed" },
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
