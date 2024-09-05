import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest, response: NextResponse) {
  const { amount } = await request.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: Math.round(amount),
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error("Error creating Stripe checkout session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
